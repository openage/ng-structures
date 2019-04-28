import { IApi } from '@open-age/ng-api';
export declare class DetailOptions<TModel> {
    api: IApi<TModel>;
    cache?: IApi<TModel>;
    properties: TModel;
    watch?: number;
    map?: (obj: any) => TModel;
    fields?: {
        id: string;
    };
    constructor(obj?: {
        api: IApi<TModel>;
        cache?: IApi<TModel>;
        properties: TModel;
        watch?: number;
        map?: (obj: any) => TModel;
        fields?: {
            id: 'id' | string;
        };
    });
}
