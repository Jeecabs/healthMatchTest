"use client";

import { Question } from "../schemas/treeMatch";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { toTitleCase } from "../utils/text.format";

interface QuestionCardProps {
  question: Question["question"];
  onAnswer: (stepId: number, answer: string) => void;
  animationState: "entering" | "exiting" | "stable";
}

export default function QuestionCard({
  question,
  onAnswer,
  animationState,
}: QuestionCardProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Focus management for accessibility - focus the heading when a new question appears
  useEffect(() => {
    if (animationState === "stable" && headingRef.current) {
      headingRef.current.focus();
    }
    // Reset selected answer when question changes
    setSelectedAnswer(null);
  }, [animationState, question.step_id]);

  const variants = {
    entering: { opacity: 0, y: 20 },
    stable: { opacity: 1, y: 0 },
    exiting: { opacity: 0, y: -20 },
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);

    // Short delay to show the selection animation before proceeding
    setTimeout(() => {
      onAnswer(question.step_id, answer);
    }, 350);
  };

  return (
    <motion.div
      initial="entering"
      animate={animationState}
      variants={variants}
      transition={{ duration: 0.3, ease: "anticipate" }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all"
      role="region"
      aria-labelledby="question-heading"
    >
      <div className="p-6 sm:p-8">
        <h2
          ref={headingRef}
          id="question-heading"
          className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
          tabIndex={-1}
        >
          {question.question}
        </h2>

        <div
          className="space-y-3"
          role="radiogroup"
          aria-labelledby="question-heading"
        >
          {question.answers.map((answer, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                selectedAnswer === answer
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:bg-green-50/50 dark:hover:bg-green-900/10"
              }`}
              aria-label={`Select answer: ${answer}`}
              role="radio"
              aria-checked={selectedAnswer === answer}
              disabled={selectedAnswer !== null}
              whileHover={{ scale: selectedAnswer ? 1 : 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="flex items-center text-gray-700 dark:text-gray-200">
                {/* Radio circle indicator */}
                <span
                  className={`inline-block w-5 h-5 rounded-full border mr-3 flex-shrink-0 transition-colors ${
                    selectedAnswer === answer
                      ? "border-green-500 bg-green-400 dark:bg-green-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {toTitleCase(answer)}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
