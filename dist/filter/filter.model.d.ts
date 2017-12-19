import { IFilters } from './filters.interface';
import { IPager } from '../pager/index';
export declare class Filter {
    private filters;
    field: string;
    value?: any;
    operator: string;
    isSelected: boolean;
    skipUrl: boolean;
    private originalValue;
    set(value: any): Promise<IPager>;
    toggle(value: any): Promise<IPager>;
    reset(): Promise<IPager>;
    go(): Promise<IPager>;
    constructor(param: any, filters: IFilters);
    isEmpty: () => boolean;
}
