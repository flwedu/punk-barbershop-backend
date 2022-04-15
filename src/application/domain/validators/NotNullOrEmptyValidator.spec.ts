import { ErrorMessage } from "../errors/error-messages"
import { NotNullOrEmptyValidator } from "./NotNullOrEmptyValidator"

describe('Not Null Or Empty Validator tests', () => {

    describe('CheckValues method: ', () => {

        test('should return an empty array', () => {

            const data = { "a": "1", "b": 1 }
            const validator = new NotNullOrEmptyValidator();

            const result = validator.checkValues(data);

            expect.assertions(1);
            expect(result).toEqual([]);
        })

        test.each(["", null, undefined])('should return a fullfied array for a = %s', (a) => {

            const data = { "a": a, "b": 1 }
            const validator = new NotNullOrEmptyValidator();

            const result = validator.checkValues(data);

            expect.assertions(1);
            expect(result).toEqual([ErrorMessage.NULL_PARAM("a")]);
        })
    })
})