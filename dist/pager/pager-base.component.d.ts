import { Location } from '@angular/common';
import { IPager } from './pager.interface';
import { PagerOptions } from './pager-options.model';
import { Observable } from 'rxjs';
import { Filters } from '../filter/index';
import { PageOptions, IApi } from '@open-age/ng-api';
export declare class PagerBaseComponent<TModel> implements IPager {
    private options;
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
    add(param: TModel): this;
    remove(item: TModel): void;
    clear(): void;
    pages(): number[];
    showPage(pageNo: number): import("rxjs").Subscription;
    showPrevious(): void;
    showNext(): void;
}
