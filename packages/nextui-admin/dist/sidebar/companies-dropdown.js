"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesDropdown = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var CompaniesDropdown = function (_a) {
    var adminNavHeader = _a.adminNavHeader;
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full ", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [adminNavHeader.logo, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "m-0 -mb-4 whitespace-nowrap text-xl font-medium text-default-900", children: adminNavHeader.name }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-default-500", children: adminNavHeader.name2 })] })] }) }));
};
exports.CompaniesDropdown = CompaniesDropdown;
