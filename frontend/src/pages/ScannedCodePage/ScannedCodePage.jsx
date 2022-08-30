import React, { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import CSVIcon from "../../assets/csv.png";
import uploadIcon from "../../assets/upload.png";
import Modal from "../../components/Modal";
import { ScanContext } from "../../Context/ScanContext";

const ScannedCodePage = () => {
  const { socket } = useContext(ScanContext);
  const [showModal, setShowModal] = useState(false);
  const [codes, setCodes] = useState([]);

  const handleResp = (codeData) => {
    setCodes((preCode) => {
      return [...preCode, codeData];
    });
  };

  useEffect(() => {
    socket.on("scanned code", handleResp);
    return () => socket.off("scanned code", handleResp)
  }, [socket, handleResp]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div
      className={`h-screen bg-slate-100 grid grid-cols-5 auto-rows-min gap-1 justify-center ml-20 mr-20`}
    >
      {[
        "Serial No.",
        "Barcode Value",
        "Code Type",
        "Product Name",
        "Product Value",
      ].map((field, index) => {
        return (
          <div
            key={index}
            className={`flex justify-center items-center bg-green-500 text-white h-10 uppercase font-thin rounded-md`}
          >
            {field}
          </div>
        );
      })}
      {codes.map((code, index) => {
        return (
          <>
            <div
              key={index}
              className={`flex justify-center items-center bg-white text-black h-10 uppercase font-thin rounded-md`}
            >
              {index + 1}
            </div>
            <div
              className={`flex justify-center items-center bg-white text-black h-10 uppercase font-thin rounded-md`}
            >
              {code.value}
            </div>
            <div
              className={`flex justify-center items-center bg-white text-black h-10 uppercase font-thin rounded-md`}
            >
              {code.type}
            </div>
            <div
              className={`flex justify-center items-center bg-white text-black h-10 uppercase font-thin rounded-md`}
            >
              {code.productName ? code.productName : "N/A"}
            </div>
            <div
              className={`flex justify-center items-center bg-white text-black h-10 uppercase font-thin rounded-md`}
            >
              {code.productPrice ? code.productPrice : "N/A"}
            </div>
          </>
        );
      })}
      <div className={`absolute bottom-2 left-2 rounded-full d bg-slate-500`}>
        <div
          onClick={handleOpenModal}
          className={`p-2 box-content rounded-full bg-green-500 hover:bg-green-400 h-10 w-10 flex items-center justify-center`}
        >
          <img
            src={uploadIcon}
            className={`h-full w-full object-cover`}
            alt="Download CSV"
          />
        </div>
      </div>
      <div className={`absolute bottom-2 right-2 rounded-full bg-slate-500`}>
        <CSVLink data={codes}>
          <div
            className={`p-2 box-content rounded-full bg-green-500 hover:bg-green-400 h-10 w-10 flex items-center justify-center`}
          >
            <img
              src={CSVIcon}
              className={`h-full w-full object-cover`}
              alt="Download CSV"
            />
          </div>
        </CSVLink>
      </div>
      <Modal show={showModal} data={codes} close={handleCloseModal} />
    </div>
  );
};

export default ScannedCodePage;
