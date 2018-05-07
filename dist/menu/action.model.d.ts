export declare class Action {
    event: (any) => void;
    title: string;
    icon: string;
    type: string;
    value: any;
    options: any[];
    display: string;
    constructor(obj?: {
        event?: (any) => void;
        title?: string;
        icon?: string;
        type?: string;
        value?: any;
        options?: any[];
        display?: string;
    });
}
