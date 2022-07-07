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
exports.__esModule = true;
var document_1 = require("next/document");
var AppConfig_1 = require("../utils/AppConfig");
// Need to create a custom _document because i18n support is not compatible with `next export`.
var MyDocument = /** @class */ (function (_super) {
    __extends(MyDocument, _super);
    function MyDocument() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyDocument.prototype.render = function () {
        return (React.createElement(document_1.Html, { lang: AppConfig_1.AppConfig.locale },
            React.createElement(document_1.Head, null),
            React.createElement("body", null,
                React.createElement(document_1.Main, null),
                React.createElement(document_1.NextScript, null))));
    };
    return MyDocument;
}(document_1["default"]));
exports["default"] = MyDocument;
