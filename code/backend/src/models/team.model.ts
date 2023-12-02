
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
    private status: string;
  
    public constructor(status: string) {
      this.status = status;
    }
}

class Team{
    public teamId: string;
    public name: string;
  
    public constructor(teamId: string, name: string) {
      this.teamId = teamId;
      this.name = name;
    }
}

export {TeamIdExistsResponse, TeamManagerInterface, TeamIdEmailExistsResponse, Team};