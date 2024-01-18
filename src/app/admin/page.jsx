"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Main } from "@/app/components";
import styles from "./styles.module.css";
import Modal from "@/app/components/Modal";
import { deleteSpecie } from "@/services/api";
import WireFrame from "./page-wireframe";

const Admin = () => {
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [isSpeciesDeleteLoading, setIsSpeciesDeleteLoading] = useState(false);
  const [species, setSpecies] = useState([]);
  const [isDangerModal, setIsDangerModal] = useState(false);
  const [currentSpecie, setCurrentSpecie] = useState({});

  useEffect(() => { // fetch all species for initial load
    setIsDashboardLoading(true);
    fetch(
      "/api/species"
    )
      .then((res) => res.json())
      .then((data) => {
        setSpecies(data);
        setIsDashboardLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsDashboardLoading(false);
      });
  }, []);

  const handleDeleteSpecies = async (specie) => {
    setIsSpeciesDeleteLoading(true);
    function onSuccess(data) {
      console.log('on success data', data)
    }
    function onFailure(data) {
      console.log('on failure data', data)
    }
    await deleteSpecie(specie, onSuccess, onFailure);
    setIsSpeciesDeleteLoading(false);
  }

  const getFirstThumbnail = useCallback((imageArr) => {
    let image = imageArr.find(el => el.is_thumbnail === true)
    // console.log('image;', image)
    return image?.thumbnail_url;
  }, [])

  if (isDashboardLoading)
    return <WireFrame />;

  return (
    <Main>
      {
        isSpeciesDeleteLoading && (
          <Modal heading="please wait..." />
        )
      }
      {isDangerModal && (
        <Modal
          setShowModal={setIsDangerModal}
          heading="WARNING - this is permanent!"
          subheading="Deleting a species also deletes all associated images and SKUs"
        >
          <div>
            <p className="text-xl pb-5 text-center">
              * A species that has no SKUs will appear as &apos;out of stock&apos;
            </p>
            <div className="flex justify-center px-12 lg:px-24">
              <button className="btn btn-error mx-3" onClick={() => handleDeleteSpecies(currentSpecie)}>DELETE</button>
              <button
                className="btn btn-outline mx-3"
                onClick={() => setIsDangerModal(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </Modal>
      )}
      <h1 className="mb-4 text-4xl font-bold capitalize">Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table table-pin-rows table-pin-cols table-xs">
          {/* head */}
          <thead className="hidden md:table-header-group">
            <tr className="m-6">
              <th className="hidden md:table-cell">
                <label></label>
              </th>
              <th className="hidden md:table-cell">Species</th>
              <th className="hidden md:table-cell">Description</th>
              <th className="hidden md:table-cell">
                Sizes
                <img
                  id={styles.sizeInfoIcon}
                  src="/iconInfo.svg"
                  className="h-4 w-4"
                  alt="size chart"
                  title="size chart"
                />
                <div className={styles.sizeInfo}>
                  MY INFO what is this?{" "}
                </div>
              </th>
              <th className="hidden md:table-cell">Price</th>
              <th className="hidden md:table-cell">Sex</th>
              <th className="hidden md:table-cell">Quantity</th>
              <th className="hidden md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {species.map((specie) => (
              // DESKTOP
              <tr key={specie.specie_id}>
                <td className="DESKTOP hidden md:table-cell">
                  <div className="flex flex-col justify-evenly">
                    <Link
                      href={`/admin/species/${specie.specie_id}`}
                      className="btn btn-outline btn-xs hover:font-bold hover:underline"
                    >
                      EDIT
                    </Link>
                    <button
                      className="btn btn-outline btn-error btn-xs"
                      onClick={() => {
                        setCurrentSpecie(specie)
                        setIsDangerModal(true);
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </td>
                <td className="DESKTOP hidden md:table-cell">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={getFirstThumbnail(specie.images)}
                          alt=""
                          width={30}
                          height={30}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{specie.common_name}</div>
                      <div className="text-sm opacity-50">
                        {specie.scientific_name}
                      </div>
                    </div>
                  </div>
                </td>

                <td
                  className="hidden md:table-cell"
                  style={{ maxWidth: "10vw" }}
                >
                  {specie.description}
                </td>
                <td className="hidden md:table-cell">
                  <TableElement specie={specie} property="size" />
                </td>
                <td className="hidden md:table-cell">
                  <TableElement specie={specie} property="price" />
                </td>
                <td className="hidden md:table-cell">
                  <TableElement specie={specie} property="sex" />
                </td>
                <td className="hidden md:table-cell">
                  <TableElement specie={specie} property="quantity" />
                </td>
                <td className="hidden md:table-cell">
                  <Link
                    href={`/admin/sku//create/${specie.specie_id}`}
                    className="badge badge-accent badge-sm block hover:bg-green-200 hover:font-bold hover:underline"
                  >
                    Add SKU
                  </Link>
                </td>

                {/* // MOBILE */}
                <td className="pt-2 align-top md:hidden">
                  <Link
                    href={`/admin/species/${specie.specie_id}`}
                    className="badge badge-ghost badge-sm py-3"
                  >
                    EDIT
                  </Link>
                  <Link
                    href={`/admin/sku//create/${specie.specie_id}`}
                    className="badge badge-accent badge-sm mt-2 py-2"
                  >
                    ADD
                  </Link>
                </td>
                <td className="pt-2 align-top md:hidden">
                  {specie.common_name ? (
                    <div className="font-bold">{specie.common_name}</div>
                  ) : (
                    <div className="font-bold">{specie.scientific_name}</div>
                  )}
                </td>
                <td className="space-between flex w-full align-top md:hidden">
                  {/* mobile table for the sku elements */}
                  <table>
                    <tbody className="w-full">
                      <tr className="w-full">
                        <td className="w-1/4">
                          <TableElement
                            specie={specie}
                            property="size"
                            isMobile={true}
                          />
                        </td>
                        <td className="w-1/4">
                          <TableElement
                            specie={specie}
                            property="price"
                            isMobile={true}
                          />
                        </td>
                        <td className="w-1/4">
                          <TableElement
                            specie={specie}
                            property="sex"
                            isMobile={true}
                          />
                        </td>
                        <td className="w-1/4">
                          <TableElement
                            specie={specie}
                            property="quantity"
                            isMobile={true}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr></tr>
          </tfoot>
        </table>
        <div className="mt-3 flex w-full justify-center">
          <Link href={`/admin/species/create`} className="btn btn-primary mt-3">
            Add New Species
          </Link>
        </div>
      </div>

      <div className="divider m-12"></div>
    </Main>
  );
};

const TableElement = ({ specie, property, isMobile }) => {
  if (isMobile) {
    return (
      <ul className="flex flex-col">
        {specie.skus.map((sku, i) => {
          return (
            <li className="grow" key={sku.sku_id}>
              {property === "price" && "$"}
              {sku[property]}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul>
      {specie.skus.map((sku, i) => {
        return (
          <li key={sku.sku_id}>
            <Link
              href={`/admin/sku/${sku.sku_id}`}
              className="badge badge-ghost badge-sm"
            >
              {property === "price" && "$"}
              {sku[property]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Admin;
