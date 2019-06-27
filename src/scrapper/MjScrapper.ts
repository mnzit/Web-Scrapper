import { WebScrapper } from "./WebScrapper";
import { JSDOM } from "jsdom";
import * as Request from "request";

export class MjScrapper extends WebScrapper {
    scrap(result: any): void {
        let element = [];
        for (let i = 0; i < 87; i++) {
            Request.get('https://merojob.com/search/?page=' + i, (err: any, data: any) => {
                let jsdom: JSDOM = new JSDOM(data.body);
                let doc: Document = jsdom.window.document;
                let elements = doc.querySelectorAll("#search_job card.mt-3.hover-shadow");
                elements.forEach((value, index) => {
                    let link = value.querySelector('h1.text-primary.font-weight-bold.media-heading.h4 a');
                    console.log("https://merojob.com" + link.textContent);
                });
            });
        }
        result(element);

    }

}