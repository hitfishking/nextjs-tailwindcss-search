"use strict";
exports.__esModule = true;
exports.Section = void 0;
var Section = function (props) { return (React.createElement("div", { className: "max-w-screen-lg mx-auto px-3 " + (props.yPadding ? props.yPadding : 'py-16') },
    (props.title || props.description) && (React.createElement("div", { className: "mb-12 text-center" },
        props.title && (React.createElement("h2", { className: "text-4xl text-gray-900 font-bold" }, props.title)),
        props.description && (React.createElement("div", { className: "mt-4 text-xl md:px-20" }, props.description)))),
    props.children)); };
exports.Section = Section;
