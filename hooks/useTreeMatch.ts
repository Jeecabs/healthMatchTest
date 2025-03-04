import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponse,
  AnswerRequest,
  isQuestion,
  isMatch,
} from "../schemas/treeMatch";
import {
  getFirstQuestion,
  submitAnswer,
} from "../app/actions/treeMatchActions";

const TREE_MATCH_QUERY_KEYS = {
  firstQuestion: ["treeMatch", "firstQuestion"],
  currentState: ["treeMatch", "currentState"],
};

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

  const currentState =
    queryClient.getQueryData<ApiResponse>(TREE_MATCH_QUERY_KEYS.currentState) ||
    (firstQuestionQuery.data &&
      queryClient.setQueryData(
        TREE_MATCH_QUERY_KEYS.currentState,
        firstQuestionQuery.data
      ));

  const submitAnswerMutation = useMutation({
    mutationFn: (answerData: AnswerRequest) => submitAnswer(answerData),
    onSuccess: (data) => {
      queryClient.setQueryData(TREE_MATCH_QUERY_KEYS.currentState, data);
    },
  });

  const resetFlow = () => {
    queryClient.removeQueries({ queryKey: TREE_MATCH_QUERY_KEYS.currentState });
    queryClient.invalidateQueries({
      queryKey: TREE_MATCH_QUERY_KEYS.firstQuestion,
    });
  };

  return {
    currentState,

    isLoading: firstQuestionQuery.isLoading || submitAnswerMutation.isPending,
    isError: firstQuestionQuery.isError || submitAnswerMutation.isError,
    error: firstQuestionQuery.error || submitAnswerMutation.error,

    submitAnswer: submitAnswerMutation.mutateAsync,
    resetFlow,

    isQuestion: (currentState && isQuestion(currentState)) || false,
    isMatch: (currentState && isMatch(currentState)) || false,
  };
}
