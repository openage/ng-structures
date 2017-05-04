import { Link } from './link.model';

export class Nav {
    current: Link;
    constructor(public items: Link[]) {
        this.current = items[0];
        this.current.isActive = true;
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
