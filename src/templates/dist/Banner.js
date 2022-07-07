"use strict";
exports.__esModule = true;
exports.Banner = void 0;
var link_1 = require("next/link");
var Button_1 = require("../button/Button");
var CTABanner_1 = require("../cta/CTABanner");
var Section_1 = require("../layout/Section");
var Banner = function () { return (React.createElement(Section_1.Section, null,
    React.createElement(CTABanner_1.CTABanner, { title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", subtitle: "Start your Free Trial.", button: React.createElement(link_1["default"], { href: "https://creativedesignsguru.com/category/nextjs/" },
            React.createElement("a", null,
                React.createElement(Button_1.Button, null, "Get Started"))) }))); };
exports.Banner = Banner;
