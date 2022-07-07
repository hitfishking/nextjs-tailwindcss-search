"use strict";
exports.__esModule = true;
exports.VerticalFeatureRow = void 0;
var classnames_1 = require("classnames");
var router_1 = require("next/router");
var VerticalFeatureRow = function (props) {
    var verticalFeatureClass = classnames_1["default"]('mt-20', 'flex', 'flex-wrap', 'items-center', {
        'flex-row-reverse': props.reverse
    });
    var router = router_1.useRouter();
    return (React.createElement("div", { className: verticalFeatureClass },
        React.createElement("div", { className: "w-full sm:w-1/2 text-center sm:px-6" },
            React.createElement("h3", { className: "text-3xl text-gray-900 font-semibold" }, props.title),
            React.createElement("div", { className: "mt-6 text-xl leading-9" }, props.description)),
        React.createElement("div", { className: "w-full sm:w-1/2 p-6" },
            React.createElement("img", { src: "" + router.basePath + props.image, alt: props.imageAlt }))));
};
exports.VerticalFeatureRow = VerticalFeatureRow;
