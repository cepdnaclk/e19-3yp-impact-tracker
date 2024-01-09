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
  public invitationToken: string;

  public constructor(
    teamId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    acceptInvitation: boolean,
    invitationToken: string
  ) {
    this.teamId = teamId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.acceptInvitation = acceptInvitation;
    this.invitationToken = invitationToken;
  }
}

class ManagerResponse {
  public teamId: string;
  public firstName: string;
  public lastName: string;
  public email: string;

  public constructor(manager: ManagerResponse) {
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
  public acceptInvitation: boolean;
  public invitationToken: string;

  public constructor(
    teamId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    acceptInvitation: boolean,
    invitationToken: string
  ) {
    this.teamId = teamId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.acceptInvitation = acceptInvitation;
    this.invitationToken = invitationToken;
  }
}

export { ManagerExistsResponse, Manager, ManagerResponse, ManagerRequestBody };
