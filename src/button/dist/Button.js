"use strict";
exports.__esModule = true;
exports.Button = void 0;
var classnames_1 = require("classnames");
var Button = function (props) {
    var btnClass = classnames_1["default"]({
        btn: true,
        'btn-xl': props.xl,
        'btn-base': !props.xl,
        'btn-primary': true
    });
    // 先附加常规css规则，然后再根据这些css规则，用@apply更多的tailwind规则
    return (React.createElement("div", { className: btnClass },
        props.children,
        React.createElement("style", { jsx: true }, "\n          .btn {\n            @apply inline-block rounded-md text-center;\n          }\n\n          .btn-base {\n            @apply text-lg font-semibold py-2 px-4;\n          }\n\n          .btn-xl {\n            @apply font-extrabold text-xl py-4 px-6;\n          }\n\n          .btn-primary {\n            @apply text-white bg-primary-500;\n          }\n\n          .btn-primary:hover {\n            @apply bg-primary-600;\n          }\n        ")));
};
exports.Button = Button;
