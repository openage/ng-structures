import { DetailOptions } from './detail-options.model';
import { Observable } from 'rxjs/Rx';
export declare class DetailBase<TModel> {
    private options;
    private originalModel;
    properties: TModel;
    errors: string[];
    id: number | string;
    isProcessing: boolean;
    constructor(options: DetailOptions<TModel>);
    private setModel(model);
    get(id: string | number): Observable<TModel>;
    set(data: TModel): void;
    refresh(): Observable<TModel>;
    clear(): void;
    reset(): void;
    create(model?: TModel): Observable<TModel>;
    update(): Observable<TModel>;
    remove(): Observable<void>;
}
