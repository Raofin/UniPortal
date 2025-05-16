import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            isIconOnly
            color="primary"
            variant="solid"
            size="lg"
            className="shadow-lg"
            onPress={scrollToTop}
            aria-label="Scroll to top"
          >
            <Icon icon="lucide:chevron-up" width={24} height={24} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};