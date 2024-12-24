import { pokemonTypesEnum } from "../../../db/schema";

export class GetPokemonTypesService {
  execute() {
    const types = pokemonTypesEnum.enumValues;
    return types;
  }
}
