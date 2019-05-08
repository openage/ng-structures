var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PagerOptions } from './pager-options.model';
import { Filters } from '../filter/index';
import { PageOptions } from '@open-age/ng-api';
import { finalize, map } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';
var PagerBaseComponent = /** @class */ (function () {
    function PagerBaseComponent(options) {
        this.options = options;
        this.fetched = new EventEmitter();
        this.selected = new EventEmitter();
        this.created = new EventEmitter();
        this.updated = new EventEmitter();
        this.removed = new EventEmitter();
        this.errors = [];
        this.isProcessing = false;
        this.isGettingStats = false;
        this.currentPageNo = 1;
        this.totalPages = 0;
        this.items = [];
        if (!(options instanceof PagerOptions)) {
            options = new PagerOptions(options);
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
    PagerBaseComponent.prototype.convertToPageOption = function (pageNo) {
        var options = new PageOptions();
        if (this.options.pageOptions) {
            options.offset = (pageNo - 1) * this.options.pageOptions.limit;
            options.limit = this.options.pageOptions.limit;
        }
        return options;
    };
    PagerBaseComponent.prototype.fetch = function (options) {
        var _this = this;
        this.isProcessing = true;
        if (!options) {
            options = {};
            if (this.options.pageOptions && this.options.pageOptions.limit) {
                options.offset = (this.currentPageNo - 1) * this.options.pageOptions.limit;
                options.limit = this.options.pageOptions.limit;
                options.sort = this.options.pageOptions.sort;
                options.desc = this.options.pageOptions.desc;
            }
        }
        var mapFn = this.options.map;
        if (!(options instanceof PageOptions) && options.map) {
            mapFn = options.map;
        }
        this.filters.getQuery();
        return this.options.api.search(this.filters.getQuery(), {
            limit: options.limit,
            offset: options.offset,
            map: mapFn
        }).pipe(map(function (page) {
            _this.isProcessing = false;
            var items = [];
            page.stats = page.stats || {};
            page.items.forEach(function (item) {
                items.push(item);
                if (_this.options.cache && _this.options.fields.id) {
                    _this.options.cache.update(item[_this.options.fields.id], item).subscribe();
                }
            });
            _this.items = items;
            _this.total = page.total || page.stats.total || _this.items.length;
            _this.currentPageNo = page.pageNo;
            if (_this.options.pageOptions) {
                _this.totalPages = Math.ceil(_this.total / _this.options.pageOptions.limit);
            }
            else {
                _this.totalPages = 1;
            }
            _this.fetched.emit(_this);
        })).pipe(finalize(function () { _this.isProcessing = false; }));
    };
    PagerBaseComponent.prototype.select = function (item) {
        this.items.forEach(function (i) { return i.isSelected = false; });
        item.isSelected = true;
        this.selected.emit(item);
        return this;
    };
    PagerBaseComponent.prototype.update = function (item) {
        var _this = this;
        var id = item[this.options.fields.id];
        item.isProcessing = true;
        return this.options.api.update(id, item)
            .pipe(map(function (data) {
            if (_this.options.cache) {
                _this.options.cache.update(id, data).subscribe();
            }
            _this.updated.emit(data);
            return data;
        })).pipe(finalize(function () {
            item.isProcessing = false;
            return _this;
        }));
    };
    ;
    PagerBaseComponent.prototype.add = function (param) {
        this.items.push(param);
        this.created.emit(param);
        return this;
    };
    ;
    PagerBaseComponent.prototype.create = function (item) {
        var _this = this;
        item.isProcessing = true;
        return this.options.api.create(item)
            .pipe(map(function (data) {
            if (_this.options.cache && _this.options.fields.id) {
                _this.options.cache.update(data[_this.options.fields.id], data).subscribe();
            }
            _this.add(data);
            return data;
        })).pipe(finalize(function () {
            item.isProcessing = false;
            return _this;
        }));
    };
    ;
    PagerBaseComponent.prototype.pop = function (item) {
        var id = item[this.options.fields.id];
        var found = false;
        if (this.items && this.items.length) {
            var i = this.items.length;
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
    };
    PagerBaseComponent.prototype.remove = function (item) {
        var _this = this;
        var id = item[this.options.fields.id];
        item.isProcessing = true;
        return this.options.api.remove(id)
            .pipe(map(function () {
            if (_this.options.cache) {
                _this.options.cache.remove(id).subscribe();
            }
            _this.pop(item);
            return;
        })).pipe(finalize(function () {
            _this.isProcessing = false;
            item.isProcessing = false;
            return _this;
        }));
    };
    ;
    PagerBaseComponent.prototype.clear = function () {
        this.total = 0;
        this.items = [];
        this.fetched.emit(this);
    };
    ;
    PagerBaseComponent.prototype.pages = function () {
        var maxPages = this.options.maxPagesToShow;
        var index;
        var pageNos = [];
        var firstPage = 1;
        var lastPage = this.totalPages;
        if (this.totalPages > this.options.maxPagesToShow) {
            if (this.currentPageNo < this.options.maxPagesToShow) {
                lastPage = this.options.maxPagesToShow;
            }
            else if (this.currentPageNo > (this.totalPages - this.options.maxPagesToShow)) {
                firstPage = this.totalPages - this.options.maxPagesToShow;
            }
            else {
                firstPage = this.currentPageNo - this.options.maxPagesToShow / 2;
                if (firstPage < 1) {
                    firstPage = 1;
                }
                lastPage = this.currentPageNo + this.options.maxPagesToShow / 2;
                if (lastPage > this.totalPages) {
                    lastPage = this.totalPages;
                }
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
    ;
    PagerBaseComponent.prototype.showPage = function (pageNo) {
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
    };
    PagerBaseComponent.prototype.showPrevious = function () {
        if (this.isProcessing || this.currentPageNo <= 1) {
            return;
        }
        this.showPage(this.currentPageNo - 1);
    };
    ;
    PagerBaseComponent.prototype.showNext = function () {
        if (this.isProcessing || this.totalPages <= this.currentPageNo) {
            return;
        }
        this.showPage(this.currentPageNo + 1);
    };
    ;
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PagerBaseComponent.prototype, "fetched", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PagerBaseComponent.prototype, "selected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PagerBaseComponent.prototype, "created", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PagerBaseComponent.prototype, "updated", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PagerBaseComponent.prototype, "removed", void 0);
    return PagerBaseComponent;
}());
export { PagerBaseComponent };
//# sourceMappingURL=../../src/dist/pager/pager-base.component.js.map