import { useState, useEffect, useCallback } from "react";

const useForm = (callback, formData) => {
    const [inputs, setInputs] = useState<any>(formData);
    const [disable, setDisable] = useState(true);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setDisable(true);
    }, []);

    useEffect(() => {
        if (isDirty) {
            setDisable(validateState());
        }
    }, [inputs, isDirty]);

    const validateState = useCallback(() => {
        const hasErrorInInputs = Object.keys(formData.validations).some((key) => {
            const isInputFieldRequired = inputs.validations[key].required;
            const stateValue = inputs.values[key]; // state value
            const stateError = inputs.errors[key]; // state error

            return (isInputFieldRequired && !stateValue) || stateError;
        });

        return hasErrorInInputs;
    }, [inputs, formData]);

    const handleSubmit = (event) => {
        event.preventDefault();
        callback(inputs);
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
        // setInputs((inputs) => (
        //     {
        //         ...inputs,
        //         values: {
        //             ...inputs.values,
        //             [InputName]: inputValue
        //         },
        //         errors: {
        //             ...inputs.errors,
        //             [InputName]: inputeError
        //         }
        //     }
        // ));
        setInputs((inputs) => ({
            values: {                   // object that we want to update
                ...inputs.values,    // keep all other key-value pairs
                [InputName]: inputValue       // update the value of specific key
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
        inputs
    };
};
export default useForm;
