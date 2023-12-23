'use client'

import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFormik } from "formik";
import * as yup from "yup";
import { enumArr, enumMap } from '@/app/config';
import Input from "@/app/components/forms/Input";
import formValidation from "../formValidation";

const SkuCreate = ({ params: { sku_id } }) => {
  const [isSpecieLoading, setIsSpecieLoading] = useState(false);
  const [isSkuLoading, setIsSkuLoading] = useState(false);
  const [sku, setSku] = useState({});
  const router = useRouter()

  useEffect(() => {
    setIsSkuLoading(true);
    fetch(
      "/api/skus?" +
        new URLSearchParams({
          sku_id,
        })
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
    debugger
    const payload = { ...values, sku_id: sku.sku_id,specie_id: sku.species.specie_id };
    setIsSkuLoading(true);
    const res = await fetch('/api/skus', {
      method: "PATCH",
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
      size: sku?.size,
      sex: sku?.sex,
      price: sku?.price,
      quantity: sku?.quantity,
    },
    onSubmit: handleSkuUpdate,
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

  if (isSkuLoading) {
    return <div>sku loading...</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link href={`/admin`} className="link link-primary">
        Dashboard
      </Link>
      <h1 className="font-bold text-2xl capitalize">EDIT EXISTING SKU: </h1>
      <h1 className="font-bold text-l">{sku?.species?.common_name}</h1>
      <h2 className="font-bold text-lg opacity-50">
        {sku?.species?.scientific_name}
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
            href={`/admin/species/${sku?.species?.specie_id}`}
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




// // 'use client'
// import React from "react";
// import Link from "next/link";
// import prisma from "@/modules/prisma";
// import { updateSku } from "@/modules/prisma/actions";
// import { enumArr, enumMap } from "@/app/config";
// import FormInput from "@/app/components/forms/FormInput";

// const skuId = async ({ params: { sku_id } }) => {
//   const sku = await prisma.sku.findUnique({
//     where: {
//       sku_id,
//     },
//     include: {
//       species: true,
//     },
//   });

//   const updateSkuWithId = updateSku.bind(null, sku_id);
//   const { sexList, sizeList } = enumArr;
//   const { sexMap, sizeMap } = enumMap;

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <h1 className="font-bold text-xl">Edit Sku: </h1>
//       <h1 className="font-bold text-xl">{sku.species.common_name}</h1>
//       <h2 className="font-bold text-lg opacity-50">
//         {sku.species.scientific_name}
//       </h2>

//       <form className="justify-between flex flex-col" action={updateSkuWithId}>
//         {/* <div className="container"> */}
//           {/* SIZE */}

//           <FormInput label="Size">
//             <select
//               defaultValue="default"
//               name="size"
//               className="select select-bordered w-full max-w-xs"
//             >
//               <option disabled value="default">
//                 Select Size
//               </option>
//               {sizeList.map((size) => (
//                 <SelectItem key={size} value={size} label={sizeMap[size]} />
//               ))}
//             </select>
//           </FormInput>

//           {/* SEX */}
//           <FormInput label="Sex">
//           <select
//               defaultValue="default"
//               name="sex"
//               className="select select-bordered w-full max-w-xs"
//             >
//               <option disabled value="default">
//                 Select Size
//               </option>
//               {sexList.map((sex) => (
//                 <SelectItem key={sex} value={sex} label={sexMap[sex]} />
//               ))}
//             </select>
//           </FormInput>

//           {/* PRICE */}
//           <label className="form-control w-full max-w-xs">
//             <div className="label">
//               <span className="label-text font-sans">Price</span>
//             </div>
//             <input
//               type="number"
//               name="price"
//               id="price"
//               className="input input-bordered w-full max-w-xs"
//               defaultValue={sku?.price}
//               // pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
//               pattern="[0-9]"
//             ></input>
//           </label>

//           {/* QUANTITY */}
//           <label className="form-control w-full max-w-xs">
//             <div className="label">
//               <span className="label-text font-sans">Quantity</span>
//             </div>
//             <input
//               type="number"
//               name="quantity"
//               id="quantity"
//               className="input input-bordered w-full max-w-xs"
//               defaultValue={sku?.quantity}
//             ></input>
//           </label>
//         {/* </div> */}

//         {/* BUTTONS */}
//         <div className="flex flex-row justify-between mt-5">
//           <Link
//             href={`/admin/species/${sku.species.specie_id}`}
//             className="btn btn-outline btn-secondary"
//           >
//             Cancel
//           </Link>

//           <button type="submit" className="btn btn-active btn-primary">
//             Save
//           </button>
//         </div>
//       </form>
//     </main>
//   );
// };

// export default skuId;

// const SelectItem = ({ value, label = value, defaultValue }) => (
//   <option value={value}>{label}</option>
// );
