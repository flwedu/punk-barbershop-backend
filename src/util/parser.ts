import { ErrorMessage } from "../application/domain/errors/error-messages";
import BusinessRuleError from "../application/domain/errors/business-rule-error";

export function parseDateValue(value: string) {
    const date = Date.parse(value);
    if (!value || !date) {
        throw new BusinessRuleError(ErrorMessage.INVALID_PARAM("date"))
    }
    return new Date(date);
}