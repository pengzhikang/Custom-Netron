"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
exports.__esModule = true;
exports.time = void 0;
var flatbuffers = require("./flatbuffers");
var time = /** @class */ (function () {
    function time() {
        this.bb = null;
        this.bb_pos = 0;
    }
    time.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    time.getRootAstime = function (bb, obj) {
        return (obj || new time()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    time.getSizePrefixedRootAstime = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new time()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    time.prototype.year = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readUint32(this.bb_pos + offset) : 1998;
    };
    time.prototype.month = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : 10;
    };
    time.prototype.day = function () {
        var offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : 11;
    };
    time.prototype.hour = function () {
        var offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : 6;
    };
    time.prototype.min = function () {
        var offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : 6;
    };
    time.prototype.sec = function () {
        var offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : 6;
    };
    time.starttime = function (builder) {
        builder.startObject(6);
    };
    time.addYear = function (builder, year) {
        builder.addFieldInt32(0, year, 1998);
    };
    time.addMonth = function (builder, month) {
        builder.addFieldInt8(1, month, 10);
    };
    time.addDay = function (builder, day) {
        builder.addFieldInt8(2, day, 11);
    };
    time.addHour = function (builder, hour) {
        builder.addFieldInt8(3, hour, 6);
    };
    time.addMin = function (builder, min) {
        builder.addFieldInt8(4, min, 6);
    };
    time.addSec = function (builder, sec) {
        builder.addFieldInt8(5, sec, 6);
    };
    time.endtime = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    time.createtime = function (builder, year, month, day, hour, min, sec) {
        time.starttime(builder);
        time.addYear(builder, year);
        time.addMonth(builder, month);
        time.addDay(builder, day);
        time.addHour(builder, hour);
        time.addMin(builder, min);
        time.addSec(builder, sec);
        return time.endtime(builder);
    };
    return time;
}());
exports.time = time;
