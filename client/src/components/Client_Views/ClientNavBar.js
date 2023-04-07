import { useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
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
  const [selected, setSelected] = useState("dashboard");
  const [navOptions, setNavOptions] = useState([
    { name: "dashboard", touched: false },
    { name: "calendar", touched: false },
    { name: "progress", touched: false },
    { name: "chat", touched: false },
    { name: "profile", touched: false },
  ]);

  useEffect(() => {
    if (userInfo?.id) {
      getUserWorkouts();
    }
  }, []);

  useEffect(() => {
    workoutStarted && setSelected("dashboard");
  }, [workoutStarted]);

  const iconStyle = "w-full flex items-center justify-center p-3";

  const mapNavOptions = () => {
    return navOptions.map((navOption, i) => {
      const { name, touched } = navOption;
      return (
        <div key={i} className={iconStyle}>
          <Link
            className={`text-4xl rounded-full p-2 ${
              touched ? "bg-gray-400 text-white" : "bg-white"
            } ${name === selected ? "bg-gray-400 text-white" : "bg-white"}`}
            to={name}
            onContextMenu={(e) => handleContextMenu(e)}
            onTouchStart={(e) => {
              handleTouchStart(e, i);
            }}
            onTouchEnd={(e) => {
              handleTouchEnd(e, i, name);
            }}
          >
            {renderIcon(name)}
          </Link>
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

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const handleTouchStart = (e, idx) => {
    const copyNavOptions = [...navOptions];
    navOptions[idx].touched = true;

    setNavOptions(copyNavOptions);
    setSelected("");
  };

  const handleTouchEnd = (e, idx, name) => {
    const copyNavOptions = [...navOptions];
    navOptions[idx].touched = false;

    setNavOptions(copyNavOptions);
    setSelected(name);
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
