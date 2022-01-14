import {
  TransactionInstruction,
  PublicKey,
  Signer,
  Keypair,
} from '@solana/web3.js';
import { u64, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { i64 } from './layout';
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
    adminStateAccount: PublicKey,
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
      { pubkey: adminStateAccount, isSigner: false, isWritable: false },
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
    adminTokenAccount: PublicKey,
    escrowAccount: PublicKey,
    adminStateAccount: PublicKey,
    rentedAt: i64
  ): Instruction {
    const keys = [
      { pubkey: renter.publicKey, isSigner: true, isWritable: false },
      { pubkey: pdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: renterTokenAccount, isSigner: false, isWritable: true },
      { pubkey: initializerTokenAccount, isSigner: false, isWritable: true },
      { pubkey: adminTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowAccount, isSigner: false, isWritable: true },
      { pubkey: adminStateAccount, isSigner: false, isWritable: false },
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
    adminTokenAccount: PublicKey,
    escrowAccount: PublicKey,
    adminStateAccount: PublicKey,
    renterAddress: PublicKey,
    rentedAt: i64
  ): Instruction {
    const keys = [
      { pubkey: lender.publicKey, isSigner: true, isWritable: false },
      { pubkey: pdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: initializerTokenAccount, isSigner: false, isWritable: true },
      { pubkey: adminTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowAccount, isSigner: false, isWritable: true },
      { pubkey: adminStateAccount, isSigner: false, isWritable: false },
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
        ClaimRent: { renterAddress, rentedAt },
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
  public initializeAdminStateIx(
    admin: Keypair,
    adminStateAccount: PublicKey,
    fee: number
  ): Instruction {
    const keys = [
      { pubkey: admin.publicKey, isSigner: true, isWritable: false },
      { pubkey: adminStateAccount, isSigner: false, isWritable: true },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        InitializeAdminState: { fee },
      }),
    });
    const signer: Signer = {
      publicKey: admin.publicKey,
      secretKey: admin.secretKey,
    };
    return {
      transactionInstructions: [transactionInstruction],
      signers: [signer],
    };
  }
  public setFeeIx(
    admin: Keypair,
    adminStateAccount: PublicKey,
    fee: number
  ): Instruction {
    const keys = [
      { pubkey: admin.publicKey, isSigner: true, isWritable: false },
      { pubkey: adminStateAccount, isSigner: false, isWritable: true },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        SetFee: { fee },
      }),
    });
    const signer: Signer = {
      publicKey: admin.publicKey,
      secretKey: admin.secretKey,
    };
    return {
      transactionInstructions: [transactionInstruction],
      signers: [signer],
    };
  }
  public setPayableAccountIx(
    admin: Keypair,
    adminStateAccount: PublicKey,
    adminTokenAccount: PublicKey
  ): Instruction {
    const keys = [
      { pubkey: admin.publicKey, isSigner: true, isWritable: false },
      { pubkey: adminStateAccount, isSigner: false, isWritable: true },
      { pubkey: adminTokenAccount, isSigner: false, isWritable: true },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        SetPayableAccount: {},
      }),
    });
    const signer: Signer = {
      publicKey: admin.publicKey,
      secretKey: admin.secretKey,
    };
    return {
      transactionInstructions: [transactionInstruction],
      signers: [signer],
    };
  }
}
