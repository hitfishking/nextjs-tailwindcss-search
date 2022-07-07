"use strict";
exports.__esModule = true;
exports.FooterCopyright = void 0;
var AppConfig_1 = require("../utils/AppConfig");
var FooterCopyright = function () { return (React.createElement("div", { className: "footer-copyright" },
    "\u00A9 Copyright ",
    new Date().getFullYear(),
    " ",
    AppConfig_1.AppConfig.title,
    ". Powered with",
    ' ',
    React.createElement("span", { role: "img", "aria-label": "Love" }, "\u2665"),
    ' ',
    "by ",
    React.createElement("a", { href: "https://creativedesignsguru.com" }, "CreativeDesignsGuru"),
    React.createElement("style", { jsx: true }, "\n        .footer-copyright :global(a) {\n          @apply text-primary-500;\n        }\n\n        .footer-copyright :global(a:hover) {\n          @apply underline;\n        }\n      "))); };
exports.FooterCopyright = FooterCopyright;
