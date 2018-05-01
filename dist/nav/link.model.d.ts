export declare class Link {
    index: number;
    name: string;
    title: string;
    isActive: boolean;
    routerLink: string[];
    permissions: string[];
    constructor(obj?: {
        index?: number;
        name?: string;
        title?: string;
        isActive?: boolean;
        routerLink?: string[];
        permissions?: string[];
    });
}
