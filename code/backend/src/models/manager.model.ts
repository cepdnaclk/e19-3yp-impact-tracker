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
  public isVerified: string;

  public constructor(
    teamId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    invitationToken: string,
    isVerified: string
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
  public name: string;
  public email: string;
  public verification: string;

  public constructor(manager: Manager) {
    this.name = manager.firstName + " " + manager.lastName;
    this.email = manager.email;
    this.verification = manager.isVerified;
  }
}

class ManagerRequestBody {
  public teamId: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public invitationToken: string;
  public isVerified: string;

  public constructor(
    teamId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    invitationToken: string,
    isVerified: string
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

class ManagerTeamResponse {
  public managerEmail: string;
  public teamId: string;
  public accepted: string;

  public constructor(
    managerEmail: string,
    teamId: string,
    accepted: string
  ) {
    this.managerEmail = managerEmail;
    this.teamId = teamId;
    this.accepted = accepted;
  }
}

export { ManagerExistsResponse, Manager, ManagerResponse, ManagerRequestBody, ManagerTeamResponse };
