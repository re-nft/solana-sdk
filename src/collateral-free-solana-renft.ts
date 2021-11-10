import {
  TransactionInstruction,
  PublicKey,
  Signer,
  Keypair,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { u64, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Instruction, ICollateralFreeSolanaReNFT } from './types';
import { encodeInstruction } from './layout';

const COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID = new PublicKey(
  'ReNFTCFtqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM'
);

export class CollateralFreeSolanaReNFT implements ICollateralFreeSolanaReNFT {
  public startLendingIx(
    lender: Keypair,
    tempNftAccount: PublicKey,
    initializerTokenAccount: PublicKey,
    pdaTokenAccount: PublicKey,
    escrowAccount: PublicKey,
    dailyRentPrice: u64,
    maxRenters: number,
    maxRentDuration: number
  ): Instruction {
    const keys = [
      { pubkey: lender.publicKey, isSigner: true, isWritable: false },
      { pubkey: tempNftAccount, isSigner: false, isWritable: true },
      { pubkey: initializerTokenAccount, isSigner: false, isWritable: false },
      { pubkey: pdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowAccount, isSigner: false, isWritable: true },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        StartLending: {
          dailyRentPrice,
          maxRenters,
          maxRentDuration,
        },
      }),
    });
    const signer: Signer = {
      publicKey: lender.publicKey,
      secretKey: lender.secretKey,
    };
    return {
      transactionInstructions: [transactionInstruction],
      signers: [signer],
    };
  }
  public stopLendingIx(
    lender: Keypair,
    tempNftAccount: PublicKey,
    initializerNftAccount: PublicKey,
    pdaTokenAccount: PublicKey,
    escrowAccount: PublicKey
  ): Instruction {
    const keys = [
      { pubkey: lender.publicKey, isSigner: true, isWritable: false },
      { pubkey: tempNftAccount, isSigner: false, isWritable: true },
      { pubkey: initializerNftAccount, isSigner: false, isWritable: false },
      { pubkey: pdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowAccount, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      {
        pubkey: COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        StopLending: {},
      }),
    });

    const signer: Signer = {
      publicKey: lender.publicKey,
      secretKey: lender.secretKey,
    };
    return {
      transactionInstructions: [transactionInstruction],
      signers: [signer],
    };
  }
  public startRentingIx(
    renter: Keypair,
    tempTokenAccount: PublicKey,
    pdaTokenAccount: PublicKey,
    escrowAccount: PublicKey,
    rentAmount: number,
    rentDuration: number
  ): Instruction {
    const keys = [
      { pubkey: renter.publicKey, isSigner: true, isWritable: false },
      { pubkey: tempTokenAccount, isSigner: false, isWritable: true },
      { pubkey: pdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowAccount, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      {
        pubkey: COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        StartRenting: { rentAmount, rentDuration },
      }),
    });

    const signer: Signer = {
      publicKey: renter.publicKey,
      secretKey: renter.secretKey,
    };
    return {
      transactionInstructions: [transactionInstruction],
      signers: [signer],
    };
  }
  public stopRentingIx(
    renter: Keypair,
    pdaTokenAccount: PublicKey,
    renterTokenAccount: PublicKey,
    initializerTokenAccount: PublicKey,
    escrowAccount: PublicKey,
    rentedAt: u64
  ): Instruction {
    const keys = [
      { pubkey: renter.publicKey, isSigner: true, isWritable: false },
      { pubkey: pdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: renterTokenAccount, isSigner: false, isWritable: true },
      { pubkey: initializerTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowAccount, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      {
        pubkey: COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        StopRenting: { rentedAt },
      }),
    });
    const signer: Signer = {
      publicKey: renter.publicKey,
      secretKey: renter.secretKey,
    };
    return {
      transactionInstructions: [transactionInstruction],
      signers: [signer],
    };
  }
  public claimRentIx(
    lender: Keypair,
    pdaTokenAccount: PublicKey,
    initializerTokenAccount: PublicKey,
    escrowAccount: PublicKey
  ): Instruction {
    const keys = [
      { pubkey: lender.publicKey, isSigner: true, isWritable: false },
      { pubkey: pdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: initializerTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowAccount, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      {
        pubkey: COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        ClaimRent: {},
      }),
    });
    const signer: Signer = {
      publicKey: lender.publicKey,
      secretKey: lender.secretKey,
    };
    return {
      transactionInstructions: [transactionInstruction],
      signers: [signer],
    };
  }
}
