import { Location } from '@angular/common';

import { IPager } from './pager.interface';
import { PagerOptions } from './pager-options.model';
import { Observable } from 'rxjs';
import { Filters } from '../filter/index';
import { PageOptions } from '@open-age/ng-api';
import { finalize, map } from 'rxjs/operators'


export class PagerBaseComponent<TModel> implements IPager {

    errors: string[] = [];
    filters: Filters;
    isProcessing = false;
    isGettingStats = false;

    currentPageNo = 1;
    totalPages = 0;

    total: number;
    items: Array<TModel>;
    stats: any;


    constructor(private options: PagerOptions<TModel>) {
        this.items = [];
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
        options.offset = (pageNo - 1) * this.options.pageOptions.limit;
        options.limit = this.options.pageOptions.limit;
        return options;
    }

    fetch(options?: PageOptions) {
        this.isProcessing = true;
        if (!options) {
            options = new PageOptions()
            if (!this.options.pageOptions.noPaging) {
                options.offset = (this.currentPageNo - 1) * this.options.pageOptions.limit;
                options.limit = this.options.pageOptions.limit;
            }
        }

        this.filters.getQuery();

        return this.options.api.search(this.filters.getQuery(), options).pipe(map(page => {
            this.isProcessing = false;
            const items: TModel[] = [];
            page.stats = page.stats || {};
            page.items.forEach((item) => {
                items.push(item);
            });

            this.items = items;
            this.total = page.total || page.stats.total || this.items.length;
            this.currentPageNo = page.pageNo;

            this.totalPages = Math.ceil(this.total / this.options.pageOptions.limit);


        })).pipe(finalize(() => { this.isProcessing = false; }));
    }

    add(param: TModel) {
        this.items.push(param);
        return this;
    };

    remove(item: TModel): void {
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
        }
    }

    clear() {
        this.total = 0;
        this.items = [];
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

        return this.fetch(this.convertToPageOption(pageNo));
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

