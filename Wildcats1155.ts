import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import CONFIG from './config.json'; 
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

    constructor(provider : any, account : string, chain_id : string, collection : string){      
      if(collection != "SOCIABLE" && collection != "PARTY"){
        throw("Collection not correct");
      }

      this.web3 = new Web3(provider);
      this.account = account;
      this.collection = collection;
      this.contract_address = CONFIG["CONTRACT_ADDRESS_" + collection + "_" + chain_id];
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

    public async getGasLimit() : Promise<number> {
      return (await this.web3.eth.getBlock("latest")).gasLimit;
    }


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

    

     
    public async mint(set : number, amount : number){
      let config =  {
          gasLimit: await this.getGasLimit(),
          to: this.contract_address ,
          from : this.account,
          value: await this.getPrice(set)
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