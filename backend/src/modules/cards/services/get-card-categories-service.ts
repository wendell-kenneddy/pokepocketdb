import { cardCategoriesEnum } from "../../../db/schema";

export class GetCardCategoriesService {
  execute() {
    const categories = cardCategoriesEnum.enumValues;
    return categories;
  }
}
