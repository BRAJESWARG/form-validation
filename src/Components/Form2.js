// Import React and other libraries
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import DataTable from "react-data-table-component";

// Define the schema for validation using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required").positive().integer(),
  sex: yup.string().required("Sex is required").oneOf(["Male", "Female", "Other"]),
  mobile: yup
    .string()
    .matches(
      /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
      "Mobile number should be a valid Indian mobile number"
    ),
  emergencyContact: yup
    .string()
    .matches(
      /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
      "Emergency contact number should be a valid Indian mobile number"
    ),
  address: yup.string(),
  idType: yup.string().oneOf(["Aadhar", "PAN"]),
  govtId: yup
    .string()
    .when("idType", {
      is: "Aadhar",
      then: yup
        .string()
        .matches(/^\d{12}$/, "Govt ID should be a valid 12-digit numeric string"),
      otherwise: yup
        .string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Govt ID should be a valid 10-digit alpha-numeric string"),
    }),
  guardianName: yup.string(),
  guardianRelation: yup.string(),
  nationality: yup.string(),
});

// Define the columns for the data table
const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Age/Sex",
    selector: (row) => `${row.age}/${row.sex}`,
    sortable: true,
  },
  {
    name: "Mobile",
    selector: "mobile",
    sortable: true,
  },
  {
    name: "Address",
    selector: "address",
    sortable: true,
  },
  {
    name: "Govt ID",
    selector: (row) => `${row.idType}: ${row.govtId}`,
    sortable: true,
  },
  {
    name: "Guardian Details",
    selector: (row) => `${row.guardianName} (${row.guardianRelation})`,
    sortable: true,
  },
  {
    name: "Nationality",
    selector: "nationality",
    sortable: true,
  },
];

// Define the main component
function Form() {
  // Use the useForm hook with the schema resolver
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  // Define the state for the users data
  const [users, setUsers] = React.useState([]);

  // Define the handler for submitting the form
  const onSubmit = async (data) => {
    try {
      // Send a POST request to the backend with the form data
      const response = await axios.post("/api/users", data);
      // Update the users state with the new user
      setUsers((prevUsers) => [...prevUsers, response.data]);
      // Reset the form fields
      formState.reset();
      // Alert success message
      alert("User registered successfully");
    } catch (error) {
      // Alert error message
      alert(error.message);
    }
  };

  // Define the handler for fetching the users data
  const fetchUsers = async () => {
    try {
      // Send a GET request to the backend to get the users data
      const response = await axios.get("/api/users");
      // Update the users state with the fetched data
      setUsers(response.data);
    } catch (error) {
      // Alert error message
      alert(error.message);
    }
  };

  // Use React useEffect hook to fetch the users data on mount
  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Form</h1>
      </div>
  );
  }

  export default Form;