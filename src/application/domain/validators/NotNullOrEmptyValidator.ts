import { ErrorMessage } from "../errors/error-messages";

export class NotNullOrEmptyValidator {

    checkValues(object: any) {

        const data = Object.entries(object);
        const errors = []

        data.forEach(entry => {
            const [key, value] = entry;
            if (value == "" || !value) {
                errors.push(ErrorMessage.NULL_PARAM(key));
            }
        })

        return errors;
    }
}