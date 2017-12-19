import * as _ from 'lodash';
import * as moment from 'moment';
import { URLSearchParams } from '@angular/http';
import { Filter } from './filter.model';
var Filters = (function () {
    function Filters(options) {
        var _this = this;
        this.options = options;
        this.items = [];
        this.properties = {};
        _.each(options.filters, function (item) {
            var model = new Filter(item, _this);
            _this.items.push(model);
            _this.properties[model.field] = model;
        });
        this.location = options.location;
    }
    Filters.prototype.apply = function () {
        return this.options.associatedList.fetch();
    };
    Filters.prototype.reset = function () {
        _.each(this.items, function (item) {
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
        var query = {};
        var urlSearchParams = this.location ? (new URLSearchParams(this.location.path().split('?')[1])) : null;
        var count = 0;
        _.each(this.items, function (item) {
            if (urlSearchParams && !item.skipUrl) {
                var value = _.isDate(item.value) ? moment(item.value).toJSON() : item.value;
                urlSearchParams.set(item.field, item.isEmpty() ? null : value);
            }
            if (item.value && item.value !== '' && item.value !== 0) {
                // params['f[' + count + '][f]'] = item.field;
                // params['f[' + count + '][o]'] = item.operator;
                // params['f[' + count + '][v]'] = item.value;
                query[item.field] = item.value;
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
//# sourceMappingURL=filters.model.js.map