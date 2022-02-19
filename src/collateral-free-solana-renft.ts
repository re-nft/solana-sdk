import {
  TransactionInstruction,
  PublicKey,
  Signer,
  Keypair,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { i64 } from './layout';
import { Instruction, ICollateralFreeSolanaReNFT } from './types';
import { encodeInstruction } from './layout';

const COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID = new PublicKey(
  'ReNFTCFtqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM'
);

export class CollateralFreeSolanaReNFT implements ICollateralFreeSolanaReNFT {
  public lendIx(
    lender: Keypair,
    tempNftAccount: PublicKey,
    lenderTokenAccount: PublicKey,
    pdaTokenAccount: PublicKey,
    escrowStateAccount: PublicKey,
    adminStateAccount: PublicKey,
    dailyRentPrice: bigint,
    maxRenters: number,
    maxRentDuration: number
  ): Instruction {
    const keys = [
      { pubkey: tempNftAccount, isSigner: false, isWritable: true },
      { pubkey: lenderTokenAccount, isSigner: false, isWritable: false },
      { pubkey: pdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowStateAccount, isSigner: false, isWritable: true },
      { pubkey: adminStateAccount, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: lender.publicKey, isSigner: true, isWritable: false },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        StartLend: {
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
  public stopLendIx(
    lender: Keypair,
    tempNftAccount: PublicKey,
    lenderNftAccount: PublicKey,
    pdaTokenAccount: PublicKey,
    escrowStateAccount: PublicKey
  ): Instruction {
    const keys = [
      { pubkey: tempNftAccount, isSigner: false, isWritable: true },
      { pubkey: lenderNftAccount, isSigner: false, isWritable: false },
      { pubkey: pdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowStateAccount, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      {
        pubkey: COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: lender.publicKey, isSigner: true, isWritable: false },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        StopLend: {},
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
  public editLendIx(
    lender: Keypair,
    lenderTokenAccount: PublicKey,
    oldPdaTokenAccount: PublicKey,
    newPdaTokenAccount: PublicKey,
    escrowStateAccount: PublicKey,
    adminStateAccount: PublicKey,
    dailyRentPrice: bigint,
    maxRentDuration: number
  ): Instruction {
    const keys = [
      { pubkey: lenderTokenAccount, isSigner: false, isWritable: false },
      { pubkey: oldPdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: newPdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowStateAccount, isSigner: false, isWritable: true },
      { pubkey: adminStateAccount, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      {
        pubkey: COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: lender.publicKey, isSigner: true, isWritable: false },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        EditLend: {
          dailyRentPrice,
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
  public rentIx(
    renter: Keypair,
    tempTokenAccount: PublicKey,
    pdaTokenAccount: PublicKey,
    escrowStateAccount: PublicKey,
    rentAmount: number,
    rentDuration: number
  ): Instruction {
    const keys = [
      { pubkey: tempTokenAccount, isSigner: false, isWritable: true },
      { pubkey: pdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowStateAccount, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      {
        pubkey: COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: renter.publicKey, isSigner: true, isWritable: false },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        Rent: { rentAmount, rentDuration },
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
  public stopRentIx(
    renter: Keypair,
    pdaTokenAccount: PublicKey,
    renterTokenAccount: PublicKey,
    lenderTokenAccount: PublicKey,
    adminTokenAccount: PublicKey,
    escrowStateAccount: PublicKey,
    adminStateAccount: PublicKey,
    rentedAt: i64
  ): Instruction {
    const keys = [
      { pubkey: pdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: renterTokenAccount, isSigner: false, isWritable: true },
      { pubkey: lenderTokenAccount, isSigner: false, isWritable: true },
      { pubkey: adminTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowStateAccount, isSigner: false, isWritable: true },
      { pubkey: adminStateAccount, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      {
        pubkey: COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: renter.publicKey, isSigner: true, isWritable: false },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        StopRent: { rentedAt },
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
  public claimIx(
    lender: Keypair,
    pdaTokenAccount: PublicKey,
    lenderTokenAccount: PublicKey,
    adminTokenAccount: PublicKey,
    escrowStateAccount: PublicKey,
    adminStateAccount: PublicKey,
    renterAddress: PublicKey,
    rentedAt: i64
  ): Instruction {
    const keys = [
      { pubkey: pdaTokenAccount, isSigner: false, isWritable: true },
      { pubkey: lenderTokenAccount, isSigner: false, isWritable: true },
      { pubkey: adminTokenAccount, isSigner: false, isWritable: true },
      { pubkey: escrowStateAccount, isSigner: false, isWritable: true },
      { pubkey: adminStateAccount, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      {
        pubkey: COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: lender.publicKey, isSigner: true, isWritable: false },
    ];
    const programId = COLLATERAL_FREE_SOLANA_RENFT_PROGRAM_ID;
    const transactionInstruction = new TransactionInstruction({
      keys,
      programId,
      data: encodeInstruction({
        Claim: { renterAddress, rentedAt },
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
      { pubkey: adminStateAccount, isSigner: false, isWritable: true },
      { pubkey: admin.publicKey, isSigner: true, isWritable: false },
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
      { pubkey: adminStateAccount, isSigner: false, isWritable: true },
      { pubkey: admin.publicKey, isSigner: true, isWritable: false },
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
      { pubkey: adminStateAccount, isSigner: false, isWritable: true },
      { pubkey: adminTokenAccount, isSigner: false, isWritable: true },
      { pubkey: admin.publicKey, isSigner: true, isWritable: false },
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
