enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

enum HttpMsg {
  OK = "Ok",
  NO_CONTENT = "NO CONTENT",
  BAD_REQUEST = "BAD REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL SERVERERROR",
  INVALID_EMAIL = "Invalid Email",
  INVALID_TEAMID = "Invalid Team ID",
  MANAGER_EXISTS = "Manager Exists",
  AUTH_DOES_NOT_EXIST = "Auth does not exist",
  PASSWORD_INCORRECT = "Password is incorrect",
  ERROR_CREATING_LOGIN = "Error creating login",
  ERROR_CREATING_JWT = "Error creating JWT",
}

export { HttpCode, HttpMsg };
