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
  public invitationToken: string;
  public isVerified: boolean;

  public constructor(
    teamId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    invitationToken: string,
    isVerified: boolean
  ) {
    this.teamId = teamId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.invitationToken = invitationToken;
    this.isVerified = isVerified;
  }
}

class ManagerResponse {
  public teamId: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public isVerified: boolean;

  public constructor(manager: ManagerResponse) {
    this.teamId = manager.teamId;
    this.firstName = manager.firstName;
    this.lastName = manager.lastName;
    this.email = manager.email;
    this.isVerified = manager.isVerified;
  }
}

class ManagerRequestBody {
  public teamId: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public invitationToken: string;
  public isVerified: boolean;

  public constructor(
    teamId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    invitationToken: string,
    isVerified: boolean
  ) {
    this.teamId = teamId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.invitationToken = invitationToken;
    this.isVerified = isVerified;
  }
}

export { ManagerExistsResponse, Manager, ManagerResponse, ManagerRequestBody };
