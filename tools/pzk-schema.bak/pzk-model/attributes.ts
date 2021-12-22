// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from './flatbuffers';

import { AttrMeta } from '../pzk-model/attr-meta';


export class Attributes {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):Attributes {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsAttributes(bb:flatbuffers.ByteBuffer, obj?:Attributes):Attributes {
  return (obj || new Attributes()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsAttributes(bb:flatbuffers.ByteBuffer, obj?:Attributes):Attributes {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Attributes()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

type():string|null
type(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
type(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

metaNum():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0;
}

metaRequireNum():number {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0;
}

buffer(index: number, obj?:AttrMeta):AttrMeta|null {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? (obj || new AttrMeta()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

bufferLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startAttributes(builder:flatbuffers.Builder) {
  builder.startObject(4);
}

static addType(builder:flatbuffers.Builder, typeOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, typeOffset, 0);
}

static addMetaNum(builder:flatbuffers.Builder, metaNum:number) {
  builder.addFieldInt32(1, metaNum, 0);
}

static addMetaRequireNum(builder:flatbuffers.Builder, metaRequireNum:number) {
  builder.addFieldInt32(2, metaRequireNum, 0);
}

static addBuffer(builder:flatbuffers.Builder, bufferOffset:flatbuffers.Offset) {
  builder.addFieldOffset(3, bufferOffset, 0);
}

static createBufferVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startBufferVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endAttributes(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createAttributes(builder:flatbuffers.Builder, typeOffset:flatbuffers.Offset, metaNum:number, metaRequireNum:number, bufferOffset:flatbuffers.Offset):flatbuffers.Offset {
  Attributes.startAttributes(builder);
  Attributes.addType(builder, typeOffset);
  Attributes.addMetaNum(builder, metaNum);
  Attributes.addMetaRequireNum(builder, metaRequireNum);
  Attributes.addBuffer(builder, bufferOffset);
  return Attributes.endAttributes(builder);
}
}