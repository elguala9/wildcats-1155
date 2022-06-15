import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import ABI_SOC from './abi_soc.json'; 
import ABI_PAR from './abi_par.json'; 
import { AbiItem } from 'web3-utils';
import Moralis from 'moralis/node';

interface structNFT {
  circulation : number;
  supply : number;
  saleIsActive : boolean;
  price : number;
}

interface structTransaction {timestamp : string, 
  to_address : string,
  from_address : string}

interface structEndpoint {serverUrl: string, appId : string}

export class Wildcats1155{
    private web3 : Web3;
    private smart_contract : Contract;
    private account : string;
    private contract_address : string;
    private collection : string;
    private endpoint : structEndpoint;
    private chain : "eth" | "rinkeby";
    private limit : number = 100;
    private null_address : string = "0x0000000000000000000000000000000000000000";

    constructor(provider : any, account : string, chain_id : string, collection : string){      
      if(collection != "SOCIABLE" && collection != "PARTY"){
        throw("Collection not correct");
      }

      this.contract_address =  "0x";
      if(collection == "SOCIABLE" && chain_id == "1")
        this.contract_address =  "0x62A033c2D763a1b1D603A7F32F7b29C9522A651f";
      if(collection == "SOCIABLE" && chain_id == "4")
        this.contract_address =  "0xB86604A1759A6CBC412101E9022E2c0976b50bd5";
      if(collection == "PARTY" && chain_id == "1")
        this.contract_address =  "0xB3Bc86fcF1BF1111FCE92348a132FB3621ba0d8A";
      if(collection == "PARTY" && chain_id == "4")
        this.contract_address =  "0x1E19A2D2c0a29F536dD8e5d433F824aEA782E75b";  
      
      if(chain_id == "1")
        this.chain = "eth";
      else
        this.chain = "rinkeby"; 

      if(this.contract_address == "0x")
        throw("SmartContract not found");

      this.web3 = new Web3(provider);
      this.account = account;
      this.collection = collection;
      if(collection == "SOCIABLE")
        this.smart_contract = new this.web3.eth.Contract(ABI_SOC as AbiItem[], this.contract_address);
      else
        this.smart_contract = new this.web3.eth.Contract(ABI_PAR as AbiItem[], this.contract_address);

      this.endpoint = {serverUrl: "undefined", appId : "undefined"};
    }

    public setMoralis(_serverUrl : string, _appId : string){
      this.endpoint = {serverUrl:_serverUrl, appId : _appId};
    }

    public async getTransactions(seconds : number, set : number) : Promise<number>{


      let number_of_transaction : number = 0;

      let transactions = await this.getAccountTransactions(set);
      //console.log(transactions);
      
      var lower_time_limit = new Date().getTime() - seconds*1000;
      
      //console.log("now : " + lower_time_limit) ;
      for(let i : number= 0; i < transactions.length; i++){

        //console.log(transactions.result[i].block_timestamp + " spazio " + (new Date(transactions.result[i].block_timestamp)))
        //console.log(new Date(transactions.result[i].block_timestamp).getTime());
        if(transactions[i].to_address.toLowerCase() == this.account.toLowerCase()
          && transactions[i].from_address != this.null_address
          && new Date(transactions[i].timestamp).getTime() > lower_time_limit)
            number_of_transaction++;
      }
      return number_of_transaction;
    }

    public async getAccountTransactions(set : number) : Promise<Array<structTransaction>>{
      let transactions = await this.getTransactionsRaw();
      let filtered_transactions: Array<structTransaction> = new Array<structTransaction>();
      //console.log("now : " + lower_time_limit) ;
      for(let i : number= 0; transactions.result[i] != undefined; i++){
        if((transactions.result[i].token_address.toLowerCase() == this.contract_address.toLowerCase()
          && set == Number(transactions.result[i].token_id))
          && (transactions.result[i].to_address.toLowerCase() == this.account.toLowerCase()
          || transactions.result[i].to_address.toLowerCase() == this.account.toLowerCase()))         
            filtered_transactions.push({timestamp : transactions.result[i].block_timestamp, 
                                        to_address : transactions.result[i].to_address.toLowerCase(),
                                        from_address : transactions.result[i].from_address?.toLowerCase() ?? this.null_address} );
      }
      return filtered_transactions;
    }


    public async getTransactionsRaw(){
      if(this.endpoint.serverUrl == "undefined" || this.endpoint.appId == "undefined"){
        throw("Endopoint not setted. Call the function setMoralis(serverUrl, appId)");
      }

      Moralis.start(this.endpoint);
      let number_of_transaction : number = 0;
      const config = {
        chain: this.chain,
        address: this.account,
        limit: this.limit
      }
      //console.log(config);
      let transactions = await Moralis.Web3API.account.getNFTTransfers(config);
      
      Moralis.removeAllListeners();
      return transactions;
    }

    public async numberOfAccess(seconds : number, set : number) : Promise<number>{
      return (await this.getBalance(set)) - (await this.getTransactions(seconds, set));
    }

    public getContractAddress(){
      return this.contract_address;
    }

    public getCirculation(){
      return this.smart_contract.methods.totalCirculation().call();
    }

    public async getSet(set : number) : Promise<structNFT> {
      return await this.smart_contract.methods.getSet(set).call();
    }

    public getBalance(set :number): Promise<number> {
      return this.smart_contract.methods.balanceOf(this.account, set).call();
    }

    public getNumberOfSets(){
      return this.smart_contract.methods.sets().call();
    }

    public getUri(set : number){
      return this.smart_contract.methods.uri(set).call();
    }
  
    public getWeb3() : Web3{
      return this.web3;
    }

    public getSmartContract() : Contract{
      return this.smart_contract;
    }

    public getAccount() : string{
      return this.account;
    }

    public async getPrice(set : number) {
      return (await this.getSet(set)).price;
    }

    public getSmartContractAddress(){
      return this.contract_address;
    }

    /*public async getGasLimit() : Promise<number> {
      return (await this.web3.eth.getBlock("latest")).gasLimit;
    }

    public async getGasPrice() : Promise<number> {
      return  (await this.web3.eth.getBlock("latest")).gasUsed;
    }

    public async getmaxFeePerGas() : Promise<number> {;
      return  this.GWEI + (await this.getBaseFee()) - 1; // less than 
    }

    public async getBaseFee(){
      let block = await this.web3.eth.getBlock("pending");
      return Number(block.baseFeePerGas);
    }*/

    
    private _getAddress(args: string[]){
      if(args.length > 1)
        throw "Too much argument";

      if(args.length == 1)
        if(this.web3.utils.isAddress(args[0]))
          return args[0];
        else
          throw "Address is not valid";
      else
        return this.account;
    }

    /**
      * call normalNftOwned(address) method of the smart contract
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return Number of normal NFTs owned by the address
    */
    public async nftsOwned(...args: string[]) : Promise<Array<number>> {
      let number_of_sets : number = await this.getNumberOfSets();
      let nfts : Array<number> = Array<number>(number_of_sets);

      for(let set = 0; set < number_of_sets; set++)
        nfts[set] = await this.getBalance(set);
      
      return nfts
    }


    public async getEstimatedGas(set : number, amount : number) {
      return await this.smart_contract.methods
      .mintSociable(set, amount)
      .estimateGas({from: this.account})
      /*.then(function (estimate) {
        console.log("Estimated gas to execute mint: ", estimate);
      })*/;
      
    }

        
    public async mint(set : number, amount : number) : Promise<any>{
      let config =  {
          //gas: (await this.getEstimatedGas(set, amount))*1.20 ,
          //gasPrice: await this.getGasPrice(),
          from : this.account,
          value: ((await this.getPrice(set)) * amount),
          /*maxFeePerGas: await this.getmaxFeePerGas(),
          maxPriorityFeePerGas: this.GWEI*/
      }

      
      switch(this.collection){
        case "SOCIABLE" :
          return await this.smart_contract.methods
          .mintSociable(set, amount)
          .send(config)
          .once("error", (err : any) => {
            console.log(err);
            //throw(err);
            return "Sorry, something went wrong please try again later.";
          })
          .then((receipt : any) => {
            console.log(receipt.blockHash);
            return receipt.blockHash;
          });
        break;
      //-------------
        case "PARTY" :
          return await this.smart_contract.methods
          .mintParty(set, amount)
          .send(config)
          .once("error", (err : any) => {
            console.log(err);
            //throw(err);
            return "Sorry, something went wrong please try again later.";
          })
          .then((receipt : any) => {
            console.log(receipt.blockHash);
            return receipt.blockHash;
          });
        break;
        default :
          throw("This collection do not exist");
        break;
      }
    }

}