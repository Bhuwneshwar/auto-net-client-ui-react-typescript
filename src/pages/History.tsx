import { useEffect, useState } from "react";
import { useGlobalContext } from "../MyRedux";
import axios from "axios";
import { toast } from "react-toastify";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { formatDate } from "../utils/formatDate";
import ShareIcon from "@mui/icons-material/Share";
import { formatNumber } from "../utils/functions";
// import UpgradeIcon from "@mui/icons-material/Upgrade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SendIcon from "@mui/icons-material/Send";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import { Link } from "react-router-dom";
interface HistoryItem {
  category: "income" | "expense";
  subcategory:
    | "referralAmount"
    | "topUpAmount"
    | "topUp" //comment this value
    | "userAmount"
    | "recharge"
    | "userSend"
    | "withdrawOnBank"
    | "invest";
  amount: number;
  date: Date;
  userId: string;
  golden: number;
  diamond: number;
  id: string;
  name: string;

  phone: string;
  plan: number;
  validity: number;
  from: "balance" | "bank"; //"balance or bank"
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

const History = () => {
  const {
    dispatch,
    store: { MyDetails },
  } = useGlobalContext();

  // const [expenses, setExpenses] = useState<Expenses | undefined>();
  // const [incomes, setIncomes] = useState<Incomes | undefined>();
  const [recent, setRecent] = useState<HistoryItem[]>([]);

  console.log({ recent });

  const initial = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.get("/api/v1/history", {
        withCredentials: true,
      });
      console.log("history loaded", { data });

      if (data.success) {
        // setExpenses(data.expenses);
        // setIncomes(data.incomes);
        setRecent(data.histories);

        toast.success("History loaded successfully", {
          position: "bottom-center",
        });
      } else if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message, { position: "bottom-center" });
      } else {
        toast.error("An unexpected error occurred", {
          position: "bottom-center",
        });
      }
      console.log(error);
    }
    dispatch("loading", false);
  };

  useEffect(() => {
    if (MyDetails) {
      dispatch("MyDetails", { ...MyDetails, unreadHistoriesCount: 0 });
    }
    initial();
  }, []);

  return (
    <div className="history">
      {recent.reverse().map((obj) => {
        return (
          <Link
            to={"/messages/" + obj.id}
            key={obj._id}
            className={
              obj.category === "income"
                ? "recent-history income"
                : "recent-history expense"
            }
          >
            <div className="ids">
              <figure>
                {/* <img
                  src="https://cdn-icons-png.flaticon.com/512/65/65581.png"
                  alt="profile Pic"
                /> */}
                <p>{obj.name ? obj.name[0] : 0}</p>
              </figure>
              <div className="info">
                <div className="names">
                  <p className="paid">
                    {obj.category === "income" ? "Received From" : "Paid to"}
                  </p>
                  <p className="name">{obj.name}</p>
                </div>
                <div className="amount">
                  <p>
                    ₹{formatNumber(obj.amount)}{" "}
                    {obj.category === "income" ? "(+)" : "(-)"}
                  </p>
                  <p className="type">
                    {obj.subcategory === "invest" && (
                      <>
                        <AutoModeIcon />
                        {obj.subcategory}
                      </>
                    )}
                    {obj.subcategory === "userSend" && (
                      <>
                        <SendIcon />
                        {obj.subcategory}
                      </>
                    )}
                    {obj.subcategory === "withdrawOnBank" && (
                      <>
                        <AccountBalanceIcon />
                        {obj.subcategory}
                      </>
                    )}
                    {obj.subcategory === "recharge" && (
                      <>
                        <MobileFriendlyIcon />
                        {obj.subcategory}
                      </>
                    )}
                    {obj.subcategory === "referralAmount" && (
                      <>
                        <ShareIcon />
                        {obj.subcategory}
                      </>
                    )}
                    {obj.subcategory === "topUpAmount" && (
                      <>
                        <AccountBalanceWalletIcon />
                        {obj.subcategory}
                      </>
                    )}
                    {obj.subcategory === "userAmount" && (
                      <>
                        <CallReceivedIcon />
                        {obj.subcategory}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="dates">
              <p className="date"> {formatDate(obj.date)}</p>
              <p className="from">
                {obj.category === "income" ? "Credited to" : "Debited from"}
                {/*  */}

                {obj.from === "balance" ? (
                  <AccountBalanceWalletIcon />
                ) : obj.from === "bank" ? (
                  <AccountBalanceIcon />
                ) : (
                  obj.from
                )}
                {/* {obj.from === "balance"
                  ? "My Balance"
                  : obj.from === "account"
                  ? "My Bank Account"
                  : obj.from} */}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default History;
