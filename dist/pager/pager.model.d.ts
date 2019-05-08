import { PagerBaseComponent, PagerOptions } from ".";
import { IApi, PageOptions } from "@open-age/ng-api";
import { Location } from '@angular/common';
export declare class PagerModel<TModel> extends PagerBaseComponent<TModel> {
    constructor(options: {
        api: IApi<TModel>;
        properties?: TModel;
        fields?: {
            id: 'id' | string;
            timeStamp: 'timeStamp' | string;
        };
        watch?: number;
        cache?: IApi<TModel>;
        map?: (obj: any) => TModel;
        pageOptions?: {
            limit: number;
            offset?: number;
            sort?: string;
            desc?: boolean;
        } | PageOptions;
        maxPagesToShow?: number;
        filters?: any[];
        location?: Location;
    } | PagerOptions<TModel>);
}
