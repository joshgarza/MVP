import { createContext, useContext, useState } from "react";

const LastRouteContext = createContext();

export const useLastRoute = () => {
  return useContext(LastRouteContext);
};

export const LastRouteProvider = ({ children }) => {
  const [lastRoute, setLastRoute] = useState("/");

  return (
    <LastRouteContext.Provider value={{ lastRoute, setLastRoute }}>
      {children}
    </LastRouteContext.Provider>
  );
};
