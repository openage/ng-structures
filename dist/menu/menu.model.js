import { Action } from './action.model';
var Menu = /** @class */ (function () {
    function Menu(obj) {
        var _this = this;
        if (!obj) {
            return;
        }
        this.items = [];
        obj.forEach(function (item) {
            if (item instanceof Action) {
                _this.items.push(item);
            }
            else {
                _this.items.push(new Action(item));
            }
        });
    }
    return Menu;
}());
export { Menu };
//# sourceMappingURL=../../src/dist/menu/menu.model.js.map