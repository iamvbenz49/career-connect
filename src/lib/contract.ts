// import { BrowserProvider, Contract } from "ethers";

// // 👇 Fix TypeScript error for `window.ethereum`
// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// // 👇 Your Remix-generated ABI
// const abi = [
//   {
//     inputs: [
//       { internalType: "address", name: "student", type: "address" },
//       { internalType: "string", name: "jobId", type: "string" }
//     ],
//     name: "logReferral",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function"
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: true, internalType: "address", name: "alumni", type: "address" },
//       { indexed: true, internalType: "address", name: "student", type: "address" },
//       { indexed: false, internalType: "string", name: "jobId", type: "string" },
//       { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" }
//     ],
//     name: "ReferralLogged",
//     type: "event"
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
//     name: "getReferral",
//     outputs: [
//       {
//         components: [
//           { internalType: "address", name: "alumni", type: "address" },
//           { internalType: "address", name: "student", type: "address" },
//           { internalType: "string", name: "jobId", type: "string" },
//           { internalType: "uint256", name: "timestamp", type: "uint256" }
//         ],
//         internalType: "struct ReferralSystem.Referral",
//         name: "",
//         type: "tuple"
//       }
//     ],
//     stateMutability: "view",
//     type: "function"
//   },
//   {
//     inputs: [],
//     name: "getReferralCount",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function"
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     name: "referrals",
//     outputs: [
//       { internalType: "address", name: "alumni", type: "address" },
//       { internalType: "address", name: "student", type: "address" },
//       { internalType: "string", name: "jobId", type: "string" },
//       { internalType: "uint256", name: "timestamp", type: "uint256" }
//     ],
//     stateMutability: "view",
//     type: "function"
//   }
// ];

// import { ethers } from 'ethers';
// import ReferralABI from '@/contracts/Referral.json'; // put the ABI file here

// const CONTRACT_ADDRESS = '0xYourContractAddressHere';

// export const getReferralContract = async () => {
//   if (typeof window.ethereum === 'undefined') {
//     alert("MetaMask not detected");
//     return null;
//   }

//   await window.ethereum.request({ method: 'eth_requestAccounts' });
//   const provider = new ethers.BrowserProvider(window.ethereum);
//   const signer = await provider.getSigner();
//   const contract = new ethers.Contract(CONTRACT_ADDRESS, ReferralABI.abi, signer);

//   return contract;
// };
