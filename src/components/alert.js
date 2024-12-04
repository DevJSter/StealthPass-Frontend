import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Copy, ArrowRight, Wallet, Shield, ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ethers } from "ethers";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  EDUCHAIN_ABI,
  EDUCHAIN_EVENT_CONTRACT,
  INCO_ADDRESS,
  DUMMYABI,
} from "@/utils/contracts";
import { ensureFunding } from "@/utils/fundingHelper";
import axios from "axios";
import { useWalletContext } from "@/privy/walletContext";
import { useFhevm } from "@/fhevm/fhevm-context";
import { toHexString } from "@/fhevm/fhe-functions";

const TicketPurchaseDialog = ({ event, isOpen, onClose, onPurchase }) => {
  const [step, setStep] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [email, setEmail] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [keys, setKeys] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [signature, setSignature] = useState(null);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  
  const { signer, address } = useWalletContext();
  const { instance } = useFhevm();

  // Read token ID from EDUCHAIN contract
  const readOnEduchain = async () => {
    const bprovider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_EDUCHAIN_RPC_URL
    );
    const educhainSepoliaEventContract = new ethers.Contract(
      EDUCHAIN_EVENT_CONTRACT,
      EDUCHAIN_ABI,
      bprovider
    );
    const tokenId = await educhainSepoliaEventContract.tokenId();
    return tokenId;
  };

  // Generate random wallet for anonymous purchase
  function generateWallet() {
    return ethers.Wallet.createRandom();
  }

  // Construct signer from private key
  async function constructSigner(privateKey) {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_EDUCHAIN_RPC_URL
    );
    return new ethers.Wallet(privateKey, provider);
  }

  // EIP-712 Domain and Types
  const domain = {
    name: "WalletOwnershipProof",
    version: "1",
    chainId: 656476,
    verifyingContract: "0x0000000000000000000000000000000000000000",
  };

  const types = {
    Proof: [
      { name: "message", type: "string" },
      { name: "nonce", type: "uint256" },
    ],
  };

  const value = {
    message: "I own this wallet",
    nonce: 1,
  };

  // Sign message with wallet
  async function signMessage(wallet) {
    const signer = await constructSigner(wallet.privateKey);
    const signature = await signer.signTypedData(domain, types, value);
    const address = await signer.getAddress();
    setSignature(signature);
    return { signature, value, address };
  }

  const signSignatureNonAnonUser = async () => {
    const signature = await signer._signTypedData(domain, types, value);
    const address = await signer.getAddress();
    setSignature(signature);
    return { signature, value, address };
  };

  const handleBuyTicket = async (event) => {
    try {
      const input = await instance.createEncryptedInput(INCO_ADDRESS, address);
      input.addAddress(address);
      const encryptedInput = input.encrypt();

      const inputProof = "0x" + toHexString(encryptedInput.inputProof);

      const fundingResult = await ensureFunding(
        address,
        "educhain",
        "0.1",
        "0.1"
      );

      if (!fundingResult.success) {
        console.error("Funding failed:", fundingResult.message);
        return;
      }

      const eventContract = new ethers.Contract(
        EDUCHAIN_EVENT_CONTRACT,
        DUMMYABI,
        signer
      );

      const txParams = {
        value: ethers.parseUnits("10", "wei"),
        gasLimit: 10000000
      };

      const transaction = await eventContract.purchaseToken(
        encryptedInput.handles[0],
        inputProof,
        1,
        txParams
      );

      const receipt = await transaction.getTransaction();
      await receipt.wait();

      console.log("Transaction successful:", receipt);
      toast.success("Transfer successful!", {
        description: `Transaction hash: ${receipt.hash.slice(0, 6)}...${receipt.hash.slice(-4)}`,
      });

      toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
        loading: "Processing your purchase...",
        success: `Ticket purchased for ${event.title}!`,
        error: "Failed to purchase ticket",
      });

      return receipt;
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error("Purchase failed", {
        description: error.message || "Unknown error occurred",
      });
      throw error;
    }
  };

  const handleBack = () => {
    if (step === 1) {
      setStep(0);
      setIsAnonymous(false);
    } else if (step === 2) {
      setStep(isAnonymous ? 1 : 0);
      if (!isAnonymous) setIsAnonymous(false);
    }
  };

  const handleCheckoutTypeSelection = (anonymous) => {
    setIsAnonymous(anonymous);
    setStep(anonymous ? 1 : 2);
  };

  const handleKeyGenerationforAnonymous = async () => {
    setIsLoading(true);
    try {
      const w = await generateWallet();
      setWallet(w);
      await signMessage(w);
      setKeys({
        publicKey: w.address,
        privateKey: w.privateKey,
      });
      setStep(2);
    } catch (error) {
      console.error("Key generation error:", error);
      toast.error("Failed to generate keys");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle final purchase submission
  const purchaseToken = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      let sign = signature;
      if (!isAnonymous) {
        const s = await signSignatureNonAnonUser();
        sign = s.signature;
      }
      
      const fundingResult = await ensureFunding(address, "educhain", "0.1", "0.1");
      if (!fundingResult.success) {
        console.error("Funding failed:", fundingResult.message);
        return;
      }

      isAnonymous ? await onPurchase(event, wallet) : await handleBuyTicket(event);
      const uniqueKey = await readOnEduchain();

      console.log('uniqueKey:', uniqueKey);
      console.log('sign:', sign);

      const { data } = await axios.post("/api/api/send-email", {
        to: email,
        qrUrl: `https://stealth-pass.vercel.app/verify/${sign}/${uniqueKey}`,
      });

      setStep(3);
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Purchase failed", {
        description: error.message || "Unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const renderContent = () => {
    const commonContent = (
      <>
        {step === 0 && (
          <div className="flex flex-col h-full">
            {isMobile ? (
              <SheetHeader className="text-center pb-6">
                <SheetTitle className="text-2xl font-semibold">Choose Your Ticket</SheetTitle>
                <SheetDescription className="text-base">
                  Select your preferred purchase method
                </SheetDescription>
              </SheetHeader>
            ) : (
              <AlertDialogHeader>
                <AlertDialogTitle>Choose Ticket Type</AlertDialogTitle>
                <AlertDialogDescription>
                  Select how you would like to purchase your ticket
                </AlertDialogDescription>
              </AlertDialogHeader>
            )}

            <div className="grid grid-cols-1 gap-6 my-6">
              <Card
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  "hover:shadow-lg hover:border-primary",
                  "active:scale-98"
                )}
                onClick={() => handleCheckoutTypeSelection(true)}
              >
                <CardHeader className="flex flex-row items-center gap-6 p-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-1 font-semibold">Anonymous Ticket</CardTitle>
                    <CardDescription className="text-base">
                      Enhanced privacy with generated keys
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  "hover:shadow-lg hover:border-primary",
                  "active:scale-98"
                )}
                onClick={() => handleCheckoutTypeSelection(false)}
              >
                <CardHeader className="flex flex-row items-center gap-6 p-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Wallet className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-1 font-semibold">Standard Ticket</CardTitle>
                    <CardDescription className="text-base">
                      Quick purchase with your wallet
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-auto pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Ticket Price</span>
                <span className="text-lg font-semibold">${event.price} USDC</span>
              </div>

              {isMobile ? (
                <Button variant="ghost" onClick={onClose} className="w-full">
                  Cancel
                </Button>
              ) : (
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col h-full">
            {isMobile ? (
              <SheetHeader className="text-center relative pb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-0"
                  onClick={handleBack}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <SheetTitle className="text-2xl font-semibold">Generate Keys</SheetTitle>
                <SheetDescription className="text-base">
                  Create your unique ticket credentials
                </SheetDescription>
              </SheetHeader>
            ) : (
              <AlertDialogHeader>
                <AlertDialogTitle>Generate Your Ticket Keys</AlertDialogTitle>
                <AlertDialogDescription>
                  First, we&apos;ll generate your unique keys for this ticket
                </AlertDialogDescription>
              </AlertDialogHeader>
            )}

            <div className="flex-1 flex flex-col justify-center py-8">
              <div className="space-y-4 text-center">
                <div className="p-6 rounded-full bg-primary/10 mx-auto w-fit">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
                <p className="text-base text-muted-foreground max-w-sm mx-auto">
                  We&apos;ll generate secure keys for your anonymous ticket purchase. Keep these safe!
                </p>
              </div>
            </div>

            {isMobile ? (
              <div className="space-y-4">
                <Button 
                  onClick={handleKeyGenerationforAnonymous} 
                  disabled={isLoading}
                  className="w-full h-12 text-lg"
                >
                  {isLoading ? "Generating..." : "Generate My Keys"}
                </Button>
                <Button variant="ghost" onClick={handleBack} className="w-full">
                  Back
                </Button>
              </div>
            ) : (
              <AlertDialogFooter>
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleKeyGenerationforAnonymous} disabled={isLoading}>
                  {isLoading ? "Generating..." : "Generate Keys"}
                </Button>
              </AlertDialogFooter>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col h-full">
            {isMobile ? (
              <SheetHeader className="text-center relative pb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-0"
                  onClick={handleBack}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <SheetTitle className="text-2xl font-semibold">
                  {isAnonymous ? "Secure Your Keys" : "Almost Done"}
                </SheetTitle>
                <SheetDescription className="text-base">
                  {isAnonymous
                    ? "Save these keys to access your ticket"
                    : "Enter your email for ticket delivery"}
                </SheetDescription>
              </SheetHeader>
            ) : (
              <AlertDialogHeader>
                <AlertDialogTitle>{isAnonymous ? "Save Your Keys" : "Enter Your Email"}</AlertDialogTitle>
                <AlertDialogDescription>
                  {isAnonymous
                    ? "Store these keys safely - you'll need them to access your ticket"
                    : "Enter your email to receive ticket confirmation"}
                </AlertDialogDescription>
              </AlertDialogHeader>
            )}<div className="flex-1 space-y-6 py-6">
            <div className="space-y-4">
              <Label htmlFor="email" className="text-base">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-12 text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {isAnonymous && keys && (
              <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Public Key</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(keys.publicKey)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <code className="text-sm break-all block p-3 bg-background rounded-lg">
                    {keys.publicKey}
                  </code>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Private Key</span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPrivateKey(!showPrivateKey)}
                      >
                        {showPrivateKey ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      {showPrivateKey && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(keys.privateKey)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <code className="text-sm break-all block p-3 bg-background rounded-lg">
                    {showPrivateKey
                      ? keys.privateKey
                      : "••••••••••••••••••••••••••••••••••••"}
                  </code>
                </div>
              </div>
            )}
          </div>

          {isMobile ? (
            <div className="space-y-4">
              <Button
                onClick={purchaseToken}
                disabled={isLoading || !email}
                className="w-full h-12 text-lg"
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    Complete Purchase
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
              <Button variant="ghost" onClick={handleBack} className="w-full">
                Back
              </Button>
            </div>
          ) : (
            <AlertDialogFooter>
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button onClick={purchaseToken} disabled={isLoading || !email}>
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    Complete Purchase
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </AlertDialogFooter>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col h-full">
          {isMobile ? (
            <SheetHeader className="text-center pb-6">
              <div className="mx-auto w-fit p-6 rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
                <Shield className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <SheetTitle className="text-2xl font-semibold">Success!</SheetTitle>
              <SheetDescription className="text-base">
                Your ticket has been purchased
              </SheetDescription>
            </SheetHeader>
          ) : (
            <AlertDialogHeader>
              <AlertDialogTitle>Purchase Complete!</AlertDialogTitle>
              <AlertDialogDescription>
                Your ticket has been purchased successfully
              </AlertDialogDescription>
            </AlertDialogHeader>
          )}

          <div className="flex-1 flex flex-col justify-center text-center py-6">
            <p className="text-base text-muted-foreground">
              We&apos;ve sent your ticket details to:<br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
            {isAnonymous && (
              <p className="mt-4 text-sm text-muted-foreground">
                Don&apos;t forget to save your keys in a secure location!
              </p>
            )}
          </div>

          {isMobile ? (
            <Button onClick={onClose} className="w-full h-12 text-lg">
              Done
            </Button>
          ) : (
            <AlertDialogFooter>
              <Button onClick={onClose} className="w-full">
                Close
              </Button>
            </AlertDialogFooter>
          )}
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[95vh] px-6">
          <div className="h-full flex flex-col">
            {commonContent}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        {commonContent}
      </AlertDialogContent>
    </AlertDialog>
  );
};

return renderContent();
};

export default TicketPurchaseDialog;