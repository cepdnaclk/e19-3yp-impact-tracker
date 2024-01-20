class Player {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;

    public constructor(
      firstName: string,
      lastName: string,
      email: string,
      password: string,

    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password

    }
  }
  
  class PlayerResponse {
    public firstName: string;
    public lastName: string;
    public email: string;

  
    public constructor(player: Player) {
      this.firstName = player.firstName;
      this.lastName = player.lastName;
      this.email = player.email;
    }
  }
  
  class PlayerRequestBody {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;

    public constructor(
      firstName: string,
      lastName: string,
      email: string,
      password: string,

    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;

    }
  }
  
  export { Player, PlayerResponse, PlayerRequestBody };
  