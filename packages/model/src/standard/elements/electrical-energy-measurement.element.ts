/**
 * @license
 * Copyright 2022-2025 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

/*** THIS FILE IS GENERATED, DO NOT EDIT ***/

import { MatterDefinition } from "../MatterDefinition.js";
import {
    ClusterElement as Cluster,
    AttributeElement as Attribute,
    FieldElement as Field,
    EventElement as Event,
    DatatypeElement as Datatype
} from "../../elements/index.js";

export const ElectricalEnergyMeasurement = Cluster(
    { name: "ElectricalEnergyMeasurement", id: 0x91 },
    Attribute({ name: "ClusterRevision", id: 0xfffd, type: "ClusterRevision", default: 1 }),

    Attribute(
        { name: "FeatureMap", id: 0xfffc, type: "FeatureMap" },
        Field({ name: "IMPE", conformance: "O.a+", constraint: "0", title: "ImportedEnergy" }),
        Field({ name: "EXPE", conformance: "O.a+", constraint: "1", title: "ExportedEnergy" }),
        Field({ name: "CUME", conformance: "O.b+", constraint: "2", title: "CumulativeEnergy" }),
        Field({ name: "PERE", conformance: "O.b+", constraint: "3", title: "PeriodicEnergy" })
    ),

    Attribute(
        { name: "Accuracy", id: 0x0, type: "MeasurementAccuracyStruct", access: "R V", conformance: "M", quality: "F" }
    ),
    Attribute({
        name: "CumulativeEnergyImported", id: 0x1, type: "EnergyMeasurementStruct", access: "R V",
        conformance: "IMPE & CUME", default: null, quality: "X Q"
    }),
    Attribute({
        name: "CumulativeEnergyExported", id: 0x2, type: "EnergyMeasurementStruct", access: "R V",
        conformance: "EXPE & CUME", default: null, quality: "X Q"
    }),
    Attribute({
        name: "PeriodicEnergyImported", id: 0x3, type: "EnergyMeasurementStruct", access: "R V",
        conformance: "IMPE & PERE", default: null, quality: "X Q"
    }),
    Attribute({
        name: "PeriodicEnergyExported", id: 0x4, type: "EnergyMeasurementStruct", access: "R V",
        conformance: "EXPE & PERE", default: null, quality: "X Q"
    }),
    Attribute({
        name: "CumulativeEnergyReset", id: 0x5, type: "CumulativeEnergyResetStruct", access: "R V",
        conformance: "[CUME]", default: null, quality: "X"
    }),
    Event(
        { name: "CumulativeEnergyMeasured", id: 0x0, access: "V", conformance: "CUME", priority: "info" },
        Field({ name: "EnergyImported", id: 0x0, type: "EnergyMeasurementStruct", conformance: "CUME & IMPE" }),
        Field({ name: "EnergyExported", id: 0x1, type: "EnergyMeasurementStruct", conformance: "CUME & EXPE" })
    ),
    Event(
        { name: "PeriodicEnergyMeasured", id: 0x1, access: "V", conformance: "PERE", priority: "info" },
        Field({ name: "EnergyImported", id: 0x0, type: "EnergyMeasurementStruct", conformance: "PERE & IMPE" }),
        Field({ name: "EnergyExported", id: 0x1, type: "EnergyMeasurementStruct", conformance: "PERE & EXPE" })
    ),

    Datatype(
        { name: "EnergyMeasurementStruct", type: "struct" },
        Field({ name: "Energy", id: 0x0, type: "energy-mWh", conformance: "M", constraint: "min 0" }),
        Field({ name: "StartTimestamp", id: 0x1, type: "epoch-s", conformance: "desc" }),
        Field({ name: "EndTimestamp", id: 0x2, type: "epoch-s", conformance: "desc", constraint: "min startTimestamp + 1" }),
        Field({ name: "StartSystime", id: 0x3, type: "systime-ms", conformance: "desc" }),
        Field({ name: "EndSystime", id: 0x4, type: "systime-ms", conformance: "desc", constraint: "min startSystime + 1" })
    ),

    Datatype(
        { name: "CumulativeEnergyResetStruct", type: "struct" },
        Field({
            name: "ImportedResetTimestamp", id: 0x0, type: "epoch-s", conformance: "[IMPE]", default: null,
            quality: "X"
        }),
        Field({
            name: "ExportedResetTimestamp", id: 0x1, type: "epoch-s", conformance: "[EXPE]", default: null,
            quality: "X"
        }),
        Field({
            name: "ImportedResetSystime", id: 0x2, type: "systime-ms", conformance: "[IMPE]", default: null,
            quality: "X"
        }),
        Field({
            name: "ExportedResetSystime", id: 0x3, type: "systime-ms", conformance: "[EXPE]", default: null,
            quality: "X"
        })
    )
);

MatterDefinition.children.push(ElectricalEnergyMeasurement);
