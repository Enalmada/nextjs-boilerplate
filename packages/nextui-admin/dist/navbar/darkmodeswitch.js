"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarkModeSwitch = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@nextui-org/react");
var next_themes_1 = require("next-themes");
var DarkModeSwitch = function () {
    var _a = (0, next_themes_1.useTheme)(), setTheme = _a.setTheme, theme = _a.theme;
    return ((0, jsx_runtime_1.jsx)(react_1.Switch, { isSelected: theme === 'dark', onValueChange: function (e) { return setTheme(e ? 'dark' : 'light'); } }));
};
exports.DarkModeSwitch = DarkModeSwitch;
