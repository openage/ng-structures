export declare class Action {
    event: (any: any) => void;
    title: string;
    icon: string;
    type: string;
    value: any;
    options: any[];
    display: string;
    constructor(obj?: {
        event?: (any: any) => void;
        title?: string;
        icon?: string;
        type?: string;
        value?: any;
        options?: any[];
        display?: string;
    });
}
