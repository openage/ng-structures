import { PageOptions } from 'app/core/api';

export interface IPager {
    fetch(options?: PageOptions): any;
}
