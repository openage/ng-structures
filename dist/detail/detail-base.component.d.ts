import { DetailOptions } from './detail-options.model';
import { EventEmitter, ErrorHandler } from '@angular/core';
import { IApi } from '@open-age/ng-api';
import { Observable } from 'rxjs';
export declare class DetailBase<TModel> {
    private originalModel;
    properties: TModel;
    fetched: EventEmitter<TModel>;
    created: EventEmitter<TModel>;
    updated: EventEmitter<TModel>;
    removed: EventEmitter<TModel>;
    errored: EventEmitter<any>;
    errors: string[];
    id: number | string;
    isProcessing: boolean;
    private options;
    constructor(options: {
        api: IApi<TModel>;
        cache?: IApi<TModel>;
        properties?: TModel;
        watch?: number;
        map?: (obj: any) => TModel;
        fields?: {
            id: 'id' | string;
            timeStamp: 'timeStamp' | string;
        };
        errorHandler?: ErrorHandler;
    } | DetailOptions<TModel>);
    private setModel;
    get(id: string | number): Observable<TModel>;
    set(data: TModel): void;
    refresh(): Observable<TModel>;
    clear(): void;
    reset(): void;
    save(model?: any): Observable<TModel>;
    create(model?: any): Observable<TModel>;
    update(model?: any): Observable<TModel>;
    remove(): Observable<TModel>;
}
