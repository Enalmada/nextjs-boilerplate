"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarWrapper = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var navigation_1 = require("next/navigation");
var layout_context_1 = require("../layout/layout-context");
var companies_dropdown_1 = require("./companies-dropdown");
var sidebar_item_1 = require("./sidebar-item");
var sidebar_menu_1 = require("./sidebar-menu");
var sidebar_styles_1 = require("./sidebar.styles");
var ConditionalWrapper = function (_a) {
    var condition = _a.condition, wrapper = _a.wrapper, children = _a.children;
    return condition ? wrapper(children) : children;
};
var SidebarWrapper = function (_a) {
    var sidebarConfig = _a.sidebarConfig, adminNavHeader = _a.adminNavHeader;
    var _b = (0, layout_context_1.useSidebarContext)(), collapsed = _b.collapsed, setCollapsed = _b.setCollapsed;
    var pathname = (0, navigation_1.usePathname)();
    return ((0, jsx_runtime_1.jsxs)("aside", { className: "sticky top-0 z-[202] h-screen", children: [collapsed ? (0, jsx_runtime_1.jsx)("div", { className: sidebar_styles_1.Sidebar.Overlay(), onClick: setCollapsed }) : null, (0, jsx_runtime_1.jsxs)("div", { className: (0, sidebar_styles_1.Sidebar)({
                    collapsed: collapsed,
                }), children: [(0, jsx_runtime_1.jsx)("div", { className: sidebar_styles_1.Sidebar.Header(), children: (0, jsx_runtime_1.jsx)(companies_dropdown_1.CompaniesDropdown, { adminNavHeader: adminNavHeader }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex h-full flex-col justify-between", children: (0, jsx_runtime_1.jsx)("div", { className: sidebar_styles_1.Sidebar.Body(), children: sidebarConfig.map(function (section, sectionIndex) { return ((0, jsx_runtime_1.jsx)(ConditionalWrapper, { condition: !!section.title, wrapper: function (children) { return ((0, jsx_runtime_1.jsx)(sidebar_menu_1.SidebarMenu, { title: section.title || '', children: children })); }, children: section.items.map(function (item, itemIndex) { return ((0, jsx_runtime_1.jsx)(sidebar_item_1.SidebarItem, { isActive: pathname === item.href, title: item.title, icon: item.icon, href: item.href }, "item-".concat(itemIndex))); }) }, "section-".concat(sectionIndex))); }) }) })] })] }));
};
exports.SidebarWrapper = SidebarWrapper;
