import { useState, useEffect } from "react";

const useForm = (callback) => {
    const [inputs, setInputs] = useState<any>({});
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        callback(inputs);
    };
    const handleInputChange = (event) => {
        let inputeError = "";
        const InputName = event.target.name;
        const inputValue = event.target.value;
        const inputRequired = event.target.required;
        const inputPattern = event.target.pattern;
        event.persist();
        if (inputRequired) {
            if (inputValue === "" || inputValue === undefined || inputValue === null) {
                inputeError = "Required";
            }
        }
        if (inputValue && inputPattern !== "" && new RegExp(inputPattern).test(inputValue) === false) {
            inputeError = "Invalid";
        }
        setInputs((inputs) => ({ ...inputs, [InputName]: { value: inputValue, error: inputeError } }));
    };
    return {
        handleSubmit,
        handleInputChange,
        inputs
    };
};
export default useForm;
