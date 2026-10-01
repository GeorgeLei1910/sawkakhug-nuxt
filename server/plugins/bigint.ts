export default defineNitroPlugin(() => {
  // Square SDK v40+ uses native BigInt for versions and monetary amounts.
  // Standard JSON.stringify does not know how to serialize BigInt.
  // Defining toJSON allows Nitro/H3 to serialize BigInts cleanly as numbers.
  (BigInt.prototype as any).toJSON = function () {
    return Number(this);
  };
});
