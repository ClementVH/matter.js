/**
 * @license
 * Copyright 2022-2025 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bytes } from "#general";
import { ValueModel } from "#model";
import { ValidationDatatypeMismatchError } from "#types";
import { camelize } from "./String";

export function convertJsonDataWithModel(model: ValueModel, data: any): any {
    const definingModel = model.definingModel ?? model;
    switch (definingModel.effectiveMetatype) {
        case "array":
            if (!Array.isArray(data)) {
                throw new ValidationDatatypeMismatchError(`Expected array, got ${typeof data}`);
            }
            return data.map(item => convertJsonDataWithModel(definingModel.children[0], item));
        case "object":
            if (typeof data !== "object") {
                throw new ValidationDatatypeMismatchError(`Expected object, got ${typeof data}`);
            }
            for (const child of definingModel.children) {
                const childKeyName = camelize(child.name);
                data[childKeyName] = convertJsonDataWithModel(child, data[childKeyName]);
            }
            return data;
        case "integer":
            if (typeof data === "string") {
                if (definingModel.metabase?.byteSize !== undefined && definingModel.metabase.byteSize > 6) {
                    // If we have an integer with byteSize > 6 and a string value, we need to convert the string to a
                    // BigInt also handles 0x prefixed hex strings
                    return BigInt(data);
                } else if (data.startsWith("0x")) {
                    // Else if hex string convert to number
                    return parseInt(data.substring(2), 16);
                }
            }
            break;
        case "bytes":
            if (typeof data === "string") {
                // ByteArray encoded as hex-String ... so convert to ByteArray
                return Bytes.fromHex(data);
            }
            break;
    }

    return data;
}
