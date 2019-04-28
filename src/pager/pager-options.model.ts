import { Location } from '@angular/common';
import { IApi, PageOptions } from '@open-age/ng-api';

export class PagerOptions<TModel> {

  api: IApi<TModel>;
  properties?: TModel;
  fields?: {
    id: 'id' | string,
    timeStamp: 'timeStamp' | string
  };
  watch?: number;
  cache?: IApi<TModel>;
  map?: (obj: any) => TModel;
  pageOptions?: PageOptions;
  maxPagesToShow?= 10;
  filters?: any[] = [];
  location?: Location;

  constructor(obj?: {
    api: IApi<TModel>,
    properties?: TModel,
    fields?: {
      id: 'id' | string,
      timeStamp: 'timeStamp' | string
    },
    watch?: number,
    cache?: IApi<TModel>,
    map?: (obj: any) => TModel,
    pageOptions?: {
      limit: number,
      offset?: number
    } | PageOptions,
    maxPagesToShow?: number,
    filters?: any[],
    location?: Location
  }) {
    if (!obj) { return; }
    if (obj.api) { this.api = obj.api; }
    if (obj.maxPagesToShow) { this.maxPagesToShow = obj.maxPagesToShow; }
    if (obj.location) { this.location = obj.location; }
    if (obj.fields) { this.fields = obj.fields; }
    if (obj.pageOptions) { this.pageOptions = new PageOptions(obj.pageOptions); }

    if (obj.properties) { this.properties = obj.properties; }

    if (obj.filters) {
      obj.filters.forEach(element => {
        this.filters.push(element);
      });
    }

    this.cache = obj.cache;
    this.watch = obj.watch;
    this.map = obj.map;
  }
}
