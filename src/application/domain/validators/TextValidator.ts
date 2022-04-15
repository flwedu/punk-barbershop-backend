import { ErrorMessage } from "../errors/error-messages";
import IValidator from "./IValidator";

export interface TextValidatorParams {
    minLength?: number,
    maxLength?: number,
    onlyWords?: boolean
}

export class TextValidator implements IValidator {

    constructor(private props: TextValidatorParams) { };

    checkValues(obj: any) {
        const data = Object.entries(obj);
        const errors = []
        const minLength = this.props.minLength || 2;
        const maxLength = this.props.maxLength || 150;

        data.forEach(entry => {
            const [key, value] = entry;
            if (!value) {
                errors.push(ErrorMessage.NULL_PARAM(key));
                return;
            }
            if (typeof value == "string")
                if (value.length < minLength || value.length > maxLength) errors.push(ErrorMessage.INVALID_TEXT_LENGTH(key, minLength, maxLength));
        })
        return errors;
    }
}