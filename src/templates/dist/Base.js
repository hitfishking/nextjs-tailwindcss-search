"use strict";
exports.__esModule = true;
exports.Base = void 0;
var Meta_1 = require("../layout/Meta");
var AppConfig_1 = require("../utils/AppConfig");
var Banner_1 = require("./Banner");
var Footer_1 = require("./Footer");
var Hero_1 = require("./Hero");
var VerticalFeatures_1 = require("./VerticalFeatures");
// Base template的功能是把一个layout组成组件顺序组合在一起。
var Base = function () { return (React.createElement("div", { className: "antialiased text-gray-600" },
    React.createElement(Meta_1.Meta, { title: AppConfig_1.AppConfig.title, description: AppConfig_1.AppConfig.description }),
    React.createElement(Hero_1.Hero, null),
    React.createElement(VerticalFeatures_1.VerticalFeatures, null),
    React.createElement(Banner_1.Banner, null),
    React.createElement(Footer_1.Footer, null))); };
exports.Base = Base;
