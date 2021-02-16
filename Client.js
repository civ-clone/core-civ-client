"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _leaderRegistry, _randomNumberGenerator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const Client_1 = require("@civ-clone/core-client/Client");
const LeaderRegistry_1 = require("@civ-clone/core-civilization/LeaderRegistry");
class Client extends Client_1.Client {
    constructor(player, leaderRegistry = LeaderRegistry_1.instance, randomNumberGenerator = () => Math.random()) {
        super(player);
        _leaderRegistry.set(this, void 0);
        _randomNumberGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _leaderRegistry, leaderRegistry);
        __classPrivateFieldSet(this, _randomNumberGenerator, randomNumberGenerator);
    }
    chooseCivilization(choices) {
        const Random = choices[Math.floor(choices.length * __classPrivateFieldGet(this, _randomNumberGenerator).call(this))], player = this.player(), civilization = new Random();
        player.setCivilization(civilization);
        this.chooseLeader(civilization);
    }
    chooseLeader(civilization) {
        const leaders = __classPrivateFieldGet(this, _leaderRegistry).getByCivilization(civilization.constructor);
        const RandomLeader = leaders[Math.floor(leaders.length * __classPrivateFieldGet(this, _randomNumberGenerator).call(this))];
        civilization.setLeader(new RandomLeader());
    }
}
exports.Client = Client;
_leaderRegistry = new WeakMap(), _randomNumberGenerator = new WeakMap();
exports.default = Client;
//# sourceMappingURL=Client.js.map