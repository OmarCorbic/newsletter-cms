"use client";
import Search from "@/app/ui/send-newsletter/search";
import Table from "@/app/ui/send-newsletter/table";
import CustomerGroups from "./groups";
import { useEffect, useState } from "react";
import ChooseTemplate from "./template";
import { Customer, Group, Preset, Template } from "@/app/lib/definitions";

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
  const [selectedCustomers, setSelectedCustomers] = useState(
    customers.map((customer) => ({ ...customer, checked: false }))
  );

  useEffect(() => {
    setSelectedCustomers(
      customers.map((customer) => ({ ...customer, checked: false }))
    );
  }, [customers]);
  const checkAll = (checked: boolean) => {
    setSelectedCustomers((prev) =>
      prev.map((c) => ({ ...c, checked: checked }))
    );
  };

  const checkSingle = (id: string) => {
    setSelectedCustomers((prev) => {
      let newCustomers = prev.map((customer, i, arr) => {
        if (customer.id === id) {
          return { ...customer, checked: !customer.checked };
        }
        return customer;
      });

      return newCustomers;
    });
  };
  return (
    <>
      <Search placeholder="Search customers" />
      <CustomerGroups groups={groups} />
      <Table
        customers={selectedCustomers}
        checkAll={checkAll}
        checkSingle={checkSingle}
      />
      <ChooseTemplate
        templates={templates}
        presets={presets}
        customers={selectedCustomers}
      />
    </>
  );
}

export default DashboardWrapper;
