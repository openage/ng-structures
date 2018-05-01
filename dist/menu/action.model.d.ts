export declare class Action {
    event: EventListener;
    title: string;
    icon: string;
    type: string;
    value: any;
    options: any[];
    display: string;
    constructor(obj?: {
        event?: EventListener;
        title?: string;
        icon?: string;
        type?: string;
        value?: any;
        options?: any[];
        display?: string;
    });
}
