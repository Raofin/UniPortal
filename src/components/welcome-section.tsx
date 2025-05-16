import React from "react";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export const WelcomeSection: React.FC = () => {
  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/30 to-background rounded-xl -z-10" />
      
      <Card className="border-none bg-background/60 backdrop-blur-sm shadow-md">
        <CardBody className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary">
                <Icon icon="lucide:bot" width={28} height={28} />
              </div>
            </motion.div>
            
            <div className="flex-grow">
              <motion.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl font-bold text-foreground mb-2"
              >
                Welcome back, Rawfin! 👋
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-default-600"
              >
                You have <span className="font-semibold text-primary">2 classes</span> today and <span className="font-semibold text-warning">1 assignment</span> due in <span className="font-semibold text-danger">5h 40m</span>!
              </motion.p>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-4 flex flex-wrap gap-3"
              >
                <div className="flex items-center gap-2 text-sm bg-primary-50 text-primary-600 px-3 py-1.5 rounded-full">
                  <Icon icon="lucide:book-open" />
                  <span>Next class: Advanced Algorithms (10:30 AM)</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-warning-50 text-warning-600 px-3 py-1.5 rounded-full">
                  <Icon icon="lucide:clock" />
                  <span>Assignment due: Data Structures Project</span>
                </div>
              </motion.div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};