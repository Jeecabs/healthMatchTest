"use client";

import { Match } from "../schemas/treeMatch";
import { motion } from "framer-motion";
import { LucideLeaf } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TreeMatchResultProps {
  match: Match["match"];
  onReset: () => void;
  animationState: "entering" | "exiting" | "stable";
}

export default function TreeMatchResult({
  match,
  onReset,
  animationState,
}: TreeMatchResultProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [confettiElements, setConfettiElements] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      color: string;
    }>
  >([]);

  const [decorElements, setDecorElements] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      fontSize: number;
      rotate: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    const newConfetti = Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 10 + 5;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 20 + 70, // Starts from lower part of the screen
        size,
        color: [
          "bg-green-400",
          "bg-green-500",
          "bg-green-600",
          "bg-yellow-400",
          "bg-blue-400",
        ][Math.floor(Math.random() * 5)],
      };
    });
    setConfettiElements(newConfetti);

    const newDecor = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      fontSize: Math.random() * 80 + 40,
      rotate: Math.random() * 360,
      duration: 10 + Math.random() * 10,
    }));
    setDecorElements(newDecor);
  }, []);

  // Focus management for accessibility - focus the heading when result appears
  useEffect(() => {
    if (animationState === "stable" && headingRef.current) {
      headingRef.current.focus();
    }
  }, [animationState]);

  const variants = {
    entering: { opacity: 0, scale: 0.95 },
    stable: { opacity: 1, scale: 1 },
    exiting: { opacity: 0, scale: 1.05 },
  };

  const confettiVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: [0, 1, 0],
      y: [0, -100 * Math.random()],
      x: [0, (Math.random() - 0.5) * 50],
      rotate: [0, Math.random() * 360],
      transition: {
        delay: i * 0.01,
        duration: 1.5 + Math.random(),
        repeat: Infinity,
        repeatDelay: 7 + Math.random() * 5,
      },
    }),
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    tap: { scale: 0.97 },
  };

  return (
    <div className="relative">
      {animationState === "stable" && confettiElements.length > 0 && (
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {confettiElements.map((item) => (
            <motion.div
              key={item.id}
              className={`absolute rounded-full ${item.color}`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: item.size,
                height: item.size,
              }}
              custom={item.id}
              initial="hidden"
              animate="visible"
              variants={confettiVariants}
            />
          ))}
        </div>
      )}

      <motion.div
        initial="entering"
        animate={animationState}
        variants={variants}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
        role="region"
        aria-labelledby="result-heading"
      >
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6  relative overflow-hidden">
          {decorElements.length > 0 && (
            <div
              className="absolute inset-0 overflow-hidden opacity-10"
              aria-hidden="true"
            >
              {decorElements.map((item) => (
                <motion.div
                  key={item.id}
                  className="absolute text-white"
                  style={{
                    left: `${item.left}%`,
                    top: `${item.top}%`,
                    fontSize: `${item.fontSize}px`,
                    transform: `rotate(${item.rotate}deg)`,
                  }}
                  animate={{
                    opacity: [0.1, 0.15, 0.1],
                    rotate: [`${item.rotate}deg`, `${item.rotate + 40}deg`],
                  }}
                  transition={{
                    duration: item.duration,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  ✿
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex justify-center relative z-10">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg"
              animate={{
                y: [0, -5, 0],
                boxShadow: [
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                ],
              }}
              transition={{
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              }}
            >
              <LucideLeaf
                size={40}
                className="text-green-500"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>

        <div className="p-6 sm:p-8 text-center">
          <h2
            ref={headingRef}
            id="result-heading"
            className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
            tabIndex={-1}
          >
            Your Perfect Match
          </h2>

          <div className="mt-6">
            <motion.h3
              className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {match.name}
            </motion.h3>

            <motion.p
              className="text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {match.description}
            </motion.p>

            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.button
                onClick={onReset}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md"
                aria-label="Start a new tree match"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Find Another Tree
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
