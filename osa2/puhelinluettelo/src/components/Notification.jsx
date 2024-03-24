import React, { useEffect, useState } from "react";

const success = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  opacity: 1,
  transition: "opacity 0.5s ease-in-out",
};

const error = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  opacity: 1,
  transition: "opacity 0.5s ease-in-out",
};

const Notification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (message === null || !visible) {
    return null;
  }

  const style = message.success ? success : error;

  return <div className={message.success ? "success" : "error"} style={style}>{message.message}</div>;
};

export default Notification;
