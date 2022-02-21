const calculateRentingsSize = (maxRenters: number): number => {
  return maxRenters * 2;
};
const RENTING_SIZE = 48;
const ESCROW_STATIC_SIZE = 152;
const ADMIN_NUM_MINT_TOKENS = 2;

export const ADMIN_SIZE = 32 * ADMIN_NUM_MINT_TOKENS + 5;
export const calculateEscrowSize = (maxRenters: number): number => {
  return ESCROW_STATIC_SIZE + calculateRentingsSize(maxRenters) * RENTING_SIZE;
};
