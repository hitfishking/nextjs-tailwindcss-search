"use strict";
exports.__esModule = true;
exports.Hero = void 0;
var link_1 = require("next/link");
var Background_1 = require("../background/Background");
var Button_1 = require("../button/Button");
var HeroOneButton_1 = require("../hero/HeroOneButton");
var Section_1 = require("../layout/Section");
var NavbarTwoColumns_1 = require("../navigation/NavbarTwoColumns");
var Logo_1 = require("./Logo");
var Hero = function () { return (React.createElement(Background_1.Background, { color: "bg-gray-100" },
    React.createElement(Section_1.Section, { yPadding: "py-6" },
        React.createElement(NavbarTwoColumns_1.NavbarTwoColumns, { logo: React.createElement(Logo_1.Logo, { xl: true }) },
            React.createElement("li", null,
                React.createElement(link_1["default"], { href: "https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template" },
                    React.createElement("a", null, "GitHub"))),
            React.createElement("li", null,
                React.createElement(link_1["default"], { href: "/" },
                    React.createElement("a", null, "Sign in"))))),
    React.createElement(Section_1.Section, { yPadding: "pt-20 pb-32" },
        React.createElement(HeroOneButton_1.HeroOneButton, { title: React.createElement(React.Fragment, null,
                'The modern landing page for\n',
                React.createElement("span", { className: "text-primary-500" }, "React developers")), description: "The easiest way to build a React landing page in seconds.", button: React.createElement(link_1["default"], { href: "https://creativedesignsguru.com/category/nextjs/" },
                React.createElement("a", null,
                    React.createElement(Button_1.Button, { xl: true }, "Download Your Free Theme"))) })))); };
exports.Hero = Hero;
