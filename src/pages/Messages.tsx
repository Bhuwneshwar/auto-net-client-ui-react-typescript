import React, {
  useEffect,
  useState,
  ChangeEvent,
  useRef,
  lazy,
  Suspense,
} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../MyRedux";

// import Chat from "./Chat";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";
import { useSocket } from "../Providers/SocketProvider";
import { truncateText } from "../utils/functions";

const Chat = lazy(() => import("./Chat"));

interface IUserList {
  name: string;
  referCode: string;
  profileImg: string;
  lastMsg: string;
  lastMsgTime: Date;
  unreadMsgCount: number;
}

const Messages: React.FC = () => {
  const {
    dispatch,
    store: { MyDetails, socketData },
  } = useGlobalContext();

  const navigate = useNavigate();
  const { refer } = useParams<{ refer: string }>();
  const referRef = useRef(refer);
  const friends = useRef([]) as any;

  const [allMessages, setAllMessages] = useState<IUserList[]>([]);

  const [input_data, setInputData] = useState({
    identifyId: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputData({
      ...input_data,
      [name]: value,
    });
  };
  const socket = useSocket();

  useEffect(() => {
    if (MyDetails)
      dispatch("MyDetails", { ...MyDetails, allUnreadMessageCount: 0 });
    initial();

    socket?.on("NEW_MESSAGE", () => {});
  }, [socket]);

  useEffect(() => {
    try {
      const msg = JSON.parse(socketData);
      console.log("got message", { msg });

      if (msg.username !== refer) {
        setAllMessages((prevAllMessages) => {
          const users = prevAllMessages.filter((user) => {
            return user.referCode === msg.username;
          });

          if (users.length > 0) {
            const friends = prevAllMessages.map((user) => {
              if (user.referCode === msg.username) {
                return {
                  ...user,
                  unreadMsgCount: user.unreadMsgCount + 1,
                };
              } else {
                return user;
              }
            });

            return friends; // Return the updated array
          } else {
            initial(); // Or handle the case when the user is not found
            return prevAllMessages; // Return previous state if no update
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [socketData, refer]);

  useEffect(() => {
    if (refer) {
      const friends = allMessages.map((user) => {
        if (refer === user.referCode) {
          return {
            ...user,
            unreadMsgCount: 0,
          };
        } else {
          return user;
        }
      });
      setAllMessages(friends);
    }
    referRef.current = refer; // Update the ref whenever refer changes
  }, [refer]);
  useEffect(() => {
    friends.current = allMessages;
  }, [allMessages]);

  const initial = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.get(`/api/v1/messages`, {
        withCredentials: true,
      });
      console.log({ data });

      if (data.success) {
        setAllMessages(data.usersList);
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (e) {
      console.log("initial error :", e);
      toast.error("Failed to fetch messages", {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };

  const join = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/message/join`,
        {
          user: input_data.identifyId,
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.referCode) {
        navigate("/messages/" + data.referCode);
      }
    } catch (e) {
      console.log("checkFunds error :", e);
    }
  };

  return (
    <div id="messages">
      <div className={refer ? "container hideMe" : "container"}>
        <h2>Messages</h2>
        <div className="join-box">
          <input
            onChange={handleChange}
            value={input_data.identifyId}
            type="text"
            name="identifyId"
            onKeyUp={(event) => {
              if (event.key === "Enter") join();
            }}
            placeholder="Username/ID/Phone Number/Email"
          />
          <button onClick={join}>
            <ArrowForwardIosIcon />
          </button>
        </div>
        <div className="chats">
          <div className="for-over-follow">
            {allMessages.map((user) => (
              <div
                className="lastMessage"
                key={user.referCode}
                onClick={() => navigate("/messages/" + user.referCode)}
              >
                <figure>
                  <img
                    // src="https://th.bing.com/th/id/OIP.vAuCou6PorBYkntC17e0QAAAAA?rs=1&pid=ImgDetMain"
                    src={user.profileImg}
                    alt={user.name}
                  />
                </figure>
                <div className="info">
                  <h3>{truncateText(user.name, 20)}</h3>
                  <span>{truncateText(user.lastMsg, 25)} </span>
                </div>
                <div className="time">
                  <div>{formatDate(user.lastMsgTime)}</div>
                  {user.unreadMsgCount > 0 &&
                    (user.unreadMsgCount < 100 ? (
                      <span className="badge">{user.unreadMsgCount}</span>
                    ) : (
                      <span className="badge">99+</span>
                    ))}
                </div>
              </div>
            ))}
          </div>{" "}
        </div>
      </div>
      {refer && MyDetails ? (
        <Suspense fallback={<div>Chat Loading...</div>}>
          <Chat username={referRef.current || ""} />
        </Suspense>
      ) : (
        ""
      )}
    </div>
  );
};

export default Messages;
