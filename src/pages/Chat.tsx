import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../MyRedux";
import SendIcon from "@mui/icons-material/Send";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
import { toast } from "react-toastify";
import { useSocket } from "../Providers/SocketProvider";
import { formatFullTimeAndDate } from "../utils/formatDate";
import { truncateText } from "../utils/functions";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import MessageIcon from "@mui/icons-material/Message";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import SmartButtonOutlinedIcon from "@mui/icons-material/SmartButtonOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

const Chat: React.FC<{ username: string }> = ({ username }) => {
  const {
    dispatch,
    store: { MyDetails, socketData, successResponseData },
  } = useGlobalContext();
  const socket = useSocket();

  const [userMessagesData, setUserMessagesData] = useState({
    name: "",
    profileImg: "",
    onActive: "",
    username,
    canBuyDiamond: [],
    canBuyGolden: [],
  });

  const [messages, setMessages] = useState<
    {
      id: string;
      message: string;
      time: Date;
      align: "right" | "left";
      status?: "seen" | "sent" | "notified";
    }[]
  >([]);

  const [activeTab, setActiveTab] = useState<string>("simple-msg");
  const [selection, setSelection] = useState<boolean>(false);

  const [input_data, setInputData] = useState({
    amount: "",
    buyGoldenForMe: 0,
    buyDiamondForMe: 0,
    buyGoldenForOther: 0,
    buyDiamondForOther: 0,
    message: "",
  }); //

  //functions

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputData({
      ...input_data,
      [name]: value,
    });
  };

  const chatListRef = useRef<HTMLDivElement>(null);
  // const elementsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  };

  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (event.target.checked) {
      // Add the value to the array
      setSelectedMessages((prevMessages) => [...prevMessages, value]);
    } else {
      // Remove the value from the array
      setSelectedMessages((prevMessages) =>
        prevMessages.filter((item) => item !== value)
      );
    }
  };
  const selectAll = () => {
    setSelectedMessages(messages.map((message) => message.id));
  };
  const deselectAll = () => {
    setSelectedMessages([]);
  };
  const deleteMessages = async (side?: string) => {
    if (!selectedMessages.length) return;
    const yes = confirm(
      `Are you sure you want to delete the ${selectedMessages.length} messages for ${side}`
    );
    if (!yes) return;
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/delete-messages",
        {
          selectedMessages,
          side,
          username,
        },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success("Messages Deleted Successfully", {
          position: "bottom-center",
        });
        initialMessage();
        cancelSelection();
      }
      if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
      }
    } catch (error) {
      console.log("at deleteMessages function:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.message, { position: "bottom-center" });
      } else {
        toast.error("An unexpected error occurred", {
          position: "bottom-center",
        });
      }
    }
    dispatch("loading", false);
  };
  const sendMessage = async (from?: string) => {
    try {
      console.log({ from });

      let msg;
      if (from === "buyFundRequest") {
        msg = JSON.stringify({
          goldenFund: +input_data.buyGoldenForMe,
          diamondFund: +input_data.buyDiamondForMe,
          buyFundsReq: true,
        });
      } else if (from === "send-money") {
      } else if (from === "buy-Fund-for-user") {
      } else {
        msg = input_data.message;
      }
      dispatch("loading", true);
      const { data } = await axios.post(
        `/api/v1/message-send`,
        {
          Message: msg,
          receiverId: username,
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        setMessages((prev) => [...prev, data.newMessage]);
      }
      if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
      }
    } catch (e: any) {
      console.log("send message error :", e);
      toast.error(e.message, { position: "bottom-center" });
    }
    dispatch("loading", false);
  };
  const cancelSelection = () => {
    setSelection(false);
    setSelectedMessages([]);
  };

  const sendMoney = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/transfer",
        {
          amount: +input_data.amount,
          to: username,
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.requestBalancePin) {
        toast.warning("Please Enter your Balance PIN");
        dispatch("balancePinModel", true);
        dispatch("balancePinFormData", JSON.stringify(data));
      }

      if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
      }
    } catch (error) {
      console.log("at sendMoney function:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.message, { position: "bottom-center" });
      } else {
        toast.error("An unexpected error occurred", {
          position: "bottom-center",
        });
      }
    }
    dispatch("loading", false);
  };
  const payAndGive = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/pay-and-give",
        {
          golden: +input_data.buyGoldenForOther,
          diamond: +input_data.buyDiamondForOther,
          identifyId: username,
        },
        {
          withCredentials: true,
        }
      );
      if (data.requestBalancePin) {
        toast.warning("Please Enter your Balance PIN");
        dispatch("balancePinModel", true);
        dispatch("balancePinFormData", JSON.stringify(data));
      }
      if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
      }
    } catch (error) {
      console.log("at payAndGive function:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.message, { position: "bottom-center" });
      } else {
        toast.error("An unexpected error occurred", {
          position: "bottom-center",
        });
      }
    }
    dispatch("loading", false);
  };
  const genPdf = async (identifyId: string) => {
    try {
      dispatch("loading", true);
      const { data } = await axios.get("/api/v1/pdf/" + identifyId, {
        withCredentials: true,
      });

      console.log({ data });

      if (data.success) {
        toast.success("Auto-Net card generated successfully for 1 minutes!", {
          position: "bottom-center",
        });
        const protocol = window.location.protocol;
        const hostUrl =
          protocol +
          "//" +
          window.location.hostname +
          ":" +
          data.port +
          data.path;
        console.log({ hostUrl, protocol });

        window.open(hostUrl, "_blank");
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e.message, {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };

  useEffect(() => {
    try {
      if (successResponseData) {
        const obj = JSON.parse(successResponseData);
        console.log({ obj });

        if (obj.type === "pay-and-give") {
          toast.success("Successfully buy and give the funds", {
            position: "bottom-center",
          });
          if (MyDetails) {
            dispatch("MyDetails", {
              ...MyDetails,
              Balance: obj.Balance,
            });
          }
          // setMessages((prev) => [...prev, obj.newMessage]);
          initialMessage();
          dispatch("successResponseData", undefined);
          if (MyDetails && obj.arrDiamondFund && obj.arrGoldenFund) {
            dispatch("MyDetails", {
              ...MyDetails,
              canBuyDiamond: obj.arrDiamondFund,
              canBuyGolden: obj.arrGoldenFund,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [successResponseData]);

  const initialMessage = async () => {
    try {
      if (!username) return;

      dispatch("loading", true);
      const { data } = await axios.get(`/api/v1/messages/${username}`, {
        withCredentials: true,
      });
      console.log({ data });
      if (data.success) {
        setUserMessagesData((prev) => ({
          ...prev,
          name: data.name,
          profileImg: data.profileImg,
          onActive: data.onActive,
          canBuyDiamond: data.canBuyDiamond,
          canBuyGolden: data.canBuyGolden,
        }));
        setMessages(data.messages);
      }
      if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
      }
    } catch (e: any) {
      console.log("initial error :", e);
      toast.error(e.message, { position: "bottom-center" });
    }
    dispatch("loading", false);
  };
  console.log({ messages });

  const applyRequest = (diamond: number, golden: number) => {
    setInputData((prev) => ({
      ...prev,
      buyDiamondForOther: diamond,
      buyGoldenForOther: golden,
    }));
  };

  useEffect(() => {
    socket?.on("SELF_MESSAGE", (msg) => {
      console.log({ msg });
      setMessages((prev) => [...prev, msg.newMessage]);
    });

    initialMessage();
  }, [socket, username]);

  useEffect(() => {
    try {
      const msg = JSON.parse(socketData);
      console.log("got message", { msg });

      if (msg.username === username) {
        setMessages((prev) => [...prev, msg.newMessage]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socketData]);

  useEffect(() => {
    // Object.keys(elementsRef.current).forEach((key) => {
    //   const element = elementsRef.current[key];

    //   if (element) {
    //     // Dynamically set the --width CSS variable
    //     element.style.setProperty("--width", `${element.offsetWidth}px`);
    //     // alert(element.offsetWidth);
    //     console.log(`setWidth: ${element.offsetWidth}px`);
    //   }
    // });
    scrollToBottom();
  }, [messages]);
  return (
    <div className="chat">
      <div className="lastMessage">
        <figure>
          <img src={userMessagesData.profileImg} alt={"icon"} />
        </figure>
        <div className="info">
          <h3>{truncateText(userMessagesData.name, 20)}</h3>
          <h5>{username}</h5>
        </div>
        <div className="time">
          {/* {userMessagesData.onActive} */}

          <div className="indicators">
            <p style={{ "--c": "green" } as React.CSSProperties}></p>
            <p style={{ "--c": "yellow" } as React.CSSProperties}></p>
            <p style={{ "--c": "red" } as React.CSSProperties}></p>
          </div>
        </div>
      </div>
      {selection && (
        <div className="selection-btns">
          <p>{selectedMessages.length}</p>
          <button title="For Me" onClick={() => deleteMessages("me")}>
            <DeleteIcon />
            {/* For Me */}
          </button>
          <button
            title="For Everyone"
            onClick={() => deleteMessages("everyone")}
          >
            <DeleteForeverIcon />
            {/* For Everyone */}
          </button>
          <button title="Select All" onClick={() => selectAll()}>
            {" "}
            <SelectAllIcon />
            {/* Select All */}
          </button>
          <button title="Deselect All" onClick={() => deselectAll()}>
            {" "}
            <DeselectIcon />
            {/* Deselect All */}
          </button>
          <button onClick={cancelSelection} title="Cancel Selection">
            {" "}
            <HighlightOffIcon />
            {/* Cancel Selection */}
          </button>
        </div>
      )}
      <div className="to-responsive">
        <div
          ref={chatListRef}
          // style={{
          //   height:
          //     activeTab === "simple-msg"
          //       ? "30rem"
          //       : activeTab === "send-money"
          //       ? "29.5rem"
          //       : activeTab === "buy-funds"
          //       ? "26rem"
          //       : activeTab === "buy-funds-others"
          //       ? "26rem"
          //       : "34rem",
          // }}
          className="chating"
        >
          <div>
            {messages.map((sms) => {
              let reqSms;
              try {
                reqSms = JSON.parse(sms.message) as {
                  buyFundsReq: boolean;
                  goldenFund: number;
                  diamondFund: number;
                  golden: number;
                  diamond: number;
                  payAndGive: boolean;
                  // sendable: boolean;
                  sentMoney: boolean;
                  amount: number;
                };
              } catch (error) {
                // console.log({ error });
              }
              return (
                <div
                  className="msg-chat"
                  // ref={(el) => (elementsRef.current[sms.id] = el)}
                  style={
                    {
                      "--align": sms.align,
                      "--color":
                        sms.align === "left"
                          ? "hsl(20, 71%, 73%)"
                          : "hsl(197, 71%, 73%)",
                      // "--width": `${elementsRef.current[sms.id]?.offsetWidth}px`,
                      // width: "333px",
                    } as React.CSSProperties
                  }
                  key={sms.id}
                >
                  {reqSms?.buyFundsReq ? (
                    <label
                      htmlFor={sms.id}
                      onDoubleClick={() => {
                        setSelection(!selection);
                        deselectAll();
                        setSelectedMessages([sms.id]);
                      }}
                      className={
                        selectedMessages.includes(sms.id)
                          ? "req-buy-funds msg selected"
                          : "req-buy-funds msg"
                      }
                    >
                      {selection && (
                        <input
                          type="checkbox"
                          name="msgs[]"
                          id={sms.id}
                          checked={selectedMessages.includes(sms.id)}
                          value={sms.id}
                          onChange={handleCheckboxChange}
                          hidden
                        />
                      )}
                      <p>Request Pay & Give Funds</p>
                      <table>
                        <thead>
                          <tr>
                            <th> Fund's name</th>
                            <th>mul</th>
                            <th>op..</th>
                            <th>value</th>
                            <th>equal</th>
                            <th>total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="g">
                            <th>Golden Fund</th>
                            <td>{reqSms.goldenFund}</td>
                            <td>X</td>
                            <td>500</td>
                            <td>=</td>
                            <td>{reqSms.goldenFund * 500}</td>
                          </tr>
                          <tr className="d">
                            <th>Diamond Fund</th>
                            <td>{reqSms.diamondFund}</td>
                            <td>X</td>
                            <td>1000</td>
                            <td>=</td>
                            <td>{reqSms.diamondFund * 1000}</td>
                          </tr>
                          <tr className="t">
                            <th>Total</th>
                            <td>{reqSms.diamondFund * 1000}</td>
                            <td>+</td>
                            <td>{reqSms.goldenFund * 500}</td>
                            <td>=</td>
                            <td>
                              {reqSms.diamondFund * 1000 +
                                reqSms.goldenFund * 500}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <button
                        onClick={() => {
                          setActiveTab("buy-funds-others");
                          applyRequest(reqSms.diamondFund, reqSms.goldenFund);
                        }}
                      >
                        {reqSms.diamondFund * 1000 + reqSms.goldenFund * 500}
                        /- Pay & Give
                      </button>
                      <div className="info">
                        <p>
                          {sms.status === "notified" ? (
                            <DoneAllIcon />
                          ) : sms.status === "sent" ? (
                            <DoneIcon />
                          ) : sms.status === "seen" ? (
                            <DoneOutlineIcon />
                          ) : (
                            ""
                          )}{" "}
                        </p>
                        <p> {formatFullTimeAndDate(sms.time)}</p>
                      </div>
                    </label>
                  ) : reqSms?.sentMoney ? (
                    <label
                      htmlFor={sms.id}
                      onDoubleClick={() => {
                        setSelection(!selection);
                        deselectAll();
                        setSelectedMessages([sms.id]);
                      }}
                      className={
                        selectedMessages.includes(sms.id)
                          ? "money-received msg selected"
                          : "money-received msg"
                      }
                    >
                      {selection && (
                        <input
                          type="checkbox"
                          name="msgs[]"
                          id={sms.id}
                          checked={selectedMessages.includes(sms.id)}
                          value={sms.id}
                          onChange={handleCheckboxChange}
                          hidden
                        />
                      )}
                      <p>{sms.align === "left" ? "Received" : "Sent"} Money</p>

                      <div className="rupee">
                        <CurrencyRupeeIcon />
                        {reqSms.amount}/-
                      </div>
                      <div className="info">
                        <p>
                          {sms.status === "notified" ? (
                            <DoneAllIcon />
                          ) : sms.status === "sent" ? (
                            <DoneIcon />
                          ) : sms.status === "seen" ? (
                            <DoneOutlineIcon />
                          ) : (
                            ""
                          )}{" "}
                        </p>
                        <p> {formatFullTimeAndDate(sms.time)}</p>
                      </div>
                    </label>
                  ) : reqSms?.payAndGive ? (
                    <label
                      htmlFor={sms.id}
                      onDoubleClick={() => {
                        setSelection(!selection);
                        deselectAll();
                        setSelectedMessages([sms.id]);
                      }}
                      className={
                        selectedMessages.includes(sms.id)
                          ? "received-funds msg selected"
                          : "received-funds msg"
                      }
                    >
                      {selection && (
                        <input
                          type="checkbox"
                          name="msgs[]"
                          id={sms.id}
                          checked={selectedMessages.includes(sms.id)}
                          value={sms.id}
                          onChange={handleCheckboxChange}
                          hidden
                        />
                      )}
                      <p>{sms.align === "left" ? "Received" : "Sent"} Funds</p>
                      <table>
                        <thead>
                          <tr>
                            <th>Fund's name</th>
                            <th>qu..</th>
                            <th>op..</th>
                            <th>value</th>
                            <th>equal</th>
                            <th>invest</th>
                            <th>Return</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="g">
                            <th>Golden Fund</th>
                            <td>{reqSms.golden}</td>
                            <td>X</td>
                            <td>500</td>
                            <td>=</td>
                            <td>{reqSms.golden * 500}</td>
                            <td>{reqSms.golden * 500 * 2}</td>
                          </tr>
                          <tr className="d">
                            <th>Diamond Fund</th>
                            <td>{reqSms.diamond}</td>
                            <td>X</td>
                            <td>1000</td>
                            <td>=</td>
                            <td>{reqSms.diamond * 1000}</td>
                            <td>{reqSms.diamond * 1000 * 2}</td>
                          </tr>
                          <tr className="t">
                            <th>Total</th>
                            <td>{reqSms.golden * 500}</td>
                            <td>+</td>
                            <td>{reqSms.diamond * 1000}</td>
                            <td></td>
                            <td>
                              {reqSms.golden * 500 + reqSms.diamond * 1000}
                            </td>
                            <td>
                              {(reqSms.golden * 500 + reqSms.diamond * 1000) *
                                2}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="info">
                        <p>
                          {sms.status === "notified" ? (
                            <DoneAllIcon />
                          ) : sms.status === "sent" ? (
                            <DoneIcon />
                          ) : sms.status === "seen" ? (
                            <DoneOutlineIcon />
                          ) : (
                            ""
                          )}{" "}
                        </p>
                        <p> {formatFullTimeAndDate(sms.time)}</p>
                      </div>
                    </label>
                  ) : (
                    <label
                      htmlFor={sms.id}
                      onDoubleClick={() => {
                        setSelection(!selection);
                        deselectAll();
                        setSelectedMessages([sms.id]);
                      }}
                      className={
                        selectedMessages.includes(sms.id)
                          ? "msg-simple msg selected"
                          : "msg-simple msg"
                      }
                    >
                      {selection && (
                        <input
                          type="checkbox"
                          name="msgs[]"
                          id={sms.id}
                          checked={selectedMessages.includes(sms.id)}
                          value={sms.id}
                          onChange={handleCheckboxChange}
                          hidden
                        />
                      )}
                      <div className="pre-text">
                        <pre>{sms.message}</pre>
                      </div>
                      <br />
                      <div className="info">
                        <p>
                          {sms.status === "notified" ? (
                            <DoneAllIcon />
                          ) : sms.status === "sent" ? (
                            <DoneIcon />
                          ) : sms.status === "seen" ? (
                            <DoneOutlineIcon />
                          ) : (
                            ""
                          )}{" "}
                        </p>
                        <p> {formatFullTimeAndDate(sms.time)}</p>
                      </div>
                    </label>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="action-btns">
          <div className="actions">
            {activeTab === "simple-msg" ? (
              <div className="simple-msg">
                <textarea
                  name="message"
                  onChange={handleChange}
                  value={input_data.message}
                  placeholder="Message Here"
                ></textarea>
                <button onClick={() => sendMessage()}>
                  <SendIcon />
                </button>
              </div>
            ) : activeTab === "send-money" ? (
              <div className="send-money">
                <div>
                  <label htmlFor="amount">Enter Amount</label>

                  <div className="rupee">
                    <CurrencyRupeeIcon />
                    <input
                      name="amount"
                      type="number"
                      id="amount"
                      value={input_data.amount}
                      placeholder="99.00"
                      onChange={handleChange}
                      max={MyDetails?.Balance}
                      min={0}
                      step="0.01"
                    />
                  </div>
                </div>

                <button onClick={sendMoney}>
                  from balance
                  <SendIcon />
                </button>
                <button
                  onClick={() =>
                    toast.warning("From Bank Send Money is now disabled!", {
                      position: "bottom-center",
                    })
                  }
                >
                  from bank
                  <SendIcon />
                </button>
              </div>
            ) : activeTab === "buy-funds" ? (
              <div className="buy-funds-req">
                <p>Select Funds</p>
                <div className="funds">
                  <label>
                    Golden Funds
                    <br />
                    <select
                      name="buyGoldenForMe"
                      value={input_data.buyGoldenForMe}
                      onChange={handleChange}
                    >
                      <option value="">Choose..</option>
                      {MyDetails?.canBuyGolden.map((v, i) => (
                        <option value={v} key={i}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Diamond Funds
                    <br />
                    <select
                      name="buyDiamondForMe"
                      value={input_data.buyDiamondForMe}
                      onChange={handleChange}
                    >
                      <option value="">Choose..</option>
                      {MyDetails?.canBuyDiamond.map((v, i) => (
                        <option value={v} key={i}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <button onClick={() => sendMessage("buyFundRequest")}>
                  {" "}
                  Send Buy Fund Request <SendIcon />
                </button>
              </div>
            ) : activeTab === "buy-funds-others" ? (
              <div className="buy-funds-others">
                <p>Select Funds For Others</p>
                <div className="funds">
                  <label>
                    Golden Funds
                    <br />
                    <select
                      name="buyGoldenForOther"
                      value={input_data.buyGoldenForOther}
                      onChange={handleChange}
                    >
                      <option value="">Choose..</option>
                      {userMessagesData.canBuyGolden.map((v, i) => (
                        <option value={v} key={i}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Diamond Funds
                    <br />
                    <select
                      name="buyDiamondForOther"
                      value={input_data.buyDiamondForOther}
                      onChange={handleChange}
                    >
                      <option value="">Choose..</option>
                      {userMessagesData.canBuyDiamond.map((v, i) => (
                        <option value={v} key={i}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="btns ">
                  <button className="pay-and-give" onClick={payAndGive}>
                    {" "}
                    Pay & Give
                    <div>
                      <CurrencyRupeeIcon />
                      {input_data.buyGoldenForOther * 500 +
                        input_data.buyDiamondForOther * 1000}{" "}
                    </div>
                    <SendIcon />
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="tabs">
            <button
              className={activeTab === "simple-msg" ? "active" : ""}
              onClick={() => setActiveTab("simple-msg")}
            >
              {activeTab === "simple-msg" ? (
                <MessageIcon />
              ) : (
                <MessageOutlinedIcon />
              )}
              Simple
            </button>
            <button
              className={activeTab === "send-money" ? "active" : ""}
              onClick={() => setActiveTab("send-money")}
            >
              {activeTab === "simple-money" ? (
                <CurrencyRupeeIcon />
              ) : (
                <CurrencyRupeeOutlinedIcon />
              )}
              Money
            </button>
            <button
              className={activeTab === "buy-funds" ? "active" : ""}
              onClick={() => setActiveTab("buy-funds")}
            >
              {activeTab === "buy-funds" ? (
                <RequestPageIcon />
              ) : (
                <RequestPageOutlinedIcon />
              )}
              Funds Request
            </button>
            <button
              className={activeTab === "buy-funds-others" ? "active" : ""}
              onClick={() => setActiveTab("buy-funds-others")}
            >
              {activeTab === "buy-funds-others" ? (
                <SmartButtonOutlinedIcon />
              ) : (
                <SmartButtonOutlinedIcon />
              )}
              Pay & Give
            </button>
            <button
              className={activeTab === "gen-pdf" ? "active" : ""}
              onClick={() => {
                setActiveTab("gen-pdf");
                genPdf(username);
              }}
            >
              {activeTab === "gen-pdf" ? (
                <PictureAsPdfIcon />
              ) : (
                <PictureAsPdfOutlinedIcon />
              )}
              Auto-Net Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
