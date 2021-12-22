"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
exports.__esModule = true;
exports.Attributes = void 0;
var flatbuffers = require("./flatbuffers");
var attr_meta_1 = require("../pzk-model/attr-meta");
var Attributes = /** @class */ (function () {
    function Attributes() {
        this.bb = null;
        this.bb_pos = 0;
    }
    Attributes.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    Attributes.getRootAsAttributes = function (bb, obj) {
        return (obj || new Attributes()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    Attributes.getSizePrefixedRootAsAttributes = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Attributes()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    Attributes.prototype.type = function (optionalEncoding) {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    };
    Attributes.prototype.metaNum = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
    };
    Attributes.prototype.metaRequireNum = function () {
        var offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
    };
    Attributes.prototype.buffer = function (index, obj) {
        var offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? (obj || new attr_meta_1.AttrMeta()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    };
    Attributes.prototype.bufferLength = function () {
        var offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    };
    Attributes.startAttributes = function (builder) {
        builder.startObject(4);
    };
    Attributes.addType = function (builder, typeOffset) {
        builder.addFieldOffset(0, typeOffset, 0);
    };
    Attributes.addMetaNum = function (builder, metaNum) {
        builder.addFieldInt32(1, metaNum, 0);
    };
    Attributes.addMetaRequireNum = function (builder, metaRequireNum) {
        builder.addFieldInt32(2, metaRequireNum, 0);
    };
    Attributes.addBuffer = function (builder, bufferOffset) {
        builder.addFieldOffset(3, bufferOffset, 0);
    };
    Attributes.createBufferVector = function (builder, data) {
        builder.startVector(4, data.length, 4);
        for (var i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    };
    Attributes.startBufferVector = function (builder, numElems) {
        builder.startVector(4, numElems, 4);
    };
    Attributes.endAttributes = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    Attributes.createAttributes = function (builder, typeOffset, metaNum, metaRequireNum, bufferOffset) {
        Attributes.startAttributes(builder);
        Attributes.addType(builder, typeOffset);
        Attributes.addMetaNum(builder, metaNum);
        Attributes.addMetaRequireNum(builder, metaRequireNum);
        Attributes.addBuffer(builder, bufferOffset);
        return Attributes.endAttributes(builder);
    };
    return Attributes;
}());
exports.Attributes = Attributes;