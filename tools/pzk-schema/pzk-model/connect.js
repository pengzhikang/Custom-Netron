"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
exports.__esModule = true;
exports.Connect = void 0;
var flatbuffers = require("flatbuffers");
var Connect = /** @class */ (function () {
    function Connect() {
        this.bb = null;
        this.bb_pos = 0;
    }
    Connect.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    Connect.getRootAsConnect = function (bb, obj) {
        return (obj || new Connect()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    Connect.getSizePrefixedRootAsConnect = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Connect()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    Connect.prototype.name = function (optionalEncoding) {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    };
    Connect.prototype.necessary = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    };
    Connect.prototype.tensorId = function () {
        var offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
    };
    Connect.startConnect = function (builder) {
        builder.startObject(3);
    };
    Connect.addName = function (builder, nameOffset) {
        builder.addFieldOffset(0, nameOffset, 0);
    };
    Connect.addNecessary = function (builder, necessary) {
        builder.addFieldInt8(1, +necessary, +false);
    };
    Connect.addTensorId = function (builder, tensorId) {
        builder.addFieldInt32(2, tensorId, 0);
    };
    Connect.endConnect = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    Connect.createConnect = function (builder, nameOffset, necessary, tensorId) {
        Connect.startConnect(builder);
        Connect.addName(builder, nameOffset);
        Connect.addNecessary(builder, necessary);
        Connect.addTensorId(builder, tensorId);
        return Connect.endConnect(builder);
    };
    return Connect;
}());
exports.Connect = Connect;
