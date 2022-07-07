"use strict";
exports.__esModule = true;
exports.VerticalFeatures = void 0;
var VerticalFeatureRow_1 = require("../feature/VerticalFeatureRow");
var Section_1 = require("../layout/Section");
var VerticalFeatures = function () { return (React.createElement(Section_1.Section, { title: "Your title here", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada nisi tellus, non imperdiet nisi tempor at." },
    React.createElement(VerticalFeatureRow_1.VerticalFeatureRow, { title: "Your title here", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: "/assets/images/feature.svg", imageAlt: "First feature alt text" }),
    React.createElement(VerticalFeatureRow_1.VerticalFeatureRow, { title: "Your title here", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: "/assets/images/feature2.svg", imageAlt: "Second feature alt text", reverse: true }),
    React.createElement(VerticalFeatureRow_1.VerticalFeatureRow, { title: "Your title here", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: "/assets/images/feature3.svg", imageAlt: "Third feature alt text" }))); };
exports.VerticalFeatures = VerticalFeatures;
