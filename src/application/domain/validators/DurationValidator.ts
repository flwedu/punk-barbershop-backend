import { ErrorMessage } from "../errors/error-messages";
import IValidator from "./IValidator";

export interface DurationValidatorInput {
    minValue?: number,
    maxValue?: number
}

export class DurationValidator implements IValidator {

    constructor(private param: DurationValidatorInput) { }

    checkValues(obj: any) {

        const data = Object.entries(obj);
        const errors = [];
        const minValue = this.param.minValue || 0;

        const test = /^[\d\,\.]+$/;

        data.forEach(entry => {
            const [key, value] = entry;
            if (!value) {
                errors.push(ErrorMessage.NULL_PARAM(key));
                return;
            }
            if (typeof value == "string" && Number(value) < minValue || test.test(String(value))) {
                errors.push(ErrorMessage.INVALID_PARAM(key));
            }
        })
        return errors;
    }
}