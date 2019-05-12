import { Link } from './link.model';

export class Nav {
    icon: string;
    title: string;
    current: Link;
    items: Link[];
    permissions?: string[];
    constructor(obj?: {
        title?: string,
        icon?: string,
        permissions?: string[],
        items?: any[],
        current?: string | number
    }) {
        if (!obj) return;
        this.title = obj.title;
        this.icon = obj.icon;
        this.permissions = this.convertToArray(obj.permissions);
        this.items = [];
        if (obj.items && obj.items.length) {
            obj.items.forEach(item => {
                item.permissions = this.convertToArray(item.permissions)
                let link = new Link(item);
                this.items.push(link);
                link.permissions.forEach(p => {
                    if (!this.permissions.find(i => i.toLowerCase() == p.toLowerCase())) {
                        this.permissions.push(p);
                    }
                });
            });
        }

        if (obj.current) {
            this.activate(obj.current);
        } else {
            this.current = this.items[0];
            this.current.isActive = true;
        }
    }

    private convertToArray(permissions) {
        if (!permissions || Array.isArray(permissions) && !permissions.length) {
            return []
        }

        if (typeof permissions === 'string') {
            return [permissions];
        }

        return permissions
    }
    activate(identifier: string | number | Link): Link {
        if (!identifier) {
            return this.reset();
        }
        let name: string;
        let index: number;
        let link: Link;
        if (typeof identifier === 'string') {
            name = identifier;
        } else if (typeof identifier === 'number') {
            index = identifier;
        } else {
            link = identifier;
        }
        this.items.forEach(element => {
            element.isActive = false;
            if ((name && element.name && element.name.toLowerCase() === name.toLowerCase()) ||
                (index && element.index === index) ||
                (link && element.index === link.index)) {
                this.current = element;
            }
        });

        if (!this.current) {
            this.current = this.items[0];
        }

        this.current.isActive = true;
        return this.current;
    }

    reset(): Link {
        this.current = this.items[0];
        return this.current;
    }
}
