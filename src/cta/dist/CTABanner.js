"use strict";
exports.__esModule = true;
exports.CTABanner = void 0;
var CTABanner = function (props) { return (React.createElement("div", { className: "text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md" },
    React.createElement("div", { className: "text-2xl font-semibold" },
        React.createElement("div", { className: "text-gray-900" }, props.title),
        React.createElement("div", { className: "text-primary-500" }, props.subtitle)),
    React.createElement("div", { className: "whitespace-no-wrap mt-3 sm:mt-0 sm:ml-2" }, props.button))); };
exports.CTABanner = CTABanner;
