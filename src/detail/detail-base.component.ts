import { DetailOptions } from './detail-options.model';
import { Input, EventEmitter, Output, ErrorHandler } from '@angular/core';
import { IApi } from '@open-age/ng-api';
import { Observable, Subject } from 'rxjs';

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

  @Output()
  errored: EventEmitter<any> = new EventEmitter();

  errors: string[] = [];
  id: number | string;
  isProcessing = false;

  private options: DetailOptions<TModel>;

  constructor(options: {
    api: IApi<TModel>,
    cache?: IApi<TModel>,
    properties?: TModel,
    watch?: number,
    map?: (obj: any) => TModel,
    fields?: {
      id: 'id' | string,
      timeStamp: 'timeStamp' | string
    },
    errorHandler?: ErrorHandler
  } | DetailOptions<TModel>) {

    if (options instanceof DetailOptions) {
      this.options = options;
    } else {
      this.options = new DetailOptions(options);

    }

    if (this.options.properties) {
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
  }

  get(id: string | number): Observable<TModel> {
    this.isProcessing = true;
    let subject = new Subject<TModel>();
    this.options.api.get(id, {
      watch: this.options.watch,
      map: this.options.map
    }).subscribe(data => {
      this.setModel(data);
      if (this.options.cache) {
        this.options.cache.update(id, data).subscribe();
      }
      this.isProcessing = false;
      this.fetched.emit(this.properties);
      subject.next(this.properties);
      return data;
    }, error => {
      this.isProcessing = false;
      this.errors = [error];
      this.errored.next(error);
      if (this.options.errorHandler) {
        this.options.errorHandler.handleError(error);
      }
      subject.error(error);
    });
    return subject.asObservable();
  };

  set(data: TModel) {
    this.setModel(data);
  };

  refresh() {
    return this.get(this.id);
  };

  clear() {
    this.setModel(JSON.parse(JSON.stringify(this.options.properties)));
  };

  reset() {
    this.setModel(this.originalModel);
  };

  save(model?: any): Observable<TModel> {
    if (this.properties[this.options.fields.id]) {
      return this.update(model);
    } else {
      return this.create(model);
    }
  }

  create(model?: any): Observable<TModel> {
    this.isProcessing = true;
    model = model || this.properties;
    let subject = new Subject<TModel>();
    this.options.api.create(model).subscribe(data => {
      this.setModel(data);
      if (this.options.cache && this.options.fields.id) {
        this.options.cache.update(data[this.options.fields.id], data).subscribe();
      }
      this.isProcessing = false;
      this.created.emit(this.properties);
      subject.next(this.properties);
      return data;
    }, error => {
      this.isProcessing = false;
      this.errors = [error];
      this.errored.next(error);
      if (this.options.errorHandler) {
        this.options.errorHandler.handleError(error);
      }
      subject.error(error);
    });
    return subject.asObservable();
  }

  update(model?: any): Observable<TModel> {
    this.isProcessing = true;
    const id = this.properties[this.options.fields.id];
    model = model || this.properties
    let subject = new Subject<TModel>();
    this.options.api.update(id, model).subscribe(data => {
      this.setModel(data);
      if (this.options.cache) {
        this.options.cache.update(this.id, data).subscribe();
      }
      this.isProcessing = false;
      this.updated.emit(this.properties);
      subject.next(this.properties);
      return data;
    }, error => {
      this.isProcessing = false;
      this.errors = [error];
      this.errored.next(error);
      if (this.options.errorHandler) {
        this.options.errorHandler.handleError(error);
      }
      subject.error(error);
    });
    return subject.asObservable();
  }

  remove(): Observable<TModel> {
    this.isProcessing = true;
    let subject = new Subject<TModel>();

    this.options.api.remove(this.id).subscribe(() => {
      if (this.options.cache) {
        this.options.cache.remove(this.id).subscribe();
      }
      this.isProcessing = false;
      this.removed.emit(this.properties);
      subject.next(this.properties);
      return;
    }, error => {
      this.isProcessing = false;
      this.errors = [error];
      this.errored.next(error);
      if (this.options.errorHandler) {
        this.options.errorHandler.handleError(error);
      }
      subject.error(error);
    });
    return subject.asObservable();
  }
};
