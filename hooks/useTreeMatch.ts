import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, AnswerRequest } from "../schemas/treeMatch";
import {
  getFirstQuestion,
  submitAnswer,
} from "../app/actions/treeMatchActions";

const TREE_MATCH_QUERY_KEYS = {
  firstQuestion: ["treeMatch", "firstQuestion"],
  currentState: ["treeMatch", "currentState"],
};

/**
 * Hook for fetching the first question
 */
export function useFirstQuestion() {
  return useQuery({
    queryKey: TREE_MATCH_QUERY_KEYS.firstQuestion,
    queryFn: () => getFirstQuestion(),
  });
}

/**
 * Main hook that manages the TreeMatch flow
 *
 * Provides state and actions for moving through the questionnaire
 */
export function useTreeMatchFlow() {
  const queryClient = useQueryClient();
  const firstQuestionQuery = useFirstQuestion();

  // Mutation for submitting answers
  const submitAnswerMutation = useMutation({
    mutationFn: (answerData: AnswerRequest) => submitAnswer(answerData),
    onSuccess: (data) => {
      queryClient.setQueryData(TREE_MATCH_QUERY_KEYS.currentState, data);
    },
  });

  // Function to reset the flow
  const resetFlow = () => {
    queryClient.removeQueries({ queryKey: TREE_MATCH_QUERY_KEYS.currentState });
    queryClient.invalidateQueries({
      queryKey: TREE_MATCH_QUERY_KEYS.firstQuestion,
    });
  };

  return {
    currentState: queryClient.getQueryData<ApiResponse>(
      TREE_MATCH_QUERY_KEYS.currentState
    ),

    // states
    isLoading: firstQuestionQuery.isLoading || submitAnswerMutation.isPending,
    isError: firstQuestionQuery.isError || submitAnswerMutation.isError,
    error: firstQuestionQuery.error || submitAnswerMutation.error,

    submitAnswer: submitAnswerMutation.mutate,
    resetFlow,
  };
}
