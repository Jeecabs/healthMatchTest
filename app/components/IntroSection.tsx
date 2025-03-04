"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LucideLeaf, ArrowRight } from "lucide-react";

interface IntroSectionProps {
  onStart: () => void;
}

export default function IntroSection({ onStart }: IntroSectionProps) {
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);

    setTimeout(() => {
      onStart();
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isStarting ? 0 : 1, y: isStarting ? -20 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-500 p-8 text-white overflow-hidden">
        <div className="relative z-10">
          <motion.div
            className="flex items-center mb-4 gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LucideLeaf size={32} className="text-green-300" />
            <h2 className="text-3xl font-bold">Discover Your Perfect Tree</h2>
          </motion.div>

          <motion.p
            className="text-green-50 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Trees bring beauty, shade, and life to your garden. Let&apos;s find
            your perfect match.
          </motion.p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
            How it works:
          </h3>

          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            {[
              "Answer a few simple questions about your garden and preferences",
              "Our expert system interprets your answers",
              "Receive a personalised tree recommendation perfect for your garden",
            ].map((step, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                    {index + 1}
                  </span>
                </span>
                <span>{step}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.button
            onClick={handleStart}
            className="group px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md flex items-center gap-2"
            disabled={isStarting}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            {isStarting ? "Let's begin!" : "Find My Perfect Tree"}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <ArrowRight size={20} />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
