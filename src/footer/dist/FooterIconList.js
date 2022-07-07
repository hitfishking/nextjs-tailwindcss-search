"use strict";
exports.__esModule = true;
exports.FooterIconList = void 0;
var FooterIconList = function (props) { return (React.createElement("div", { className: "footer-icon-list flex flex-wrap" },
    props.children,
    React.createElement("style", { jsx: true }, "\n        .footer-icon-list :global(a:not(:last-child)) {\n          @apply mr-3;\n        }\n\n        .footer-icon-list :global(a) {\n          @apply text-gray-500;\n        }\n\n        .footer-icon-list :global(a:hover) {\n          @apply text-gray-700;\n        }\n\n        .footer-icon-list :global(svg) {\n          @apply fill-current w-5 h-5;\n        }\n      "))); };
exports.FooterIconList = FooterIconList;
