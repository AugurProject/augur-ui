import isAddress from "modules/auth/helpers/is-address";

export default function formatAddress(address) {
  if (!isAddress(address)) return address;

  return `${address.slice(0, 6)}...${address.slice(
    address.length - 6,
    address.length
  )}`;
}
