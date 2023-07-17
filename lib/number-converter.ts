import { addCommas, digitsEnToFa, digitsFaToEn } from "@persian-tools/persian-tools";

export function convertToPersianDigits(number) {
    return digitsEnToFa(number.toString());
}
export function convertToPersianDigitsWithComma(number) {
    return digitsEnToFa(addCommas(number.toString()));
}

export function convertToEnglishDigits(number) {
    return digitsFaToEn(number.toString());
}