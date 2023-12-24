"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { enumArr, enumMap } from "@/app/config";
import { Field } from "@/app/components/forms";
import formValidation from "../../formValidation";

const SkuCreate = ({ params: { specie_id } }) => {
  const [isSpecieLoading, setIsSpecieLoading] = useState(false);
  const [isSkuLoading, setIsSkuLoading] = useState(false);
  const [specie, setSpecie] = useState({});
  const router = useRouter();

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
    const res = await fetch("/api/skus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSkuLoading(false);
        router.push(`/admin/species/${specie_id}`);
      })
      .catch((e) => {
        setIsSkuLoading(false);
        console.log(e);
      });
  };

  const { sexList, sizeList } = enumArr;
  const { sexMap, sizeMap } = enumMap;

  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues: {
      size: "default",
      sex: "default",
      price: "",
      quantity: "",
    },
    onSubmit: handleSkuCreate,
    validate: formValidation,
  });

  const handleChange = (e) => {
    const { target } = e;
    if (target.name === "price") {
      formik.setFieldValue(
        target.name,
        target.value.replace(/[^0-9\.\$]/g, "")
      );
    } else {
      formik.setFieldValue(target.name, target.value);
    }
  };

  if (isSpecieLoading) {
    return <div>specie loading...</div>;
  }

  const fields = [
    {
      component: "Select",
      label: "Size",
      name: "size",
      list: sizeList,
      map: sizeMap,
    },
    {
      component: "Select",
      label: "Sex",
      name: "sex",
      list: sexList,
      map: sexMap,
    },
    {
      component: "Input",
      label: "Price (ex. 99.99)",
      type: "text",
      name: "price",
    },
    { component: "Input", label: "Quantity", type: "number", name: "quantity" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-2xl capitalize">Create Sku: </h1>
      <h1 className="font-bold text-l">{specie.common_name}</h1>
      <h2 className="font-bold text-lg opacity-50">{specie.scientific_name}</h2>

      <form
        onSubmit={formik.handleSubmit}
        className="justify-between flex flex-col"
      >
        {fields.map((item, i) => (
          <Field
            key={i}
            item={{ ...item }}
            formik={formik}
            handleChange={handleChange}
          />
        ))}

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
