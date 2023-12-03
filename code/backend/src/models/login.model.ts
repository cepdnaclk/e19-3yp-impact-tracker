
class LoginResquest{
    private password:string;
    private userName:string;

    public constructor(password: string, userName:string) {
        this.password = password;
        this.userName = userName;
    }

}

export {LoginResquest};