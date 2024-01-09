class LoginResponse {
  public refreshToken: string;
  public accessToken: string;

  public constructor(refreshToken: string, accessToken: string) {
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
  }
}

class LoginResquest {
  public password: string;
  public userName: string;

  constructor(password: string, userName: string) {
    this.password = password;
    this.userName = userName;
  }
}

class LoginResquestManager extends LoginResquest {
  public teamId: string;

  constructor(password: string, userName: string, teamId: string) {
    // Call the constructor of the parent class using super
    super(password, userName);

    this.teamId = teamId;
  }
}

export { LoginResquest, LoginResponse, LoginResquestManager };
