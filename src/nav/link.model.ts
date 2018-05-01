export class Link {
    index = 0;
    name: string;
    title: string;
    isActive = false;
    routerLink: string[];
    permissions: string[];
    constructor(obj?: {
        index?: number,
        name?: string,
        title?: string,
        isActive?: boolean,
        routerLink?: string[],
        permissions?: string[]
    }) {
        if (!obj) { return; }
        this.index = obj.index;
        this.name = obj.name;
        this.title = obj.title;
        this.isActive = obj.isActive;
        this.routerLink = obj.routerLink;
        this.permissions = obj.permissions || [];
    }
}
