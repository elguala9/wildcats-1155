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
var config_json_1 = __importDefault(require("./config.json"));
var abi_json_1 = __importDefault(require("./abi.json"));
var Wildcats1155 = /** @class */ (function () {
    function Wildcats1155(provider, account, chain_id, collection) {
        if (collection != "SOCIABLE" && collection != "PARTY") {
            throw ("Collection not correct");
        }
        this.web3 = new web3_1["default"](provider);
        this.account = account;
        this.collection = collection;
        this.contract_address = config_json_1["default"]["CONTRACT_ADDRESS_" + collection + "_" + chain_id];
        this.smart_contract = new this.web3.eth.Contract(abi_json_1["default"], this.contract_address);
    }
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
    Wildcats1155.prototype.getBalanceOf = function (address, set) {
        return this.smart_contract.methods.balanceOf(address, set).call();
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
    Wildcats1155.prototype.getGasLimit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getBlock("latest")];
                    case 1: return [2 /*return*/, (_a.sent()).gasLimit];
                }
            });
        });
    };
    Wildcats1155.prototype.getGasPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getBlock("latest")];
                    case 1: return [2 /*return*/, (_a.sent()).gasUsed];
                }
            });
        });
    };
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
                        return [4 /*yield*/, this.getBalanceOf(this._getAddress(args), set)];
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
    Wildcats1155.prototype.mint = function (set, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            var _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _a = this.collection;
                        switch (_a) {
                            case "SOCIABLE": return [3 /*break*/, 1];
                            case "PARTY": return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 9];
                    case 1:
                        _c = (_b = this.smart_contract.methods
                            .mintSociable(set, amount))
                            .send;
                        _f = {};
                        return [4 /*yield*/, this.getGasLimit()];
                    case 2:
                        _f.gas = _h.sent();
                        return [4 /*yield*/, this.getGasPrice()];
                    case 3:
                        _f.gasPrice = _h.sent(),
                            _f.from = this.account;
                        return [4 /*yield*/, this.getPrice(set)];
                    case 4:
                        _c.apply(_b, [(_f.value = _h.sent(),
                                _f)])
                            .once("error", function (err) {
                            console.log(err);
                            return "Sorry, something went wrong please try again later.";
                        })
                            .then(function (receipt) {
                            return receipt;
                        });
                        return [3 /*break*/, 10];
                    case 5:
                        _e = (_d = this.smart_contract.methods
                            .mintParty(set, amount))
                            .send;
                        _g = {};
                        return [4 /*yield*/, this.getGasLimit()];
                    case 6:
                        _g.gas = _h.sent();
                        return [4 /*yield*/, this.getGasPrice()];
                    case 7:
                        _g.gasPrice = _h.sent(),
                            _g.from = this.account;
                        return [4 /*yield*/, this.getPrice(set)];
                    case 8:
                        _e.apply(_d, [(_g.value = _h.sent(),
                                _g)])
                            .once("error", function (err) {
                            console.log(err);
                            return "Sorry, something went wrong please try again later.";
                        })
                            .then(function (receipt) {
                            return receipt;
                        });
                        return [3 /*break*/, 10];
                    case 9: throw ("This collection do not exist");
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return Wildcats1155;
}());
exports.Wildcats1155 = Wildcats1155;
