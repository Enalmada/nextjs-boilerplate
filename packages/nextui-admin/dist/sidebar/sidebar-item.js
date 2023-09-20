"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarItem = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var link_1 = __importDefault(require("next/link"));
var clsx_1 = __importDefault(require("clsx"));
var layout_context_1 = require("../layout/layout-context");
var SidebarItem = function (_a) {
    var icon = _a.icon, title = _a.title, isActive = _a.isActive, _b = _a.href, href = _b === void 0 ? '' : _b;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var _c = (0, layout_context_1.useSidebarContext)(), collapsed = _c.collapsed, setCollapsed = _c.setCollapsed;
    var handleClick = function () {
        if (window.innerWidth < 768) {
            setCollapsed();
        }
    };
    return ((0, jsx_runtime_1.jsx)(link_1.default, { href: href, className: "max-w-full text-default-900 active:bg-none", children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)(isActive ? 'bg-primary-100 [&_svg_path]:fill-primary-500' : 'hover:bg-default-100', 'flex h-full min-h-[44px] w-full cursor-pointer items-center gap-2 rounded-xl px-3.5 transition-all duration-150 active:scale-[0.98]'), onClick: handleClick, children: [icon, (0, jsx_runtime_1.jsx)("span", { className: "text-default-900", children: title })] }) }));
};
exports.SidebarItem = SidebarItem;
