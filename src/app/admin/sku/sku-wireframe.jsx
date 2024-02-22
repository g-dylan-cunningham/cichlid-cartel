import React from "react";
import Main from "@/app/components/Main";

const Skeleton = ({ heading }) => (
  <Main>
    <h1 className="text-2xl font-bold capitalize">{heading}</h1>
    <div className="skeleton my-1 h-6 w-36"></div>
    <div className="skeleton my-1 h-8 w-48"></div>
    <div className="skeleton my-3 h-12 w-64"></div>
    <div className="skeleton my-3 h-12 w-64"></div>
    <div className="skeleton my-3 h-12 w-64"></div>
    <div className="skeleton my-3 h-48 w-64"></div>
  </Main>
);

export default Skeleton;
