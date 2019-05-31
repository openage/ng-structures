import { IApi } from '@open-age/ng-api';
import { ErrorHandler } from '@angular/core';
export declare class DetailOptions<TModel> {
    api: IApi<TModel>;
    cache?: IApi<TModel>;
    properties?: TModel;
    watch?: number;
    map?: (obj: any) => TModel;
    fields?: {
        id: 'id' | string;
        timeStamp: 'timeStamp' | string;
    };
    errorHandler?: ErrorHandler;
    constructor(obj?: {
        api: IApi<TModel>;
        cache?: IApi<TModel>;
        properties?: TModel;
        watch?: number;
        map?: (obj: any) => TModel;
        fields?: {
            id: 'id' | string;
            timeStamp: 'timeStamp' | string;
        };
        errorHandler?: ErrorHandler;
    });
}
