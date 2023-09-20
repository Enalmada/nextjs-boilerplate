"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarWrapper = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@nextui-org/react");
var burguer_button_1 = require("./burguer-button");
var user_dropdown_1 = require("./user-dropdown");
var NavbarWrapper = function (_a) {
    var userDropdownConfig = _a.userDropdownConfig, children = _a.children;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden", children: [(0, jsx_runtime_1.jsxs)(react_1.Navbar, { isBordered: true, className: "w-full", classNames: {
                    wrapper: 'w-full max-w-full',
                }, children: [(0, jsx_runtime_1.jsx)(react_1.NavbarContent, { className: "md:hidden", children: (0, jsx_runtime_1.jsx)(burguer_button_1.BurguerButton, {}) }), (0, jsx_runtime_1.jsx)(react_1.NavbarContent, { className: "w-full max-md:hidden" }), (0, jsx_runtime_1.jsx)(react_1.NavbarContent, { justify: "end", className: "w-fit data-[justify=end]:flex-grow-0", children: (0, jsx_runtime_1.jsx)(react_1.NavbarContent, { children: (0, jsx_runtime_1.jsx)(user_dropdown_1.UserDropdown, { userDropdownConfig: userDropdownConfig }) }) })] }), children] }));
};
exports.NavbarWrapper = NavbarWrapper;
