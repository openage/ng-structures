import { Location } from '@angular/common';
import { IPager, IPage } from './pager.interface';
import { PagerOptions } from './pager-options.model';
import { Filters } from '../filter/index';
import { PageOptions, IApi, Page } from '@open-age/ng-api';
import { EventEmitter, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
export declare class PagerBaseComponent<TModel> implements IPage<TModel>, IPager {
    fetched: EventEmitter<IPage<TModel>>;
    selected: EventEmitter<TModel>;
    created: EventEmitter<TModel>;
    updated: EventEmitter<TModel>;
    removed: EventEmitter<TModel>;
    errored: EventEmitter<any>;
    errors: string[];
    filters: Filters;
    isProcessing: boolean;
    isGettingStats: boolean;
    currentPageNo: number;
    totalPages: number;
    total: number;
    items: Array<TModel>;
    stats: any;
    sort: string;
    desc: boolean;
    private options;
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
        errorHandler?: ErrorHandler;
        filters?: any[];
        addOperator?: boolean;
        location?: Location;
    } | PagerOptions<TModel>);
    private convertToPageOption;
    fetch(options?: PageOptions | {
        offset?: number;
        limit?: number;
        sort?: string;
        desc?: boolean;
        map?: (obj: any) => TModel;
    }): Observable<Page<TModel>>;
    select(item: TModel): this;
    update(item: TModel): Observable<TModel>;
    add(param: TModel): this;
    create(item: TModel): Observable<TModel>;
    pop(item: TModel): void;
    remove(item: TModel): import("rxjs").Subscription;
    clear(): void;
    pages(): number[];
    showPage(pageNo: number): Observable<Page<TModel>>;
    showPrevious(): Observable<Page<TModel>>;
    showNext(): Observable<Page<TModel>>;
}
