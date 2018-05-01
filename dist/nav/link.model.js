var Link = /** @class */ (function () {
    function Link(obj) {
        this.index = 0;
        this.isActive = false;
        if (!obj) {
            return;
        }
        this.index = obj.index;
        this.name = obj.name;
        this.title = obj.title;
        this.isActive = obj.isActive;
        this.routerLink = obj.routerLink;
        this.permissions = obj.permissions || [];
    }
    return Link;
}());
export { Link };
//# sourceMappingURL=link.model.js.map