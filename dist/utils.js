"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUint8Array = exports.isHexStrict = void 0;
const isHexStrict = (hex) => typeof hex === "string" && /^((-)?0x[0-9a-f]+|(0x))$/i.test(hex);
exports.isHexStrict = isHexStrict;
function isUint8Array(data) {
    var _a, _b;
    return (data instanceof Uint8Array ||
        ((_a = data === null || data === void 0 ? void 0 : data.constructor) === null || _a === void 0 ? void 0 : _a.name) ===
            "Uint8Array" ||
        ((_b = data === null || data === void 0 ? void 0 : data.constructor) === null || _b === void 0 ? void 0 : _b.name) === "Buffer");
}
exports.isUint8Array = isUint8Array;
