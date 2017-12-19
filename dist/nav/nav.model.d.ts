import { Link } from './link.model';
export declare class Nav {
    items: Link[];
    current: Link;
    constructor(items: Link[]);
    activate(identifier: string | number | Link): Link;
    reset(): Link;
}
