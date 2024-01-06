class LoginResquest {
  public password: string;
  public userName: string;

  public constructor(password: string, userName: string) {
    this.password = password;
    this.userName = userName;
  }
}

class LoginResponse {
  public refreshToken: string;
  public accessToken: string;

  public constructor(refreshToken: string, accessToken: string) {
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
  }
}

export { LoginResquest, LoginResponse };
