import React, { useState } from "react";
import { uploadData } from "../api";

const Modal = ({ close, show, data }) => {
  const [name, setName] = useState("");
  const [error, setErrors] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    try {
    //   if (name.trim().length === 0) return;
      const response = await uploadData({ name, data: data });

      setErrors(false);
      setMessage(response.data.message);
    } catch (error) {
      const { response } = error;
      const msg = response.data.message || response.statusText;

      setErrors(true);
      setMessage(msg);

      console.log(`${error}`);
    }
  };
  return (
    show && (
      <div
        className={`fixed top-0 bottom-0 right-0 left-0 bg-black/60 flex items-center justify-center`}
      >
        <div className={`bg-white rounded-xl h-80 w-80 p-10 relative`}>
          <div
            className={`absolute top-3 right-3 cursor-pointer`}
            onClick={close}
          >
            &#10060;
          </div>
          <div className={`text-2xl font-bold mb-3 text-black`}>
            Save The Report ?
          </div>
          {message.length !== 0 && (
            <div
              className={`font-semibold text-sm text-center mb-3 ${
                error ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </div>
          )}
          <div className={`text-lg text-black mb-3 font-semibold`}>
            Name For Report :{" "}
          </div>
          <div className={`w-full mb-6`}>
            <input
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`shadow appearance-none border border-slate-500 rounded w-full h-12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </div>
          <button
            onClick={handleUpload}
            className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
          >
            SAVE
          </button>
        </div>
      </div>
    )
  );
};

export default Modal;
