import * as _ from 'lodash';
import * as moment from 'moment';
import { DetailOptions } from './detail-options.model';
import { Observable } from 'rxjs/Rx';
import { Input } from '@angular/core';


export class DetailBase<TModel> {

  private originalModel: TModel;
  @Input() properties: TModel
  errors: string[] = [];
  id: number | string;
  isProcessing = false;

  constructor(private options: DetailOptions<TModel>) {
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

    return this.options.api.get(id).map(data => {
      this.setModel(data);
      return data;
    }).finally(() => {
      this.isProcessing = false;
      return this;
    });
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
      .map(data => {
        this.setModel(data);
        return data;
      }).finally(() => {
        this.isProcessing = false;
        return this;
      });
  };

  update(): Observable<TModel> {
    this.isProcessing = true;
    const id = this.properties[this.options.fields.id];
    return this.options.api.update(id, this.properties)
      .map(data => {
        this.setModel(data);
        return data;
      }).finally(() => {
        this.isProcessing = false;
        return this;
      });
  };

  remove(): Observable<void> {
    this.isProcessing = true;
    return this.options.api.remove(this.id)
      .map(() => {
        return;
      }).finally(() => {
        this.isProcessing = false;
        return this;
      });
  };
};
