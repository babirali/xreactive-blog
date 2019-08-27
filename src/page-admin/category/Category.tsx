import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import useForm from "../../component/useForm/useForm";

const Category = () => {
    const formData = {
        values: {
            name: "",
        },
        validations: {
            name: {
                required: { flag: true, message: "Name is required" }
            },
        }
    };
    const save = () => {
        alert("implementation pending");
    };
    const clear = () => {
        alert("implementation pending");
    };
    const { inputs, handleChange, handleSubmit, clearForm, formValid, isDirty } = useForm(save, formData);
    return (
        <div>
            <ToastContainer />
            <h1>Add Category</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="name">Name</label>
                        <input type="text" tabIndex={1} className="form-control" name="name" value={inputs.values ? inputs.values.name : ""} onChange={handleChange} id="name" aria-describedby="name" placeholder="Name" required />
                        <span className="text-danger">{inputs.errors ? inputs.errors.name : ""}</span>
                    </div>
                    <div className="col-md-12 pb-5">
                        <div className="pull-right pt-4">
                            <button type="submit" className="btn btn-primary mr-2">Save</button>
                            <button type="button" className="btn btn-primary mr-2" onClick={clear}>Clear</button>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    );
}
export default Category;
