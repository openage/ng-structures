export class Action {
    event: EventListener;
    title: string;
    icon: string;

    constructor(obj?: {
        event: EventListener,
        title: string,
        icon?: string
    }) {
        if (!obj) { return; }
        if (obj.event) { this.event = obj.event; }
        if (obj.title) { this.title = obj.title; }
        if (obj.icon) { this.icon = obj.icon; }
    }
}
