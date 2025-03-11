import { createContext } from "react";

interface AccountContextType {
    switchToSignup: () => void;
    switchToSignin: () => void;
  }
  
  export const AccountContext = createContext<AccountContextType>({
    switchToSignup: () => {},
    switchToSignin: () => {}
  });