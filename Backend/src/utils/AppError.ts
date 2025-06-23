import { AppErrorCode } from "../config/appErrorCode";
import { HttpStatusCode } from "../config/http";

export class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCode,
  ) {
    super(message);
  }
}
