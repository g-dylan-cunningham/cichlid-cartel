"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useWindowSize } from "@uidotdev/usehooks";
import { Main } from "@/app/components";
import { useFormik } from "formik";
import { Field, Button } from "@/app/components/forms";
import validationSchema, { fields, initialValues } from "./validation";

const About = () => {
  const size = useWindowSize();
  const getPlayerDimensions = useMemo(() => {
    let width, height;
    width = Math.floor(size.width * 0.9);
    height = Math.floor(width * 0.6183);
    return { height, width };
  }, [size]);

  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccessMsg, setIsSuccessMsg] = useState(false);

  const handleEmailSubmit = async (values, { resetForm }) => {
    // setLoading(true);
    setErrorMsg("");
    setIsSuccessMsg(false);
    const payload = { ...values };
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setErrorMsg(data.message);
        } else {
          setIsSuccessMsg(true);
          resetForm();
        }
      })
      .catch((e) => console.log(e));
  };
  const handleChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };

  const formik = useFormik({
    // enableReinitialize: true, // need this to take latest values
    initialValues,
    onSubmit: handleEmailSubmit,
    validationSchema,
  });

  return (
    <Main>
      <h1 className="text-4xl pb-3">Connect With Us</h1>
      <p className="text-xl">Please add your email, name and zipcode to receive our latest offers and discounts</p>

      {isSuccessMsg && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Thank you! We&apos;ll be in touch.</span>
        </div>
      )}
      {!isSuccessMsg && (
        <form
          onSubmit={formik.handleSubmit}
          className="my-7 flex flex-col justify-between w-full md:w-3/5 lg:w-2/5 xl:w-1/4"
        >
          {errorMsg && (
            <div role="alert" className="my-3 alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {fields.map((item, i) => (
            <Field
              key={i}
              item={{ ...item }}
              formik={formik}
              handleChange={handleChange}
            />
          ))}
          <div className="mt-5 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              btnClass=""
              text="Submit"
            />
          </div>
        </form>
      )}
    </Main>
  );
};

export default About;
