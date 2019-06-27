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
var MjScrapper = /** @class */ (function (_super) {
    __extends(MjScrapper, _super);
    function MjScrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MjScrapper.prototype.scrap = function (result) {
        var element = [];
        for (var i = 0; i < 87; i++) {
            Request.get('https://merojob.com/search/?page=' + i, function (err, data) {
                var jsdom = new jsdom_1.JSDOM(data.body);
                var doc = jsdom.window.document;
                var elements = doc.querySelectorAll("#search_job card.mt-3.hover-shadow");
                elements.forEach(function (value, index) {
                    var link = value.querySelector('h1.text-primary.font-weight-bold.media-heading.h4 a');
                    console.log("https://merojob.com" + link.textContent);
                });
            });
        }
        result(element);
    };
    return MjScrapper;
}(WebScrapper_1.WebScrapper));
exports.MjScrapper = MjScrapper;
