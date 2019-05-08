import { Location } from '@angular/common';

import { IPager, IPage } from './pager.interface';
import { PagerOptions } from './pager-options.model';
import { Filters } from '../filter/index';
import { PageOptions, IApi, Page } from '@open-age/ng-api';
import { finalize, map } from 'rxjs/operators'
import { Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';


export class PagerBaseComponent<TModel> implements IPage<TModel>, IPager {

    @Output()
    fetched: EventEmitter<IPage<TModel>> = new EventEmitter();

    @Output()
    selected: EventEmitter<TModel> = new EventEmitter();

    @Output()
    created: EventEmitter<TModel> = new EventEmitter();

    @Output()
    updated: EventEmitter<TModel> = new EventEmitter();

    @Output()
    removed: EventEmitter<TModel> = new EventEmitter();


    errors: string[] = [];
    filters: Filters;
    isProcessing = false;
    isGettingStats = false;

    currentPageNo = 1;
    totalPages = 0;

    total: number;
    items: Array<TModel>;
    stats: any;
    sort: string;
    desc: boolean;


    constructor(private options: {
        api: IApi<TModel>,
        properties?: TModel,
        fields?: {
            id: 'id' | string,
            timeStamp: 'timeStamp' | string
        },
        watch?: number,
        cache?: IApi<TModel>,
        map?: (obj: any) => TModel,
        pageOptions?: {
            limit: number,
            offset?: number,
            sort?: string,
            desc?: boolean
        } | PageOptions,
        maxPagesToShow?: number,
        filters?: any[],
        location?: Location
    } | PagerOptions<TModel>) {
        this.items = [];

        if (!(options instanceof PagerOptions)) {
            options = new PagerOptions<TModel>(options);
        }
        if (!options.pageOptions) {
            options.pageOptions = new PageOptions();
        }
        this.filters = new Filters({
            associatedList: this,
            filters: options.filters,
            location: options.location
        });
    }

    private convertToPageOption(pageNo: number) {
        const options = new PageOptions()
        if (this.options.pageOptions) {
            options.offset = (pageNo - 1) * this.options.pageOptions.limit;
            options.limit = this.options.pageOptions.limit;
        }
        return options;
    }

    fetch(options?: PageOptions | {
        offset?: number;
        limit?: number;
        sort?: string;
        desc?: boolean;
        map?: (obj: any) => TModel;
    }) {
        this.isProcessing = true;
        if (!options) {
            options = {}
            if (this.options.pageOptions && this.options.pageOptions.limit) {
                options.offset = (this.currentPageNo - 1) * this.options.pageOptions.limit;
                options.limit = this.options.pageOptions.limit;
                options.sort = this.options.pageOptions.sort;
                options.desc = this.options.pageOptions.desc;
            }
        }

        let mapFn = this.options.map

        if (!(options instanceof PageOptions) && options.map) {
            mapFn = options.map;
        }

        this.filters.getQuery();

        return this.options.api.search(this.filters.getQuery(), {
            limit: options.limit,
            offset: options.offset,
            map: mapFn
        }).pipe(map(page => {
            this.isProcessing = false;
            const items: TModel[] = [];
            page.stats = page.stats || {};
            page.items.forEach((item) => {
                items.push(item);
                if (this.options.cache && this.options.fields.id) {
                    this.options.cache.update(item[this.options.fields.id], item).subscribe();
                }
            });

            this.items = items;
            this.total = page.total || page.stats.total || this.items.length;
            this.currentPageNo = page.pageNo;

            if (this.options.pageOptions) {
                this.totalPages = Math.ceil(this.total / this.options.pageOptions.limit);
            } else {
                this.totalPages = 1
            }
            this.fetched.emit(this)
        })).pipe(finalize(() => { this.isProcessing = false; }));
    }

    select(item: TModel) {
        this.items.forEach((i: any) => i.isSelected = false);
        (item as any).isSelected = true;
        this.selected.emit(item);
        return this;
    }



    update(item: TModel): Observable<TModel> {
        const id = item[this.options.fields.id];
        (item as any).isProcessing = true;
        return this.options.api.update(id, item)
            .pipe(map(data => {
                if (this.options.cache) {
                    this.options.cache.update(id, data).subscribe();
                }
                this.updated.emit(data);
                return data;
            })).pipe(finalize(() => {
                (item as any).isProcessing = false;
                return this;
            }));
    };

    add(param: TModel) {
        this.items.push(param);
        this.created.emit(param);
        return this;
    };

    create(item: TModel): Observable<TModel> {
        (item as any).isProcessing = true;
        return this.options.api.create(item)
            .pipe(map(data => {
                if (this.options.cache && this.options.fields.id) {
                    this.options.cache.update(data[this.options.fields.id], data).subscribe();
                }
                this.add(data);
                return data;
            })).pipe(finalize(() => {
                (item as any).isProcessing = false;
                return this;
            }));
    };

    pop(item: TModel): void {
        const id = item[this.options.fields.id];
        let found = false;
        if (this.items && this.items.length) {
            let i = this.items.length;
            while (i--) {
                if (this.items[i] && this.items[i][this.options.fields.id] === id) {
                    this.items.splice(i, 1);
                    found = true;
                    break;
                }
            }
        }

        if (found) {
            this.total = this.total - 1;
            this.removed.emit(item);
        }
    }

    remove(item: TModel): Observable<void> {
        const id = item[this.options.fields.id];
        (item as any).isProcessing = true;
        return this.options.api.remove(id)
            .pipe(map(() => {
                if (this.options.cache) {
                    this.options.cache.remove(id).subscribe();
                }

                this.pop(item)
                return;
            })).pipe(finalize(() => {
                this.isProcessing = false;
                (item as any).isProcessing = false;
                return this;
            }));
    };

    clear() {
        this.total = 0;
        this.items = [];
        this.fetched.emit(this);
    };

    pages(): number[] {
        const maxPages = this.options.maxPagesToShow;
        let index: number;

        const pageNos: number[] = [];

        let firstPage = 1;

        let lastPage = this.totalPages;

        if (this.totalPages > this.options.maxPagesToShow) {
            if (this.currentPageNo < this.options.maxPagesToShow) {
                lastPage = this.options.maxPagesToShow;
            } else if (this.currentPageNo > (this.totalPages - this.options.maxPagesToShow)) {
                firstPage = this.totalPages - this.options.maxPagesToShow;
            } else {
                firstPage = this.currentPageNo - this.options.maxPagesToShow / 2;
                if (firstPage < 1) { firstPage = 1; }
                lastPage = this.currentPageNo + this.options.maxPagesToShow / 2;
                if (lastPage > this.totalPages) { lastPage = this.totalPages; }
            }
        }

        if (firstPage !== 1) {
            pageNos.push(-2);
        }

        for (index = firstPage; index <= lastPage; index++) {
            pageNos.push(index);
        }

        if (pageNos.length === 0) {
            pageNos.push(1);
        }

        if (firstPage !== this.totalPages) {
            pageNos.push(-1);
        }

        return pageNos;
    };

    showPage(pageNo: number) {
        if (this.isProcessing) {
            return;
        }
        if (pageNo === -2) {
            pageNo = 1;
            return;
        }

        if (pageNo === -1) {
            pageNo = this.totalPages;
            return;
        }

        return this.fetch(this.convertToPageOption(pageNo)).subscribe();
    }

    showPrevious() {
        if (this.isProcessing || this.currentPageNo <= 1) {
            return;
        }
        this.showPage(this.currentPageNo - 1);
    };

    showNext() {
        if (this.isProcessing || this.totalPages <= this.currentPageNo) {
            return;
        }
        this.showPage(this.currentPageNo + 1);
    };
}

