"use client";
import { Toaster } from "react-hot-toast";
const ToasterProvider = () => {
  return <Toaster toastOptions={{ duration: 4000 }} />;
};

export default ToasterProvider;
