import BusinessRuleError from "../errors/business-rule-error";

export function parseDateValue(value: string) {
    const date = Date.parse(value);
    if (!date) {
        throw new BusinessRuleError("Could not convert date")
    }
    return new Date(date);
}