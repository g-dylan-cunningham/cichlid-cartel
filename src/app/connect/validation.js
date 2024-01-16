import * as yup from "yup";

export default yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  first_name: yup.string().max(40).min(4).required("First name is required"),
  last_name: yup.string().required("Last name is required").max(40).min(4),
  zip: yup.string().required("Please provide zip code"),
});
export const initialValues = {
  email: "",
  first_name: "",
  last_name: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};
export const fields = [
  {
    component: "Input",
    label: "Email / Username *",
    type: "text",
    name: "email",
  },
  {
    component: "Input",
    label: "First Name *",
    type: "text",
    name: "first_name",
  },
  {
    component: "Input",
    label: "Last Name *",
    type: "text",
    name: "last_name",
  },
  {
    component: "Input",
    label: "Zip/Postal Code *",
    type: "text",
    name: "zip",
  },
  {
    component: "Input",
    label: "Address Line 1",
    type: "text",
    name: "street1",
  },
  {
    component: "Input",
    label: "Address Line 2",
    type: "text",
    name: "street2",
  },
  {
    component: "Input",
    label: "City",
    type: "text",
    name: "city",
  },
  {
    component: "Input",
    label: "State",
    type: "text",
    name: "state",
  },
  {
    component: "Input",
    label: "Country",
    type: "text",
    name: "country",
  },
];
