var DetailOptions = /** @class */ (function () {
    function DetailOptions(obj) {
        if (!obj) {
            return;
        }
        if (obj.properties) {
            this.properties = obj.properties;
        }
        if (obj.fields) {
            this.fields = obj.fields;
        }
        else {
            this.fields = { id: 'id', timeStamp: 'timeStamp' };
        }
        this.api = obj.api;
        this.cache = obj.cache;
        this.watch = obj.watch;
        this.map = obj.map;
        this.errorHandler = obj.errorHandler;
        /**
    api: IApi<TModel>,
    properties?: TModel,
    watch?: number,
    cache?: IApi<TModel>,
    map?: (obj: any) => TModel,
    fields?: {
      id: 'id' | string,
      timeStamp: 'timeStamp' | string
    },
    errorHandler?: ErrorHandler
         */
    }
    return DetailOptions;
}());
export { DetailOptions };
//# sourceMappingURL=../../src/dist/detail/detail-options.model.js.map