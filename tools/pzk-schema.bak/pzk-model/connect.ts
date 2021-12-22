// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from './flatbuffers';

export class Connect {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):Connect {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsConnect(bb:flatbuffers.ByteBuffer, obj?:Connect):Connect {
  return (obj || new Connect()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsConnect(bb:flatbuffers.ByteBuffer, obj?:Connect):Connect {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Connect()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

name():string|null
name(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
name(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

necessary():boolean {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
}

tensorId():number {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0;
}

static startConnect(builder:flatbuffers.Builder) {
  builder.startObject(3);
}

static addName(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, nameOffset, 0);
}

static addNecessary(builder:flatbuffers.Builder, necessary:boolean) {
  builder.addFieldInt8(1, +necessary, +false);
}

static addTensorId(builder:flatbuffers.Builder, tensorId:number) {
  builder.addFieldInt32(2, tensorId, 0);
}

static endConnect(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createConnect(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset, necessary:boolean, tensorId:number):flatbuffers.Offset {
  Connect.startConnect(builder);
  Connect.addName(builder, nameOffset);
  Connect.addNecessary(builder, necessary);
  Connect.addTensorId(builder, tensorId);
  return Connect.endConnect(builder);
}
}
