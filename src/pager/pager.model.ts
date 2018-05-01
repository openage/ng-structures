import { PagerBaseComponent, PagerOptions } from ".";

export class PagerModel<TModel> extends PagerBaseComponent<TModel>  {
  constructor(options: PagerOptions<TModel>) {
    super(options);
  }
}
