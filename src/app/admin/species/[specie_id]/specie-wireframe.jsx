import React from "react";
import Main from "@/app/components/Main";

const Skeleton = ({ heading }) => (
  <Main>
    <div className="flex flex-col justify-center py-5">
      <h1 className="text-4xl mt-6 mb-2">{heading}</h1>
      <div className="skeleton w-64 h-12 my-3"></div>
      <div className="skeleton w-64 h-12 my-3"></div>
      <div className="skeleton w-64 h-12 my-3"></div>
      <div className="skeleton w-64 h-48 my-3"></div>
    </div>
  </Main>
);

export default Skeleton;
