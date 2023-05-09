import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SEX_OPTIONS = [
    { text: "Male", value: "male" },
    { text: "Female", value: "female" },
    { text: "Other", value: "other" },
];

const GOVTID_OPTIONS = [
    { text: "Passport", value: "Passport" },
    { text: "Aadhaar", value: "Adhaar" },
    { text: "Pan", value: "Pan" },
];


const schema = yup
    .object({
        // lastName: yup.string().required("Last Name is required"),
        sex: yup.string().required("sex is required"),
        GovtID: yup.string().required("Govt. Issued ID is required"),
        dateOfBirth: yup.string().required("Date of Birth is required"),
        mobile: yup.string().required("mobile number is required"),
        IDNumber: yup.string().required("IDNumber number is required"),
        email: yup
            .string()
            .email("This must be a email")
            .required("Email is required"),
        // password: yup
        //     .string()
        //     .required("Password is required")
        //     .min(6, "The password must be six characters"),
        // confirmPassword: yup
        //     .string()
        //     .required("Password is required")
        //     .min(6, "The password must be six characters")
        //     .oneOf([yup.ref("password")], "Your passwords do not match."),
    })
    .required();

const UserForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            fullName: "",
            // lastName: "",
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (values) => {
        console.log(values);
        setTimeout(() => {
            reset();
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Personal Details</h3>
            <div className="form-group">
                <label htmlFor="fullName">Name</label>
                <input
                    type="text"
                    className="form-control"
                    {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                    <span className="field_level_error">This field is required</span>
                )}
            </div>
            {
                // <div className="form-group">
                //     <label htmlFor="lastName">Last Name</label>
                //     <input type="text" className="form-control" {...register("lastName")} />
                //     {errors.lastName && (
                //         <span className="field_level_error">{errors.lastName?.message}</span>
                //     )}
                // </div>
            }

            <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input type="dateOfBirth" className="form-control" {...register("dateOfBirth")} />
                {errors.dateOfBirth && (
                    <span className="field_level_error">{errors.dateOfBirth?.message}</span>
                )}
            </div>


            <div className="form-group">
                <label htmlFor="sex">Sex</label>
                <select className="form-control" {...register("sex")}>
                    <option value="">Select</option>
                    {SEX_OPTIONS.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
                {errors.sex && (
                    <span className="field_level_error">{errors.sex?.message}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input type="number" className="form-control" {...register("mobile")} />
                {errors.mobile && (
                    <span className="field_level_error">{errors.mobile?.message}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="GovtID">Govt. Issued ID</label>
                <select className="form-control" {...register("GovtID")}>
                    <option value="">Select</option>
                    {GOVTID_OPTIONS.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
                <input type="number" className="form-control" {...register("IDNumber")} />
                {errors.GovtID && (
                    <span className="field_level_error">{errors.GovtID?.message}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" {...register("email")} />
                {errors.email && (
                    <span className="field_level_error">{errors.email?.message}</span>
                )}
            </div>



            {
                // <div className="form-group">
                //     <label htmlFor="password">Password</label>
                //     <input
                //         type="password"
                //         className="form-control"
                //         {...register("password")}
                //     />
                //     {errors.password && (
                //         <span className="field_level_error">{errors.password?.message}</span>
                //     )}
                // </div>

                // <div className="form-group">
                //     <label htmlFor="confirmPassword">Cofirm Password</label>
                //     <input
                //         type="password"
                //         className="form-control"
                //         {...register("confirmPassword")}
                //     />
                //     {errors.confirmPassword && (
                //         <span className="field_level_error">
                //             {errors.confirmPassword?.message}
                //         </span>
                //     )}
                // </div>
            }

            <button className="btn btn-primary mt-2">Submit</button>
        </form>
    );
};

export default UserForm;