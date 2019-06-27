import { WebScrapper } from "./WebScrapper";
import { JSDOM } from "jsdom";
import * as Request from "request";

export class JnScrapper extends WebScrapper {
    scrap(result: any): void {
        let index: number = 1;
        for (let i = 0; i < 10; i++) {
            Request.get('https://www.jobsnepal.com/active-jobs/page-' + i, (err: any, data: any) => {
                let jsdom: JSDOM = new JSDOM(data.body);
                let doc: Document = jsdom.window.document;
                var table = doc.querySelectorAll(".job-listing table")[1];
                var tr = table.querySelectorAll("tr");
                var headings = table.querySelectorAll("tr th");
                var rowCollection = {};
                for (var i = 1; i < tr.length; i++) {
                    var td = tr[i].querySelectorAll('td');
                    var row = {};
                    var link = td[0].querySelector('a');
                    var id = link.id.split("-")[1];
                    row['id'] = id;
                    td.forEach(function (value, key) {
                        row[headings[key].textContent.trim().replace(/(\r\n|\n|\r|\s)/gm, "").toLowerCase()] = value.textContent.trim().replace(/(\r\n|\n|\r)/gm, "");
                    });
                    row['link'] = link.href;
                    rowCollection['job-' + index++] = row;
                }
                result(rowCollection);
            });
        }
    }

}