"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Wildcats1155 = void 0;
var web3_1 = __importDefault(require("web3"));
var abi_soc_json_1 = __importDefault(require("./abi_soc.json"));
var abi_par_json_1 = __importDefault(require("./abi_par.json"));
var node_1 = __importDefault(require("moralis/node"));
var Wildcats1155 = /** @class */ (function () {
    function Wildcats1155(provider, account, chain_id, collection) {
        this.limit = 10;
        if (collection != "SOCIABLE" && collection != "PARTY") {
            throw ("Collection not correct");
        }
        this.contract_address = "0x";
        if (collection == "SOCIABLE" && chain_id == "1")
            this.contract_address = "0x62A033c2D763a1b1D603A7F32F7b29C9522A651f";
        if (collection == "SOCIABLE" && chain_id == "4")
            this.contract_address = "0xB86604A1759A6CBC412101E9022E2c0976b50bd5";
        if (collection == "PARTY" && chain_id == "1")
            this.contract_address = "0xB3Bc86fcF1BF1111FCE92348a132FB3621ba0d8A";
        if (collection == "PARTY" && chain_id == "4")
            this.contract_address = "0x1E19A2D2c0a29F536dD8e5d433F824aEA782E75b";
        if (chain_id == "1")
            this.chain = "eth";
        else
            this.chain = "rinkeby";
        if (this.contract_address == "0x")
            throw ("SmartContract not found");
        this.web3 = new web3_1["default"](provider);
        this.account = account;
        this.collection = collection;
        if (collection == "SOCIABLE")
            this.smart_contract = new this.web3.eth.Contract(abi_soc_json_1["default"], this.contract_address);
        else
            this.smart_contract = new this.web3.eth.Contract(abi_par_json_1["default"], this.contract_address);
        this.endpoint = { serverUrl: undefined, appId: undefined };
    }
    Wildcats1155.prototype.setMoralis = function (_serverUrl, _appId) {
        this.endpoint = { serverUrl: _serverUrl, appId: _appId };
    };
    Wildcats1155.prototype.getTransactions = function (seconds, set) {
        return __awaiter(this, void 0, void 0, function () {
            var number_of_transaction, transactions, lower_time_limit, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        number_of_transaction = 0;
                        return [4 /*yield*/, this.getAccountTransactions(set)];
                    case 1:
                        transactions = _a.sent();
                        lower_time_limit = new Date().getTime() - seconds * 1000;
                        //console.log("now : " + lower_time_limit) ;
                        for (i = 0; i < transactions.length; i++) {
                            //console.log(transactions.result[i].block_timestamp + " spazio " + (new Date(transactions.result[i].block_timestamp)))
                            //console.log(new Date(transactions.result[i].block_timestamp).getTime());
                            if (transactions[i].to_address.toLowerCase() == this.account.toLowerCase()
                                && transactions[i].from_address != "0x0000000000000000000000000000000000000000"
                                && new Date(transactions[i].timestamp).getTime() > lower_time_limit)
                                number_of_transaction++;
                        }
                        return [2 /*return*/, number_of_transaction];
                }
            });
        });
    };
    Wildcats1155.prototype.getAccountTransactions = function (set) {
        return __awaiter(this, void 0, void 0, function () {
            var transactions, filtered_transactions, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTransactionsRaw()];
                    case 1:
                        transactions = _a.sent();
                        filtered_transactions = new Array();
                        //console.log("now : " + lower_time_limit) ;
                        for (i = 0; transactions.result[i] != undefined; i++) {
                            if ((transactions.result[i].token_address.toLowerCase() == this.contract_address.toLowerCase()
                                && set == Number(transactions.result[i].token_id))
                                && (transactions.result[i].to_address.toLowerCase() == this.account.toLowerCase()
                                    || transactions.result[i].to_address.toLowerCase() == this.account.toLowerCase()))
                                filtered_transactions.push({ timestamp: transactions.result[i].block_timestamp,
                                    to_address: transactions.result[i].to_address.toLowerCase(),
                                    from_address: transactions.result[i].from_address });
                        }
                        return [2 /*return*/, filtered_transactions];
                }
            });
        });
    };
    Wildcats1155.prototype.getTransactionsRaw = function () {
        return __awaiter(this, void 0, void 0, function () {
            var number_of_transaction, config, transactions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.endpoint.serverUrl == undefined || this.endpoint.appId == undefined) {
                            throw ("Endopoint not setted. Call the function setMoralis(serverUrl, appId)");
                        }
                        node_1["default"].start(this.endpoint);
                        number_of_transaction = 0;
                        config = {
                            chain: this.chain,
                            address: this.account,
                            limit: this.limit
                        };
                        return [4 /*yield*/, node_1["default"].Web3API.account.getNFTTransfers(config)];
                    case 1:
                        transactions = _a.sent();
                        node_1["default"].removeAllListeners();
                        return [2 /*return*/, transactions];
                }
            });
        });
    };
    Wildcats1155.prototype.numberOfAccess = function (seconds, set) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getBalance(set)];
                    case 1:
                        _a = (_b.sent());
                        return [4 /*yield*/, this.getTransactions(seconds, set)];
                    case 2: return [2 /*return*/, _a - (_b.sent())];
                }
            });
        });
    };
    Wildcats1155.prototype.getContractAddress = function () {
        return this.contract_address;
    };
    Wildcats1155.prototype.getCirculation = function () {
        return this.smart_contract.methods.totalCirculation().call();
    };
    Wildcats1155.prototype.getSet = function (set) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.smart_contract.methods.getSet(set).call()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Wildcats1155.prototype.getBalance = function (set) {
        return this.smart_contract.methods.balanceOf(this.account, set).call();
    };
    Wildcats1155.prototype.getNumberOfSets = function () {
        return this.smart_contract.methods.sets().call();
    };
    Wildcats1155.prototype.getUri = function (set) {
        return this.smart_contract.methods.uri(set).call();
    };
    Wildcats1155.prototype.getWeb3 = function () {
        return this.web3;
    };
    Wildcats1155.prototype.getSmartContract = function () {
        return this.smart_contract;
    };
    Wildcats1155.prototype.getAccount = function () {
        return this.account;
    };
    Wildcats1155.prototype.getPrice = function (set) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSet(set)];
                    case 1: return [2 /*return*/, (_a.sent()).price];
                }
            });
        });
    };
    Wildcats1155.prototype.getSmartContractAddress = function () {
        return this.contract_address;
    };
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
    Wildcats1155.prototype._getAddress = function (args) {
        if (args.length > 1)
            throw "Too much argument";
        if (args.length == 1)
            if (this.web3.utils.isAddress(args[0]))
                return args[0];
            else
                throw "Address is not valid";
        else
            return this.account;
    };
    /**
      * call normalNftOwned(address) method of the smart contract
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return Number of normal NFTs owned by the address
    */
    Wildcats1155.prototype.nftsOwned = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var number_of_sets, nfts, set, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getNumberOfSets()];
                    case 1:
                        number_of_sets = _c.sent();
                        nfts = Array(number_of_sets);
                        set = 0;
                        _c.label = 2;
                    case 2:
                        if (!(set < number_of_sets)) return [3 /*break*/, 5];
                        _a = nfts;
                        _b = set;
                        return [4 /*yield*/, this.getBalance(set)];
                    case 3:
                        _a[_b] = _c.sent();
                        _c.label = 4;
                    case 4:
                        set++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, nfts];
                }
            });
        });
    };
    Wildcats1155.prototype.getEstimatedGas = function (set, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.smart_contract.methods
                            .mintSociable(set, amount)
                            .estimateGas({ from: this.account })
                        /*.then(function (estimate) {
                          console.log("Estimated gas to execute mint: ", estimate);
                        })*/ ];
                    case 1: return [2 /*return*/, _a.sent()
                        /*.then(function (estimate) {
                          console.log("Estimated gas to execute mint: ", estimate);
                        })*/ ];
                }
            });
        });
    };
    Wildcats1155.prototype.mint = function (set, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {
                            //gas: (await this.getEstimatedGas(set, amount))*1.20 ,
                            //gasPrice: await this.getGasPrice(),
                            from: this.account
                        };
                        return [4 /*yield*/, this.getPrice(set)];
                    case 1:
                        config = (_a.value = ((_b.sent()) * amount),
                            _a);
                        switch (this.collection) {
                            case "SOCIABLE":
                                this.smart_contract.methods
                                    .mintSociable(set, amount)
                                    .send(config)
                                    .once("error", function (err) {
                                    console.log(err);
                                    return "Sorry, something went wrong please try again later.";
                                })
                                    .then(function (receipt) {
                                    console.log(receipt.blockHash);
                                    return receipt.blockHash;
                                });
                                break;
                            //-------------
                            case "PARTY":
                                this.smart_contract.methods
                                    .mintParty(set, amount)
                                    .send(config)
                                    .once("error", function (err) {
                                    console.log(err);
                                    return "Sorry, something went wrong please try again later.";
                                })
                                    .then(function (receipt) {
                                    console.log(receipt.blockHash);
                                    return receipt.blockHash;
                                });
                                break;
                            default:
                                throw ("This collection do not exist");
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Wildcats1155;
}());
exports.Wildcats1155 = Wildcats1155;
