'use client'

import React from "react";
// import { createSpecies } from "@/modules/prisma/actions";



const CreateNewSpecies = () => {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl">Add New Species:</h1>

      <div className="overflow-x-auto">
        <form
          className="flex flex-col justify-between space-y-3 mt-12"
          // action={createSpecies}
        >
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-sans">Common Name</span>
            </div>
            <input
              type="text"
              name="common_name"
              id="common_name"
              className="input input-bordered w-full max-w-xs"
            ></input>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-sans">Scientific Name</span>
            </div>
            <input
              type="text"
              name="scientific_name"
              id="scientific_name"
              className="input input-bordered w-full max-w-xs"
            ></input>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-sans">Description</span>
            </div>
            <textarea
              type="text"
              name="description"
              id="description"
              className="textarea textarea-bordered"
              cols={50}
              rows={7}
            />
          </label>

          <button type="submit" className="btn btn-primary">
            submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateNewSpecies;
