"use strict";
exports.__esModule = true;
exports.Meta = void 0;
var next_seo_1 = require("next-seo");
var head_1 = require("next/head");
var router_1 = require("next/router");
var AppConfig_1 = require("../utils/AppConfig");
// 这个layout组件并没有children组件，只是用于书写html <head>标签子树。
var Meta = function (props) {
    var router = router_1.useRouter();
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("meta", { charSet: "UTF-8", key: "charset" }),
            React.createElement("meta", { name: "viewport", content: "width=device-width,initial-scale=1", key: "viewport" }),
            React.createElement("link", { rel: "apple-touch-icon", href: router.basePath + "/apple-touch-icon.png", key: "apple" }),
            React.createElement("link", { rel: "icon", type: "image/png", sizes: "32x32", href: router.basePath + "/favicon-32x32.png", key: "icon32" }),
            React.createElement("link", { rel: "icon", type: "image/png", sizes: "16x16", href: router.basePath + "/favicon-16x16.png", key: "icon16" }),
            React.createElement("link", { rel: "icon", href: router.basePath + "/favicon.ico", key: "favicon" })),
        React.createElement(next_seo_1.NextSeo, { title: props.title, description: props.description, canonical: props.canonical, openGraph: {
                title: props.title,
                description: props.description,
                url: props.canonical,
                locale: AppConfig_1.AppConfig.locale,
                site_name: AppConfig_1.AppConfig.site_name
            } })));
};
exports.Meta = Meta;
