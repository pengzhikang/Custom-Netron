"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.time = exports.Weights = exports.TensorType = exports.TensorShape = exports.Tensor = exports.Layer = exports.DataType = exports.DataLayout = exports.Connect = exports.Attributes = exports.AttrMeta = void 0;
var attr_meta_1 = require("./pzk-model/attr-meta");
__createBinding(exports, attr_meta_1, "AttrMeta");
var attributes_1 = require("./pzk-model/attributes");
__createBinding(exports, attributes_1, "Attributes");
var connect_1 = require("./pzk-model/connect");
__createBinding(exports, connect_1, "Connect");
var data_layout_1 = require("./pzk-model/data-layout");
__createBinding(exports, data_layout_1, "DataLayout");
var data_type_1 = require("./pzk-model/data-type");
__createBinding(exports, data_type_1, "DataType");
var layer_1 = require("./pzk-model/layer");
__createBinding(exports, layer_1, "Layer");
var tensor_1 = require("./pzk-model/tensor");
__createBinding(exports, tensor_1, "Tensor");
var tensor_shape_1 = require("./pzk-model/tensor-shape");
__createBinding(exports, tensor_shape_1, "TensorShape");
var tensor_type_1 = require("./pzk-model/tensor-type");
__createBinding(exports, tensor_type_1, "TensorType");
var weights_1 = require("./pzk-model/weights");
__createBinding(exports, weights_1, "Weights");
var time_1 = require("./pzk-model/time");
__createBinding(exports, time_1, "time");