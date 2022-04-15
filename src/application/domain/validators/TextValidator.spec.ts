import { ErrorMessage } from "../errors/error-messages";
import { TextValidator } from "./TextValidator";

describe('Text Validator tests: ', () => {

    describe('checkValues method: ', () => {

        test('should return an empty array', () => {

            const validator = new TextValidator({});
            const data = { "a": "ABCD" }

            expect(validator.checkValues(data)).toEqual([]);
        })

        describe('Should return a fullfied array: ', () => {

            test.each(["a", "b"])('for %s without passing minLength and maxLength values', (a: string) => {

                const validator = new TextValidator({});
                const data = { "a": a }

                expect(validator.checkValues(data)).toEqual([ErrorMessage.INVALID_TEXT_LENGTH("a", 2, 150)]);
            })

            test.each(["aaa", "bbbb"])('for %s passing minLength values', (a: string) => {

                const validator = new TextValidator({ minLength: 5 });
                const data = { "a": a }

                expect(validator.checkValues(data)).toEqual([ErrorMessage.INVALID_TEXT_LENGTH("a", 5, 150)]);
            })

        })
    })
})