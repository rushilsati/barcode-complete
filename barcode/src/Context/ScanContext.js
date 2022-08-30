import React, { createContext, useState } from "react";
import io from "socket.io-client"
import config from "../../config";

export const ScanContext = createContext();
const socket = io(config.api);

const ScanProvider = ({ children }) => {
  return (
    <ScanContext.Provider value={{ socket }}>{children}</ScanContext.Provider>
  );
};

export default ScanProvider;
