import {
  TransactionInstruction,
  PublicKey,
  Keypair,
  Signer,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';
import { u64 } from '@solana/spl-token';
import { i64 } from './layout';

export interface Renting {
  renter: PublicKey;
  rentedAt: i64;
  rentAmount: number;
  rentDuration: number;
}

export interface Bucket {
  renting: Renting;
  hash: number;
  _align: number;
}

export interface EscrowState {
  pdaTokenAccount: PublicKey;
  lender: PublicKey;
  tempNftAccount: PublicKey;
  lenderTokenAccount: PublicKey;
  dailyRentPrice: u64;
  currentRenters: number;
  maxRenters: number;
  maxRentDuration: number;
  isInitialized: boolean;
  _align: number[];
  rentings: Bucket[];
}

export interface AdminState {
  fee: number;
  tokenAccounts: PublicKey[];
}

export interface TransactionPayload {
  transaction: Transaction;
  signers: Signer[];
  execute: () => Promise<TransactionSignature>;
}
export interface Instruction {
  transactionInstructions: TransactionInstruction[];
  signers: Signer[];
}

export interface ICollateralFreeSolanaReNFT {
  lendIx(
    lender: Keypair,
    tempNftAccount: PublicKey,
    lenderTokenAccount: PublicKey,
    pdaTokenAccount: PublicKey,
    escrowStateAccount: PublicKey,
    adminStateAccount: PublicKey,
    dailyRentPrice: u64,
    maxRenters: number,
    maxRentDuration: number
  ): Instruction;
  stopLendIx(
    lender: Keypair,
    tempNftAccount: PublicKey,
    lenderNftAccount: PublicKey,
    pdaTokenAccount: PublicKey,
    escrowStateAccount: PublicKey
  ): Instruction;
  editLendIx(
    lender: Keypair,
    lenderTokenAccount: PublicKey,
    oldPdaTokenAccount: PublicKey,
    newPdaTokenAccount: PublicKey,
    escrowStateAccount: PublicKey,
    adminStateAccount: PublicKey,
    dailyRentPrice: u64,
    maxRentDuration: number
  ): Instruction;
  rentIx(
    renter: Keypair,
    tempTokenAccount: PublicKey,
    pdaTokenAccount: PublicKey,
    escrowStateAccount: PublicKey,
    rentAmount: number,
    rentDuration: number
  ): Instruction;
  stopRentIx(
    renter: Keypair,
    pdaTokenAccount: PublicKey,
    renterTokenAccount: PublicKey,
    lenderTokenAccount: PublicKey,
    adminTokenAccount: PublicKey,
    escrowStateAccount: PublicKey,
    adminStateAccount: PublicKey,
    rentedAt: i64
  ): Instruction;
  claimIx(
    lender: Keypair,
    pdaTokenAccount: PublicKey,
    lenderTokenAccount: PublicKey,
    adminTokenAccount: PublicKey,
    escrowStateAccount: PublicKey,
    adminStateAccount: PublicKey,
    renterAddress: PublicKey,
    rentedAt: i64
  ): Instruction;
  initializeAdminStateIx(
    admin: Keypair,
    adminStateAccount: PublicKey,
    fee: number
  ): Instruction;
  setFeeIx(
    admin: Keypair,
    adminStateAccount: PublicKey,
    fee: number
  ): Instruction;
  setPayableAccountIx(
    admin: Keypair,
    adminStateAccount: PublicKey,
    adminTokenAccount: PublicKey
  ): Instruction;
}
