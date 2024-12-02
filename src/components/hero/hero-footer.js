import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Github, X } from "lucide-react";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

const HeroFooter = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fadeInVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  const linkVariants = {
    initial: { color: "#000000" },
    hover: { color: "#4B5563" },
  };

  const VideoDialog = () => {
    if (isMobile) {
      return (
        <Dialog open={showVideo} onOpenChange={setShowVideo}>
          <DialogOverlay className="bg-black/20" />
          <DialogContent 
            className="fixed bottom-0 top-auto !rounded-t-[20px] !p-0 h-[85vh] translate-y-0 data-[state=closed]:translate-y-full transition-transform duration-300 ease-out"
            style={{
              background: 'white',
              boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="w-full flex flex-col h-full">
              <div className="w-full flex justify-center py-3">
                <div className="w-10 h-1 bg-gray-200 rounded-full" />
              </div>
              
              <DialogHeader className="px-5 pt-1 pb-4">
                <DialogTitle className="text-lg font-semibold">Protocol Demo</DialogTitle>
                <DialogDescription className="text-sm">
                  Watch how our <span className="text-black">StealthPass</span> works.
                </DialogDescription>
              </DialogHeader>
              
              <div className="relative flex-1 bg-black">
           
                <iframe
                  className="absolute inset-0 w-full h-full"
                 src="https://www.youtube.com/embed/pYKAngWoyVw?si=VKBcRkDe6B8rkW44"
                  title="Protocol Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogOverlay className="bg-black/20" />
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Protocol Demo</DialogTitle>
            <DialogDescription>
              Watch how our <span className="text-black">StealthPass</span> works.
            </DialogDescription>
          </DialogHeader>
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
             src="https://www.youtube.com/embed/pYKAngWoyVw?si=VKBcRkDe6B8rkW44"
              title="Protocol Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button 
            onClick={() => setShowVideo(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      <div className="relative bg-[#F3F3F3] rounded-[35px] md:rounded-[35px] overflow-hidden p-4 md:p-8 md:py-6 mb-8 h-[85vh] grid place-items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F3F3F3]/80" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 md:w-16 h-12 md:h-16 rounded-full grid place-items-center p-1.5">
              <Image src="/logob.svg" width={40} height={40} alt="Hero Image" className="md:w-[50px] md:h-[50px]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-medium text-center">
                <span className="text-black">Fully on-chain </span>
                <span className="text-gray-400">Event</span>
                <br />
                <span className="text-gray-400">Ticketing </span>
                <span className="text-black">System</span>
              </h1>
            </div>
          </div>

          <div className="grid place-items-center mt-4 md:mt-6">
            <button
              className="group rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 bg-black text-white shadow hover:opacity-90 pl-4"
              onClick={() => setShowVideo(true)}
            >
              <p className="py-2">View Demo</p>
              <div className="h-8 md:h-10 w-8 md:w-10 rounded-full bg-white overflow-hidden grid place-items-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ChevronRight className="text-black w-4 md:w-5 h-4 md:h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <motion.div
  className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 pb-6 px-4 md:px-0"
  initial="initial"
  animate="animate"
  variants={fadeInVariants}
  transition={{ duration: 0.3 }}
>
  {/* Logo and Name - Always visible */}
  <Link href="/" className="no-underline w-full md:w-auto">
    <motion.div className="bg-white p-1.5 rounded-full px-2.5 pr-4 flex justify-center md:justify-start w-full">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="bg-black w-7 md:w-9 h-7 md:h-9 rounded-full grid place-items-center p-1.5">
          <Image
            src="/logo1.svg"
            width={24}
            height={24}
            alt="Hero Image"
            className="md:w-8 md:h-8"
          />
        </div>
        <p className="text-black font-medium text-sm md:text-base">StealthPass</p>
      </div>
    </motion.div>
  </Link>

  {/* Credits - Hidden on very small screens */}
  <motion.div
    className="hidden sm:block text-center text-gray-600 text-xs md:text-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <p>Presenting you with ❤️ from Swayam & Vivek.</p>
  </motion.div>

  {/* GitHub Link - Always visible */}
  <motion.div
    className="w-full md:w-auto"
    whileHover={{ scale: 1.02 }}
  >
    <Link
      href="https://github.com/eth-bankok-2024"
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline text-black hover:text-gray-600 transition-colors"
    >
      <motion.div
        className="bg-white p-1.5 rounded-full px-3 md:px-4 text-xs md:text-sm flex items-center justify-center md:justify-start"
        variants={linkVariants}
        initial="initial"
        whileHover="hover"
      >
        <div className="flex items-center gap-2">
          <Github size={16} className="md:w-5 md:h-5" />
          <span className="font-medium">GitHub</span>
        </div>
      </motion.div>
    </Link>
  </motion.div>
</motion.div>

      <VideoDialog />
    </div>
  );
};

export default HeroFooter;