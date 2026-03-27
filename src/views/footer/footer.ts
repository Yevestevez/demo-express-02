import { View } from '../types/view.ts';
import { socials } from './socials.ts';

export class FooterView extends View {
    static viewName = 'footer';

    static render() {
        return new FooterView('footer').template;
    }

    address = '&copy; 2026 CFD Alcobendas - Curso IF2001';
    list: string;

    constructor(address?: string) {
        super(FooterView.viewName);
        this.address = address ?? this.address;
        this.list = socials
            .map(
                (item) => `
                    <li><a href="${item.url}" target="_blank">
                    ${item.icon}</a></li>`,
            )
            .join('');

        this.setTemplate();
        console.log('loading footer');
    }

    setTemplate(): void {
        this.template = /*html*/ `
            <style>${this.css}</style>
            <footer class="footer">
                <ul>${this.list}</ul>
                <address>${this.address}</address>
                <p>${Math.random()}</p>
            </footer>
         `;
    }
}
