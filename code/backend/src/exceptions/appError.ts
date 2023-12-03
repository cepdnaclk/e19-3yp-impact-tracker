import { HttpCode , HttpMsg} from "./appErrorsDefine";

interface AppErrorArgs {
  name?: string;
  httpCode: HttpCode;
  description: HttpMsg;
  isOperational?: boolean;
}

class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;
  public readonly isOperational: boolean = true;

  constructor(args: AppErrorArgs) {
    super(args.description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || 'Error';
    this.httpCode = args.httpCode;

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }

    Error.captureStackTrace(this);
  }
}

export default AppError;