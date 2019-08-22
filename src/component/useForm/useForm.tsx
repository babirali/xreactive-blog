import { useState, useEffect, useCallback } from "react";

import async from "async";

const useForm = (callback, formData) => {
    const [inputs, setInputs] = useState<any>(formData);
    const [formValid, setformValid] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [submit, setSubmit] = useState(0);

    useEffect(() => {
        if (isDirty) {
            callback();
        }
    }, [submit]);

    const validateInputs = () => {
        // tslint:disable-next-line: variable-name
        let _errors = {};
        let i = 0;
        async.forEachOf(inputs.validations, (value, key, callbackFn) => {
            const inputRequired = inputs.validations[key].required.flag;

            const inputValue = inputs.values[key];
            let inputeError = "";

            if (inputRequired) {
                if (inputValue === "" || inputValue === undefined || inputValue === null) {
                    inputeError = inputs.validations[key].required.message;
                }
            }
            if ("pattern" in inputs.validations[key]) {
                const inputPattern = inputs.validations[key].pattern.flag;
                if (inputValue && inputPattern !== "" && new RegExp(inputPattern).test(inputValue) === false) {
                    inputeError = inputs.validations[key].pattern.message;
                }
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

    const clearForm = () => {
        setInputs(formData);
        setIsDirty(false);
        setformValid(false);
    };

    const handleChange = (event) => {
        setIsDirty(true);
        let inputeError = "";
        const inputName = event.target.name;
        const inputValue = event.target.value;
        // const inputRequired = event.target.required;
        // const inputPattern = event.target.pattern;
        const inputRequired = inputs.validations[inputName].required.flag;
        event.persist();
        if (inputRequired) {
            if (inputValue === "" || inputValue === undefined || inputValue === null) {
                inputeError = inputs.validations[inputName].required.message;
            }
        }
        if ("pattern" in inputs.validations[inputName]) {
            const inputPattern = inputs.validations[inputName].pattern.flag;
            if (inputValue && inputPattern !== "" && new RegExp(inputPattern).test(inputValue) === false) {
                inputeError = inputs.validations[inputName].pattern.message;
            }
        }
        setInputs((inputs) => ({
            values: {
                ...inputs.values,
                [inputName]: inputValue
            },
            errors: {
                ...inputs.errors,
                [inputName]: inputeError
            },
            validations: {
                ...inputs.validations
            }
        }));
    };
    return {
        handleSubmit,
        clearForm,
        handleChange,
        inputs,
        isDirty,
        formValid
    };
};
export default useForm;
