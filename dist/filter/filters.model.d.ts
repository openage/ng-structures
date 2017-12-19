import { Location } from '@angular/common';
import { Filter } from './filter.model';
import { FiltersOptions } from './filters-options.model';
import { IFilters } from './filters.interface';
export declare class Filters implements IFilters {
    private options;
    items: Filter[];
    properties: {};
    location: Location;
    constructor(options: FiltersOptions);
    apply(): any;
    reset(): any;
    get(field: string): Filter;
    set(field: string, value: any): any;
    getQuery(): {};
}
