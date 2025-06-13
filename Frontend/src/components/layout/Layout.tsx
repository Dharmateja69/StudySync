import { motion } from "framer-motion";
import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  hideNavbar?: boolean;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Layout({
  children,
  hideFooter = false,
  hideNavbar = false,
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {!hideNavbar && <Navbar />} {/* ← Conditionally render Navbar */}
      <motion.main
        className="flex-1"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.main>
      {!hideFooter ? (
        <Footer />
      ) : (
        // Add spacer to preserve layout height when Footer is hidden
        <div className="h-[300px]" /> // adjust height to match actual footer height
      )}
    </div>
  );
}
