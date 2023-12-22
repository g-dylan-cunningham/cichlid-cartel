import prisma from "@/modules/prisma";
import Link from "next/link";
import Image from "next/image";


export default async function Admin() {

  const species = await prisma.species.findMany({
    orderBy: { created_at: "desc" },
    include: { skus: true },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl">My Store Offerings:</h1>

      <div className="overflow-x-auto">
        <table className="table-auto">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>EDIT</label>
              </th>
              <th>Species</th>
              {/* <th>Scientific Name</th> */}
              <th>Description</th>
              <th>Sizes</th>
              <th>Price</th>
              <th>Sex</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {species.map((specie) => (
              <tr key={specie.specie_id}>
                <td>
                  <Link
                    href={`/admin/species/${specie.specie_id}`}
                    className="link link-primary"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          src="/next.svg" // TODO make into fish image
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

                <td>{specie.description}</td>
                <td>
                  <TableElement specie={specie} property="size" />
                </td>
                <td>
                  <TableElement specie={specie} property="price" />
                </td>
                <td>
                  <TableElement specie={specie} property="sex" />
                </td>
                <td>
                  <TableElement specie={specie} property="quantity" />
                </td>
                <td>
                  <Link
                    href={`/admin/sku//create/${specie.specie_id}`}
                    className="badge badge-accent badge-sm block"
                  >
                    Add New
                  </Link>{" "}
                  
                  <div
                    className="badge badge-warning badge-sm block mt-2"
                  >
                    Delete Sku
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <Link
                  href={`/admin/species/create`}
                  className="link link-primary"
                >
                  Create Species
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="divider m-12"></div>
    </main>
  );
}

const TableElement = ({ specie, property }) => {

  return (
    <ul>
      {specie.skus.map((sku, i) => {
        return (
          <li key={sku.sku_id}>
            <Link
              href={`/admin/sku/${sku.sku_id}`}
              className="badge badge-ghost badge-sm"
            >
              {sku[property]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
