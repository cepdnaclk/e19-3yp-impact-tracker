class ManagerExistsResponse {
  public managerExists: boolean;

  public constructor(managerExists: boolean) {
    this.managerExists = managerExists;
  }
}

class Manager {
  public teamId: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public acceptInvitation: boolean;

  public constructor(
    teamId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    acceptInvitation: boolean
  ) {
    this.teamId = teamId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.acceptInvitation = acceptInvitation;
  }
}

class ManagerResponse {
  private teamId: string;
  private firstName: string;
  private lastName: string;
  private email: string;

  public constructor(manager: ManagerRequestBody) {
    this.teamId = manager.teamId;
    this.firstName = manager.firstName;
    this.lastName = manager.lastName;
    this.email = manager.email;
  }
}

class ManagerRequestBody {
  public teamId: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  public constructor(
    teamId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.teamId = teamId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

export { ManagerExistsResponse, Manager, ManagerResponse, ManagerRequestBody };
