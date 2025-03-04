"use client";

import { motion } from "framer-motion";

interface ErrorStateProps {
  error: Error | null;
  onReset: () => void;
}

export default function ErrorState({ error, onReset }: ErrorStateProps) {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 text-center"
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        Something went wrong
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {error?.message ||
          "There was an error getting your tree recommendation."}
      </p>

      <button
        onClick={onReset}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Try Again
      </button>
    </motion.div>
  );
}
