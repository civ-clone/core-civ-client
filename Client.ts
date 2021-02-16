import {
  Client as BaseClient,
  IClient as IBaseClient,
} from '@civ-clone/core-client/Client';
import {
  LeaderRegistry,
  instance as leaderRegistryInstance,
} from '@civ-clone/core-civilization/LeaderRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
import { IConstructor } from '@civ-clone/core-registry/Registry';
import Player from '@civ-clone/core-player/Player';

export interface IClient extends IBaseClient {
  chooseCivilization(choices: typeof Civilization[]): void;
  chooseLeader(civilization: Civilization): void;
}

export class Client extends BaseClient implements IClient {
  #leaderRegistry: LeaderRegistry;
  #randomNumberGenerator: () => number;

  constructor(
    player: Player,
    leaderRegistry: LeaderRegistry = leaderRegistryInstance,
    randomNumberGenerator: () => number = () => Math.random()
  ) {
    super(player);

    this.#leaderRegistry = leaderRegistry;
    this.#randomNumberGenerator = randomNumberGenerator;
  }

  chooseCivilization(choices: typeof Civilization[]): void {
    const Random =
        choices[Math.floor(choices.length * this.#randomNumberGenerator())],
      player = this.player(),
      civilization = new Random();

    player.setCivilization(civilization);

    this.chooseLeader(civilization);
  }

  chooseLeader(civilization: Civilization): void {
    const leaders = this.#leaderRegistry.getByCivilization(
      civilization.constructor as IConstructor<Civilization>
    );

    const RandomLeader =
      leaders[Math.floor(leaders.length * this.#randomNumberGenerator())];

    civilization.setLeader(new RandomLeader());
  }
}

export default Client;
