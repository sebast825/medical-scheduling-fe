import { genericMessages } from "../constants/genericMessages";

export function handleHttpError(error: any): string {
  console.log(error);
  let errorMessage = genericMessages.standardError;
  let errorCode = 500; // Default to 500 if status code is not available
  if (error.response?.data) {
    errorMessage = error.response.data;
    errorCode = error.response.status;
  }

  return errorMessage;
}
