import { z } from "zod";

// Response schemas
export const QuestionSchema = z.object({
  question: z.object({
    step_id: z.number(),
    question: z.string(),
    answers: z.array(z.string()),
  }),
});

export const MatchSchema = z.object({
  match: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

// API can return either a question or match
export const ApiResponseSchema = z.union([QuestionSchema, MatchSchema]);

// Request schema
export const AnswerRequestSchema = z.object({
  step_id: z.number(),
  answer: z.string(),
});

export type Question = z.infer<typeof QuestionSchema>;
export type Match = z.infer<typeof MatchSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type AnswerRequest = z.infer<typeof AnswerRequestSchema>;

// Type guards
export const isQuestion = (response: ApiResponse): response is Question =>
  "question" in response;

export const isMatch = (response: ApiResponse): response is Match =>
  "match" in response; 