import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    age: yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer"),
    sex: yup.string().required("Sex is required").oneOf(["Male", "Female", "Other"], "Sex must be one of Male, Female or Other"),
    mobile: yup.string().matches(/^[6-9]\d{9}$/, "Mobile must be a valid Indian mobile number"),
    emergencyContact: yup.string().matches(/^[6-9]\d{9}$/, "Emergency contact must be a valid Indian mobile number"),
    idType: yup.string().oneOf(["Aadhar", "PAN"], "ID type must be one of Aadhar or PAN"),
    govtId: yup.string().when("idType", {
        is: "Aadhar",
        then: yup.string().matches(/^\d{12}$/, "Govt ID must be a valid 12-digit Aadhar number"),
        otherwise: yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Govt ID must be a valid 10-digit PAN number")
    }),
    address: yup.string(),
    guardianName: yup.string(),
    guardianRelation: yup.string(),
    nationality: yup.string()
});

// Define the form component using React Hook Form
const Form = () => {
    // Use the useForm hook with the resolver option
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // Define the onSubmit function that sends a POST request to the backend
    const onSubmit = (data) => {
        // Use fetch or axios or any other library to send the data to the backend
        fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                console.log(data);
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };

    // Return the JSX for the form
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" {...register("name")} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <label htmlFor="age">Age</label>
                <input id="age" type="number" {...register("age")} />
                {errors.age && <p>{errors.age.message}</p>}
            </div>
            <div>
                <label htmlFor="sex">Sex</label>
                <select id="sex" {...register("sex")}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {errors.sex && <p>{errors.sex.message}</p>}
            </div>
            <div>
                <label htmlFor="mobile">Mobile</label>
                <input id="mobile" type="tel" {...register("mobile")} />
                {errors.mobile && <p>{errors.mobile.message}</p>}
            </div>
            <div>
                <label htmlFor="emergencyContact">Emergency Contact</label>
                <input id="emergencyContact" type="tel" {...register("emergencyContact")} />
                {errors.emergencyContact && <p>{errors.emergencyContact.message}</p>}
            </div>
            <div>
                <label htmlFor="idType">ID Type</label>
                <select id="idType" {...register("idType")}>
                    <option value="">Select</option>
                    <option value="Aadhar">Aadhar</option>
                </select>
            </div>
            <input type="submit" />
        </form>
    );
}

export default Form;