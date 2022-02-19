import {
  struct,
  greedy,
  union,
  u8,
  u16,
  u32,
  ns64,
  nu64,
  seq,
  Layout,
  LayoutObject,
} from '@solana/buffer-layout';
import { publicKey } from '@solana/buffer-layout-utils';
import { BN } from 'bn.js';
import { AdminState, EscrowState, Bucket, Renting } from './types';

export class i64 extends BN {
  toBuffer(): Buffer {
    const a = super.toArray().reverse();
    const b = Buffer.from(a);
    if (b.length === 8) {
      return b;
    }
    if (b.length > 8) {
      throw new Error('i64 too large');
    }

    const zeroPad = Buffer.alloc(8);
    b.copy(zeroPad);
    return zeroPad;
  }

  static fromBuffer(buffer: Buffer): i64 {
    if (buffer.length !== 8) {
      throw new Error(`Invalid buffer length: ${buffer.length}`);
    }
    // Assumes value is positive
    return new i64(
      [...buffer]
        .reverse()
        .map(i => `00${i.toString(16)}`.slice(-2))
        .join(''),
      16
    );
  }
}

export const INSTRUCTION_LAYOUT = union(
  u32('instruction') as Layout<any>,
  null,
  'instruction'
);
INSTRUCTION_LAYOUT.addVariant(
  0,
  struct([nu64('dailyRentPrice'), u32('maxRenters'), u8('maxRentDuration')]),
  'Lend'
);
INSTRUCTION_LAYOUT.addVariant(1, struct([]), 'StopLend');
INSTRUCTION_LAYOUT.addVariant(
  2,
  struct([nu64('dailyRentPrice'), u8('maxRentDuration')]),
  'EditLend'
);
INSTRUCTION_LAYOUT.addVariant(
  3,
  struct([u16('rentAmount'), u8('rentDuration')]),
  'Rent'
);
INSTRUCTION_LAYOUT.addVariant(4, struct([ns64('rentedAt')]), 'StopRent');
INSTRUCTION_LAYOUT.addVariant(
  5,
  struct([publicKey('renterAddress'), ns64('rentedAt')]),
  'Claim'
);
INSTRUCTION_LAYOUT.addVariant(6, struct([u32('fee')]), 'InitializeAdminState');
INSTRUCTION_LAYOUT.addVariant(7, struct([u32('fee')]), 'SetFee');
INSTRUCTION_LAYOUT.addVariant(8, struct([]), 'SetPayableAccount');

export function encodeInstruction(instruction: LayoutObject) {
  const b = Buffer.alloc(100);
  return b.slice(0, INSTRUCTION_LAYOUT.encode(instruction, b));
}

const renting_struct = struct<Renting>([
  publicKey('renter'),
  ns64('rentedAt'),
  u16('rentAmount'),
  u8('rentDuration'),
]);

const bucket_struct = struct<Bucket>([
  renting_struct,
  u32('hash'),
  u8('_align'),
]);

export const ESCROW_LAYOUT = struct<EscrowState>(
  [
    publicKey('pdaTokenAccount'),
    publicKey('lender'),
    publicKey('tempNftAccount'),
    publicKey('lenderTokenAccount'),
    nu64('dailyRentPrice'),
    u32('currentRenters'),
    u32('maxRenters'),
    u8('maxRentDuration'),
    u8('isInitialized'),
    seq(u8(), 6, '_align'),
    seq(bucket_struct, greedy(bucket_struct.span), 'rentings'),
  ],
  'escrow'
);

export function decodeEscrowStateData(b: Buffer): EscrowState {
  const rentingsLength = b.length - 152;
  if (rentingsLength < 0 || rentingsLength % 48 !== 0) {
    throw new Error('Invalid buffer length.');
  }

  return ESCROW_LAYOUT.decode(b) as EscrowState;
}

const NUM_MINT_TOKENS = 2;
export const ADMIN_STATE_LAYOUT = struct<AdminState>(
  [u32('fee'), seq(publicKey(), NUM_MINT_TOKENS, 'tokenAccounts')],
  'admin'
);

export function decodeAdminStateData(b: Buffer): AdminState {
  const tokenAccountsLength = b.length - 4;
  if (tokenAccountsLength < 0 || tokenAccountsLength % 32 !== 0) {
    throw new Error('Invalid buffer length.');
  }

  return ADMIN_STATE_LAYOUT.decode(b) as AdminState;
}
