var DetailOptions = (function () {
    function DetailOptions(obj) {
        this.fields = {
            id: 'id'
        };
        if (!obj) {
            return;
        }
        if (obj.api) {
            this.api = obj.api;
        }
        if (obj.properties) {
            this.properties = obj.properties;
        }
        if (obj.fields) {
            this.fields = obj.fields;
        }
    }
    return DetailOptions;
}());
export { DetailOptions };
//# sourceMappingURL=detail-options.model.js.map