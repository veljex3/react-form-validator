import React from "react";

let instance;

class Form extends React.Component {
    inputs = [];
    button = [];

    isValid;

    componentDidMount() {
        if (this.inputs.length === 0)
            throw new Error("Validator.Form must contain at least 1 Validator.Input");
        if (this.button.length === 0)
            throw new Error("Validator.Form must contain 1 Validator.Button");
        else if (this.button.length > 1)
            throw new Error("Validator.Form must contain only 1 Validator.Button");

        this.button[0].onclick = this.onSubmit.bind(this);
    }

    componentDidUpdate() {
        if (this.inputs.length === 0)
            throw new Error("Validator.Form must contain at least 1 Validator.Input");
        if (this.button.length === 0)
            throw new Error("Validator.Form must contain 1 Validator.Button");
        else if (this.button.length > 1)
            throw new Error("Validator.Form must contain only 1 Validator.Button");

        this.button[0].onclick = this.onSubmit.bind(this);
    }

    onSubmit() {
        const [validInputs, invalidInputs] = this.validate();

        console.log(validInputs);
        console.log(invalidInputs);

        if (invalidInputs.length === 0)
            this.props.onValidSubmit?.(validInputs);
        else
            this.props.onInvalidSubmit?.(invalidInputs);
    }

    validate() {
        const invalidInputs = [];
        const validInputs = [];

        for (const input of this.inputs) {
            if (input.rules.isRequired.value !== false && input.value === "")
                invalidInputs.push({
                    input,
                    error: input.rules.isRequired.error
                });
            else if (input.rules.isEmail.value !== false) {
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value))
                    invalidInputs.push({
                        input,
                        error: input.rules.isEmail.error
                    });
            }
            else if (typeof input.rules.minLength.value !== "string" && input.value.length < input.rules.minLength.value)
                invalidInputs.push({
                    input,
                    error: input.rules.minLength.error
                });
            else if (typeof input.rules.maxLength.value !== "string" && input.value.length > input.rules.maxLength.value)
                invalidInputs.push({
                    input,
                    error: input.rules.maxLength.error
                });
            else if (typeof input.rules.minUppercase.value !== "string" && !new RegExp(`(.*?[A-Z].*?){${input.rules.minUppercase.value},}`).test(input.value))
                invalidInputs.push({
                    input,
                    error: input.rules.minUppercase.error
                });
            else if (typeof input.rules.maxUppercase.value !== "string" && !new RegExp(`^[^A-Z]*([A-Z][^A-Z]*){0,${input.rules.maxUppercase.value}}?$`).test(input.value))
                invalidInputs.push({
                    input,
                    error: input.rules.maxUppercase.error
                });
            else if (typeof input.rules.allowedSpecialChars.value !== "string" && new RegExp(`^(.*[^a-zA-Z0-9\\s\\${input.rules.allowedSpecialChars.value.join("\\")}].*)$`).test(input.value))
                invalidInputs.push({
                    input,
                    error: input.rules.allowedSpecialChars.error
                });
            else if (typeof input.rules.minSpecialChars.value !== "string" && !new RegExp(`(.*?[~\`!@#$%^&*()\\-_+={}[\\]|\\\\\\/:;"'<>,.?].*?){${input.rules.minSpecialChars.value},}`).test(input.value))
                invalidInputs.push({
                    input,
                    error: input.rules.minSpecialChars.error
                });
            else if (typeof input.rules.maxSpecialChars.value !== "string" && !new RegExp(`^[^~\`!@#$%^&*()\\-_+={}[\\]|\\\\\\/:;"'<>,.?]*([~\`!@#$%^&*()\\-_+={}[\\]|\\\\\\/:;"'<>,.?][^~\`!@#$%^&*()\\-_+={}[\\]|\\\\\\/:;"'<>,.?]*){0,${input.rules.maxSpecialChars.value}}?$`).test(input.value))
                invalidInputs.push({
                    input,
                    error: input.rules.maxSpecialChars.error
                });
            //else if (typeof input.rules.minNumbers.value !== "string")
            //else if (typeof input.rules.maxNumbers.value !== "string")
            else if (typeof input.rules.match.value === "string" && this.inputs.find((element) => input.rules.match.value === element.inputName) !== undefined && input.value !== this.inputs.find((element) => input.rules.match.value === element.inputName).value)
                invalidInputs.push({
                    input,
                    error: input.rules.match.error
                });
            else
                validInputs.push(input);
        }

        return [
            validInputs,
            invalidInputs
        ];
    }

    render() {
        instance = this;

        return (
            <form>
                {this.props.children}
            </form>
        );
    }
}

class Input extends React.Component {
    formInstance = instance;

    inputRef = React.createRef();

    assignProps() {
        this.inputRef.current.inputName = this.props.inputName;
        this.inputRef.current.rules = {
            isRequired: {
                value: this.props.rules?.isRequired?.value || false,
                error: this.props.rules?.isRequired?.error || ""
            },
            isEmail: {
                value: this.props.rules?.isEmail?.value || false,
                error: this.props.rules?.isEmail?.error || ""
            },
            minLength: {
                value: this.props.rules?.minLength?.value || "",
                error: this.props.rules?.minLength?.error || ""
            },
            maxLength: {
                value: this.props.rules?.maxLength?.value || "",
                error: this.props.rules?.maxLength?.error || ""
            },
            minUppercase: {
                value: this.props.rules?.minUppercase?.value || "",
                error: this.props.rules?.minUppercase?.error || ""
            },
            maxUppercase: {
                value: this.props.rules?.maxUppercase?.value || "",
                error: this.props.rules?.maxUppercase?.error || ""
            },
            allowedSpecialChars: {
                value: this.props.rules?.allowedSpecialChars?.value || "",
                error: this.props.rules?.allowedSpecialChars?.error || "",
            },
            minSpecialChars: {
                value: this.props.rules?.minSpecialChars?.value || "",
                error: this.props.rules?.minSpecialChars?.error || ""
            },
            maxSpecialChars: {
                value: this.props.rules?.maxSpecialChars?.value || "",
                error: this.props.rules?.maxSpecialChars?.error || ""
            },
            minNumbers: {
                value: this.props.rules?.minNumbers?.value || "",
                error: this.props.rules?.minNumbers?.error || ""
            },
            maxNumbers: {
                value: this.props.rules?.maxNumbers?.value || "",
                error: this.props.rules?.maxNumbers?.error || ""
            },
            match: {
                value: this.props.rules?.match?.value || "",
                error: this.props.rules?.match?.error || ""
            },
        }
    }

    componentDidMount() {
        this.assignProps();
        this.formInstance.inputs.push(this.inputRef.current);

        if (this.props.inputRef)
            this.props.inputRef.current = this.inputRef.current;
    }

    componentDidUpdate() {
        this.assignProps();
    }

    componentWillUnmount() {
        this.formInstance.inputs.forEach((element, index) => {
            if (element === this.inputRef.current)
                this.formInstance.inputs.splice(index, 1);
        });
    }

    render() {
        const { inputRef, inputName, rules, ...props } = this.props;
        return <input {...props} ref={this.inputRef}/>;
    }
}

class Button extends React.Component {
    formInstance = instance;

    buttonRef = React.createRef();

    componentDidMount() {
        this.formInstance.button.push(this.buttonRef.current);
    }

    componentWillUnmount() {
        this.formInstance.button.splice(0, 1);
    }

    render() {
        return (
            <button type="button" ref={this.buttonRef}>{this.props.children}</button>
        )
    }
}

const Validator = {
    Form: Form,
    Input: Input,
    Button: Button
}


export default Validator;