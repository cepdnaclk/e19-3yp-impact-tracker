import { create } from "zustand";



interface loginInfo{
  teamId: string;
  teamName: string;
  email: string;
}
interface tokens{
    accessToken: string;
    refreshToken: string;
}


interface LoginState {
  loginInfo:loginInfo;
  setLoginInfo: (loginInfo: loginInfo) => void;
  tokens: tokens;
  setTokens: (token: tokens) => void;
  
}





export const useLoginState = create<LoginState>()((set) => ({
  loginInfo: {teamId: "", teamName: "", email: ""},
  setLoginInfo: (loginInfo) => set({ loginInfo: loginInfo}),
  tokens: {accessToken: "", refreshToken: ""},
    setTokens: (tokens) => set({ tokens: tokens}),
  
}));


