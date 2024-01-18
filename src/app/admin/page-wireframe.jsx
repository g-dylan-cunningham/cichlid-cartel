import React from "react";
import { Main } from "@/app/components";

const WireFrame = () => (
  <Main>
    <h1 className="mb-4 text-4xl font-bold capitalize">Dashboard</h1>
    <div
      style={{
        width: "70vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="skeleton my-2 h-8 w-full"></div>
      <div className="skeleton my-3 h-16 w-full"></div>
      <div className="skeleton my-3 h-16 w-full"></div>
      <div className="skeleton my-3 h-16 w-full"></div>
      <div className="skeleton my-3 h-16 w-full"></div>
      <div className="skeleton my-8 h-16 w-48"></div>
    </div>
  </Main>
);

export default WireFrame;
