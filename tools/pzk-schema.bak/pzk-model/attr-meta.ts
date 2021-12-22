// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from './flatbuffers';

import { DataType } from '../pzk-model/data-type';


export class AttrMeta {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):AttrMeta {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsAttrMeta(bb:flatbuffers.ByteBuffer, obj?:AttrMeta):AttrMeta {
  return (obj || new AttrMeta()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsAttrMeta(bb:flatbuffers.ByteBuffer, obj?:AttrMeta):AttrMeta {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new AttrMeta()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

key():string|null
key(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
key(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

require():boolean {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
}

bufferData():DataType {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readInt8(this.bb_pos + offset) : DataType.INT32;
}

bufferEleNum():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0;
}

buffer(index: number):number|null {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.readUint8(this.bb!.__vector(this.bb_pos + offset) + index) : 0;
}

bufferLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

bufferArray():Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? new Uint8Array(this.bb!.bytes().buffer, this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset), this.bb!.__vector_len(this.bb_pos + offset)) : null;
}

static startAttrMeta(builder:flatbuffers.Builder) {
  builder.startObject(5);
}

static addKey(builder:flatbuffers.Builder, keyOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, keyOffset, 0);
}

static addRequire(builder:flatbuffers.Builder, require:boolean) {
  builder.addFieldInt8(1, +require, +false);
}

static addBufferData(builder:flatbuffers.Builder, bufferData:DataType) {
  builder.addFieldInt8(2, bufferData, DataType.INT32);
}

static addBufferEleNum(builder:flatbuffers.Builder, bufferEleNum:number) {
  builder.addFieldInt32(3, bufferEleNum, 0);
}

static addBuffer(builder:flatbuffers.Builder, bufferOffset:flatbuffers.Offset) {
  builder.addFieldOffset(4, bufferOffset, 0);
}

static createBufferVector(builder:flatbuffers.Builder, data:number[]|Uint8Array):flatbuffers.Offset {
  builder.startVector(1, data.length, 1);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addInt8(data[i]!);
  }
  return builder.endVector();
}

static startBufferVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(1, numElems, 1);
}

static endAttrMeta(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createAttrMeta(builder:flatbuffers.Builder, keyOffset:flatbuffers.Offset, require:boolean, bufferData:DataType, bufferEleNum:number, bufferOffset:flatbuffers.Offset):flatbuffers.Offset {
  AttrMeta.startAttrMeta(builder);
  AttrMeta.addKey(builder, keyOffset);
  AttrMeta.addRequire(builder, require);
  AttrMeta.addBufferData(builder, bufferData);
  AttrMeta.addBufferEleNum(builder, bufferEleNum);
  AttrMeta.addBuffer(builder, bufferOffset);
  return AttrMeta.endAttrMeta(builder);
}
}
