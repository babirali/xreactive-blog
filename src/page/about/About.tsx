import React, { Component, useState, useEffect } from "react";
import useForm from "../../component/useForm/useForm";
const About = (props) => {
    // tslint:disable-next-line: no-console
    const { inputs, handleInputChange, handleSubmit } = useForm((inp) => console.log(inp));
    return (
        <div>
            <h1>Under Construction</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={inputs.firstName ? inputs.firstName.value : ""} onChange={handleInputChange} required pattern="test" />
                {inputs.firstName ? inputs.firstName.error : ""}
                <div className="clearfix"></div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default About;
