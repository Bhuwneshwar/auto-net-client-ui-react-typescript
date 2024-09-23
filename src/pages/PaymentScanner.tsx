import { useEffect, useState } from "react";
import QRCodeScanner from "../utils/QRCodeScanner";
import { useGlobalContext } from "../MyRedux";
import axios from "axios";
import { toast } from "react-toastify";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
const PaymentScanner = () => {
  const {
    dispatch,
    store: { MyDetails, successResponseData },
  } = useGlobalContext();
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [myMaxMoney, setMyMaxMoney] = useState<number>(1000);
  const [invalidId, setInvalidId] = useState<boolean>(false);
  const updateScannedData = (data: string) => {
    console.log({ data });
    setId(data);
  };
  const getAccount: any = async (id?: string) => {
    dispatch("loading", true);
    try {
      const encodedId = encodeURIComponent(id || "");

      const { data } = await axios.get("/api/v1/account-by-id/" + encodedId, {
        withCredentials: true,
      });
      console.log({ data });

      if (data.success) {
        setName(data.user.name);
        setMyMaxMoney(data.user.myMaxMoney);
        setUsername(data.user.username);
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
        setInvalidId(true);
      }
    } catch (error: any) {
      toast.error(error.message, { position: "bottom-center" });
    }
    dispatch("loading", false);
  };

  useEffect(() => {
    if (successResponseData) {
      try {
        const obj = JSON.parse(successResponseData);
        console.log({ obj });
        if (obj.type === "transfer-success") {
          toast.success("Money sent successfully", {
            position: "bottom-center",
          });
          if (MyDetails) {
            dispatch("MyDetails", {
              ...MyDetails,
              Balance: obj.Balance,
            });
          }
        }
        dispatch("successResponseData", undefined);
      } catch (error) {
        console.log(error);
      }
    }
  }, [successResponseData]);
  const sendMoney = async () => {
    try {
      const { data } = await axios.post("/api/v1/transfer", {
        amount: +amount,
        to: id,
      });
      console.log({ data });
      if (data.requestBalancePin) {
        toast.warning("Please Enter your Balance PIN");
        dispatch("balancePinModel", true);
        dispatch("balancePinFormData", JSON.stringify(data));
      }
      // if (data.success) {
      //   toast.success("Money sent successfully", {
      //     position: "bottom-center",
      //   });
      //   if (MyDetails) {
      //     dispatch("MyDetails", {
      //       ...MyDetails,
      //       Balance: data.balance,
      //     });
      //   }
      // }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (e) {
      console.error("sendMoney error :", e);
      if (axios.isAxiosError(e)) {
        toast.error(e.message, { position: "bottom-center" });
      } else {
        toast.error("An unexpected error occurred", {
          position: "bottom-center",
        });
      }
    }
  };
  useEffect(() => {
    if (id) {
      getAccount(id);
    }
  }, [id]);

  return (
    <div>
      {/* <button onClick={getAccount}>get account</button> */}
      {id && !invalidId ? (
        <div className="enter-amount">
          <div>
            <h3>{name.toUpperCase()}</h3>
            <h6>{username}</h6>
          </div>
          <div
            className={
              +amount && +amount > myMaxMoney
                ? "amount-field invalid-amount"
                : "amount-field"
            }
          >
            <p>₹</p>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={myMaxMoney}
              type="number"
              placeholder="0.00"

              // style={
              //   +amount && +amount > myMaxMoney
              //     ? {
              //         border: "2px solid red",
              //         color: "red",
              //         outline: "1px solid red",
              //       }
              //     : { border: "black" }
              // }
            />
          </div>
          <button onClick={sendMoney}>
            <SendIcon />
            Pay from Balance
          </button>
          <Link className="go-to" to={"/messages/" + username}>
            GO TO Chat
          </Link>
        </div>
      ) : (
        <div className="scanner">
          <QRCodeScanner
            title="Payment Scanner"
            style={{
              maxWidth: "20rem",
              maxHeight: "20rem",
              border: "1px solid #fff",
            }}
            invalidId={invalidId}
            scannedDataUpdater={updateScannedData}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentScanner;
