import { Link } from './link.model';
export declare class Nav {
    icon: string;
    title: string;
    current: Link;
    items: Link[];
    constructor(obj?: {
        title?: string;
        icon?: string;
        permissions?: string[];
        items?: any[];
        current?: string | number;
    });
    activate(identifier: string | number | Link): Link;
    reset(): Link;
}
