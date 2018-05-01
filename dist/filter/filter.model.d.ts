import { IFilters } from './filters.interface';
import { IPager } from '../pager/index';
export declare class Filter {
    private filters;
    control: {
        title: string;
        type: string;
        options: {
            title: string;
            icon: string;
            value: string;
        }[];
    };
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
