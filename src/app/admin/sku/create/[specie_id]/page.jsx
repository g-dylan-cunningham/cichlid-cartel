'use client'

import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFormik } from "formik";
import * as yup from "yup";
import { enumArr, enumMap } from '@/app/config';
import Input from "@/app/components/forms/Input";
import formValidation from "./formValidation";

const SkuCreate = ({ params: { specie_id } }) => {
  const [isSpecieLoading, setIsSpecieLoading] = useState(false);
  const [isSkuLoading, setIsSkuLoading] = useState(false);
  const [specie, setSpecie] = useState({});
  const router = useRouter()

  useEffect(() => {
    setIsSpecieLoading(true);
    fetch(
      "/api/species?" +
        new URLSearchParams({
          specie_id,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setSpecie(data);
        setIsSpecieLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsSpecieLoading(false);
      });
  }, [specie_id]);

  const handleSkuCreate = async (values) => {
    const payload = { ...values, specie_id };
    setIsSkuLoading(true);
    const res = await fetch('/api/skus', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSkuLoading(false);
        router.push(`/admin/species/${specie_id}`)
      })
      .catch((e) => {
        setIsSkuLoading(false);
        console.log(e)
      });
  }

  const { sexList, sizeList } = enumArr;
  const { sexMap, sizeMap } = enumMap;

  const textInputs = [
    { label: "Price (ex. 99.99)", type: "text", name: "price" },
    { label: "Quantity", type: "number", name: "quantity" },
  ]

  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues: {
      size: 'default',
      sex: 'default',
      price: '',
      quantity: '',
    },
    onSubmit: handleSkuCreate,
    validate: formValidation
  });

  const handleChange = (e) => {
    const { target } = e;
    if (target.name === 'price') {
      formik.setFieldValue(target.name, target.value.replace(/[^0-9\.\$]/g,""));
    } else {
      formik.setFieldValue(target.name, target.value);
    }
  };

  if (isSpecieLoading) {
    return <div>specie loading...</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-2xl capitalize">Create Sku: </h1>
      <h1 className="font-bold text-l">{specie.common_name}</h1>
      <h2 className="font-bold text-lg opacity-50">
        {specie.scientific_name}
      </h2>

      <form onSubmit={formik.handleSubmit} className="justify-between flex flex-col">
        <div className="container">
          {/* SIZE */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-sans">Size</span>
            </div>
            <select
              name="size"
              className={`select select-bordered w-full max-w-xs
              ${
                formik.errors.size
                  ? "border border-red-400 focus:border-red-400"
                  : ""
              }`}
              onChange={handleChange}
              value={formik.values?.size}
            >
              <option disabled value="default">
                Select Size
              </option>
              {sizeList.map((size) => (
                <SelectItem key={size} value={size} label={sizeMap[size]} />
              ))}
            </select>
            {formik.errors.size && formik.touched.size && (
        <span className="mt-1 text-m text-red-400">{formik.errors.size}</span>
      )}
          </label>

          {/* SEX */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-sans">Sex</span>
            </div>
            <select
              name="sex"
              className={`select select-bordered w-full max-w-xs
              ${
                formik.errors.sex
                  ? "border border-red-400 focus:border-red-400"
                  : ""
              }`}
              onChange={handleChange}
              value={formik.values?.sex}
            >
              <option value="default" disabled>
                Select sex
              </option>
              {sexList.map((sex) => (
                <SelectItem key={sex} value={sex} label={sexMap[sex]} />
              ))}
            </select>
            {formik.errors.sex && formik.touched.sex && (
        <span className="mt-1 text-m text-red-400">{formik.errors.sex}</span>
      )}
          </label>
        </div>

        <div className="container">
        {textInputs.map((item, i) => (
          <Input
            key={i}
            item={{ ...item }}
            formik={formik}
            handleChange={handleChange}
          />
        ))}
        </div>

        {/* BUTTONS */}
        <div className="flex flex-row justify-between mt-5">
          <Link
            href={`/admin/species/${specie.specie_id}`}
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

export default SkuCreate;

const SelectItem = ({ value, label = value }) => (
  <option value={value}>{label}</option>
);