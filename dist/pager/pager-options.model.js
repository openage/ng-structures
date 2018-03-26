import { PageOptions } from '@open-age/ng-api';
var PagerOptions = /** @class */ (function () {
    function PagerOptions(obj) {
        var _this = this;
        this.maxPagesToShow = 10;
        this.filters = [];
        if (!obj) {
            return;
        }
        if (obj.api) {
            this.api = obj.api;
        }
        if (obj.maxPagesToShow) {
            this.maxPagesToShow = obj.maxPagesToShow;
        }
        if (obj.location) {
            this.location = obj.location;
        }
        if (obj.fields) {
            this.fields = obj.fields;
        }
        if (obj.pageOptions) {
            this.pageOptions = new PageOptions(obj.pageOptions);
        }
        if (obj.filters) {
            obj.filters.forEach(function (element) {
                _this.filters.push(element);
            });
        }
    }
    return PagerOptions;
}());
export { PagerOptions };
//# sourceMappingURL=pager-options.model.js.map