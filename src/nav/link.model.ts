export class Link {
    index = 0;
    name: string;
    title: string;
    isActive = false;
    routerLink: string[];

    constructor(obj?: {
        index?: number,
        name?: string,
        title?: string,
        isActive?: boolean,
        routerLink?: string[],
    }) {
        if (!obj) { return; }
        if (obj.index) { this.index = obj.index; }
        if (obj.name) { this.name = obj.name; }
        if (obj.title) { this.title = obj.title; }
        if (obj.isActive) { this.isActive = obj.isActive; }
        if (obj.routerLink) { this.routerLink = obj.routerLink; }
    }
}
