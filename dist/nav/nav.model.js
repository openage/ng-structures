var Nav = /** @class */ (function () {
    function Nav(items) {
        this.items = items;
        this.current = items[0];
        this.current.isActive = true;
    }
    Nav.prototype.activate = function (identifier) {
        var _this = this;
        if (!identifier) {
            return this.reset();
        }
        var name;
        var index;
        var link;
        if (typeof identifier === 'string') {
            name = identifier;
        }
        else if (typeof identifier === 'number') {
            index = identifier;
        }
        else {
            link = identifier;
        }
        this.items.forEach(function (element) {
            element.isActive = false;
            if ((name && element.name && element.name.toLowerCase() === name.toLowerCase()) ||
                (index && element.index === index) ||
                (link && element.index === link.index)) {
                _this.current = element;
            }
        });
        if (!this.current) {
            this.current = this.items[0];
        }
        this.current.isActive = true;
        return this.current;
    };
    Nav.prototype.reset = function () {
        this.current = this.items[0];
        return this.current;
    };
    return Nav;
}());
export { Nav };
//# sourceMappingURL=nav.model.js.map