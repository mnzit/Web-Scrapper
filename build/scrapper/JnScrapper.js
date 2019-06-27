"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var WebScrapper_1 = require("./WebScrapper");
var jsdom_1 = require("jsdom");
var Request = __importStar(require("request"));
var JnScrapper = /** @class */ (function (_super) {
    __extends(JnScrapper, _super);
    function JnScrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JnScrapper.prototype.scrap = function (result) {
        var index = 1;
        for (var i = 0; i < 10; i++) {
            Request.get('https://www.jobsnepal.com/active-jobs/page-' + i, function (err, data) {
                var jsdom = new jsdom_1.JSDOM(data.body);
                var doc = jsdom.window.document;
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
    };
    return JnScrapper;
}(WebScrapper_1.WebScrapper));
exports.JnScrapper = JnScrapper;
