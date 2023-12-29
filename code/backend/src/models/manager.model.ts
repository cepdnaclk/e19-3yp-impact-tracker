class ManagerExistsResponse{
    private managerExists: boolean;
  
    public constructor(managerExists: boolean) {
      this.managerExists = managerExists;
    }
}

// // Team ID, First Name, Last Name, Email Address, Password
class Manager{

    public teamId:string;
    public firstName:string;
    public lastName:string;
    public email:string;
    public password:string;

    public constructor(teamId:string, firstName:string, lastName:string, email:string, password:string){
        this.teamId = teamId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

}

class ManagerResponse{

    private teamId:string;
    private firstName:string;
    private lastName:string;
    private email:string;

    public constructor(manager:Manager){
        this.teamId = manager.teamId;
        this.firstName = manager.firstName;
        this.lastName = manager.lastName;
        this.email = manager.email;
    }

}


export {ManagerExistsResponse, Manager, ManagerResponse};