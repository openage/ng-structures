var Link = /** @class */ (function () {
    function Link(obj) {
        this.index = 0;
        this.isActive = false;
        if (!obj) {
            return;
        }
        if (obj.index) {
            this.index = obj.index;
        }
        if (obj.name) {
            this.name = obj.name;
        }
        if (obj.title) {
            this.title = obj.title;
        }
        if (obj.isActive) {
            this.isActive = obj.isActive;
        }
        if (obj.routerLink) {
            this.routerLink = obj.routerLink;
        }
    }
    return Link;
}());
export { Link };
//# sourceMappingURL=link.model.js.map