import { Location } from '@angular/common';
import { IPager } from '../pager/index';
export declare class FiltersOptions {
    associatedList: IPager;
    location?: Location;
    filters: any[];
    addOperator?: boolean;
}
