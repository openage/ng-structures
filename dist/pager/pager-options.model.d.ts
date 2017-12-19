import { Location } from '@angular/common';
import { IApi, PageOptions } from '@open-age/ng-api';
export declare class PagerOptions<TModel> {
    api: IApi<TModel>;
    properties?: TModel;
    fields?: {
        id: 'id';
        timeStamp: 'timeStamp';
    };
    pageOptions?: PageOptions;
    maxPagesToShow?: number;
    filters?: any[];
    location?: Location;
    constructor(obj?: any);
}
