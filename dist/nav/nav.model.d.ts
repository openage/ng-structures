import { Link } from './link.model';
export declare class Nav {
    title: string;
    current: Link;
    items: Link[];
    constructor(obj?: {
        title?: string;
        permissions?: string[];
        items?: any[];
        current?: string | number;
    });
    activate(identifier: string | number | Link): Link;
    reset(): Link;
}
