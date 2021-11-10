import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  Signer,
  TransactionCtorFields,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { Instruction, TransactionPayload } from './types';

export class TransactionBuilder {
  private connection: Connection;
  private feePayer: PublicKey;
  private instructions: Instruction[];

  constructor(connection: Connection, feePayer: PublicKey) {
    this.connection = connection;
    this.feePayer = feePayer;
    this.instructions = [];
  }

  addInstruction(instruction: Instruction): TransactionBuilder {
    this.instructions.push(instruction);
    return this;
  }

  async build(): Promise<TransactionPayload> {
    const recentBlockHash = (
      await this.connection.getRecentBlockhash('singleGossip')
    ).blockhash;
    const txFields: TransactionCtorFields = {
      recentBlockhash: recentBlockHash,
      feePayer: this.feePayer,
    };

    let instructions: TransactionInstruction[] = [];
    let signers: Signer[] = [];
    this.instructions.forEach(curr => {
      instructions = instructions.concat(curr.transactionInstructions);
      signers = signers.concat(curr.signers);
    });

    const transaction = new Transaction(txFields);
    transaction.add(...instructions);
    transaction.feePayer = this.feePayer;

    return {
      transaction: transaction,
      signers: signers,
      execute: async () => {
        return sendAndConfirmTransaction(this.connection, transaction, signers);
      },
    };
  }
}
