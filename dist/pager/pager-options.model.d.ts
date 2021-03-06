import { Location } from '@angular/common';
import { IApi, PageOptions } from '@open-age/ng-api';
import { ErrorHandler } from '@angular/core';
export declare class PagerOptions<TModel> {
    api: IApi<TModel>;
    properties?: TModel;
    fields?: {
        id: 'id' | string;
        timeStamp: 'timeStamp' | string;
    };
    watch?: number;
    cache?: IApi<TModel>;
    map?: (obj: any) => TModel;
    pageOptions?: PageOptions;
    maxPagesToShow?: number;
    filters?: any[];
    addOperator?: boolean;
    location?: Location;
    errorHandler?: ErrorHandler;
    constructor(obj?: {
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
        addOperator?: boolean;
        errorHandler?: ErrorHandler;
        location?: Location;
    });
}
