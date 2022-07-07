"use strict";
exports.__esModule = true;
exports.NavbarTwoColumns = void 0;
var link_1 = require("next/link");
// 定义带子组件的组件，只需按普通组件正常定义即可，将参数props中传来的children(ReactNode类型)做为"子函数"调用即可。
// 带子组件的组件
var NavbarTwoColumns = function (props) { return (React.createElement("div", { className: "flex flex-wrap justify-between items-center" },
    React.createElement("div", null,
        React.createElement(link_1["default"], { href: "/" },
            React.createElement("a", null, props.logo))),
    React.createElement("nav", null,
        React.createElement("ul", { className: "navbar flex items-center font-medium text-xl text-gray-800" }, props.children)),
    React.createElement("style", { jsx: true }, "\n        .navbar :global(li:not(:first-child)) {\n          @apply mt-0;\n        }\n\n        .navbar :global(li:not(:last-child)) {\n          @apply mr-5;\n        }\n      "))); };
exports.NavbarTwoColumns = NavbarTwoColumns;
