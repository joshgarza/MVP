import { useState, useEffect } from "react";
import {
  NavLink,
  Link,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineLineChart,
  AiOutlineProfile,
} from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";

const ClientNavBar = ({
  userInfo,
  getUserData,
  clearUserInfo,
  getUserWorkouts,
  workoutStarted,
}) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [navOptions, setNavOptions] = useState([
    "dashboard",
    "calendar",
    "progress",
    "chat",
    "profile",
  ]);

  useEffect(() => {
    if (userInfo?.id) {
      getUserWorkouts();
    }
  }, []);

  const iconStyle = "w-full flex items-center justify-center p-3";

  const mapNavOptions = () => {
    return navOptions.map((navOption, i) => {
      return (
        <div key={i} className={iconStyle}>
          <NavLink
            className={({ isActive }) =>
              `text-4xl rounded-full p-2 ${
                isActive ? "bg-gray-400 text-white" : "bg-white"
              }`
            }
            to={navOption}
          >
            {renderIcon(navOption)}
          </NavLink>
        </div>
      );
    });
  };

  const renderIcon = (name) => {
    // eslint-disable-next-line default-case
    switch (name) {
      case "dashboard":
        return <AiOutlineHome />;
      case "calendar":
        return <AiOutlineCalendar />;
      case "progress":
        return <AiOutlineLineChart />;
      case "chat":
        return <BsChatDots />;
      case "profile":
        return <AiOutlineProfile />;
    }
  };

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
      clearUserInfo();
    } catch (err) {
      setError(err);
    }
  };

  if (!currentUser) {
    return navigate("/login");
  }

  return (
    <>
      {workoutStarted ? (
        <Outlet />
      ) : (
        <div className="w-full h-full">
          <section className="block fixed inset-x-0 bottom-0 bg-white shadow border ">
            <ul className="flex items-center justify-center">
              {mapNavOptions()}
            </ul>
          </section>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default ClientNavBar;
