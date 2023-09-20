"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDropdown = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var image_1 = __importDefault(require("next/image"));
var navigation_1 = require("next/navigation");
var react_1 = require("@nextui-org/react");
var darkmodeswitch_1 = require("./darkmodeswitch");
var UserDropdown = function (_a) {
    var userDropdownConfig = _a.userDropdownConfig;
    var router = (0, navigation_1.useRouter)();
    var user = userDropdownConfig.user, items = userDropdownConfig.items;
    var dropdownItems = items.map(function (item) {
        if (item.isSpecial) {
            return ((0, jsx_runtime_1.jsxs)(react_1.DropdownItem, { className: "h-14 gap-2", textValue: "Signed in as: ".concat(user.email), children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold", children: "Signed in as" }), (0, jsx_runtime_1.jsx)("p", { className: "font-semibold", children: user.email })] }, item.key));
        }
        return ((0, jsx_runtime_1.jsx)(react_1.DropdownItem, { color: item.color, children: item.label }, item.key));
    });
    // Add the DarkModeSwitch as another DropdownItem
    dropdownItems.push((0, jsx_runtime_1.jsx)(react_1.DropdownItem, { children: (0, jsx_runtime_1.jsx)(darkmodeswitch_1.DarkModeSwitch, {}) }, "switch"));
    return ((0, jsx_runtime_1.jsxs)(react_1.Dropdown, { children: [(0, jsx_runtime_1.jsx)(react_1.NavbarItem, { children: (0, jsx_runtime_1.jsx)(react_1.DropdownTrigger, { children: (0, jsx_runtime_1.jsx)(react_1.Avatar, { id: "avatar", isBordered: true, className: "transition-transform", color: "secondary", name: user.displayName || user.email || undefined, size: "sm", showFallback: true, fallback: (0, jsx_runtime_1.jsxs)("span", { className: "inline-block h-[2.375rem] w-[2.375rem] overflow-hidden rounded-full bg-gray-100", children: [user.photoURL && ((0, jsx_runtime_1.jsx)(image_1.default, { alt: "", height: "100", width: "100", unoptimized: true, src: user.photoURL })), !user.photoURL && ((0, jsx_runtime_1.jsxs)("svg", { className: "h-full w-full text-gray-300", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("rect", { x: "0.62854", y: "0.359985", width: "15", height: "15", rx: "7.5", fill: "white" }), (0, jsx_runtime_1.jsx)("path", { d: "M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z", fill: "currentColor" }), (0, jsx_runtime_1.jsx)("path", { d: "M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z", fill: "currentColor" })] }))] }) }) }) }), (0, jsx_runtime_1.jsx)(react_1.DropdownMenu, { "aria-label": "User menu actions", onAction: function (key) {
                    var _a;
                    router.push(((_a = items.find(function (item) { return item.key === key; })) === null || _a === void 0 ? void 0 : _a.href) || '/');
                }, children: dropdownItems })] }));
};
exports.UserDropdown = UserDropdown;
