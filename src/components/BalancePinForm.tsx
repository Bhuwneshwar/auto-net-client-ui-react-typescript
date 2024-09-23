import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useGlobalContext } from "../MyRedux";
import axios from "axios";
import { toast } from "react-toastify";
const BalancePinForm = () => {
  const {
    dispatch,
    store: {
      balancePinModel,
      balancePinFormData,
      successResponseData,
      MyDetails,
    },
  } = useGlobalContext();

  const [pin, setPin] = useState("------");
  const [granted, setGranted] = useState(false);
  const [openFor, setOpenFor] = useState("Access Balance PIN");
  const [amount, setAmount] = useState<number>(0);
  const [transactionId, setTransactionId] = useState<string>("");
  const erase = () => {
    setPin(() => pin.slice(0, -1));
  };
  const enterNumber = (key: string) => {
    if (pin === "------") {
      setPin(() => key);
    }
    if (pin.length === 6) return;
    setPin((prev) => prev + key);
  };
  const verify = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/verify/balance-access-pin",
        { BalancePin: pin },
        { withCredentials: true }
      );
      console.log({ data });
      if (data.success) {
        toast.success("Access Grant granted", {
          position: "bottom-center",
        });
        dispatch("successResponseData", JSON.stringify(data));
        setGranted(true);
        // setOpenFor(`₹${data.amount} Payment success`);
        setOpenFor("Access Granted");
        setAmount(data.amount);
        setTransactionId(data.transactionId);
        setPin("------");
        // dispatch("balancePinModel", false);
        dispatch("balancePinFormData", undefined);
      }
      if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.message, { position: "bottom-center" });
      } else {
        toast.error("An unexpected error occurred", {
          position: "bottom-center",
        });
      }
    }
    dispatch("loading", false);
    setPin("");
  };
  const closeForm = () => {
    dispatch("balancePinModel", false);
    setOpenFor("Access Balance PIN");
    setPin("------");
    setGranted(false);
    dispatch("balancePinFormData", undefined);
    setAmount(0);
    setTransactionId("");
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

        // dispatch("successResponseData", undefined);
      } catch (error) {
        console.log(error);
      }
    }
  }, [successResponseData]);

  useEffect(() => {
    if (balancePinFormData) {
      try {
        const objData = JSON.parse(balancePinFormData);
        console.log({ objData });
        if (objData.amount) {
          setOpenFor(`Payable Amount ₹${objData.amount}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [balancePinFormData]);
  return (
    <div
      className={
        balancePinModel
          ? "balance-pin-form-container"
          : "balance-pin-form-container opacity-zero"
      }
    >
      <div
        className={granted ? "balance-pin-form success" : "balance-pin-form "}
      >
        <h2>Balance Pin</h2>
        <div className="for-open">{openFor}</div>
        <form onSubmit={(e) => e.preventDefault()} method="post">
          <label htmlFor="BalancePin">ENTER 6 DIGITS CODE</label>
          <input
            disabled
            type={pin === "------" ? "text" : "password"}
            value={pin}
          />
          <div className="info-msg">
            This Balance Pin will be automatically pay or check your account
          </div>
          <div className="keyboard-layout">
            <button onClick={() => enterNumber("1")}>1</button>
            <button onClick={() => enterNumber("2")}>2</button>
            <button onClick={() => enterNumber("3")}>3</button>
            <button onClick={() => enterNumber("4")}>4</button>
            <button onClick={() => enterNumber("5")}>5</button>
            <button onClick={() => enterNumber("6")}>6</button>
            <button onClick={() => enterNumber("7")}>7</button>
            <button onClick={() => enterNumber("8")}>8</button>
            <button onClick={() => enterNumber("9")}>9</button>
            <button onClick={erase}>
              <BackspaceIcon className="i" />
            </button>
            <button onClick={() => enterNumber("0")}>0</button>
            <button onClick={() => verify()}>
              <CheckCircleIcon className="i" />
            </button>
          </div>
        </form>
        <button onClick={closeForm} className="cancel">
          Cancel
        </button>
        {/* <div className="terms">
        By clicking the Pay button, you agree to the Rebyb Terms and Conditions
      </div> */}
      </div>
      <div
        className={granted ? "success-container success" : "success-container"}
      >
        <div className="triangle-up"></div>
        <div className="success-info">
          <p>
            <span className="success-icon">
              <CheckCircleIcon className="i" />
            </span>
            <br />₹{amount} Payment Success <br />
            Transaction ID: {transactionId}
          </p>
          <p>Your payment has been made.</p>
          <p>Your account balance has been updated.</p>
          <button onClick={closeForm}>Close</button>
          <div id="triangle-down"></div>
        </div>
      </div>{" "}
    </div>
  );
};

export default BalancePinForm;
