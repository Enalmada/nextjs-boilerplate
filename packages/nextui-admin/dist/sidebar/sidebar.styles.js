"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = exports.Footer = exports.Body = exports.Header = exports.Overlay = exports.SidebarWrapper = void 0;
var react_1 = require("@nextui-org/react");
exports.SidebarWrapper = (0, react_1.tv)({
    base: 'bg-background transition-transform h-full fixed -translate-x-full w-64 shrink-0 z-[202] overflow-y-auto border-r border-divider flex-col py-6 px-3 md:ml-0 md:flex md:static md:h-screen md:translate-x-0 ',
    variants: {
        collapsed: {
            true: 'translate-x-0 ml-0 [display:inherit]',
        },
    },
    // ""
    //   "@md": {
    //     marginLeft: "0",
    //     display: "flex",
    //     position: "static",
    //     height: "100vh",
    //     transform: "translateX(0)",
    //   },
    //   variants: {
    //     collapsed: {
    //       true: {
    //         display: "inherit",
    //         marginLeft: "0 ",
    //         transform: "translateX(0)",
    //       },
    //     },
    //   },
});
exports.Overlay = (0, react_1.tv)({
    base: 'bg-[rgb(15_23_42/0.3)] fixed inset-0 z-[201] opacity-80 transition-opacity md:hidden md:z-auto md:opacity-100',
});
exports.Header = (0, react_1.tv)({
    base: 'flex gap-8 items-center px-6',
});
exports.Body = (0, react_1.tv)({
    base: 'flex flex-col gap-6 mt-9 px-2',
});
exports.Footer = (0, react_1.tv)({
    base: 'flex items-center justify-center gap-6 pt-16 pb-8 px-8 md:pt-10 md:pb-0',
});
exports.Sidebar = Object.assign(exports.SidebarWrapper, {
    Header: exports.Header,
    Body: exports.Body,
    Overlay: exports.Overlay,
    Footer: exports.Footer,
});
