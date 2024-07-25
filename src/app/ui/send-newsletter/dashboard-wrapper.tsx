"use client";
import Search from "@/app/ui/send-newsletter/search";
import Table from "@/app/ui/send-newsletter/table";
import CustomerGroups from "./groups/groups";
import { useState } from "react";
import ChooseTemplate from "./choose-template";
import { Customer, Group, Preset, Template } from "@/app/lib/definitions";
import { SaveCustomerForm } from "./groups/add-customers-to-group-form";

function DashboardWrapper({
  groups,
  customers,
  templates,
  presets,
}: {
  groups: Group[];
  customers: Customer[];
  templates: Template[];
  presets: Preset[];
}) {
  const [checkedCustomers, setCheckedCustomers] = useState<Customer[]>([]);

  const checkAll = (checked: boolean) => {
    setCheckedCustomers((prev) => {
      if (checked) {
        const newChecked = [...prev];
        customers.forEach((customer) => {
          if (!newChecked.find((c) => customer.id === c.id)) {
            newChecked.push({ ...customer });
          }
        });
        return newChecked;
      } else {
        return prev.filter(
          (c) => !customers.find((customer) => customer.id === c.id)
        );
      }
    });
  };

  const checkSingle = (id: string) => {
    setCheckedCustomers((prev) => {
      if (!prev.find((c) => c.id === id)) {
        const selectedCustomer = customers.find((c) => c.id === id);
        if (selectedCustomer) {
          return [...prev, selectedCustomer];
        }
      } else {
        return prev.filter((c) => c.id !== id);
      }
      return prev;
    });
  };

  return (
    <>
      <Search placeholder="Search customers" />
      <CustomerGroups groups={groups} />
      <Table
        checked={checkedCustomers}
        customers={customers}
        checkAll={checkAll}
        checkSingle={checkSingle}
      />
      <div className="h-14 py-2">
        <SaveCustomerForm groups={groups} checked={checkedCustomers} />
      </div>
      <ChooseTemplate
        templates={templates}
        presets={presets}
        customers={checkedCustomers}
      />
    </>
  );
}

export default DashboardWrapper;
