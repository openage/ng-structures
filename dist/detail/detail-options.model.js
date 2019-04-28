var DetailOptions = /** @class */ (function () {
    function DetailOptions(obj) {
        this.fields = {
            id: 'id'
        };
        if (!obj) {
            return;
        }
        if (obj.properties) {
            this.properties = obj.properties;
        }
        if (obj.fields) {
            this.fields = obj.fields;
        }
        this.api = obj.api;
        this.cache = obj.cache;
        this.watch = obj.watch;
        this.map = obj.map;
    }
    return DetailOptions;
}());
export { DetailOptions };
//# sourceMappingURL=../../src/dist/detail/detail-options.model.js.map