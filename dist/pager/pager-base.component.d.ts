import { Location } from '@angular/common';
import { IPager, IPage } from './pager.interface';
import { PagerOptions } from './pager-options.model';
import { Filters } from '../filter/index';
import { PageOptions, IApi } from '@open-age/ng-api';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
export declare class PagerBaseComponent<TModel> implements IPage<TModel>, IPager {
    private options;
    fetched: EventEmitter<IPage<TModel>>;
    selected: EventEmitter<TModel>;
    created: EventEmitter<TModel>;
    updated: EventEmitter<TModel>;
    removed: EventEmitter<TModel>;
    errors: string[];
    filters: Filters;
    isProcessing: boolean;
    isGettingStats: boolean;
    currentPageNo: number;
    totalPages: number;
    total: number;
    items: Array<TModel>;
    stats: any;
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
        } | PageOptions;
        maxPagesToShow?: number;
        filters?: any[];
        location?: Location;
    } | PagerOptions<TModel>);
    private convertToPageOption;
    fetch(options?: PageOptions | {
        offset?: number;
        limit?: number;
        map?: (obj: any) => TModel;
    }): Observable<void>;
    select(item: TModel): this;
    update(item: TModel): Observable<TModel>;
    add(param: TModel): this;
    create(item: TModel): Observable<TModel>;
    pop(item: TModel): void;
    remove(item: TModel): Observable<void>;
    clear(): void;
    pages(): number[];
    showPage(pageNo: number): import("rxjs").Subscription;
    showPrevious(): void;
    showNext(): void;
}
