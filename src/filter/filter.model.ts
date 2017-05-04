import * as _ from 'lodash';
import { IFilters } from './filters.interface';
import { IPager } from '../pager/index';

export class Filter {
    field: string;
    value?: any;
    operator = 'eq';
    isSelected = false;
    skipUrl = false;

    private originalValue: any;

    set(value): Promise<IPager> {
        this.value = value;
        return this.filters.apply();
    };

    toggle(value: any): Promise<IPager> {
        if (this.value === value) {
            this.value = this.originalValue;
        } else {
            this.value = value;
        }

        return this.filters.apply();
    };
    reset(): Promise<IPager> {
        this.value = this.originalValue;
        return this.filters.apply();
    };

    go(): Promise<IPager> {
        return this.filters.apply();
    };

    constructor(param: any, private filters: IFilters) {
        if (!param) { return; }

        if (param.field) {
            this.field = param.field;
        } else {
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

    isEmpty = () => {

        if (!this.value) {
            return true;
        }
        if (_.isNumber(this.value) && this.value === 0) {
            return true;
        }
        if (_.isString(this.value) && (this.value === '0' || this.value === '' || this.value.match(/^ *$/) !== null)) {
            return true;
        }
        if (_.isArray(this.value) && _.isEmpty(this.value)) {
            return true;
        }

        return false;
    };
}
