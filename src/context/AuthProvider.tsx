import { createContext, useContext, useState } from "react";

const authContext = createContext<{
  loggedIn: boolean;
  loading: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  loggedIn: true,
  loading: true,
  setLoggedIn: () => {},
  setLoading: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <authContext.Provider
      value={{ loggedIn, setLoggedIn, loading, setLoading }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export default useAuth;
export { AuthProvider };
