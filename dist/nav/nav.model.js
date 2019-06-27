import { Link } from './link.model';
var Nav = /** @class */ (function () {
    function Nav(obj) {
        var _this = this;
        if (!obj)
            return;
        this.title = obj.title;
        this.icon = obj.icon;
        this.permissions = this.convertToArray(obj.permissions);
        this.items = [];
        if (obj.items && obj.items.length) {
            obj.items.forEach(function (item) {
                item.permissions = _this.convertToArray(item.permissions);
                var link = new Link(item);
                _this.items.push(link);
                link.permissions.forEach(function (p) {
                    if (!_this.permissions.find(function (i) { return i.toLowerCase() == p.toLowerCase(); })) {
                        _this.permissions.push(p);
                    }
                });
            });
        }
        if (obj.current) {
            this.activate(obj.current);
        }
        else if (this.items && this.items.length) {
            this.current = this.items[0];
            this.current.isActive = true;
        }
    }
    Nav.prototype.convertToArray = function (permissions) {
        if (!permissions || Array.isArray(permissions) && !permissions.length) {
            return [];
        }
        if (typeof permissions === 'string') {
            return [permissions];
        }
        return permissions;
    };
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
        if (!this.current && this.items && this.items.length) {
            this.current = this.items[0];
        }
        if (this.current) {
            this.current.isActive = true;
        }
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