import {
  clusterApiUrl,
  Connection,
  Keypair,
  SystemProgram,
} from '@solana/web3.js';
import {
  calculateEscrowSize,
  CollateralFreeSolanaReNFT,
  TransactionBuilder,
} from '../src';

(async () => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  // Replace with your keypair
  const lender = Keypair.generate();

  const escrowStateAccount = Keypair.generate();
  const maxRenters = 1;
  const escrowSize = calculateEscrowSize(maxRenters);
  const lamports = await connection.getMinimumBalanceForRentExemption(
    escrowSize
  );

  const createAccountInstruction = {
    transactionInstructions: [
      SystemProgram.createAccount({
        fromPubkey: lender.publicKey,
        newAccountPubkey: escrowStateAccount.publicKey,
        space: escrowSize,
        lamports,
        programId,
      }),
    ],

    signers: [
      {
        publicKey: lender.publicKey,
        secretKey: lender.secretKey,
      },
    ],
  };
  const lendInstruction = new CollateralFreeSolanaReNFT().lendIx(
    lender,
    new PublicKey('GotX38MnGnFEPxzG5iB3Y9tJSHqbTgJaLvTnez1jejUG'),
    new PublicKey('FQJfKzGQb1WmrhxkeHCjX8mX9pp7tjxQtpvuMxPUDTQP'),
    new PublicKey('EGqyhXTteTFaPu3ZPSMKv7JVahnt6hH1apT9NE9tSRRt'),
    escrowStateAccount.publicKey,
    new PublicKey('5uDHVjncYzCRYemVUuXVcLSiAaorqRP7YafL3BcNu26R'),
    2000,
    maxRenters,
    3
  );

  const transactionBuilder = new TransactionBuilder(
    connection,
    lender.publicKey
  );
  transactionBuilder.addInstruction(createAccountInstruction);
  transactionBuilder.addInstruction(lendInstruction);
  await transactionBuilder.execute();
})();
