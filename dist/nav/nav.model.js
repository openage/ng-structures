import { Link } from './link.model';
var Nav = /** @class */ (function () {
    function Nav(obj) {
        var _this = this;
        if (!obj)
            return;
        this.title = obj.title;
        this.icon = obj.icon;
        this.items = [];
        if (obj.items && obj.items.length) {
            obj.items.forEach(function (item) {
                var link = new Link(item);
                if (!link.permissions || !link.permissions.length) {
                    _this.items.push(link);
                    return;
                }
                // this link requires permissions
                if (!obj.permissions || !obj.permissions.length) {
                    // no permissions supplied
                    return;
                }
                link.permissions.forEach(function (requiredPermission) {
                    if (obj.permissions.find(function (permission) { return permission.toLowerCase() === requiredPermission.toLowerCase(); })) {
                        _this.items.push(link);
                        return;
                    }
                });
            });
        }
        if (obj.current) {
            this.activate(obj.current);
        }
        else {
            this.current = this.items[0];
            this.current.isActive = true;
        }
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
//# sourceMappingURL=../../src/dist/nav/nav.model.js.map