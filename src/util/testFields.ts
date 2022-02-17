import { emailRegex } from "./regularExpressions";

export function testEmail(value: string){
    return emailRegex().test(value);
}