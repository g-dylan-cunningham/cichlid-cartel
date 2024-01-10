"use client";
import { createContext, useState } from "react";
import { useRouter } from 'next/navigation';
import ModalComponent from '@/app/components/Modal';

export const AdminContext = createContext(false);

const AdminProvider = ({ children, isValidToken }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogOut = async () => {
    fetch('/api/login', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(false)
        router.push('/')
      })
      .catch((e) => {
        setIsAdmin(false)
        console.log(e)
      });
  }

  return (
    <AdminContext.Provider value={isValidToken || isAdmin}>
      {showModal && (
        <Modal setShowModal={setShowModal} setIsAdmin={setIsAdmin} />
      )}
      {children}
      <div style={{ position: "absolute", top: "10", left: "0", zIndex:"1001"}}>
        {!(isValidToken || isAdmin) ? (
          <button className="btn btn-ghost" onClick={() => setShowModal(true)}>
            Log In
          </button>
        ) : (
          <button className="btn btn-ghost" onClick={handleLogOut}>
            Log Out
          </button>
        )}
      </div>
    </AdminContext.Provider>
  );
};

const Modal = ({ setShowModal, setIsAdmin }) => {
  const router = useRouter();
  const [isLoginError, setIsLoginError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const pojo = Object.fromEntries(formData);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pojo),
    });
    if (response.ok) {
      if (response.status !== 200) {
        return handleFailure()
      }
      setIsLoginError(false);
      await response.json();
      setShowModal(false);
      setIsAdmin(true);
      router.push('/admin')
    } else {
      handleFailure();
      console.error(response)
    }

    function handleFailure() {
      setIsLoginError(true);
      setIsAdmin(false);
    }
  };
  return (
    <ModalComponent
      heading="Please Login"
      subheading=""
      setShowModal={setShowModal}
    >
    {isLoginError && (
      <div role="alert" className="alert alert-error m-5 w-5/6">
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
        <span>Login failed. Please try again.</span>
      </div>
    )}
<form className="space-y-4 m-12 mt-3 mb-3" onSubmit={handleSubmit}>
              <div>
                <label className="label" htmlFor="email">
                  <span className="text-base label-text">Email</span>
                </label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  placeholder="Email Address"
                  className="w-full input input-bordered input-primary"
                />
              </div>
              <div>
                <label className="label" htmlFor="password">
                  <span className="text-base label-text">Password</span>
                </label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  className="w-full input input-bordered input-primary"
                />
              </div>

              <div className="flex items-center justify-end p-3 border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
    </ModalComponent>



    // <>
    //   <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
    //     <div className="relative my-6 mx-auto w-2/5 p-10">
    //       {/*content*/}
    //       <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
    //         {/*header*/}

    //         <div className="flex flex-row items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
    //           <div className="flex flex-col">
    //             <h3 className="text-3xl font-bold">Please Login</h3>
    //           </div>

    //           <button
    //             className="p-1 ml-auto bg-transparent border-0 text-black opacity-60 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
    //             onClick={() => setShowModal(false)}
    //           >
    //             <span className="bg-transparent text-black opacity-60 h-6 w-6 text-2xl block outline-none focus:outline-none">
    //               X
    //             </span>
    //           </button>
    //         </div>
    //         {/*body*/}

            

            
    //       </div>
    //     </div>
    //   </div>
    //   <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    // </>
  );
};

export default AdminProvider;
