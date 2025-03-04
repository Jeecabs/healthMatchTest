"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingState() {
  
  const leafPoints = "M12,3 C12,3 5,8 5,15 C5,19 8,22 12,22 C16,22 19,19 19,15 C19,8 12,3 12,3 Z";
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
        <div className="h-20 w-20 mb-4 flex items-center justify-center">
          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Finding your perfect tree match...
          </h3>
          <div className="h-1.5 w-48 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-3 mb-2"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Analysing your garden preferences
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <motion.div 
        className="relative h-20 w-20 mb-4"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {/* Animated leaves circle */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "0 -20px",
              transform: `rotate(${i * 45}deg) translateY(-20px) translateX(-50%)`,
            }}
          >
            <motion.svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-green-500"
            >
              <motion.path
                d={leafPoints}
                fill="currentColor"
                animate={{ 
                  fillOpacity: [0.7, 1, 0.7],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
            </motion.svg>
          </motion.div>
        ))}

        <motion.div 
          className="absolute left-1/2 top-1/2 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 0 rgba(0, 0, 0, 0)",
              "0 0 10px rgba(34, 197, 94, 0.3)",
              "0 0 0 rgba(0, 0, 0, 0)"
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </motion.div>
      
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Finding your perfect tree match...
        </h3>

        <div className="relative h-1.5 w-48 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-3 mb-2">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-emerald-400"
            animate={{ 
              width: ["0%", "30%", "70%", "45%", "95%"],
              left: ["0%", "10%", "0%", "20%", "5%"] 
            }}
            transition={{ 
              duration: 3.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Analysing your garden preferences
        </p>
      </motion.div>
    </div>
  );
} 