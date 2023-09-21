"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var useBodyLock_1 = require("../hooks/useBodyLock");
var navbar_1 = require("../navbar/navbar");
var sidebar_1 = require("../sidebar/sidebar");
var layout_context_1 = require("./layout-context");
var Layout = function (_a) {
    var sidebarConfig = _a.sidebarConfig, adminNavHeader = _a.adminNavHeader, userDropdownConfig = _a.userDropdownConfig, children = _a.children;
    var _b = react_1.default.useState(false), sidebarOpen = _b[0], setSidebarOpen = _b[1];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var _c = (0, useBodyLock_1.useLockedBody)(false), _ = _c[0], setLocked = _c[1];
    var handleToggleSidebar = function () {
        setSidebarOpen(!sidebarOpen);
        setLocked(!sidebarOpen);
    };
    return ((0, jsx_runtime_1.jsx)(layout_context_1.SidebarContext.Provider, { value: {
            collapsed: sidebarOpen,
            setCollapsed: handleToggleSidebar,
        }, children: (0, jsx_runtime_1.jsxs)("section", { className: "flex", children: [(0, jsx_runtime_1.jsx)(sidebar_1.SidebarWrapper, { sidebarConfig: sidebarConfig, adminNavHeader: adminNavHeader }), (0, jsx_runtime_1.jsx)(navbar_1.NavbarWrapper, { userDropdownConfig: userDropdownConfig, children: children })] }) }));
};
exports.Layout = Layout;
