import { IApi } from '@open-age/ng-api';


export class DetailOptions<TModel> {
    api: IApi<TModel>;
    cache?: IApi<TModel>;
    properties: TModel;
    watch?: number;
    map?: (obj: any) => TModel;
    fields?: {
        id: 'id' | string,
        timeStamp: 'timeStamp' | string
    };

    constructor(obj?: {
        api: IApi<TModel>,
        cache?: IApi<TModel>,
        properties: TModel,
        watch?: number,
        map?: (obj: any) => TModel,
        fields?: {
            id: 'id' | string,
            timeStamp: 'timeStamp' | string
        }
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

    }
}
