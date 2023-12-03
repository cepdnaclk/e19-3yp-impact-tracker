class TeamIdExistsResponse{
    private teamExists: boolean;
  
    public constructor(teamExists: boolean) {
      this.teamExists = teamExists;
    }
    
}

interface TeamManagerInterface {
    teamId: string;
    email: string;
}

class TeamIdEmailExistsResponse{
    public teamExists: boolean = false;
    public managerExists: boolean = false;
  
    public constructor() {
    }
}

class Team{
    public teamId: string;
    public teamName: string;
  
    public constructor(teamId: string, teamName: string) {
      this.teamId = teamId;
      this.teamName = teamName;
    }
}

export {TeamIdExistsResponse, TeamManagerInterface, TeamIdEmailExistsResponse, Team};