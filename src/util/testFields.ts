export function testEmail(value: string) {
    const regexp = /^[-.\w\d]+@.+\..+$/i;
    return regexp.test(value);
}

export function testCpf(value: string) {
    const regexp = /^(\d{3})[\.]?(\d{3})[\.]?(\d{3})[-]?(\d{2})$/;
    return regexp.test(value);
}

export function testPriceValue(value: string) {
    try {
        if (!value || !value.length || !/^\d+|\d+,\d+$/.test(value) || Number(value) < 0) return false

        return true;
    }
    catch (err) {
        return false;
    }
}