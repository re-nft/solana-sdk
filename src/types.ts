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

export interface EscrowState {
  pdaTokenAccount: PublicKey;
  initializer: PublicKey;
  tempNftAccount: PublicKey;
  initializerTokenAccount: PublicKey;
  dailyRentPrice: u64;
  currentRenters: number;
  maxRenters: number;
  maxRentDuration: number;
  isInitialized: boolean;
  rentings: Renting[];
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
  startLendingIx(
    lender: Keypair,
    tempNftAccount: PublicKey,
    initializerTokenAccount: PublicKey,
    pdaTokenAccount: PublicKey,
    escrowAccount: PublicKey,
    adminStateAccount: PublicKey,
    dailyRentPrice: u64,
    maxRenters: number,
    maxRentDuration: number
  ): Instruction;
  stopLendingIx(
    lender: Keypair,
    tempNftAccount: PublicKey,
    initializerNftAccount: PublicKey,
    pdaTokenAccount: PublicKey,
    escrowAccount: PublicKey
  ): Instruction;
  startRentingIx(
    renter: Keypair,
    tempTokenAccount: PublicKey,
    pdaTokenAccount: PublicKey,
    escrowAccount: PublicKey,
    rentAmount: number,
    rentDuration: number
  ): Instruction;
  stopRentingIx(
    renter: Keypair,
    pdaTokenAccount: PublicKey,
    renterTokenAccount: PublicKey,
    initializerTokenAccount: PublicKey,
    adminTokenAccount: PublicKey,
    escrowAccount: PublicKey,
    adminStateAccount: PublicKey,
    rentedAt: u64
  ): Instruction;
  claimRentIx(
    lender: Keypair,
    pdaTokenAccount: PublicKey,
    initializerTokenAccount: PublicKey,
    adminTokenAccount: PublicKey,
    escrowAccount: PublicKey,
    adminStateAccount: PublicKey
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
  setPayableAccount(
    admin: Keypair,
    adminStateAccount: PublicKey,
    adminTokenAccount: PublicKey
  ): Instruction;
}
