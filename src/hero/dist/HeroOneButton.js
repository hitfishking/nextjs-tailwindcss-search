"use strict";
exports.__esModule = true;
exports.HeroOneButton = void 0;
var HeroOneButton = function (props) { return (React.createElement("header", { className: "text-center" },
    React.createElement("h1", { className: "text-5xl text-gray-900 font-bold whitespace-pre-line leading-hero" }, props.title),
    React.createElement("div", { className: "text-2xl mt-4 mb-16" }, props.description),
    props.button)); };
exports.HeroOneButton = HeroOneButton;
