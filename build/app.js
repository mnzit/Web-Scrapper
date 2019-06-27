"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var JnScrapper_1 = require("./scrapper/JnScrapper");
var scrapper = new JnScrapper_1.JnScrapper();
var i = 1;
scrapper.scrap(function (result) {
    console.log(result, i++);
});
var jsdom_1 = require("jsdom");
var Request = __importStar(require("request"));
var element = [];
var count = 1;
var doctorCollection = {};
for (var i_1 = 1; i_1 < 10; i_1++) {
    Request.get('https://www.grandehospital.com/doctors/search?page=1', function (err, data) {
        var jsdom = new jsdom_1.JSDOM(data.body);
        var doc = jsdom.window.document;
        var elements = doc.querySelectorAll("#all-doctors-div .row div.col-md-3.col-sm-4.col-xs-6 .all-doctors-block.clearfix");
        elements.forEach(function (value, index) {
            var doctor = {};
            var link = value.querySelector('a');
            var department = value.querySelector('p');
            doctor['name'] = trimmer(link.title);
            doctor['profile_link'] = trimmer(link.href);
            doctor['department'] = trimmer(department.textContent.trim());
            doctorCollection['doctor-' + count++] = doctor;
        });
        console.log(doctorCollection);
    });
}
function trimmer(value) {
    return value.trim().replace(/(\r\n|\n|\r)/gm, "");
}
