class Player {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public invitationToken: string;
    public isVerified: boolean;
    public alreadyExists: boolean;
  
    public constructor(
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      invitationToken: string,
      isVerified: boolean,
      alreadyExists: boolean
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password
        this.invitationToken = invitationToken;
        this.isVerified = isVerified;
        this.alreadyExists = alreadyExists;
    }
  }
  
  class PlayerResponse {
    public firstName: string;
    public lastName: string;
    public email: string;
    public isVerified: boolean;
  
    public constructor(player: Player) {
      this.firstName = player.firstName;
      this.lastName = player.lastName;
      this.email = player.email;
      this.isVerified = player.isVerified;
    }
  }
  
  class PlayerRequestBody {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public invitationToken: string;
    public isVerified: boolean;
  
    public constructor(
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      invitationToken: string,
      isVerified: boolean
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.invitationToken = invitationToken;
      this.isVerified = isVerified;
    }
  }
  
  export { Player, PlayerResponse, PlayerRequestBody };
  