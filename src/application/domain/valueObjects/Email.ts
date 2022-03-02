import { testEmail } from '../../../util/testFields';
import BusinessRuleError from '../errors/business-rule-error';
import IValueObject from './ValueObject';

export class Email implements IValueObject<Email> {
    private constructor(private _value: string) { }

    static of(value: string): Email {
        if (!testEmail(value)) {
            throw new BusinessRuleError('invalid e-mail');
        }
        return new Email(value);
    }

    getValue() {
        return this._value;
    }

    equals(other: Email): boolean {
        return this._value === other.getValue();
    }
}
