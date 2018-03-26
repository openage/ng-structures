import * as _ from 'lodash';
var Filter = /** @class */ (function () {
    function Filter(param, filters) {
        var _this = this;
        this.filters = filters;
        this.operator = 'eq';
        this.isSelected = false;
        this.skipUrl = false;
        this.isEmpty = function () {
            if (!_this.value) {
                return true;
            }
            if (_.isNumber(_this.value) && _this.value === 0) {
                return true;
            }
            if (_.isString(_this.value) && (_this.value === '0' || _this.value === '' || _this.value.match(/^ *$/) !== null)) {
                return true;
            }
            if (_.isArray(_this.value) && _.isEmpty(_this.value)) {
                return true;
            }
            return false;
        };
        if (!param) {
            return;
        }
        if (param.field) {
            this.field = param.field;
        }
        else {
            this.field = param;
        }
        if (param.value) {
            this.value = param.value;
        }
        if (param.operator) {
            this.operator = param.operator;
        }
        if (param.isSelected) {
            this.isSelected = param.isSelected;
        }
        if (param.skipUrl) {
            this.isSelected = param.skipUrl;
        }
        this.originalValue = this.value;
    }
    Filter.prototype.set = function (value) {
        this.value = value;
        return this.filters.apply();
    };
    ;
    Filter.prototype.toggle = function (value) {
        if (this.value === value) {
            this.value = this.originalValue;
        }
        else {
            this.value = value;
        }
        return this.filters.apply();
    };
    ;
    Filter.prototype.reset = function () {
        this.value = this.originalValue;
        return this.filters.apply();
    };
    ;
    Filter.prototype.go = function () {
        return this.filters.apply();
    };
    ;
    return Filter;
}());
export { Filter };
//# sourceMappingURL=filter.model.js.map