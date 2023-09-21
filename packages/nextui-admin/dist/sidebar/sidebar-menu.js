"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarMenu = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var SidebarMenu = function (_a) {
    var title = _a.title, children = _a.children;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-normal ", children: title }), children] }));
};
exports.SidebarMenu = SidebarMenu;
