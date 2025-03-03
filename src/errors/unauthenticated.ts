import CustomApiError from "./custom-api";
import { StatusCodes } from "http-status-codes";

export default class UnauthenticatedError extends CustomApiError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
