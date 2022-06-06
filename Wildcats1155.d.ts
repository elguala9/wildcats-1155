import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
interface structNFT {
    circulation: number;
    supply: number;
    saleIsActive: boolean;
    price: number;
}
interface structTransaction {
    timestamp: string;
    to_address: string;
    from_address: string;
}
export declare class Wildcats1155 {
    private web3;
    private smart_contract;
    private account;
    private contract_address;
    private collection;
    private endpoint;
    private chain;
    private limit;
    private null_address;
    constructor(provider: any, account: string, chain_id: string, collection: string);
    setMoralis(_serverUrl: string, _appId: string): void;
    getTransactions(seconds: number, set: number): Promise<number>;
    getAccountTransactions(set: number): Promise<Array<structTransaction>>;
    getTransactionsRaw(): Promise<{
        total: number;
        page: number;
        page_size: number;
        cursor: string;
        result: {
            token_address: string;
            token_id: string;
            from_address?: string;
            to_address: string;
            value?: string;
            amount?: string;
            contract_type: string;
            block_number: string;
            block_timestamp: string;
            block_hash: string;
            transaction_hash: string;
            transaction_type?: string;
            transaction_index?: string;
            log_index: number;
            operator?: string;
        }[];
        block_exists?: boolean;
        index_complete?: boolean;
    } & import("moralis/types/generated/web3Api").defaultResponse<{
        total: number;
        page: number;
        page_size: number;
        cursor: string;
        result: {
            token_address: string;
            token_id: string;
            from_address?: string;
            to_address: string;
            value?: string;
            amount?: string;
            contract_type: string;
            block_number: string;
            block_timestamp: string;
            block_hash: string;
            transaction_hash: string;
            transaction_type?: string;
            transaction_index?: string;
            log_index: number;
            operator?: string;
        }[];
        block_exists?: boolean;
        index_complete?: boolean;
    }>>;
    numberOfAccess(seconds: number, set: number): Promise<number>;
    getContractAddress(): string;
    getCirculation(): any;
    getSet(set: number): Promise<structNFT>;
    getBalance(set: number): Promise<number>;
    getNumberOfSets(): any;
    getUri(set: number): any;
    getWeb3(): Web3;
    getSmartContract(): Contract;
    getAccount(): string;
    getPrice(set: number): Promise<number>;
    getSmartContractAddress(): string;
    private _getAddress;
    /**
      * call normalNftOwned(address) method of the smart contract
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return Number of normal NFTs owned by the address
    */
    nftsOwned(...args: string[]): Promise<Array<number>>;
    getEstimatedGas(set: number, amount: number): Promise<any>;
    mint(set: number, amount: number): Promise<any>;
}
export {};
