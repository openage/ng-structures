import { IApi } from '@open-age/ng-api';
export declare class DetailOptions<TModel> {
    api: IApi<TModel>;
    properties: TModel;
    fields?: {
        id: string;
    };
    constructor(obj?: any);
}
