import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
// import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShareIcon from "@mui/icons-material/Share";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
// import SwapVertIcon from "@mui/icons-material/SwapVert";
import { makeProfilePic } from "../utils/functions";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../MyRedux";
import { Link, useLocation } from "react-router-dom";

const HeaderContent: React.FC = () => {
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  const {
    store: { MyDetails },
  } = useGlobalContext();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  useEffect(() => {
    console.log({ MyDetails });
  }, [MyDetails?.allUnreadMessageCount, pathname]);

  return (
    <div className="header-content">
      {MyDetails && (
        <>
          <Link
            title="Profile"
            className={pathname.includes("/profile") ? "active" : ""}
            to={"/profile"}
          >
            <figure>
              <img src={makeProfilePic(MyDetails)} alt="" />
            </figure>
          </Link>

          <Link
            className={pathname.includes("/payment-scanner") ? "active" : ""}
            title="Payment Scanner"
            to={"/payment-scanner"}
          >
            <QrCodeScannerIcon />
          </Link>
          {/* <Link
            className={
              pathname.includes("/history") ? "msgIcon active" : "msgIcon"
            }
            to={"/history"}
            title="History"
          >
            <SwapVertIcon />
            {MyDetails.unreadHistoriesCount > 0 && (
              <span className="badge">
                {MyDetails.unreadHistoriesCount < 100
                  ? MyDetails.unreadHistoriesCount
                  : "99+"}
              </span>
            )}
          </Link> */}
          <Link
            className={
              pathname.includes("/messages") ? "msgIcon active" : "msgIcon"
            }
            to={"/messages"}
            title="Messages"
          >
            <EmailRoundedIcon />
            {MyDetails.allUnreadMessageCount > 0 && (
              <span className="badge">
                {MyDetails.allUnreadMessageCount < 100
                  ? MyDetails.allUnreadMessageCount
                  : "99+"}
              </span>
            )}
          </Link>
          <Link
            className={pathname.includes("/dashboard") ? "active" : ""}
            to={"/dashboard"}
            title="Dashboard"
          >
            <GridViewRoundedIcon />
          </Link>
        </>
      )}
      <Link
        title="Share with Referral link"
        className={pathname.includes("/share") ? "active" : ""}
        to={"/share"}
      >
        <ShareIcon />
      </Link>
      {!MyDetails && (
        <Link
          className={pathname.includes("/login") ? "active" : ""}
          to={"/login/"}
          title="Registration"
        >
          <LockOpenRoundedIcon />
        </Link>
      )}

      <Link
        className={pathname.includes("/signup") ? "active" : ""}
        to={"/signup/" + MyDetails?.referCode}
        title="Registration"
      >
        <AddCircleIcon />
      </Link>
      {/* <Link
        className={pathname.includes("/home") ? "active" : ""}
        to={"/home"}
        title="Home"
      >
        <HouseRoundedIcon />
      </Link> */}
    </div>
  );
};

export default HeaderContent;
