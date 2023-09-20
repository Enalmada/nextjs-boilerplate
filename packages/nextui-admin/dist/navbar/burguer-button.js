"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BurguerButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var layout_context_1 = require("../layout/layout-context");
var navbar_styles_1 = require("./navbar.styles");
var BurguerButton = function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var _a = (0, layout_context_1.useSidebarContext)(), collapsed = _a.collapsed, setCollapsed = _a.setCollapsed;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, navbar_styles_1.StyledBurgerButton)(), 
        // open={collapsed}
        onClick: setCollapsed, children: [(0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)("div", {})] }));
};
exports.BurguerButton = BurguerButton;
