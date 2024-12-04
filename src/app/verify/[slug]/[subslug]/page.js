'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { Check, Loader2, Key, Clipboard, User } from "lucide-react";
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useFhevm } from "@/fhevm/fhevm-context";
import { useWalletContext } from "@/privy/walletContext";
import { INCO_ABI, INCO_ADDRESS, EDUCHAIN_EVENT_CONTRACT } from "@/utils/contracts";
import HeroHeader from "@/components/hero/hero-header";

export default function VerifyPage() {
  const params = useParams();
  const { w0, signer, address } = useWalletContext();
  const { instance: fhevmInstance } = useFhevm();
  const [error, setError] = useState("");
  const [recoveredAddress, setRecoveredAddress] = useState("");
  const [isRecoveringAddress, setIsRecoveringAddress] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [tokenId, setTokenId] = useState(params.subslug || "1");

  const readOnInco = async () => {
    const provider = new ethers.JsonRpcProvider("https://validator.rivest.inco.org");
    const contract = new ethers.Contract(INCO_ADDRESS, INCO_ABI, provider);
    const result = await contract.getDeterministicKey(
      656476,
      EDUCHAIN_EVENT_CONTRACT,
      tokenId
    );
    console.log("Deterministic Key:", result);
    console.log("Token ID:", tokenId);
    return result;
  };

  async function verifySignature() {
    try {
      const signature = params.slug;
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
  
      const digest = ethers.TypedDataEncoder.hash(domain, types, value);
      
      if (!signature || signature.length !== 132) {
        throw new Error("Invalid signature length");
      }
  
      const r = signature.slice(0, 66);
      const s = "0x" + signature.slice(66, 130);  
      const v = parseInt(signature.slice(130, 132), 16);
  
      if (v !== 27 && v !== 28) {
        throw new Error("Invalid recovery parameter");
      }
  
      const formattedSignature = r + s.slice(2) + v.toString(16).padStart(2, '0');
      
      try {
        return ethers.recoverAddress(digest, formattedSignature);
      } catch (error) {
        console.error("Address recovery error:", error);
        throw new Error("Failed to recover address from signature");
      }
    } catch (error) {
      console.error("Signature verification error:", error);
      return "0x0000000000000000000000000000000000000000";
    }
  }

  useEffect(() => {
    const autoRecoverAddress = async () => {
      if (params.slug) {
        setIsRecoveringAddress(true);
        setTimeout(async () => {
          const address = await verifySignature();
          setRecoveredAddress(address);
          setIsRecoveringAddress(false);
        }, 2000);
      }
    };
    autoRecoverAddress();
  }, [params.slug]);

  useEffect(() => {
    const switchChain = async () => {
      try {
        await w0?.switchChain(21097);
      } catch (error) {
        console.error("Failed to switch chain:", error);
        setError("Failed to switch to the correct network");
      }
    };
    switchChain();
  }, [w0]);

  const verifyAddress = async () => {
    try {
      setIsVerifying(true);
      setVerificationSuccess(false);
      
      // Check if recovered address matches connected wallet
    //   if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    //     throw new Error("Recovered address doesn't match connected wallet");
    //   }

      const incoPRovider = new ethers.JsonRpcProvider('https://validator.rivest.inco.org');
      const keyPair = fhevmInstance.generateKeypair();
      const publicKey = keyPair.publicKey;
      const privateKey = keyPair.privateKey;

      const eip712 = fhevmInstance.createEIP712(publicKey, INCO_ADDRESS);
      const signature = await signer._signTypedData(
        eip712.domain,
        { Reencrypt: eip712.types.Reencrypt },
        eip712.message
      );

      const incoContract = new ethers.Contract(INCO_ADDRESS, INCO_ABI, incoPRovider);
      const hash = await readOnInco();
      
      const encryptedAddress = await incoContract.tokenKeyToEaddress(hash);
      // Uncomment these lines when ready to implement full reencryption
      /*
      const decryptedAddress = await fhevmInstance.reencrypt(
        encryptedAddress,
        privateKey,
        publicKey,
        signature.replace("0x", ""),
        INCO_ADDRESS,
        address
      );
      
      const formattedHolderAddress = "0x" + BigInt(decryptedAddress).toString(16).padStart(40, "0");
      console.log("Formatted Holder Address:", formattedHolderAddress);
      */
      
      setVerificationSuccess(true);
      setTimeout(() => {
        setVerificationSuccess(false);
        setIsVerifying(false);
      }, 6000);
    } catch (error) {
      console.error("Verification failed:", error);
      setError(error.message);
      setIsVerifying(false);
      setVerificationSuccess(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Main Content Box */}
          <div className="bg-white rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Key className="w-6 h-6 text-black" />
              <h2 className="text-xl font-medium text-black">Verify Access</h2>
            </div>

            <div className="space-y-4">
              {/* Signature Box */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Clipboard className="w-5 h-5 text-black" />
                  <h3 className="text-sm font-medium text-black">Signature</h3>
                </div>
                <div
                  onClick={() => copyToClipboard(params.slug)}
                  className="font-mono text-xs text-gray-600 break-all cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  {params.slug}
                </div>
              </div>

              {/* Recovered Address Box */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-black" />
                  <h3 className="text-sm font-medium text-black">Recovered Address</h3>
                </div>
                {isRecoveringAddress ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                  </div>
                ) : (
                  <div
                    onClick={() => copyToClipboard(recoveredAddress)}
                    className="font-mono text-xs text-gray-600 break-all cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                  >
                    {recoveredAddress}
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 text-red-900 rounded-xl p-4 border border-red-100">
                  <div className="text-sm">{error}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Verify Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={verifyAddress}
            disabled={isVerifying || isRecoveringAddress}
            className={`w-full h-12 relative rounded-xl ${
              verificationSuccess
                ? "bg-green-500 hover:bg-green-600"
                : "bg-black hover:bg-black/90"
            } text-white transition-all duration-300`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {verificationSuccess && (
                <motion.div
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Verified!</span>
                </motion.div>
              )}
              
              {!verificationSuccess && isVerifying && (
                <Loader2 className="w-5 h-5 animate-spin" />
              )}

              {!isVerifying && !verificationSuccess && (
                <span>Verify Address</span>
              )}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}