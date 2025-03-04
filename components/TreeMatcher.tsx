"use client";

import { useState } from "react";
import { useTreeMatchFlow } from "../hooks/useTreeMatch";
import QuestionCard from "./QuestionCard";
import TreeMatchResult from "./TreeMatchResult";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import IntroSection from "./IntroSection";
import { isQuestion, isMatch } from "../schemas/treeMatch";

export default function TreeMatcher() {
  const [showIntro, setShowIntro] = useState(true);
  const [animationState, setAnimationState] = useState<
    "entering" | "exiting" | "stable"
  >("stable");

  const { currentState, isLoading, isError, error, submitAnswer, resetFlow, } =
    useTreeMatchFlow();

  const handleAnswer = (stepId: number, answer: string) => {
    setAnimationState("exiting");

    setTimeout(() => {
      submitAnswer({ step_id: stepId, answer });
      setAnimationState("entering");

      // Reset animation state after entry animation completes
      setTimeout(() => {
        setAnimationState("stable");
      }, 500);
    }, 500);
  };

  const handleReset = () => {
    setAnimationState("exiting");

    setTimeout(() => {
      resetFlow();
      setShowIntro(true);
      setAnimationState("stable");
    }, 300);
  };

  const startQuestionnaire = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroSection onStart={startQuestionnaire} />;
  }

  if (isLoading && !currentState) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState error={error} onReset={resetFlow} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {currentState && isQuestion(currentState) && (
        <QuestionCard
          question={currentState.question}
          onAnswer={handleAnswer}
          animationState={animationState}
        />
      )}

      {currentState && isMatch(currentState) && (
        <TreeMatchResult
          match={currentState.match}
          onReset={handleReset}
          animationState={animationState}
        />
      )}
    </div>
  );
}
