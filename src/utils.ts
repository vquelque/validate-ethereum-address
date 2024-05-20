export type ValidInputTypes = Uint8Array | bigint | string | number | boolean;

const isHexStrict = (hex: ValidInputTypes) =>
  typeof hex === "string" && /^((-)?0x[0-9a-f]+|(0x))$/i.test(hex);

function isUint8Array(data: unknown | Uint8Array): data is Uint8Array {
  return (
    data instanceof Uint8Array ||
    (data as { constructor: { name: string } })?.constructor?.name ===
      "Uint8Array" ||
    (data as { constructor: { name: string } })?.constructor?.name === "Buffer"
  );
}
