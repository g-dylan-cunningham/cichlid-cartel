'use client';
import React, { useState, useContext } from 'react';
// import Content from '@/app/components/Modal/Content'

const Modal = ({ setShowModal, heading, subheading, children }) => {
  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
        <div className='relative mx-auto my-6 w-2/4 p-10'>
          {/*content*/}
          <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
            {/*header*/}

            <div>
              <div className='border-blueGray-200 flex flex-row items-start justify-between rounded-t border-b border-solid p-5'>
                <div className='flex flex-col'>
                  <h3 className='text-3xl font-bold'>{heading}</h3>

                  <h6 className='mt-1 text-2xl font-semibold text-gray-700'>
                    {subheading}
                  </h6>
                </div>

                <button
                  className='float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-60 outline-none focus:outline-none'
                  onClick={() => setShowModal(false)}
                >
                  <span className='block h-6 w-6 bg-transparent text-2xl text-black opacity-60 outline-none focus:outline-none'>
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className='relative flex-auto p-6'>{children}</div>

              {/*footer*/}
              {/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                buttons
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button>
              </div> */}
            </div>

            {/* <Content
              // isAdmin={isAdmin}
              specie={specie}
              // setShowModal={setShowModal}
              // handleTabChange={handleTabChange}
              // selectedTab={selectedTab}
            /> */}
          </div>
        </div>
      </div>
      <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
    </>
  );
};

export default Modal;
