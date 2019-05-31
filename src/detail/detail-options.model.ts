import { IApi } from '@open-age/ng-api';
import { ErrorHandler } from '@angular/core';


export class DetailOptions<TModel> {
    api: IApi<TModel>;
    cache?: IApi<TModel>;
    properties?: TModel;
    watch?: number;
    map?: (obj: any) => TModel;
    fields?: {
        id: 'id' | string,
        timeStamp: 'timeStamp' | string
    };
    errorHandler?: ErrorHandler;

    constructor(obj?: {
        api: IApi<TModel>,
        cache?: IApi<TModel>,
        properties?: TModel,
        watch?: number,
        map?: (obj: any) => TModel,
        fields?: {
            id: 'id' | string,
            timeStamp: 'timeStamp' | string
        },
        errorHandler?: ErrorHandler
    }) {
        if (!obj) { return; }

        if (obj.properties) { this.properties = obj.properties; }
        if (obj.fields) {
            this.fields = obj.fields;
        } else {
            this.fields = { id: 'id', timeStamp: 'timeStamp' }
        }
        this.api = obj.api;
        this.cache = obj.cache;
        this.watch = obj.watch;
        this.map = obj.map;
        this.errorHandler = obj.errorHandler;

        /**
    api: IApi<TModel>,
    properties?: TModel,
    watch?: number,
    cache?: IApi<TModel>,
    map?: (obj: any) => TModel,
    fields?: {
      id: 'id' | string,
      timeStamp: 'timeStamp' | string
    },
    errorHandler?: ErrorHandler
         */
    }
}
