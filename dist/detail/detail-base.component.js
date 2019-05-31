var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DetailOptions } from './detail-options.model';
import { Input, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
var DetailBase = /** @class */ (function () {
    function DetailBase(options) {
        this.fetched = new EventEmitter();
        this.created = new EventEmitter();
        this.updated = new EventEmitter();
        this.removed = new EventEmitter();
        this.errored = new EventEmitter();
        this.errors = [];
        this.isProcessing = false;
        if (options instanceof DetailOptions) {
            this.options = options;
        }
        else {
            this.options = new DetailOptions(options);
        }
        if (this.options.properties) {
            this.originalModel = JSON.parse(JSON.stringify(options.properties));
            this.setModel(options.properties);
        }
    }
    DetailBase.prototype.setModel = function (model) {
        this.properties = model;
        this.id = this.options.fields ? model[this.options.fields.id] : model['id'];
        if (this.errors) {
            this.errors.splice(0, this.errors.length);
        }
    };
    DetailBase.prototype.get = function (id) {
        var _this = this;
        this.isProcessing = true;
        var subject = new Subject();
        this.options.api.get(id, {
            watch: this.options.watch,
            map: this.options.map
        }).subscribe(function (data) {
            _this.setModel(data);
            if (_this.options.cache) {
                _this.options.cache.update(id, data).subscribe();
            }
            _this.isProcessing = false;
            _this.fetched.emit(_this.properties);
            subject.next(_this.properties);
            return data;
        }, function (error) {
            _this.isProcessing = false;
            _this.errors = [error];
            _this.errored.next(error);
            if (_this.options.errorHandler) {
                _this.options.errorHandler.handleError(error);
            }
            subject.error(error);
        });
        return subject.asObservable();
    };
    ;
    DetailBase.prototype.set = function (data) {
        this.setModel(data);
    };
    ;
    DetailBase.prototype.refresh = function () {
        return this.get(this.id);
    };
    ;
    DetailBase.prototype.clear = function () {
        this.setModel(JSON.parse(JSON.stringify(this.options.properties)));
    };
    ;
    DetailBase.prototype.reset = function () {
        this.setModel(this.originalModel);
    };
    ;
    DetailBase.prototype.save = function (model) {
        if (this.properties[this.options.fields.id]) {
            return this.update(model);
        }
        else {
            return this.create(model);
        }
    };
    DetailBase.prototype.create = function (model) {
        var _this = this;
        this.isProcessing = true;
        model = model || this.properties;
        var subject = new Subject();
        this.options.api.create(model).subscribe(function (data) {
            _this.setModel(data);
            if (_this.options.cache && _this.options.fields.id) {
                _this.options.cache.update(data[_this.options.fields.id], data).subscribe();
            }
            _this.isProcessing = false;
            _this.created.emit(_this.properties);
            subject.next(_this.properties);
            return data;
        }, function (error) {
            _this.isProcessing = false;
            _this.errors = [error];
            _this.errored.next(error);
            if (_this.options.errorHandler) {
                _this.options.errorHandler.handleError(error);
            }
            subject.error(error);
        });
        return subject.asObservable();
    };
    DetailBase.prototype.update = function (model) {
        var _this = this;
        this.isProcessing = true;
        var id = this.properties[this.options.fields.id];
        model = model || this.properties;
        var subject = new Subject();
        this.options.api.update(id, model).subscribe(function (data) {
            _this.setModel(data);
            if (_this.options.cache) {
                _this.options.cache.update(_this.id, data).subscribe();
            }
            _this.isProcessing = false;
            _this.updated.emit(_this.properties);
            subject.next(_this.properties);
            return data;
        }, function (error) {
            _this.isProcessing = false;
            _this.errors = [error];
            _this.errored.next(error);
            if (_this.options.errorHandler) {
                _this.options.errorHandler.handleError(error);
            }
            subject.error(error);
        });
        return subject.asObservable();
    };
    DetailBase.prototype.remove = function () {
        var _this = this;
        this.isProcessing = true;
        var subject = new Subject();
        this.options.api.remove(this.id).subscribe(function () {
            if (_this.options.cache) {
                _this.options.cache.remove(_this.id).subscribe();
            }
            _this.isProcessing = false;
            _this.removed.emit(_this.properties);
            subject.next(_this.properties);
            return;
        }, function (error) {
            _this.isProcessing = false;
            _this.errors = [error];
            _this.errored.next(error);
            if (_this.options.errorHandler) {
                _this.options.errorHandler.handleError(error);
            }
            subject.error(error);
        });
        return subject.asObservable();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DetailBase.prototype, "properties", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DetailBase.prototype, "fetched", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DetailBase.prototype, "created", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DetailBase.prototype, "updated", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DetailBase.prototype, "removed", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DetailBase.prototype, "errored", void 0);
    return DetailBase;
}());
export { DetailBase };
;
//# sourceMappingURL=../../src/dist/detail/detail-base.component.js.map