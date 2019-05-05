import { DetailOptions } from './detail-options.model';
import { Observable, pipe } from 'rxjs';
import { Input, EventEmitter, Output } from '@angular/core';
import { finalize, map } from 'rxjs/operators'
import { IApi } from '@open-age/ng-api';


export class DetailBase<TModel> {

  private originalModel: TModel;
  @Input()
  properties: TModel

  @Output()
  fetched: EventEmitter<TModel> = new EventEmitter();

  @Output()
  created: EventEmitter<TModel> = new EventEmitter();

  @Output()
  updated: EventEmitter<TModel> = new EventEmitter();

  @Output()
  removed: EventEmitter<TModel> = new EventEmitter();

  errors: string[] = [];
  id: number | string;
  isProcessing = false;

  constructor(private options: {
    api: IApi<TModel>,
    properties?: TModel,
    watch?: number,
    cache?: IApi<TModel>,
    map?: (obj: any) => TModel,
    fields?: {
      id: 'id' | string
    }
  } | DetailOptions<TModel>) {
    if (options.properties) {
      this.originalModel = JSON.parse(JSON.stringify(options.properties));
      this.setModel(options.properties);
    }
  }

  private setModel(model: TModel): void {
    this.properties = model;
    this.id = this.options.fields ? model[this.options.fields.id] : model['id'];
    if (this.errors) {
      this.errors.splice(0, this.errors.length);
    }
  };

  get(id: string | number): Observable<TModel> {
    this.isProcessing = true;
    return this.options.api.get(id, {
      watch: this.options.watch,
      map: this.options.map
    }).pipe(map(data => {
      this.setModel(data);
      if (this.options.cache) {
        this.options.cache.update(id, data).subscribe();
      }
      this.fetched.emit(this.properties);
      return data;
    })).pipe(finalize(() => {
      this.isProcessing = false;
      return this;
    }));
  };

  set(data: TModel) {
    this.setModel(data);
  };

  refresh(): Observable<TModel> {
    return this.get(this.id);
  };

  clear() {
    this.setModel(JSON.parse(JSON.stringify(this.options.properties)));
  };

  reset() {
    this.setModel(this.originalModel);
  };

  create(model?: TModel): Observable<TModel> {
    this.isProcessing = true;
    return this.options.api.create(this.properties)
      .pipe(map(data => {
        this.setModel(data);
        if (this.options.cache && this.options.fields.id) {
          this.options.cache.update(data[this.options.fields.id], data).subscribe();
        }
        this.created.emit(this.properties);
        return data;
      })).pipe(finalize(() => {
        this.isProcessing = false;
        return this;
      }));
  };

  update(): Observable<TModel> {
    this.isProcessing = true;
    const id = this.properties[this.options.fields.id];
    return this.options.api.update(id, this.properties)
      .pipe(map(data => {
        this.setModel(data);
        if (this.options.cache) {
          this.options.cache.update(this.id, data).subscribe();
        }
        this.updated.emit(this.properties);
        return data;
      })).pipe(finalize(() => {
        this.isProcessing = false;
        return this;
      }));
  };

  remove(): Observable<void> {
    this.isProcessing = true;
    return this.options.api.remove(this.id)
      .pipe(map(() => {
        if (this.options.cache) {
          this.options.cache.remove(this.id).subscribe();
        }
        this.removed.emit(this.properties);
        return;
      })).pipe(finalize(() => {
        this.isProcessing = false;
        return this;
      }));
  };
};
