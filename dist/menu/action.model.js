var Action = /** @class */ (function () {
    function Action(obj) {
        if (!obj) {
            return;
        }
        this.event = obj.event;
        this.title = obj.title;
        this.icon = obj.icon;
        this.type = obj.type;
        this.value = obj.value;
        this.options = obj.options;
        this.display = obj.display;
    }
    return Action;
}());
export { Action };
//# sourceMappingURL=action.model.js.map