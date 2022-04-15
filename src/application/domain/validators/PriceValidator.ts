import { testPriceValue } from "../../../util/testFields";
import { ErrorMessage } from "../errors/error-messages";
import IValidator from "./IValidator";

export interface PriceValidatorInput {
    minValue?: number,
    maxValue?: number
}

export class PriceValidator implements IValidator {

    constructor(private param: PriceValidatorInput) { }

    checkValues(obj: any) {

        const data = Object.entries(obj);
        const errors = [];
        const minValue = this.param.minValue || 0;

        data.forEach(entry => {
            const [key, value] = entry;
            if (!value) {
                errors.push(ErrorMessage.NULL_PARAM(key));
                return;
            }
            if (typeof value == "string" && !testPriceValue(value) || Number(value) < minValue) {
                errors.push(ErrorMessage.INVALID_PARAM(key));
            }
        })
        return errors;
    }
}