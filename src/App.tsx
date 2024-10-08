import React, { useEffect, Suspense, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
const Signup = React.lazy(() => import("./pages/Signup"));
const Login = React.lazy(() => import("./pages/Login"));
const Admin = React.lazy(() => import("./pages/Admin"));
const Home = React.lazy(() => import("./pages/Home"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Logout = React.lazy(() => import("./components/Logout"));
// const Test = React.lazy(() => import("./components/Test"));
const Messages = React.lazy(() => import("./pages/Messages"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const MyAccount = React.lazy(() => import("./components/MyAccount"));
const Password = React.lazy(() => import("./pages/PasswordSet"));
const PaymentScanner = React.lazy(() => import("./pages/PaymentScanner"));
const History = React.lazy(() => import("./pages/History"));
const Share = React.lazy(() => import("./pages/Share"));
const DeepThings = React.lazy(() => import("./pages/DeepThings"));

import "./App.css";
import { useGlobalContext } from "./MyRedux";
import Loading from "./components/Loding";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSocket } from "./Providers/SocketProvider";
import { toast } from "react-toastify";
import { IMyDetails } from "./MyRedux/Store";
import Navbar from "./components/Navbar";
import HeaderContent from "./components/HeaderContent";
import BalancePinForm from "./components/BalancePinForm";

const App: React.FC = () => {
  const socket = useSocket();

  const {
    dispatch,
    store: { MyDetails, loading, nav },
  } = useGlobalContext();
  console.log({ MyDetails });

  const getUserData = async () => {
    try {
      // alert("get user");
      dispatch("loading", true);
      dispatch("nav", false);
      const { data } = await axios.get("/api/v1/myaccount", {
        withCredentials: true,
      });

      console.log({ data });
      if (data.success) {
        const user: IMyDetails = data.user;

        dispatch("MyDetails", { ...MyDetails, ...user });
        dispatch("role", "user");
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.log("Error getting user data", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };
  const [forSocket, setForSocket] = useState({
    allUnreadMessageCount: 0,
    unreadHistoriesCount: 0,
  });
  useEffect(() => {
    // const cookieValue = document.cookie;
    // console.log(cookieValue); // This will log the entire cookie string

    // // To extract the value of a specific cookie, you can parse the cookie string
    // const cookies = document.cookie
    //   .split(";")
    //   .reduce((acc: Record<string, string>, cookie) => {
    //     const [name, value] = cookie.trim().split("=");
    //     acc[name] = decodeURIComponent(value);
    //     return acc;
    //   }, {});

    if (socket) {
      console.log("socket is already connected");

      socket.on("WELCOME", (msg) => {
        console.log({ msg });
      });

      socket?.on("NEW_MESSAGE", (msg) => {
        console.log({ msg });
        toast.success(msg.sender + ": Message Sent", {
          position: "top-center",
        });
        setForSocket((prev) => ({
          ...prev,
          allUnreadMessageCount: prev.allUnreadMessageCount + 1,
        }));
        dispatch("socketData", JSON.stringify(msg));
      });
      socket?.on("HISTORY_ADDED", (msg) => {
        console.log({ msg });
        toast.success("New transaction added", {
          position: "top-center",
        });
        setForSocket((prev) => ({
          ...prev,
          unreadHistoriesCount: prev.unreadHistoriesCount + 1,
        }));
      });
    }

    // Cleanup on unmount
    return () => {
      console.log("Unmounting and socket disconnect main app");
    };
  }, [socket]);
  useEffect(() => {
    if (MyDetails) {
      dispatch("MyDetails", {
        ...MyDetails,
        allUnreadMessageCount: MyDetails.allUnreadMessageCount + 1,
      });
    }
  }, [forSocket.allUnreadMessageCount]);

  useEffect(() => {
    if (MyDetails) {
      dispatch("MyDetails", {
        ...MyDetails,
        unreadHistoriesCount: MyDetails.unreadHistoriesCount + 1,
      });
    }
  }, [forSocket.unreadHistoriesCount]);

  useEffect(() => {
    getUserData();
  }, []);

  const handleNav = () => {
    dispatch("nav", !nav);
  };

  return (
    <>
      <div id="gridLayout">
        <header>
          <Link to="/" id="logo">
            <div id="logoAnimation">
              <div>
                [Re<div>search</div>
              </div>
              <div>by</div>
              <div>
                B<div>huwneshwar</div>
              </div>
              <span>]</span>
            </div>
            <div id="fundLogo">Auto Net</div>
          </Link>

          <div id="headerContent">
            <HeaderContent />
            <div className="spinner-container">
              <input
                onChange={handleNav}
                type="checkbox"
                id="openSidebarMenu"
                checked={nav}
              />
              <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
                <div className="spinner top"></div>
                <div className="spinner middle"></div>
                <div className="spinner bottom"></div>
              </label>
            </div>
          </div>
        </header>

        <div id="main">
          <main>
            <Navbar />
            <div className="main-content">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin-login" element={<h1>Admin Login</h1>} />
                  <Route path="/share" element={<Share />} />
                  <Route path="/deep-things" element={<DeepThings />} />
                  {/* <Route path="/test" element={<Test />} /> */}
                  <Route path="/signup/:refer?" element={<Signup />} />
                  <Route
                    element={
                      <ProtectedRoute aspectRole={"user"} redirect={"/login"} />
                    }
                  >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                      path="/payment-scanner"
                      element={<PaymentScanner />}
                    />
                    <Route path="/messages/:refer?" element={<Messages />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/myaccount" element={<MyAccount />} />
                    <Route path="/password-set" element={<Password />} />
                    <Route path="/history" element={<History />} />
                  </Route>
                  <Route
                    element={
                      <ProtectedRoute
                        aspectRole={"admin"}
                        redirect={"/admin-login"}
                      />
                    }
                  >
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin-home" element={<h1>Admin home</h1>} />
                  </Route>
                  <Route path="*" element={<h1>Sorry 404 page not found</h1>} />
                </Routes>
              </Suspense>
            </div>
          </main>
        </div>
        <BalancePinForm />
        <div className={loading ? "loading" : "loadingStop"}>
          <div className="loader"></div>
        </div>
      </div>
    </>
  );
};

export default App;
