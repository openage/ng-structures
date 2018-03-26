export declare class Action {
    event: EventListener;
    title: string;
    icon: string;
    type: string;
    value: any;
    constructor(obj?: {
        event: EventListener;
        title: string;
        icon?: string;
        type?: string;
        value?: any;
    });
}
