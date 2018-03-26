export class Action {
    event: EventListener;
    title: string;
    icon: string;
    type: string;
    value: any;

    constructor(obj?: {
        event: EventListener,
        title: string,
        icon?: string,
        type?: string,
        value?: any
    }) {
        if (!obj) { return; }
        if (obj.event) { this.event = obj.event; }
        if (obj.title) { this.title = obj.title; }
        if (obj.icon) { this.icon = obj.icon; }
        if (obj.type) { this.type = obj.type; }
        if (obj.value) { this.value = obj.value; }
    }
}
