import {
  Layout,
  struct,
  greedy,
  union,
  u8,
  u16,
  u32,
  ns64,
  nu64,
  seq,
  LayoutObject,
} from '@solana/buffer-layout';
import { PublicKey } from '@solana/web3.js';
import { BN } from 'bn.js';
import { AdminState, EscrowState } from './types';

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

class PublicKeyLayout extends Layout {
  constructor(property?: string) {
    super(32, property);
  }

  decode(b: Uint8Array, offset?: number): PublicKey {
    return new PublicKey(super.decode(b, offset));
  }

  encode(src: PublicKey, b: Uint8Array, offset: number) {
    return super.encode(src.toBuffer(), b, offset);
  }
}

export function publicKeyLayout(property?: string): PublicKeyLayout {
  return new PublicKeyLayout(property);
}

export const INSTRUCTION_LAYOUT = union(u8('instruction'), null, 'instruction');
INSTRUCTION_LAYOUT.addVariant(
  0,
  struct([nu64('dailyRentPrice'), u32('maxRenters'), u8('maxRentDuration')]),
  'StartLending'
);
INSTRUCTION_LAYOUT.addVariant(1, struct([]), 'StopLending');
INSTRUCTION_LAYOUT.addVariant(
  2,
  struct([u16('rentAmount'), u8('rentDuration')]),
  'StartRenting'
);
INSTRUCTION_LAYOUT.addVariant(3, struct([ns64('rentedAt')]), 'StopRenting');
INSTRUCTION_LAYOUT.addVariant(
  4,
  struct([publicKeyLayout('renterAddress'), ns64('rentedAt')]),
  'ClaimRent'
);
INSTRUCTION_LAYOUT.addVariant(5, struct([u32('fee')]), 'InitializeAdminState');
INSTRUCTION_LAYOUT.addVariant(6, struct([u32('fee')]), 'SetFee');
INSTRUCTION_LAYOUT.addVariant(7, struct([]), 'SetPayableAccount');

export function encodeInstruction(instruction: LayoutObject) {
  const b = Buffer.alloc(100);
  return b.slice(0, INSTRUCTION_LAYOUT.encode(instruction, b));
}

const renting_struct = struct([
  publicKeyLayout('renter'),
  ns64('rentedAt'),
  u16('rentAmount'),
  u8('rentDuration'),
]);

const bucket_struct = struct([renting_struct, u32('hash'), u8('_align')]);

export const ESCROW_LAYOUT = struct(
  [
    publicKeyLayout('pdaTokenAccount'),
    publicKeyLayout('lender'),
    publicKeyLayout('tempNftAccount'),
    publicKeyLayout('lenderTokenAccount'),
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
export const ADMIN_STATE_LAYOUT = struct(
  [
    publicKeyLayout('pdaTokenAccount'),
    seq(publicKeyLayout(), NUM_MINT_TOKENS, 'tokenAccounts'),
  ],
  'admin'
);

export function decodeAdminStateData(b: Buffer): AdminState {
  const tokenAccountsLength = b.length - 4;
  if (tokenAccountsLength < 0 || tokenAccountsLength % 32 !== 0) {
    throw new Error('Invalid buffer length.');
  }

  return ADMIN_STATE_LAYOUT.decode(b) as AdminState;
}
