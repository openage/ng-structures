export declare class Link {
    index: number;
    name: string;
    url: string;
    title: string;
    icon: string;
    isActive: boolean;
    routerLink: string[];
    permissions: string[];
    constructor(obj?: {
        index?: number;
        name?: string;
        title?: string;
        icon?: string;
        isActive?: boolean;
        url?: string;
        routerLink?: string[];
        permissions?: string[];
    });
}
