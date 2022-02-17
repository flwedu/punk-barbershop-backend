
export function testEmail(value: string){
    const regexp = new RegExp(/^[-\.\w\d]+@.+\..+$/i)
    return regexp.test(value);
}

export function testCpf(value: string){
    const regexp = new RegExp(/^(\d{11})|(\d{3}\.\d{3}\.\d{3}\-\d{2})$/)
    return regexp.test(value);
}