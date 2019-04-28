import { IApi } from '@open-age/ng-api';


export class DetailOptions<TModel> {
    api: IApi<TModel>;
    cache?: IApi<TModel>;
    properties: TModel;
    watch?: number;
    map?: (obj: any) => TModel;
    fields?= {
        id: 'id'
    };

    constructor(obj?: {
        api: IApi<TModel>,
        cache?: IApi<TModel>,
        properties: TModel,
        watch?: number,
        map?: (obj: any) => TModel,
        fields?: {
            id: 'id' | string
        }
    }) {
        if (!obj) { return; }

        if (obj.properties) { this.properties = obj.properties; }
        if (obj.fields) {
            this.fields = obj.fields;
        }
        this.api = obj.api;
        this.cache = obj.cache;
        this.watch = obj.watch;
        this.map = obj.map;

    }
}
