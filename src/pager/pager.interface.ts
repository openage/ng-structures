import { PageOptions } from '@open-age/ng-api';

export interface IPager {
    fetch(options?: PageOptions): any;
}

export interface IPage<TModel> {
    currentPageNo: number;
    totalPages: number;
    total: number;
    items: Array<TModel>;
    stats: any;
}
