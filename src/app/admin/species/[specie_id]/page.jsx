'use client';
export const dynamic = 'force-dynamic';
export const revalidate = true;
export const fetchCache = 'force-no-store';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { Field, Button } from '@/app/components/forms';
import { fields } from '../speciesConfig';
import validationSchema from '../formValidation'
import SkuList from '@/app/admin/components/SkuList';
import ImageSide from './ImageSide';

const SpeciesEdit = ({ params: { specie_id } }) => {
  useEffect(() => {
    fetch(`/api/species?specie_id=${specie_id}`)
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

  const {
    common_name = 'default', // 'default' is for validation (not enum)
    scientific_name = 'default',
    description = 'default',
    category = 'OTHER', // 'OTHER' is db enum
  } = specie;

  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues: {
      common_name: common_name,
      scientific_name: scientific_name,
      description: description,
      category: category
    },
    onSubmit: handleSpeciesUpdate,
    validationSchema,
  });

  if (isLoading) return (
    <div className="skeleton w-32 h-32"></div>
  );
  if (!specie) return <p>No species data</p>;

  const handleChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };
  // console.log('formik', formik);
  return (
    <main className='flex min-h-screen flex-col justify-between md:items-center mt-20'>
      {/* <Link href={`/admin`} className='link link-primary'>
        Dashboard
      </Link> */}
      <div className='gap-8 flex flex-col lg:grid lg:grid-cols-2'>
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
                  <button type='submit' className='btn btn-primary btn-active'>
                    Save
                  </button>
                  {/* <Button
                    type='submit'
                    variant='primary'
                    btnClass=''
                    text='Save'
                  /> */}
                </div>
              </form>
            ) : (
              <form>
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
        <div className="sm:m-24">
          <ImageSide
            specie={specie}
            isEditable={isEditable}
            showModal={showModal}
            setShowModal={setShowModal}
          />
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
          <SkuList specie={specie} isDeleteEnabled={false}>
            <Link
              className='btn btn-outline btn-secondary btn-wide'
              href={`/admin/sku/list/${specie.specie_id}`}
            >
              SKU details
            </Link>
          </SkuList>
        </>
      )}
    </main>
  );
};

export default SpeciesEdit;
