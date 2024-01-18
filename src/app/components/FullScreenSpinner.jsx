import React from "react";

const Spinner = ({ heading }) => {
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none overflow-hidden"
        style={{ top: "60px" }}
      >
        <div className="bg-white p-4 pb-3 rounded-xl">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
    </>
  );
};

export default Spinner;
