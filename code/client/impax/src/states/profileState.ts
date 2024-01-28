import { create } from "zustand";
import { LoginInfo } from "../types";


interface tokens{
    accessToken: string;
    refreshToken: string;
}


interface LoginState {
  loginInfo:LoginInfo;
  setLoginInfo: (loginInfo: LoginInfo) => void;
  tokens: tokens;
  setTokens: (token: tokens) => void;
  
}





export const useLoginState = create<LoginState>()((set) => ({
  // loginInfo: {teamId: "", teamName: "", email: ""},
  loginInfo: JSON.parse(localStorage.getItem("loginInfo") || "{}"),
  setLoginInfo: (loginInfo) => {
    set({ loginInfo: loginInfo});
    localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
},
  tokens: {accessToken: "", refreshToken: ""},
    setTokens: (tokens) => {set({tokens: tokens});
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);}
       
       ,
  
}));


