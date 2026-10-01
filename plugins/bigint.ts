export default defineNuxtPlugin(() => {
  definePayloadReducer("BigInt", (data) =>
    typeof data === "bigint" ? data.toString() : undefined
  );
  definePayloadReviver("BigInt", (data) => BigInt(data));
});
