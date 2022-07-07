"use strict";
exports.__esModule = true;
exports.CenteredFooter = void 0;
var FooterCopyright_1 = require("./FooterCopyright");
var FooterIconList_1 = require("./FooterIconList");
var CenteredFooter = function (props) { return (React.createElement("div", { className: "text-center" },
    props.logo,
    React.createElement("nav", null,
        React.createElement("ul", { className: "navbar mt-5 flex flex-row justify-center font-medium text-xl text-gray-800" }, props.children)),
    React.createElement("div", { className: "mt-8 flex justify-center" },
        React.createElement(FooterIconList_1.FooterIconList, null, props.iconList)),
    React.createElement("div", { className: "mt-8 text-sm" },
        React.createElement(FooterCopyright_1.FooterCopyright, null)),
    React.createElement("style", { jsx: true }, "\n        .navbar :global(li) {\n          @apply mx-4;\n        }\n      "))); };
exports.CenteredFooter = CenteredFooter;
