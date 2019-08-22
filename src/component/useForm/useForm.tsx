import { useState, useEffect, useCallback } from "react";

import async from "async";

const useForm = (callback, formData) => {
    const [inputs, setInputs] = useState<any>(formData);
    const [formValid, setformValid] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [submit, setSubmit] = useState(0);

    useEffect(() => {
        callback();
    }, [submit]);

    const validateInputs = () => {
        // tslint:disable-next-line: variable-name
        let _errors = {};
        let i = 0;
        async.forEachOf(inputs.validations, (value, key, callbackFn) => {
            const inputRequired = inputs.validations[key].required;
            const inputPattern = inputs.validations[key].pattern;
            const inputValue = inputs.values[key];
            let inputeError = "";

            if (inputRequired) {
                if (inputValue === "" || inputValue === undefined || inputValue === null) {
                    inputeError = "Required";
                }
            }
            if (inputValue && inputPattern !== "" && new RegExp(inputPattern).test(inputValue) === false) {
                inputeError = "Invalid";
            }

            _errors = { ..._errors, [key]: inputeError };
            i++;
            if (i === Object.keys(inputs.validations).length) {
                setInputs((inputs) => ({
                    values: {
                        ...inputs.values,
                    },
                    errors: _errors,
                    validations: {
                        ...inputs.validations
                    }
                }));
                const isValid = Object.values(_errors).every((x) => (x === null || x === ""));
                setformValid(isValid);
                callbackFn("1");
            }
        }, (err) => {
            setSubmit(Math.random());
        });
    };

    const handleSubmit = (event) => {
        setIsDirty(true);
        event.preventDefault();
        validateInputs();
    };

    const handleChange = (event) => {
        setIsDirty(true);
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
        setInputs((inputs) => ({
            values: {
                ...inputs.values,
                [InputName]: inputValue
            },
            errors: {
                ...inputs.errors,
                [InputName]: inputeError
            },
            validations: {
                ...inputs.validations
            }
        }));
    };
    return {
        handleSubmit,
        handleChange,
        inputs,
        isDirty,
        formValid
    };
};
export default useForm;
