import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLastRoute } from "../contexts/LastRouteContext";

const NavigationHandler = () => {
  const location = useLocation();
  const { setLastRoute } = useLastRoute();

  useEffect(() => {
    // if (location.pathname !== "/login" || location.pathname !== "/signup") {
    //   setLastRoute(location.pathname);
    // }
  }, [location, setLastRoute]);

  return null;
};
export default NavigationHandler;
