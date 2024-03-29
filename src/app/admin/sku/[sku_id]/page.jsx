"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Field } from "@/app/components/forms";
import { Main, BackButton } from "@/app/components";
import formValidation from "@/app/admin/sku/formValidation";
import { fields } from "@/app/admin/sku/skuConfig";
import isAuth from "@/app/providers/Admin/isAuthHoc";
import Skeleton from "../sku-wireframe";

const SkuCreate = ({ params: { sku_id } }) => {
  const [isSkuLoading, setIsSkuLoading] = useState(false);
  const [sku, setSku] = useState({});
  const router = useRouter();

  useEffect(() => {
    setIsSkuLoading(true);
    fetch(
      "/api/skus?" +
        new URLSearchParams({
          sku_id,
        }),
    )
      .then((res) => res.json())
      .then((data) => {
        setSku(data);
        setIsSkuLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsSkuLoading(false);
      });
  }, [sku_id]);

  const handleSkuUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        sku_id: sku.sku_id,
        specie_id: sku.species.specie_id,
      };
      setIsSkuLoading(true);
      const res = fetch("/api/skus", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsSkuLoading(false);
          router.push(`/admin/sku/list/${data.specie_id}`);
        })
        .catch((e) => {
          setIsSkuLoading(false);
          console.log("eeee", e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSkuDelete = async () => {
    fetch("/api/skus", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sku_id: sku.sku_id,
        specie: sku.species.specie_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("deleted sku", data);
        // setIsAdmin(false)
        router.push(`/admin/species/${sku?.species?.specie_id}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues: {
      size: sku?.size,
      sex: sku?.sex,
      price: sku?.price,
      quantity: sku?.quantity,
    },
    onSubmit: handleSkuUpdate,
    validate: formValidation,
  });

  const handleChange = (e) => {
    const { target } = e;
    if (target.name === "price") {
      formik.setFieldValue(
        target.name,
        target.value.replace(/[^0-9\.\$]/g, ""),
      );
    } else {
      formik.setFieldValue(target.name, target.value);
    }
  };
  
  const heading = "Edit SKU";
  if (isSkuLoading) return <Skeleton heading={heading} />;

  return (
    <Main>
      <BackButton />
      <h1 className="text-2xl font-bold capitalize">{heading}</h1>
      <h2 className="text-l font-bold">{sku?.species?.common_name}</h2>
      <h3 className="text-lg font-bold opacity-50">
        {sku?.species?.scientific_name}
      </h3>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-between"
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

        <div className="mt-5 flex flex-row justify-between">
          {/* <Link
            href={`/admin/species/${sku?.species?.specie_id}`}
            className='btn btn-outline btn-secondary'
          > */}
          <button className="btn btn-error" onClick={handleSkuDelete}>
            Delete
          </button>
          {/* 
          </Link> */}

          <button type="submit" className="btn btn-primary btn-active">
            Save
          </button>
        </div>
      </form>
    </Main>
  );
};

export default isAuth(SkuCreate);
