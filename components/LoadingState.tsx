"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingState() {
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
              left: ["0%", "10%", "0%", "20%", "5%"],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
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
