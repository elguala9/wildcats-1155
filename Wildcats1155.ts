import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import ABI from './abi.json'; 
import { AbiItem } from 'web3-utils'

interface structNFT {
  circulation : number;
  supply : number;
  saleIsActive : boolean;
  price : number;
}


export class Wildcats1155{
    private web3 : Web3;
    private smart_contract : Contract;
    private account : string;
    private contract_address : string;
    private collection : string;
    private GWEI : number = 1000000000;

    constructor(provider : any, account : string, chain_id : string, collection : string){      
      if(collection != "SOCIABLE" && collection != "PARTY"){
        throw("Collection not correct");
      }

      this.contract_address =  "0x";
      if(collection == "SOCIABLE" && chain_id == "1")
        this.contract_address =  "0x";
      if(collection == "SOCIABLE" && chain_id == "4")
        this.contract_address =  "0xB86604A1759A6CBC412101E9022E2c0976b50bd5";
      if(collection == "PARTY" && chain_id == "1")
        this.contract_address =  "0x";
      if(collection == "PARTY" && chain_id == "4")
        this.contract_address =  "0x1E19A2D2c0a29F536dD8e5d433F824aEA782E75b";  
      
      if(this.contract_address == "0x")
        throw("SmartContract not found");

      this.web3 = new Web3(provider);
      this.account = account;
      this.collection = collection;
      this.smart_contract = new this.web3.eth.Contract(ABI as AbiItem[], this.contract_address);

        
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

    public getBalanceOf(address : string, set :number){
      return this.smart_contract.methods.balanceOf(address, set).call();
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
        nfts[set] = await this.getBalanceOf(this._getAddress(args), set);
      
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

        
    public async mint(set : number, amount : number){
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
          this.smart_contract.methods
          .mintSociable(set, amount)
          .send(config)
          .once("error", (err : any) => {
            console.log(err);
            return "Sorry, something went wrong please try again later.";
          })
          .then((receipt : any) => {
            return receipt;
          });
        break;
      //-------------
        case "PARTY" :
          this.smart_contract.methods
          .mintParty(set, amount)
          .send(config)
          .once("error", (err : any) => {
            console.log(err);
            return "Sorry, something went wrong please try again later.";
          })
          .then((receipt : any) => {
            return receipt;
          });
        break;
        default :
          throw("This collection do not exist");
        break;
      }
    }

    


}