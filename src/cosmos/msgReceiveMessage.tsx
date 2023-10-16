import { Field, Type } from 'protobufjs'

// Protobuf message for a CCTP receive.

// From https://gist.github.com/fadeev/a4981eff1cf3a805ef10e25313d5f2b7 and
// https://github.com/circlefin/noble-cctp/blob/b9e0cf535132192f5c4ac5b65dd6ab792e668a59/proto/circle/cctp/v1/tx.proto.
// This saves us having to properly import and build the protobuf objects, though we probably
// should if we're going to do more functionality here because this is obviously very prone to
// breakaget.
export const msgReceiveMessageUrl = '/circle.cctp.v1.MsgReceiveMessage'

export const MsgReceiveMessage = new Type('MsgCreatePost')
  .add(new Field('from', 1, 'string'))
  .add(new Field('message', 2, 'bytes'))
  .add(new Field('attestation', 3, 'bytes'))
