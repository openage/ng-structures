import { PageOptions } from '@open-age/ng-api';

export interface IPager {
    fetch(options?: PageOptions): any;
}
