interface ValidatorFormProps {
    /**
     * @description Fires when all of the inputs inside of the form are valid.
     * @param inputs - List of all Input elements inside of the Form.
     */
    onValidSubmit?: (inputs: NodeListOf<HTMLInputElement>) => void;
    /**
     * @description Fires when one or more of the inputs inside of the form are invalid.
     * @param invalidInputs - List of invalid Input elements and errors.
     * @param validInputs - List of valid Input elements.
     */
    onInvalidSubmit?:(invalidInputs: InvalidInput[], validInputs: NodeListOf<HTMLInputElement>) => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    id?: string;
    formRef?: React.MutableRefObject<HTMLFormElement | undefined>;
}

interface InvalidInput {
    input: HTMLInputElement;
    error: string;
}

interface ValidatorInputProps {
    type?: "text" | "password" | "tel";
    placeholder?: string;
    style?: React.CSSProperties;
    className?: string;
    id?: string;
    inputRef?: React.MutableRefObject<HTMLInputElement | undefined>;
    rules?: ValidatorInputRules;
    inputName?: string;
}

interface ValidatorButtonProps {
    style?: React.CSSProperties;
    className?: string;
    id?: string;
    buttonRef?: React.MutableRefObject<HTMLButtonElement | undefined>;
}

type SpecialChars = "~" | "`" | "!" | "@" | "#" | "$" | "%" | "^" | "&" | "*" | "(" | ")" | "-" | "_" | "+" | "=" | "{" | "}" | "[" | "]" | "|" | "\\" | "/" | ":" | ";" | "\"" | "'" | "<" | ">" | "," | "." | "?";

export interface ValidatorInputRules {
    isRequired?: {
        value: boolean;
        error?: string;
    }
    isEmail?: {
        value: boolean;
        error?: string;
    };
    minLength?: {
        value: number;
        error?: string;
    };
    maxLength?: {
        value: number;
        error?: string;
    };
    minUppercase?: {
        value: number;
        error?: string;
    };
    maxUppercase?: {
        value: number;
        error?: string;
    };
    allowedSpecialChars?: {
        value: SpecialChars[];
        error?: string;
    }
    minSpecialChars?: {
        value: number;
        error?: string;
    };
    maxSpecialChars?: {
        value: number;
        error?: string;
    };
    minNumbers?: {
        value: number;
        error?: string;
    };
    maxNumbers?: {
        value: number;
        error?: string;
    };
    match?: {
        value: string;
        error?: string;
    }
}

declare namespace Validator {
    declare class Form extends React.Component<ValidatorFormProps> { }
    declare class Input extends React.Component<ValidatorInputProps> { }
    declare class Button extends React.Component<ValidatorButtonProps> { }
}

export = Validator;