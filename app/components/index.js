import React from "react";
import Button from "../components/Button";
import NoData from "../components/NoData";

const GlobalContext = React.createContext();
const NotificationContext = React.createContext();

export { NotificationContext, Button, NoData };
