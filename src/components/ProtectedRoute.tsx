import { useEffect } from "react";
import { useGlobalContext } from "../MyRedux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({
  aspectRole,
  redirect,
}: {
  aspectRole: string;
  redirect: string;
}) => {
  const {
    store: { role },
  } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ role, aspectRole });

    if (role !== aspectRole) {
      navigate(redirect);
      toast.error(`you are not authorized`);
    }
  }, []);
  return <Outlet />;
};

export default ProtectedRoute;
