import { IPager } from './pager.interface';
import { PagerOptions } from './pager-options.model';
import { Observable } from 'rxjs/Rx';
import { Filters } from '../filter/index';
import { PageOptions } from '@open-age/ng-api';
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
    constructor(options: PagerOptions<TModel>);
    private convertToPageOption(pageNo);
    fetch(options?: PageOptions): Observable<void>;
    add(param: TModel): this;
    remove(item: TModel): void;
    clear(): void;
    pages(): number[];
    showPage(pageNo: number): Observable<void>;
    showPrevious(): void;
    showNext(): void;
}
