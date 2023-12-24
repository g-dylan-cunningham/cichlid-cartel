'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Field } from '@/app/components/forms';
import SkuDeleteList from '@/app/admin/components/SkuDeleteList';
import { Button } from '@/app/components/forms';
import ImageSide from './ImageSide';

const SpeciesEdit = ({ params: { specie_id } }) => {
  useEffect(() => {
    fetch('/api/species', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ specie_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSpecie(data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [specie_id]);

  const handleSpeciesUpdate = async (values) => {
    const payload = { ...values, specie_id };
    fetch('/api/species', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((specieWithoutSkus) => {
        const newSpecie = { ...specie, ...specieWithoutSkus };
        setSpecie(newSpecie);
        setLoading(false);
      })
      .catch((e) => console.log(e));
    //   updateSpeciesWithId(e.formData);
    setIsEditable(false);
  };

  const [specie, setSpecie] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // const error = false;

  const {
    common_name = 'default',
    scientific_name = 'default',
    description = 'default',
  } = specie;

  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues: {
      common_name: common_name,
      scientific_name: scientific_name,
      description: description,
    },
    onSubmit: handleSpeciesUpdate,
    validationSchema: yup.object().shape({
      common_name: yup.string().required().min(3).max(50),
      scientific_name: yup.string(),
      description: yup.string().required().min(3).max(500),
    }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!specie) return <p>No species data</p>;

  const fields = [
    {
      component: 'Input',
      label: 'Common Name',
      type: 'text',
      name: 'common_name',
    },
    {
      component: 'Input',
      label: 'Scientific Name',
      type: 'text',
      name: 'scientific_name',
    },
    {
      component: 'TextArea',
      label: 'Description',
      type: 'textarea',
      cols: 50,
      rows: 7,
      name: 'description',
    },
  ];

  const handleChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <main className='flex min-h-screen flex-col justify-between md:items-center'>
      <Link href={`/admin`} className='link link-primary'>
        Dashboard
      </Link>
      <div className='gap-8 md:flex md:flex-col lg:grid lg:grid-cols-2'>
        {/* LEFT COLUMN */}
        <div className='flex flex-col space-y-3'>
          <div style={{ margin: '0 auto' }}>
            {isEditable ? (
              <form onSubmit={formik.handleSubmit}>
                {fields.map((item, i) => (
                  <Field
                    key={i}
                    item={item}
                    formik={formik}
                    handleChange={handleChange}
                  />
                ))}
                <div className='mt-5 flex justify-end'>
                  <Button
                    type='button'
                    variant='secondary'
                    btnClass='mr-5'
                    onClick={() => setIsEditable(false)}
                    text='Cancel'
                  />
                  <Button
                    type='submit'
                    variant='primary'
                    btnClass=''
                    text='Save'
                  />
                </div>
              </form>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                {fields.map((item, i) => (
                  <Field
                    key={i}
                    item={{ ...item, disabled: true }}
                    formik={formik}
                  />
                ))}

                <div className='mt-5 flex justify-end'>
                  <Button
                    type='submit'
                    variant='primary'
                    btnClass=''
                    text='Edit'
                    onClick={() => setIsEditable(true)}
                  />
                </div>
              </form>
            )}
          </div>
        </div>
        {/* RIGHT COLUMN   */}
        <div>
          <ImageSide
            specie={specie}
            isEditable={isEditable}
            showModal={showModal}
            setShowModal={setShowModal}
          />
          {/* <button className="btn" onClick={() => setShowModal(true)}>
            Add Pics
          </button> */}
        </div>
      </div>

      <div className='divider m-8'></div>

      {specie?.skus?.length < 1 ? (
        <Link href={`/admin/sku/create/${specie.specie_id}`}>
          add some skus
        </Link>
      ) : (
        <>
          <h3 className='text-xl'>SKUs associated with this species:</h3>
          <SkuDeleteList specie={specie} />
          <Link
            className='btn btn-outline btn-secondary btn-wide'
            href={`/admin/sku/create/${specie.specie_id}`}
          >
            Add another SKU
          </Link>
        </>
      )}
    </main>
  );
};

export default SpeciesEdit;
