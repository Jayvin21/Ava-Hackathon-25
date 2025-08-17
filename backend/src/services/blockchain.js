import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

// Connect to chain (e.g., Polygon)
const sdk = new ThirdwebSDK("polygon");

// Get contract instance
const marketplace = sdk.getContract("0xYourContractAddress");

// Example: Read contract state
export async function getEscrowStatus(orderId) {
  const status = await marketplace.call("getEscrowStatus", [orderId]);
  return status;
}
