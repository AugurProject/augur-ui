export default function convertExponentialToDecimal(
  exponentialNumber: number
): number | string {
  // sanity check - is it exponential number
  const str = exponentialNumber.toString();
  if (str.indexOf("e") !== -1) {
    const exponent = parseInt(str.split("-")[1], 10);
    const result =
      typeof exponentialNumber === "string"
        ? parseFloat(exponentialNumber).toFixed(exponent)
        : exponentialNumber.toFixed(exponent);
    return result;
  }
  return exponentialNumber;
}
