'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Field } from '@/app/components/forms';
import { Main } from '@/app/components';
import formValidation from '@/app/admin/sku/formValidation';
import { fields } from '@/app/admin/sku/skuConfig';

const SkuCreate = ({ params: { specie_id } }) => {
  const [isSpecieLoading, setIsSpecieLoading] = useState(false);
  const [isSkuLoading, setIsSkuLoading] = useState(false);
  const [specie, setSpecie] = useState({});
  const router = useRouter();

  useEffect(() => {
    setIsSpecieLoading(true);
    fetch(
      '/api/species?' +
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
    debugger;
    const res = await fetch('/api/skus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1 },
      // next: { revalidate: 10 },
      cache: 'no-store',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSkuLoading(false);
        router.push(`/admin/sku/list/${specie_id}`);
      })
      .catch((e) => {
        setIsSkuLoading(false);
        console.log(e);
      });
  };

  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues: {
      size: 'default',
      sex: 'default',
      price: '',
      quantity: '',
    },
    onSubmit: handleSkuCreate,
    validate: formValidation,
  });

  const handleChange = (e) => {
    const { target } = e;
    if (target.name === 'price') {
      formik.setFieldValue(
        target.name,
        target.value.replace(/[^0-9\.\$]/g, '')
      );
    } else {
      formik.setFieldValue(target.name, target.value);
    }
  };

  if (isSpecieLoading)
    return (
      <Main>
        <h1 className='text-2xl font-bold capitalize'>Create Sku: </h1>
        <div className='skeleton my-1 h-6 w-36'></div>
        <div className='skeleton my-1 h-8 w-48'></div>
        <div className='skeleton my-3 h-12 w-64'></div>
        <div className='skeleton my-3 h-12 w-64'></div>
        <div className='skeleton my-3 h-12 w-64'></div>
        <div className='skeleton my-3 h-48 w-64'></div>
      </Main>
    );

  return (
    <Main>
      <h1 className='text-2xl font-bold capitalize'>Create Sku: </h1>
      <h2 className='text-l font-bold'>{specie.common_name}</h2>
      <h3 className='text-lg font-bold opacity-50'>{specie.scientific_name}</h3>

      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col justify-between'
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
        <div className='mt-5 flex flex-row justify-between'>
          <Link
            href={`/admin/species/${specie.specie_id}`}
            className='btn btn-outline btn-secondary'
          >
            Cancel
          </Link>

          <button type='submit' className='btn btn-primary btn-active'>
            Save
          </button>
        </div>
      </form>
    </Main>
  );
};

export default SkuCreate;
