'use client'
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
interface AutoLogOutProps {
  idleTimeOut?: number;
}
const AutoLogOut: React.FC<AutoLogOutProps> = ({
  idleTimeOut = 5 * 60 * 1000,
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        signOut({ callbackUrl: "/login" });
      }, idleTimeOut);
    };
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
    resetTimer();
    return () => {
      clearTimeout(timer);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [idleTimeOut]);
  return null;
};

export default AutoLogOut;
