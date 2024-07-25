export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
};

export type Input = {
  type: "text" | "text-area" | "date";
  name: string;
  originalTag: string;
  placeholder?: string;
};

export type Template = {
  id: string;
  name: string;
  inputs: Input[];
  html: string;
};

export type Preset = {
  id: string;
  name: string;
  html: string;
};

export type Group = {
  id: string;
  name: string;
};
