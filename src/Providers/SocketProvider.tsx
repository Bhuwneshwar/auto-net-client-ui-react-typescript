import {
  createContext,
  useMemo,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

const env = import.meta.env;
console.log({ env });

let hostUrl = import.meta.env.VITE_HOST_URL;
const production = import.meta.env.PROD;
const devUrl = import.meta.env.VITE_DEV_URL;

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = useMemo(() => {
    // const protocol = window.location.protocol;
    // const hostUrl = protocol + "//" + window.location.hostname + ":5000";

    hostUrl = production ? hostUrl : devUrl;

    // const hostUrl = "https://rebyb-autonet.onrender.com/";
    console.log({ hostUrl });

    // return io("http://localhost:5000", {
    return io(hostUrl, {
      // transports: ["websocket"]
      withCredentials: true,
    });
  }, []);

  useEffect(() => {
    // Cleanup the socket when the component unmounts
    return () => {
      socket && socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
