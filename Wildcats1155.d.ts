import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
interface structNFT {
    circulation: number;
    supply: number;
    saleIsActive: boolean;
    price: number;
}
export declare class Wildcats1155 {
    private web3;
    private smart_contract;
    private account;
    private contract_address;
    private collection;
    private GWEI;
    constructor(provider: any, account: string, chain_id: string, collection: string);
    getContractAddress(): string;
    getCirculation(): any;
    getSet(set: number): Promise<structNFT>;
    getBalanceOf(address: string, set: number): any;
    getNumberOfSets(): any;
    getUri(set: number): any;
    getWeb3(): Web3;
    getSmartContract(): Contract;
    getAccount(): string;
    getPrice(set: number): Promise<number>;
    private _getAddress;
    /**
      * call normalNftOwned(address) method of the smart contract
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return Number of normal NFTs owned by the address
    */
    nftsOwned(...args: string[]): Promise<Array<number>>;
    getEstimatedGas(set: number, amount: number): Promise<any>;
    mint(set: number, amount: number): Promise<void>;
}
export {};
