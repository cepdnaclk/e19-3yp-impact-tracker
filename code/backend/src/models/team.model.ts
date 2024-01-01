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

  public constructor(teamId: string, teamName: string) {
    this.teamId = teamId;
    this.teamName = teamName;
  }
}

class TeamResponse {
  private teamId: string;
  private teamName: string;

  public constructor(team: Team) {
    this.teamId = team.teamId;
    this.teamName = team.teamName;
  }
}

export {
  TeamIdExistsResponse,
  TeamManagerInterface,
  TeamIdEmailExistsResponse,
  Team,
  TeamResponse,
};
