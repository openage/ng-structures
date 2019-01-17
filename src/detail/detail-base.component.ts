import { DetailOptions } from './detail-options.model';
import { Observable, pipe } from 'rxjs';
import { Input } from '@angular/core';

import { finalize, map } from 'rxjs/operators'
import { IApi } from '@open-age/ng-api';


export class DetailBase<TModel> {

  private originalModel: TModel;
  @Input() properties: TModel
  errors: string[] = [];
  id: number | string;
  isProcessing = false;

  constructor(private options: {
    api: IApi<TModel>,
    properties?: TModel,
    watch?: number,
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

    let options: any = {}

    if (!(this.options instanceof DetailOptions) && this.options.watch) {
      options.watch = this.options.watch
    }

    return this.options.api.get(id, options).pipe(map(data => {
      this.setModel(data);
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
        return;
      })).pipe(finalize(() => {
        this.isProcessing = false;
        return this;
      }));
  };
};
