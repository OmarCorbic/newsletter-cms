"use client";
import { Customer } from "@/app/lib/definitions";
import { LuSearchX } from "react-icons/lu";

function Table({
  checked,
  customers,
  checkAll,
  checkSingle,
}: {
  checked: { id: string; email: string }[];
  customers: Customer[];
  checkAll: (checked: boolean) => void;
  checkSingle: (id: string) => void;
}) {
  return (
    <table className=" hidden min-w-full  text-gray-900 md:block text-left rounded-lg bg-slate-900">
      <thead className="rounded-lg block w-full  top-0 left-0 text-left text-sm font-normal text-white">
        <tr className="grid grid-cols-4 grid-rows-1 w-full items-center justify-items-start">
          <th className=" w-14 flex items-center justify-center font-medium">
            <input
              onChange={(e) => checkAll(e.target.checked)}
              className="w-4 h-4"
              type="checkbox"
              checked={
                customers.find(
                  (customer) =>
                    !checked.find((checked) => checked.id === customer.id)
                )
                  ? false
                  : true
              }
              name="check-all"
            />
          </th>
          <th className="px-3 flex items-center justify-center py-4 font-medium ">
            Customer
          </th>
          <th className="px-3 flex items-center justify-center py-4 font-medium">
            Email
          </th>
          <th className="px-3 flex items-center justify-center py-4 font-medium">
            Company
          </th>
        </tr>
      </thead>
      <tbody className="bg-white w-full block h-[320px]  overflow-y-auto rounded-lg">
        {customers?.length < 1 ? (
          <tr className="w-full h-full  border-b  text-sm flex items-center">
            <td className="whitespace-nowrap w-full  h-full text-center font-bold  flex items-center gap-3 py-3 text-lg justify-center ">
              <p>No customers found</p>
              <span className="text-3xl">
                <LuSearchX />
              </span>
            </td>
          </tr>
        ) : (
          customers?.map((customer) => (
            <tr
              key={customer.id}
              className="w-full   border-b  text-sm grid grid-cols-4 grid-rows-1 items-center justify-items-start"
            >
              <td className="whitespace-nowrap  w-14 flex items-center py-3 justify-center ">
                <input
                  onChange={() => checkSingle(customer.id)}
                  className="w-4 h-4"
                  checked={
                    checked.find((checked) => checked.id === customer.id)
                      ? true
                      : false
                  }
                  type="checkbox"
                />
              </td>
              <td className="px-3  flex items-center justify-center py-3 font-medium">
                {customer.name}
              </td>
              <td className="px-3  flex items-center justify-center py-3 font-medium">
                {customer.email}
              </td>
              <td className="px-3  flex items-center justify-center py-3 font-medium">
                {customer.company}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
