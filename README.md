# wildcats-1155
Library for Party Panthers and Sociable Lions

## Install
npm install wildcats-1155

## Usage
### declaration
let sociable  = new Wildcats1155(window.ethereum, window.ethereum.selectedAddress, "4", "SOCIABLE");
let party  = new Wildcats1155(window.ethereum, window.ethereum.selectedAddress, "4", "PARTY");

### minting
let set : number = 0; // the set that is going to be minted
let amount : number = 2; // the amount of NFT that will be minted

sociable.mint(set, amount); // minting function. It is the same for Sociable and Party

### get the ntfs owned by the account
sociable.nftsOwned(); // return an array. The index of the array is the set, the value is the number of NFTs owned

### Moralis
before using the methods: getTransactions(), getAccountTransactions(), getTransactionsRaw() or numberOfAccess(). Call the method setMoralis().