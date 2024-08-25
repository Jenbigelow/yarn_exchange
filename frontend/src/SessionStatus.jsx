import { createContext, useState } from "react";

const SessionStatus = createContext(null);

export const SessionStatusProvider = ({ children }) =>{
const [user, setUser] = useState(null);
return(
<SessionStatus.Provider value = {[user, setUser]}>
  { children }
</SessionStatus.Provider>
)
}
export default SessionStatus;
