import React, { useEffect, useState, ChangeEvent } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../MyRedux";
import { formatDate } from "../utils/formatDate";
import ClipboardCopy from "../components/ClipboardCopy";
import PriorityDragable from "../components/PriorityDragable";
import { Link } from "react-router-dom";
import { IPlan } from "./Signup";

// interface EditToggle {
//   name: boolean;
//   email: boolean;
//   gender: boolean;
//   age: boolean;
//   contact: boolean;
//   newReferCode: boolean;
// }

interface InitialOptions {
  operators: string[];
  states: string[];
  RechargePlans: {
    jio: IPlan[];
    airtel: IPlan[];
    vi: IPlan[];
    bsnl: IPlan[];
    mtnlDelhi: IPlan[];
    mtnlMumbai: IPlan[];
  };
  transactionMethods: string[];
}

const Profile: React.FC = () => {
  // const navigate = useNavigate();
  const {
    store: { MyDetails },
    dispatch,
  } = useGlobalContext();

  const coverImg =
    MyDetails?.coverImg ||
    "https://getwallpapers.com/wallpaper/full/e/4/a/1176156-download-free-fb-wallpaper-of-cover-2560x1440-ipad-retina.jpg";

  let profileImg;
  if (MyDetails?.profileImg) {
    profileImg = MyDetails.profileImg;
  } else {
    if (MyDetails?.gender === "male") {
      profileImg =
        "https://th.bing.com/th/id/OIP.MYwdjrgFU0JwL6ahVIdgZwHaH_?rs=1&pid=ImgDetMain";
    } else if (MyDetails?.gender === "female") {
      profileImg = "https://cdn-icons-png.flaticon.com/512/65/65581.png";
    } else {
      profileImg =
        "https://media.istockphoto.com/id/1305034196/vector/transgender-avatar-in-red-sweatshirt.jpg?s=612x612&w=is&k=20&c=K7kim26X_ZysaKGFT7h0tGA67VBYiPJuyN3kL7D2l1g=";
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit

      if (!isValidType) {
        return alert("Only image files are allowed.");
      }
      if (!isValidSize) {
        return alert("File size must be less than 5MB.");
      }
      uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("coverPic", file);

    try {
      dispatch("loading", true);
      const { data } = await axios.post("/api/v1/upload-cover-pic", formData, {
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.loaded && progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload progress: ${percentCompleted}%`);
          }
          // Update your progress bar here
        },
      });

      console.log("File uploaded successfully:", { data });

      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", { ...MyDetails, coverImg: data.coverImg });
          toast.success("Cover image uploaded successfully!");
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading cover image!");
    }
    dispatch("loading", false);
  };

  const handleFileChangeProfile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit

      if (!isValidType) {
        return alert("Only image files are allowed.");
      }
      if (!isValidSize) {
        return alert("File size must be less than 5MB.");
      }
      uploadFileProfile(file);
    }
  };

  const uploadFileProfile = async (file: File) => {
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/upload-profile-pic",
        formData,
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.loaded && progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log(`Upload progress: ${percentCompleted}%`);
            }
            // Update your progress bar here
          },
        }
      );

      console.log("File uploaded successfully:", { data });

      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", { ...MyDetails, profileImg: data.profileImg });
          toast.success("Upload Successfully", {
            position: "bottom-center",
          });
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file!", {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };

  const [profileEdit, setProfileEdit] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    contact: "",

    contactOTP: "",
    emailOTP: "",
    referCode: "",

    rechNum1: "",
    rechNum2: "",
    rechNum3: "",
    opera1: "",
    opera2: "",
    opera3: "",
    state1: "",
    state2: "",
    state3: "",
    SelectedPlan1: "",
    SelectedPlan2: "",
    SelectedPlan3: "",
    ExistingValidityOne: 0,
    ExistingValiditytwo: 0,
    ExistingValiditythree: 0,
    transactionMethod: "",
    autoRecharge: true,
    autoWithdraw: true,
    NextInvest: true,
    upi: "",
    ifsc: "",
    bank: "",
    confirmBank: "",
    withdraw_perc: 60,
    timeOutId: 0,
  });

  useEffect(() => {
    // Update profileEdit state when MyDetails changes
    if (MyDetails) {
      for (const [key, value] of Object.entries(MyDetails)) {
        setProfileEdit((prevProfileEdit) => ({
          ...prevProfileEdit,
          [key]: value,
        }));
      }

      setProfileEdit((prevProfileEdit) => ({
        ...prevProfileEdit,
        rechNum1: MyDetails.rechargeNum1.number || "",
        rechNum2: MyDetails.rechargeNum2.number || "",
        rechNum3: MyDetails.rechargeNum3.number || "",

        opera1: MyDetails.rechargeNum1.operator || "",
        opera2: MyDetails.rechargeNum2.operator || "",
        opera3: MyDetails.rechargeNum3.operator || "",

        state1: MyDetails.rechargeNum1.state || "",
        state2: MyDetails.rechargeNum2.state || "",
        state3: MyDetails.rechargeNum3.state || "",

        SelectedPlan1: MyDetails.rechargeNum1.plan || "",
        SelectedPlan2: MyDetails.rechargeNum2.plan || "",
        SelectedPlan3: MyDetails.rechargeNum3.plan || "",

        ExistingValidityOne: MyDetails.rechargeNum1.validity || 0,
        ExistingValiditytwo: MyDetails.rechargeNum2.validity || 0,
        ExistingValiditythree: MyDetails.rechargeNum3.validity || 0,

        withdraw_perc: MyDetails.withdrawPerc,
      }));

      setPriority([
        MyDetails.Priority.no_1,
        MyDetails.Priority.no_2,
        MyDetails.Priority.no_3,
      ]);
    }
  }, [MyDetails]);

  const [editToggle, setEditToggle] = useState({
    name: false,
    email: false,
    gender: false,
    age: false,
    contact: false,
    newReferCode: false,
    priority: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setProfileEdit({ ...profileEdit, [e.target.name]: e.target.value });
  };

  const updateName = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/update-user-details",
        {
          name: profileEdit.name,
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", { ...MyDetails, name: data.name });
          setEditToggle((prev) => ({ ...prev, name: !prev.name }));
          toast.success("Name updated successfully!", {
            position: "bottom-center",
          });
        }
      }
      if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
      }
    } catch (error) {
      console.log("at updateName function:", error);
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
  const updateDetails = async (property: { key: string; value: any }) => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/update-user-details",
        {
          [property.key]: property.value,
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });

      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", {
            ...MyDetails,
            [property.key]: property.value,
          });
        }

        toast.success(data.message, { position: "bottom-center" });
      }
      if (data.error) {
        setProfileEdit((prev) => ({
          ...prev,
          [data.key]: data.value,
        }));
        toast.error(data.error, { position: "bottom-center" });
      }
    } catch (error) {
      console.log("at updateDetails function:", error);
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

  function formatTime(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  const [showDueTimeEmail, setShowDueTimeEmail] = useState("5:12:20");
  let idEmail: number;
  const sendEmailOTP = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/email/otp/send",
        {
          email: profileEdit.email,
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        setProfileEdit((prev) => ({ ...prev, emailOTP: data.otp }));
        setEditToggle((prev) => ({ ...prev, email: !prev.email }));
        toast.success("OTP sent successfully!", {
          position: "bottom-center",
        });
      }

      if (data.dueTimeMs) {
        let dueTimeMs = data.dueTimeMs; // 30 seconds in milliseconds
        setShowDueTimeEmail(formatTime(dueTimeMs));

        if (idEmail) clearInterval(idEmail);
        id = setInterval(() => {
          dueTimeMs -= 1000;

          if (dueTimeMs < 0) {
            clearInterval(idEmail);
            setShowDueTimeEmail("");
          } else {
            setShowDueTimeEmail(formatTime(dueTimeMs));
          }
        }, 1000);

        toast.warning("Please wait... " + formatTime(dueTimeMs), {
          position: "bottom-center",
        });
      }

      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.error("sendEmailOTP error :", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };

  const [showDueTime, setShowDueTime] = useState("2:55:50");
  let id: any;
  const sendContactOTP = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/phone/otp/send",
        {
          contact: profileEdit.contact,
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        setProfileEdit((prev) => ({ ...prev, contactOTP: data.otp }));
        setEditToggle((prev) => ({ ...prev, contact: !prev.contact }));
        toast.success("OTP sent successfully!", {
          position: "bottom-center",
        });
      }

      if (data.dueTimeMs) {
        let dueTimeMs = data.dueTimeMs; // 30 seconds in milliseconds
        setShowDueTime(formatTime(dueTimeMs));

        if (id) clearInterval(id);
        id = setInterval(() => {
          dueTimeMs -= 1000;

          if (dueTimeMs < 0) {
            clearInterval(id);
            setShowDueTime("");
          } else {
            setShowDueTime(formatTime(dueTimeMs));
          }
        }, 1000);

        toast.warning("Please wait... " + formatTime(dueTimeMs), {
          position: "bottom-center",
        });
      }

      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.error("sendContactOTP error :", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };

  const verifyContactOTP = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/phone/otp/verify",
        {
          contact: profileEdit.contact,
          userOtp: profileEdit.contactOTP,
          verifyReason: "updateContact",
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", {
            ...MyDetails,
            contact: data.verifiedContact,
          });
        }
        setEditToggle((prev) => ({
          ...prev,
          contact: !prev.contact,
        }));
        toast.success("Contact updated successfully!", {
          position: "bottom-center",
        });
      }

      if (data.worning) {
        toast.warning(data.worning, {
          position: "bottom-center",
        });
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.error("verifyContactOTP error :", error);
      toast.error(error.message);
    }
    dispatch("loading", false);
  };
  const verifyEmailOTP = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/email/otp/verify",
        {
          email: profileEdit.email,
          userOtp: profileEdit.emailOTP,
          verifyReason: "updateEmail",
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", {
            ...MyDetails,
            email: data.verifiedEmail,
          });
        }
        setEditToggle((prev) => ({
          ...prev,
          email: !prev.email,
        }));
        toast.success("Email updated successfully!", {
          position: "bottom-center",
        });
      }

      if (data.worning) {
        toast.warning(data.worning, {
          position: "bottom-center",
        });
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.error("verifyEmailOTP error :", error);
      toast.error(error.message);
    }
    dispatch("loading", false);
  };
  const setReferCode = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/account-refer",
        { newReferCode: profileEdit.referCode },
        {
          withCredentials: true,
        }
      );

      console.log({ data });

      if (data.success) {
        toast.success("Referral code set successfully!", {
          position: "bottom-center",
        });
        if (MyDetails) {
          dispatch("MyDetails", {
            ...MyDetails,
            referCode: data.newReferCode,
          });
        }
        setEditToggle((prev) => ({
          ...prev,
          newReferCode: !prev.newReferCode,
        }));
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

  const genReferCode = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.get("/api/v1/account-refer", {
        withCredentials: true,
      });

      console.log({ data });

      if (data.success) {
        toast.success("Referral code generated successfully!", {
          position: "bottom-center",
        });
        setProfileEdit((prev) => ({
          ...prev,
          referCode: data.generatedReferCode,
        }));
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

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission behavior
  }

  const [InitialOptions, setInitialOptions] = useState<InitialOptions>({
    operators: [],
    states: [],
    RechargePlans: {
      jio: [],
      airtel: [],
      vi: [],
      bsnl: [],
      mtnlDelhi: [],
      mtnlMumbai: [],
    },
    transactionMethods: [],
  });

  const [priority, setPriority] = useState([
    "recharge",
    "nextInvest",
    "withdraw",
  ]);
  const changePriorityArr = (newArr: string[]) => {
    setPriority(() => newArr);
  };

  const [plansByOperator1, setPlansByOperotor1] = useState<any[]>([]);
  const [plansByOperator2, setPlansByOperotor2] = useState<any[]>([]);
  const [plansByOperator3, setPlansByOperotor3] = useState<any[]>([]);

  const selectPlan = (opera: string) => {
    if (opera === "jio") {
      return InitialOptions?.RechargePlans.jio || [];
    }
    if (opera === "airtel") {
      return InitialOptions?.RechargePlans.airtel || [];
    }
    if (opera === "bsnl") {
      return InitialOptions?.RechargePlans.bsnl || [];
    }
    if (opera === "mtnl delhi") {
      return InitialOptions?.RechargePlans.mtnlDelhi || [];
    }
    if (opera === "mtnl mumbai") {
      return InitialOptions?.RechargePlans.mtnlMumbai || [];
    }
    if (opera === "vi") {
      return InitialOptions?.RechargePlans.vi || [];
    }
    return [];
  };

  useEffect(() => {
    setPlansByOperotor1(selectPlan(profileEdit.opera1));
  }, [profileEdit.opera1]);

  useEffect(() => {
    setPlansByOperotor2(selectPlan(profileEdit.opera2));
  }, [profileEdit.opera2]);

  useEffect(() => {
    setPlansByOperotor3(selectPlan(profileEdit.opera3));
  }, [profileEdit.opera3]);

  const updateRechargeNumber1 = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/update-user-details",
        {
          rechargeDetails1: {
            number: profileEdit.rechNum1,
            state: profileEdit.state1,
            operator: profileEdit.opera1,
            plan: profileEdit.SelectedPlan1,
            existingValidity: +profileEdit.ExistingValidityOne,
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", {
            ...MyDetails,
            rechargeNum1: data.rechargeNum1,
          });
        }
        toast.success("Recharge Number 1 updated successfully!", {
          position: "bottom-center",
        });
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.error("update number 1 error :", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };
  const updateRechargeNumber2 = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/update-user-details",
        {
          rechargeDetails2: {
            number: profileEdit.rechNum2,
            state: profileEdit.state2,
            operator: profileEdit.opera2,
            plan: profileEdit.SelectedPlan2,
            existingValidity: +profileEdit.ExistingValiditytwo,
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", {
            ...MyDetails,
            rechargeNum2: data.rechargeNum2,
          });
        }
        toast.success("Recharge Number 2 updated successfully!", {
          position: "bottom-center",
        });
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.error("update number 2 error :", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };
  const updateRechargeNumber3 = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/update-user-details",
        {
          rechargeDetails3: {
            number: profileEdit.rechNum3,
            state: profileEdit.state3,
            operator: profileEdit.opera3,
            plan: profileEdit.SelectedPlan3,
            existingValidity: +profileEdit.ExistingValiditythree,
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", {
            ...MyDetails,
            rechargeNum3: data.rechargeNum3,
          });
        }
        toast.success("Recharge Number 3 updated successfully!", {
          position: "bottom-center",
        });
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.error("update number 3 error :", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };
  const updateAccountDetails = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/update-user-details",
        {
          accountDetails: {
            transactionMethod: profileEdit.transactionMethod,
            upi: profileEdit.upi,
            ifsc: profileEdit.ifsc,
            accountNumber: profileEdit.bank,
            confirmAccountNumber: profileEdit.confirmBank,
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", {
            ...MyDetails,
            transactionMethod: data.transactionMethod,
            upi: data.upi,
            ifsc: data.ifsc,
            bank: data.bank,
          });
        }
        toast.success("Account details updated successfully!", {
          position: "bottom-center",
        });
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.error("updateAccountDetails error :", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };
  const removeRechargeNumber1 = async () => {
    try {
      const yes = confirm("Are you sure you want to remove the number 1?");
      if (!yes) return;
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/update-user-details",
        {
          removedRechargeDetails1: null,
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", {
            ...MyDetails,
            rechargeNum1: {},
          });
        }
        toast.success("Recharge Number 1 removed successfully!", {
          position: "bottom-center",
        });
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.error("update number 1 error :", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };
  const removeRechargeNumber2 = async () => {
    try {
      const yes = confirm("Are you sure you want to remove the number 2?");
      if (!yes) return;
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/update-user-details",
        {
          removedRechargeDetails2: null,
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", {
            ...MyDetails,
            rechargeNum2: {},
          });
        }
        toast.success("Recharge Number 2 removed successfully!", {
          position: "bottom-center",
        });
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.error("update number 2 error :", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };
  const removeRechargeNumber3 = async () => {
    try {
      const yes = confirm("Are you sure you want to remove the number 3?");
      if (!yes) return;
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/update-user-details",
        {
          removedRechargeDetails3: null,
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        if (MyDetails) {
          dispatch("MyDetails", {
            ...MyDetails,
            rechargeNum3: {},
          });
        }
        toast.success("Recharge Number 3 removed successfully!", {
          position: "bottom-center",
        });
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.error("update number 3 error :", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };

  const initial = async () => {
    try {
      dispatch("loading", true);
      const res = await axios.get("/api/v1/registration");
      console.log({ ...res.data });

      if (res.data.success) {
        setInitialOptions({
          operators: res.data.operators,
          states: res.data.states,
          RechargePlans: res.data.RechargePlans,
          transactionMethods: res.data.transactionMethods,
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to load initial data", {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };

  const updatePriorityOrder = async () => {
    try {
      dispatch("loading", true);
      const { data } = await axios.post(
        "/api/v1/update-user-details",
        {
          priorityOrderDetails: {
            priority,
            autoRecharge: profileEdit.autoRecharge,
            autoWithdraw: profileEdit.autoWithdraw,
            autoReserveForNextInvest: profileEdit.NextInvest,
            percentageOfAutoWithdrawMoney: +profileEdit.withdraw_perc,
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log({ data });
      if (data.success) {
        toast.success("Priority order updated successfully!", {
          position: "bottom-center",
        });
        toast.warning("Please Refresh the page...", {
          position: "top-center",
        });
      }
      if (data.error) {
        toast.error(data.error, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      console.error("updatePriorityOrderDetails error :", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
    dispatch("loading", false);
  };

  useEffect(() => {
    if (!editToggle.priority) return;

    clearTimeout(profileEdit.timeOutId);

    const timeOutId: any = setTimeout(() => {
      updatePriorityOrder();
    }, 1000);
    setProfileEdit((prev) => ({ ...prev, timeOutId }));
  }, [
    priority,
    profileEdit.autoRecharge,
    profileEdit.autoWithdraw,
    profileEdit.NextInvest,
    profileEdit.withdraw_perc,
  ]);

  useEffect(() => {
    console.log("first time render");
    initial();
    // window.scrollTo(0, scrolledPosition.profile.top);
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  return (
    MyDetails && (
      <div className="profile">
        <div className="cover-img">
          <figure>
            <img src={coverImg} alt="cover image" />
          </figure>
          <label htmlFor="coverPic" className="choose-img">
            <CameraAltIcon />
            <input
              hidden
              onChange={handleFileChange}
              id="coverPic"
              type="file"
              accept="image/*"
            />
          </label>

          <div className="profile-pic">
            <figure>
              <img src={profileImg} alt="profile image" />
            </figure>
            <label htmlFor="profilePic" className="choose-img">
              <CameraAltIcon />
              <input
                hidden
                onChange={handleFileChangeProfile}
                id="profilePic"
                type="file"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <div className="details">
          <form onSubmit={submit}>
            <h1>
              <input
                type="text"
                disabled={!editToggle.name}
                onBlur={updateName}
                onChange={handleChange}
                value={profileEdit.name}
                name="name"
                placeholder="Name"
                required
                autoFocus
              />
              <span
                onClick={() =>
                  setEditToggle({ ...editToggle, name: !editToggle.name })
                }
              >
                <EditIcon />
              </span>
            </h1>
            <div className="bio">
              <div className="age">
                <label htmlFor="age">Age: </label>
                <input
                  type="number"
                  disabled={!editToggle.age}
                  onBlur={() =>
                    updateDetails({ key: "age", value: +profileEdit.age })
                  }
                  onChange={handleChange}
                  value={profileEdit.age}
                  name="age"
                  id="age"
                  placeholder="Age"
                  required
                />
                <span
                  onClick={() =>
                    setEditToggle({ ...editToggle, age: !editToggle.age })
                  }
                >
                  <EditIcon />
                </span>
              </div>

              <div className="gender">
                <div>Gender: </div>
                <div>
                  {/* <span> {MyDetails?.gender} </span> */}

                  <select
                    value={profileEdit.gender}
                    name="gender"
                    id="gender"
                    // disabled={!editToggle.gender}
                    onChange={handleChange}
                    required
                    onBlur={() =>
                      updateDetails({
                        key: "gender",
                        value: profileEdit.gender,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {/* <span
                    onClick={(e) =>
                      setEditToggle({
                        ...editToggle,
                        gender: !editToggle.gender,
                      })
                    }
                  >
                    <EditIcon />
                  </span> */}
                </div>
              </div>
            </div>
            <div className="date">
              <p>Date of Registration: {formatDate(MyDetails?.createdAt)}</p>
            </div>
            <div className="contact-info">
              <p>contact information</p>
              <div className="contact">
                <div className="primary-number">
                  <div className="d-f">
                    <p className="label">Contact Number</p>
                    <input
                      value={profileEdit.contact}
                      name="contact"
                      id="contact"
                      disabled={!editToggle.contact}
                      onChange={handleChange}
                      required
                      onBlur={sendContactOTP}
                      type="number"
                    />

                    <span
                      onClick={() =>
                        setEditToggle({
                          ...editToggle,
                          contact: !editToggle.contact,
                        })
                      }
                    >
                      <EditIcon />
                    </span>
                  </div>
                  <p className="time">{showDueTime}</p>
                </div>

                <div className="d-f">
                  <p className="label-otp">OTP</p>
                  <input
                    value={profileEdit.contactOTP}
                    name="contactOTP"
                    id="contactOTP"
                    // disabled={!editToggle.contact}
                    onChange={handleChange}
                    onBlur={verifyContactOTP}
                    type="number"
                    className="otp"
                    placeholder="Contact OTP"
                  />
                  <button>Update</button>
                </div>
              </div>
              <div className="contact">
                <div className="primary-number">
                  <div className="d-f">
                    <p className="label">Email</p>
                    <input
                      value={profileEdit.email}
                      name="email"
                      id="email"
                      disabled={!editToggle.email}
                      onChange={handleChange}
                      required
                      onBlur={sendEmailOTP}
                      type="email"
                    />
                    <span
                      onClick={() =>
                        setEditToggle({
                          ...editToggle,
                          email: !editToggle.email,
                        })
                      }
                    >
                      <EditIcon />
                    </span>
                  </div>
                  <p className="time">{showDueTimeEmail}</p>
                </div>
                <div className="d-f">
                  <p className="label-otp">OTP</p>
                  <input
                    value={profileEdit.emailOTP}
                    name="emailOTP"
                    id="emailOTP"
                    // disabled={!editToggle.email}
                    onChange={handleChange}
                    onBlur={verifyEmailOTP}
                    type="number"
                    className="otp"
                    placeholder="email OTP"
                  />
                  <button>Update</button>
                </div>
              </div>
            </div>
            <div className="ids">
              <div className="main-id">
                <p className="label">My ID:</p>
                <p>{MyDetails.id} </p>
                <button>
                  <ClipboardCopy code={MyDetails.id} />
                </button>
              </div>
              <div className="refer-id">
                <p className="label">My Username: </p>

                <input
                  value={profileEdit.referCode}
                  onChange={handleChange}
                  name="referCode"
                  id="newReferCode"
                  disabled={!editToggle.newReferCode}
                  onBlur={setReferCode}
                />
                <div className="btns">
                  <button>
                    <ClipboardCopy code={MyDetails.referCode} />
                  </button>
                  <button
                    onClick={() =>
                      setEditToggle((prev) => ({
                        ...prev,
                        newReferCode: !prev.newReferCode,
                      }))
                    }
                  >
                    Edit
                  </button>
                  <button onClick={genReferCode}>Regenerate</button>
                </div>
              </div>
            </div>
            {/* <div className="balance">
              <p className="label">My Balance: </p>
              <p>{MyDetails.Balance}</p>
            </div> */}

            <div className="rech-for-num">
              <h2>Recharge for numbers</h2>
              <div className="responsive">
                <div className="num">
                  <label htmlFor="rechNum1">Recharge For Number 1</label>
                  <input
                    type="number"
                    onChange={handleChange}
                    name="rechNum1"
                    id="rechNum1"
                    // onFocus={handleFocus}
                    // onBlur={updateRechargeNumber1}
                    value={profileEdit.rechNum1}
                    placeholder="Recharge num 1"
                  />
                </div>
                <div className="opera">
                  <label htmlFor="opera1">Select Operator For Number 1</label>
                  <select
                    value={profileEdit.opera1}
                    onChange={handleChange}
                    name="opera1"
                    id="opera1"
                  >
                    <option value="">Select Operator</option>
                    {InitialOptions.operators.map((v, i) => {
                      return (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="opera">
                  <label htmlFor="state1">Select State For Number 1</label>

                  <select
                    value={profileEdit.state1}
                    onChange={handleChange}
                    name="state1"
                    id="state1"
                  >
                    <option value="">Select State</option>
                    {InitialOptions.states.map((v, i) => {
                      return (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="opera">
                  <label htmlFor="SelectedPlan1">
                    Select A Plan For Number 1
                  </label>

                  <select
                    onChange={handleChange}
                    name="SelectedPlan1"
                    id="SelectedPlan1"
                  >
                    <option value="">Select Plan</option>
                    {plansByOperator1.map((v, i) => {
                      return (
                        <option
                          key={i}
                          className="plans"
                          value={JSON.stringify(v)}
                        >
                          PRICE:{v.price} VALIDITY :{v.validity} Data:
                          {v.options}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="num">
                  <label htmlFor="ExistingValidityOne">
                    Existing Plan Validity 1
                  </label>

                  <input
                    type="number"
                    name="ExistingValidityOne"
                    id="ExistingValidityOne"
                    min={0}
                    max={365}
                    onChange={handleChange}
                    value={profileEdit.ExistingValidityOne}
                    placeholder="Existing Validity "
                  />
                </div>
              </div>
              <div className="btns">
                <button
                  onClick={updateRechargeNumber1}
                  className="update-details recharge"
                >
                  Update Recharge Details
                </button>
                <button
                  onClick={removeRechargeNumber1}
                  className="update-details recharge"
                >
                  Remove Recharge Number
                </button>
              </div>

              <hr />

              <div className="responsive">
                <div className="num">
                  <label htmlFor="rechNum2">Recharge For Number 2</label>

                  <input
                    type="number"
                    onChange={handleChange}
                    name="rechNum2"
                    id="rechNum2"
                    value={profileEdit.rechNum2}
                    placeholder="Recharge num 2"
                  />
                </div>
                <div className="opera">
                  <label htmlFor="opera2">Select Operator For Number 2</label>

                  <select
                    value={profileEdit.opera2}
                    onChange={handleChange}
                    name="opera2"
                    id="opera2"
                  >
                    <option value="">Select Operator</option>
                    {InitialOptions.operators.map((v, i) => {
                      return (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="opera">
                  <label htmlFor="state2">Select State For Number 2</label>

                  <select
                    value={profileEdit.state2}
                    onChange={handleChange}
                    name="state2"
                    id="state2"
                  >
                    <option value="">Select State</option>
                    {InitialOptions.states.map((v, i) => {
                      return (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="opera">
                  <label htmlFor="SelectedPlan2">
                    Select A Plan For Number 2
                  </label>
                  <select
                    onChange={handleChange}
                    name="SelectedPlan2"
                    id="SelectedPlan2"
                  >
                    <option value="">Select Plan</option>
                    {plansByOperator2.map((v, i) => {
                      return (
                        <option
                          key={i}
                          className="plans"
                          value={JSON.stringify(v)}
                        >
                          PRICE:{v.price} VALIDITY :{v.validity} Data:
                          {v.options}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="num">
                  <label htmlFor="ExistingValiditytwo">
                    Existing Plan Validity 2
                  </label>

                  <input
                    type="number"
                    name="ExistingValiditytwo"
                    id="ExistingValiditytwo"
                    min={0}
                    max={365}
                    onChange={handleChange}
                    value={profileEdit.ExistingValiditytwo}
                    placeholder="Existing Validity "
                  />
                </div>
              </div>
              <div className="btns">
                <button
                  onClick={updateRechargeNumber2}
                  className="update-details recharge"
                >
                  Update Recharge Details
                </button>
                <button
                  onClick={removeRechargeNumber2}
                  className="update-details recharge"
                >
                  Remove Recharge Number
                </button>
              </div>
              <hr />

              <div className="responsive">
                <div className="num">
                  <label htmlFor="rechNum3">Recharge For Number 3</label>

                  <input
                    type="number"
                    onChange={handleChange}
                    name="rechNum3"
                    id="rechNum3"
                    value={profileEdit.rechNum3}
                    placeholder="Recharge num 3"
                  />
                </div>
                <div className="opera">
                  <label htmlFor="opera3">Select Operator For Number 3</label>

                  <select
                    value={profileEdit.opera3}
                    onChange={handleChange}
                    name="opera3"
                    id="opera3"
                  >
                    <option value="">Select Operator</option>
                    {InitialOptions.operators.map((v, i) => {
                      return (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="opera">
                  <label htmlFor="state3">Select State For Number 3</label>

                  <select
                    value={profileEdit.state3}
                    onChange={handleChange}
                    name="state3"
                    id="state3"
                  >
                    <option value="">Select State</option>
                    {InitialOptions.states.map((v, i) => {
                      return (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      );
                    })}{" "}
                  </select>
                </div>
                <div className="opera">
                  <label htmlFor="SelectedPlan3">
                    Select A Plan For Number 3
                  </label>

                  <select
                    onChange={handleChange}
                    name="SelectedPlan3"
                    id="SelectedPlan3"
                  >
                    <option value="">Select Plan</option>
                    {plansByOperator3.map((v, i) => {
                      return (
                        <option
                          key={i}
                          className="plans"
                          value={JSON.stringify(v)}
                        >
                          PRICE:{v.price} VALIDITY :{v.validity} Data:
                          {v.options}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="num">
                  <label htmlFor="ExistingValiditythree">
                    Existing Plan Validity 3
                  </label>
                  <input
                    type="number"
                    name="ExistingValiditythree"
                    id="ExistingValiditythree"
                    min={0}
                    max={365}
                    onChange={handleChange}
                    value={profileEdit.ExistingValiditythree}
                    placeholder="Existing Validity "
                  />
                </div>
              </div>
              <div className="btns">
                <button
                  onClick={updateRechargeNumber3}
                  className="update-details recharge"
                >
                  Update Recharge Details
                </button>
                <button
                  onClick={removeRechargeNumber3}
                  className="update-details recharge"
                >
                  Remove Recharge Number
                </button>
              </div>
            </div>
            <div className="rech-for-num">
              <h2>Accounts Information</h2>
              <div className="responsive">
                <div className="select-box">
                  <label htmlFor="transactionMethod">
                    Select Transaction Method
                  </label>
                  <select
                    onChange={handleChange}
                    value={profileEdit.transactionMethod}
                    name="transactionMethod"
                    id="transactionMethod"
                  >
                    <option value="none">None</option>
                    {InitialOptions.transactionMethods.map((method, i) => {
                      return (
                        <option key={i} value={method}>
                          {method}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {(profileEdit.transactionMethod === "upi" ||
                  profileEdit.transactionMethod === "both") && (
                  <div className="input-text">
                    <label htmlFor="transactionMethod">
                      Enter UPI ID/UPI Phone Number
                    </label>

                    <input
                      onChange={handleChange}
                      name="upi"
                      id=""
                      value={profileEdit.upi}
                      placeholder="upi"
                    />
                  </div>
                )}
                {(profileEdit.transactionMethod === "net banking" ||
                  profileEdit.transactionMethod === "both") && (
                  <>
                    <div className="input-text">
                      <label htmlFor="transactionMethod">IFSC Code</label>

                      <input
                        onChange={handleChange}
                        name="ifsc"
                        id=""
                        value={profileEdit.ifsc}
                        placeholder="IFSC code"
                      />
                    </div>
                    <div className="input-text">
                      <label htmlFor="transactionMethod">Account Number</label>

                      <input
                        onChange={handleChange}
                        name="bank"
                        id=""
                        value={profileEdit.bank}
                        placeholder="Account number"
                      />
                    </div>
                    <div className="input-text">
                      <label htmlFor="transactionMethod">
                        Confirm Account Number
                      </label>

                      <input
                        onChange={handleChange}
                        name="confirmBank"
                        id=""
                        value={profileEdit.confirmBank}
                        placeholder="Confirm Account number"
                      />
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={updateAccountDetails}
                className="update-details recharge"
              >
                Update Account Details
              </button>
            </div>

            <section className="tips">
              <h4>Tips:</h4>

              <h5> 👉Do Phone Number Recharge Free</h5>
              <li>
                Enable and drag and put first priority to the "Auto recharge All
                Numbers"
              </li>
              <li> enable the "Auto Reserve balance for next invest"</li>
              <li> disable the "Auto withdraw balance"</li>
              <h5>👉Do Money Double</h5>

              <li>
                Enable and drag and put first priority to the "Auto withdraw
                balance"
              </li>
              <li> withdraw Slide Range to 100%</li>
              <li>disable the "Auto recharge All Numbers"</li>
              <li>disable the "Auto Reserve balance for next invest"</li>
            </section>

            <div
              onMouseEnter={() =>
                setEditToggle((prev) => ({ ...prev, priority: true }))
              }
              onMouseLeave={() =>
                setEditToggle((prev) => ({ ...prev, priority: false }))
              }
              className="priority-order"
            >
              <h2> Priority order </h2>

              <PriorityDragable
                array={priority}
                setArray={changePriorityArr}
                changeHandler={handleChange}
                details={profileEdit}
                setDetails={setProfileEdit}
              />
            </div>

            <div className="btns">
              <Link to="/password-set">
                {MyDetails.password ? "Change Password" : "Set New Password"}{" "}
              </Link>
              <Link to="/password-set">
                {MyDetails.balancePin
                  ? "Change Balance Pin"
                  : "Set New Balance Pin"}{" "}
              </Link>
              <button onClick={() => genPdf(MyDetails.referCode)}>
                Generate PDF
              </button>
              <button>Register Passkey</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Profile;
