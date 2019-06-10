import moment from 'moment';
import { URLSearchParams } from '@angular/http';
import { Filter } from './filter.model';
var Filters = /** @class */ (function () {
    function Filters(options) {
        var _this = this;
        this.options = options;
        this.items = [];
        this.properties = {};
        if (options.filters) {
            options.filters.forEach(function (item) {
                var model = new Filter(item, _this);
                _this.items.push(model);
                _this.properties[model.field] = model;
            });
        }
        this.location = options.location;
    }
    Filters.prototype.apply = function () {
        return this.options.associatedList.fetch();
    };
    Filters.prototype.reset = function () {
        this.items.forEach(function (item) {
            item.reset();
        });
        return this.apply();
    };
    Filters.prototype.get = function (field) {
        return this.properties[field];
    };
    Filters.prototype.set = function (field, value) {
        var item = this.properties[field];
        item.value = value;
        return this.apply();
    };
    Filters.prototype.getQuery = function () {
        var _this = this;
        var query = {};
        var urlSearchParams = this.location ? (new URLSearchParams(this.location.path().split('?')[1])) : null;
        var count = 0;
        this.items.forEach(function (item) {
            if (urlSearchParams && !item.skipUrl) {
                var value = (item.value instanceof Date) ? moment(item.value).toJSON() : item.value;
                urlSearchParams.set(item.field, item.isEmpty() ? null : value);
            }
            if (item.value && item.value !== '' && item.value !== 0) {
                if (_this.options.addOperator) {
                    query["f[" + count + "][f]"] = item.field;
                    query["f[" + count + "][o]"] = item.operator;
                    query["f[" + count + "][v]"] = item.value;
                }
                else {
                    query[item.field] = item.value;
                }
                count++;
            }
        });
        if (urlSearchParams) {
            var url = this.location.path().split('?')[0];
            this.location.replaceState(url, urlSearchParams.toString());
        }
        return query;
    };
    return Filters;
}());
export { Filters };
//# sourceMappingURL=../../src/dist/filter/filters.model.js.map