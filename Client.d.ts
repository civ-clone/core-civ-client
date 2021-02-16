import { Client as BaseClient, IClient as IBaseClient } from '@civ-clone/core-client/Client';
import { LeaderRegistry } from '@civ-clone/core-civilization/LeaderRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
import Player from '@civ-clone/core-player/Player';
export interface IClient extends IBaseClient {
    chooseCivilization(choices: typeof Civilization[]): void;
    chooseLeader(civilization: Civilization): void;
}
export declare class Client extends BaseClient implements IClient {
    #private;
    constructor(player: Player, leaderRegistry?: LeaderRegistry, randomNumberGenerator?: () => number);
    chooseCivilization(choices: typeof Civilization[]): void;
    chooseLeader(civilization: Civilization): void;
}
export default Client;
