import { createContext, useContext, useState } from "react";

const authContext = createContext<{
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  loggedIn: true,
  setLoggedIn: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  return (
    <authContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export default useAuth;
export { AuthProvider };
