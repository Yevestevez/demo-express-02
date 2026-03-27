import { readFileSync } from 'node:fs';

export abstract class View {
    template!: string;
    css!: string;

    constructor(name: string) {
        this.css = this.css = readFileSync(`./src/views/${name}/${name}.css`, {
            encoding: 'utf-8',
        });
    }

    abstract setTemplate(): void;
}
