class TeamIdExistsResponse {
  public teamExists: boolean;

  public constructor(teamExists: boolean) {
    this.teamExists = teamExists;
  }
}

interface TeamManagerInterface {
  teamId: string;
  email: string;
}

class TeamIdEmailExistsResponse {
  public teamExists: boolean = false;
  public managerExists: boolean = false;

  public constructor(teamExists: boolean, managerExists: boolean) {
    this.teamExists = teamExists;
    this.managerExists = managerExists;
  }
}

class Team {
  public teamId: string;
  public teamName: string;
  public teamManager: string;

  public constructor(teamId: string, teamName: string, teamManager: string) {
    this.teamId = teamId;
    this.teamName = teamName;
    this.teamManager = teamManager;
  }
}

class TeamResponse {
  public team_id: string;
  public team_name: string;

  public constructor(team: Team) {
    this.team_id = team.teamId;
    this.team_name = team.teamName;
  }
}

class TeamResponseWithIsVerified {
  public team_id: string;
  public team_name: string;
  public verification: string;

  constructor(teamId: string, teamName: string, isVerified: string) {
    this.team_id = teamId;
    this.team_name = teamName;
    this.verification = isVerified;
  }
}

class TeamResponseWithJerseyId {
  public teamId: string;
  public jerseyId: number;

  constructor(teamId: string, jerseyId: number) {
    this.teamId = teamId;
    this.jerseyId = jerseyId;
  }
}




class TeamManagerResponse {
  private teamId: string;
  private email: string;

  public constructor(teamId: string, email: string) {
    this.teamId = teamId;
    this.email = email;
  }
}

export {
  TeamIdExistsResponse,
  TeamManagerInterface,
  TeamIdEmailExistsResponse,
  Team,
  TeamResponse,
  TeamManagerResponse,
  TeamResponseWithIsVerified,
  TeamResponseWithJerseyId
};
