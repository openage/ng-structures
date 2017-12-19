var Action = (function () {
    function Action(obj) {
        if (!obj) {
            return;
        }
        if (obj.event) {
            this.event = obj.event;
        }
        if (obj.title) {
            this.title = obj.title;
        }
        if (obj.icon) {
            this.icon = obj.icon;
        }
    }
    return Action;
}());
export { Action };
//# sourceMappingURL=action.model.js.map