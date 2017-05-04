import * as _ from 'lodash';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { URLSearchParams } from '@angular/http';

import { Filter } from './filter.model';
import { FiltersOptions } from './filters-options.model';
import { IFilters } from './filters.interface';


export class Filters implements IFilters {

    items: Filter[] = [];
    properties = {};

    location: Location;

    constructor(private options: FiltersOptions) {
        _.each(options.filters, (item) => {
            const model = new Filter(item, this);
            this.items.push(model);
            this.properties[model.field] = model;
        });
        this.location = options.location;
    }

    apply() {
        return this.options.associatedList.fetch();
    }

    reset() {
        _.each(this.items, (item) => {
            item.reset();
        });
        return this.apply();

    }

    get(field: string): Filter {
        return this.properties[field];
    }

    set(field: string, value: any) {
        const item = this.properties[field];
        item.value = value;
        return this.apply();
    }

    getQuery() {
        const query = {};

        const urlSearchParams = this.location ? (new URLSearchParams(this.location.path().split('?')[1])) : null;

        let count = 0;

        _.each(this.items, (item) => {
            if (urlSearchParams && !item.skipUrl) {
                const value = _.isDate(item.value) ? moment(item.value).toJSON() : item.value;
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
            const url = this.location.path().split('?')[0];
            this.location.replaceState(url, urlSearchParams.toString());
        }

        return query;
    }
}
