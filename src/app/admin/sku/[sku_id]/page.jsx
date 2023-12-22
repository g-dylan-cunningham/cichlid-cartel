// 'use client'
import React from "react";
import Link from "next/link";
import prisma from "@/modules/prisma";
import { updateSku } from "@/modules/prisma/actions";
import { enumArr, enumMap } from "@/app/config";
import FormInput from "@/app/components/forms/FormInput";

const skuId = async ({ params: { sku_id } }) => {
  const sku = await prisma.sku.findUnique({
    where: {
      sku_id,
    },
    include: {
      species: true,
    },
  });

  const updateSkuWithId = updateSku.bind(null, sku_id);
  const { sexList, sizeList } = enumArr;
  const { sexMap, sizeMap } = enumMap;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-xl">Edit Sku: </h1>
      <h1 className="font-bold text-xl">{sku.species.common_name}</h1>
      <h2 className="font-bold text-lg opacity-50">
        {sku.species.scientific_name}
      </h2>

      <form className="justify-between flex flex-col" action={updateSkuWithId}>
        {/* <div className="container"> */}
          {/* SIZE */}

          <FormInput label="Size">
            <select
              defaultValue="default"
              name="size"
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled value="default">
                Select Size
              </option>
              {sizeList.map((size) => (
                <SelectItem key={size} value={size} label={sizeMap[size]} />
              ))}
            </select>
          </FormInput>

          {/* SEX */}
          <FormInput label="Sex">
          <select
              defaultValue="default"
              name="sex"
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled value="default">
                Select Size
              </option>
              {sexList.map((sex) => (
                <SelectItem key={sex} value={sex} label={sexMap[sex]} />
              ))}
            </select>
          </FormInput>

          {/* PRICE */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-sans">Price</span>
            </div>
            <input
              type="number"
              name="price"
              id="price"
              className="input input-bordered w-full max-w-xs"
              defaultValue={sku?.price}
              // pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
              pattern="[0-9]"
            ></input>
          </label>

          {/* QUANTITY */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-sans">Quantity</span>
            </div>
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="input input-bordered w-full max-w-xs"
              defaultValue={sku?.quantity}
            ></input>
          </label>
        {/* </div> */}

        {/* BUTTONS */}
        <div className="flex flex-row justify-between mt-5">
          <Link
            href={`/admin/species/${sku.species.specie_id}`}
            className="btn btn-outline btn-secondary"
          >
            Cancel
          </Link>

          <button type="submit" className="btn btn-active btn-primary">
            Save
          </button>
        </div>
      </form>
    </main>
  );
};

export default skuId;

const SelectItem = ({ value, label = value, defaultValue }) => (
  <option value={value}>{label}</option>
);
