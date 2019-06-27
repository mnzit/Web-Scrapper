import { WebScrapper } from "./scrapper/WebScrapper";
import { JnScrapper } from "./scrapper/JnScrapper";

let scrapper: WebScrapper = new JnScrapper();
let i = 1;
scrapper.scrap((result: any) => {
    console.log(result, i++);
});


import { JSDOM } from "jsdom";
import * as Request from "request";

let element = [];
let count = 1;

let doctorCollection = {};
for (let i = 1; i < 10; i++) {
    Request.get('https://www.grandehospital.com/doctors/search?page=1', (err: any, data: any) => {
        let jsdom: JSDOM = new JSDOM(data.body);
        let doc: Document = jsdom.window.document;
        let elements = doc.querySelectorAll("#all-doctors-div .row div.col-md-3.col-sm-4.col-xs-6 .all-doctors-block.clearfix");
        elements.forEach((value, index) => {
            let doctor = {};
            let link = value.querySelector('a');
            let department = value.querySelector('p');
            doctor['name'] = trimmer(link.title);
            doctor['profile_link'] = trimmer(link.href);
            doctor['department'] = trimmer(department.textContent.trim())
            doctorCollection['doctor-' + count++] = doctor;
        });
        console.log(doctorCollection);
    });
}

function trimmer(value: String): String {
    return value.trim().replace(/(\r\n|\n|\r)/gm, "");
}


