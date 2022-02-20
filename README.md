# Welcome to ReNFT Solana SDK

Lend and rent any spl-token NFTs Solana. This library will make your life easier with ReNFT.

![npm](https://img.shields.io/npm/v/@renft/solana-sdk?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/@renft/solana-sdk?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/min/@renft/solana-sdk?style=for-the-badge)
![npm](https://img.shields.io/npm/dm/@renft/solana-sdk?style=for-the-badge)

## Install

`yarn add @renft/solana-sdk`

## Usage

See [Example](./examples/example.js).

## Developing

### Build

`yarn build`

### Lint

`yarn lint`

### Test

`yarn test`

### Structure

* solana-sdk
  * src
    * collateral-free-solana-renft.ts - methods to create ReNFT collateral-free instructions
    * index.ts
    * layout.ts - buffer layout of instructions and accounts (admin, escrow state)
    * transaction.ts - transaction builder utilities
    * types.ts
    * util.ts - utilities


