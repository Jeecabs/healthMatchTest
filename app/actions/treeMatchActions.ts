'use server';

import { ApiResponseSchema, AnswerRequestSchema, ApiResponse, AnswerRequest } from "../../schemas/treeMatch";

// Using environment variable or fallback to the API base URL
const API_BASE_URL = process.env.API_BASE_URL || 
  "http://fe-interview-api-dev.ap-southeast-2.elasticbeanstalk.com";

/**
 * Server action to fetch the first question in the TreeMatch flow
 */
export async function getFirstQuestion(): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/begin`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  const parseResult = ApiResponseSchema.safeParse(data);
  if (!parseResult.success) {
    throw new Error(`Validation error: ${parseResult.error.message}`);
  }
  return parseResult.data;
}

/**
 * Server action to submit an answer and retrieve the next question or a match
 */
export async function submitAnswer(answerData: AnswerRequest): Promise<ApiResponse> {
  const validatedData = AnswerRequestSchema.parse(answerData);

  const response = await fetch(`${API_BASE_URL}/api/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedData),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  const parseResult = ApiResponseSchema.safeParse(data);
  if (!parseResult.success) {
    throw new Error(`Validation error: ${parseResult.error.message}`);
  }
  return parseResult.data;
} 