import { Link } from "react-router-dom";
import { useGlobalContext } from "../MyRedux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
// import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import PasswordIcon from "@mui/icons-material/Password";
const Navbar = () => {
  const {
    dispatch,
    store: { nav, MyDetails },
  } = useGlobalContext();
  console.log({ nav });

  return (
    <nav
      onClick={() => dispatch("nav", false)}
      className={nav ? "navShow" : "navHide"}
    >
      <ul>
        <li>
          <Link to="/home">
            <HouseRoundedIcon />
            Home
          </Link>
        </li>

        <li>
          <Link to={"/signup/" + (MyDetails?.referCode || "")}>
            <AddCircleIcon />
            {MyDetails ? "Add New User" : "Sign Up"}
          </Link>
        </li>
        {!MyDetails && (
          <li>
            <Link to="/login">
              {" "}
              <LockOpenRoundedIcon />
              Sign In
            </Link>
          </li>
        )}

        {MyDetails && (
          <>
            <li>
              <Link to="/history">
                <SwapVertIcon />
                History
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <GridViewRoundedIcon />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/profile">
                {" "}
                <AccountCircleIcon />
                Profile
              </Link>
            </li>

            <li>
              <Link to="/messages">
                {" "}
                <EmailRoundedIcon /> Message
              </Link>
            </li>
            <li>
              <Link to="/password-set">
                {" "}
                <PasswordIcon />
                Password/Balance PIN
              </Link>
            </li>
            <li>
              <Link to="/logout">
                {" "}
                <LogoutRoundedIcon />
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
