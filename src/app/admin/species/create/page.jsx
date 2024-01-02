'use client';
export const dynamic = 'force-dynamic';
export const revalidate = true;
export const fetchCache = 'force-no-store';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Field, Button } from '@/app/components/forms';
import { fields } from '../speciesConfig';
import validationSchema from '../formValidation';

const CreateNewSpecies = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  const handleSpeciesCreate = async (values) => {
    setLoading(true);
    const payload = { ...values };
    fetch('/api/species', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((specieWithoutSkus) => {
        const { specie_id } = specieWithoutSkus;

        setLoading(false);
        router.push(`/admin/species/${specie_id}`);
      })
      .catch((e) => console.log(e));
  };

  const formik = useFormik({
    // enableReinitialize: true, // need this to take latest values
    initialValues: {
      common_name: '',
      scientific_name: '',
      description: '',
      category: '',
    },
    onSubmit: handleSpeciesCreate,
    validationSchema,
  });

  const handleChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };

  console.log(formik);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-xl'>Add New Species:</h1>

      <div className='overflow-x-auto'>
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

          <div className='mt-5 flex flex-row justify-between'>
            <Link href={`/admin`} className='btn btn-outline btn-secondary'>
              Cancel
            </Link>

            <Button
              type='submit'
              className='btn btn-primary'
              text='Create'
            ></Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateNewSpecies;
