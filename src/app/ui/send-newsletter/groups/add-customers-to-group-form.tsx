import { Customer, Group } from "@/app/lib/definitions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import Modal from "../../modal";
import { groupCustomers } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import Button from "../../button";

export function SaveCustomerForm({
  checked,
  groups,
}: {
  checked: Customer[];
  groups: Group[];
}) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const searchParams = useSearchParams();

  const actionPayload = {
    groupId: selectedGroupId,
    customers: [...checked.map((c) => c.id)],
  };

  const groupCustomersBound = groupCustomers.bind(null, actionPayload);
  const [state, dispatch] = useFormState(groupCustomersBound, undefined);
  const { pending } = useFormStatus();

  const handleSelectChange = (e: any) => {
    const id = e.target.value;
    setSelectedGroupId(id);
  };
  const handleCancel = () => {
    setShowSaveModal(false);
    setSelectedGroupId("");
  };

  useEffect(() => {
    if (!state || !state.message) return;

    if (!state.success) {
      toast.error(state.message);
    } else if (state.success) {
      toast.success(state.message);
      setShowSaveModal(false);
    }
  }, [state]);

  if (searchParams.get("group") || checked.length < 1) {
    return null;
  }
  return (
    <>
      {showSaveModal && (
        <Modal onClick={handleCancel}>
          <form
            className="flex flex-col p-5 gap-5 bg-slate-900 rounded-md border-2 border-slate-600 w-[600px] max-h-[600px] overflow-y-auto"
            action={dispatch}
          >
            <div className="font-bold text-xl text-center">
              Save customers to a group
            </div>
            <div className="font-bold text-lg">Selected customers</div>

            <div className="rounded-md w-full gap-[1px] flex overflow-hidden text-black flex-col">
              <div className="grid grid-rows-1 py-1 font-semibold bg-slate-100 grid-cols-3 text-center w-full">
                <div>Name</div>
                <div>Email</div>
                <div>Company</div>
              </div>
              <ol className="overflow-y-auto">
                {checked?.map((customer, i) => {
                  return (
                    <li className="grid grid-rows-1 relative items-center text-sm bg-slate-100 grid-cols-3 py-1 w-full text-center">
                      <span className="absolute left-0 pl-2">{i + 1}</span>
                      <div>{customer.name}</div>
                      <div>{customer.email}</div>
                      <div>{customer.company}</div>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="font-bold text-lg">Select a group</div>
            <select
              onChange={handleSelectChange}
              name="group"
              className="text-black w-1/2 rounded-md px-3 py-1"
              id="group-select"
              defaultValue=""
            >
              <option value="" disabled>
                Select a group
              </option>
              {groups?.map((group) => {
                return (
                  <option className="px-3 py-1" value={group.id}>
                    {group.name}
                  </option>
                );
              })}
            </select>
            <div className="flex items-center gap-2 justify-end">
              <Button type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button disabled={pending} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Modal>
      )}
      <Button
        onClick={() => setShowSaveModal(true)}
        className=" gap-2 flex items-center justify-center"
      >
        <span>Save to Group</span>
        <span>
          <FaRegBookmark />
        </span>
      </Button>
    </>
  );
}
