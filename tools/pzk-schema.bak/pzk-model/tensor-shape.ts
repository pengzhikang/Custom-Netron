// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from './flatbuffers';

export class TensorShape {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):TensorShape {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsTensorShape(bb:flatbuffers.ByteBuffer, obj?:TensorShape):TensorShape {
  return (obj || new TensorShape()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsTensorShape(bb:flatbuffers.ByteBuffer, obj?:TensorShape):TensorShape {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new TensorShape()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

dimsize():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : 0;
}

dims(index: number):number|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readUint32(this.bb!.__vector(this.bb_pos + offset) + index * 4) : 0;
}

dimsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

dimsArray():Uint32Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? new Uint32Array(this.bb!.bytes().buffer, this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset), this.bb!.__vector_len(this.bb_pos + offset)) : null;
}

static startTensorShape(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addDimsize(builder:flatbuffers.Builder, dimsize:number) {
  builder.addFieldInt8(0, dimsize, 0);
}

static addDims(builder:flatbuffers.Builder, dimsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, dimsOffset, 0);
}

static createDimsVector(builder:flatbuffers.Builder, data:number[]|Uint32Array):flatbuffers.Offset;
/**
 * @deprecated This Uint8Array overload will be removed in the future.
 */
static createDimsVector(builder:flatbuffers.Builder, data:number[]|Uint8Array):flatbuffers.Offset;
static createDimsVector(builder:flatbuffers.Builder, data:number[]|Uint32Array|Uint8Array):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addInt32(data[i]!);
  }
  return builder.endVector();
}

static startDimsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endTensorShape(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createTensorShape(builder:flatbuffers.Builder, dimsize:number, dimsOffset:flatbuffers.Offset):flatbuffers.Offset {
  TensorShape.startTensorShape(builder);
  TensorShape.addDimsize(builder, dimsize);
  TensorShape.addDims(builder, dimsOffset);
  return TensorShape.endTensorShape(builder);
}
}
