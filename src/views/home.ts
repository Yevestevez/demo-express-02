/* eslint-disable @typescript-eslint/no-extraneous-class */

import { FooterView } from './footer/footer.ts';
import { HeaderView } from './header/header.ts';
import { MainView } from './main.ts';

export class HomeView {
    static render = () => {
        const template = /* HTML */ `
            <!doctype html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <title>Home</title>
                </head>
                <body>
                    Hola desde Home ${MainView.render('Pepe')}
                    ${HeaderView.render()} ${FooterView.render()}
                </body>
            </html>
        `;

        return template;
    };
}
