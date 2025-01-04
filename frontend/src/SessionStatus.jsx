import { createContext, useState, useEffect } from "react";

const SessionStatus = createContext(null);

export const SessionStatusProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/api/sessionstatus")
      .then((response) => response.json())
      .then((sessionstatus) => {
        setUser(sessionstatus.user);
      });
  }, []);
  return (
    <SessionStatus.Provider value={[user, setUser]}>
      {children}
    </SessionStatus.Provider>
  );
};
export default SessionStatus;
