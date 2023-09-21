"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableWrapper = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var TableWrapper_1 = require("./TableWrapper");
function useTableWrapper() {
    var _a = (0, react_1.useState)({
        column: 'id',
        direction: 'descending',
    }), sortDescriptor = _a[0], setSortDescriptor = _a[1];
    var _b = (0, react_1.useState)({
        page: 1,
        pageSize: 50,
    }), pageDescriptor = _b[0], setPageDescriptor = _b[1];
    var TableWrapperComponent = function (props) {
        return ((0, jsx_runtime_1.jsx)(TableWrapper_1.TableWrapper, __assign({}, props, { sortDescriptor: sortDescriptor, setSortDescriptor: setSortDescriptor, pageDescriptor: pageDescriptor, setPageDescriptor: setPageDescriptor })));
    };
    return {
        TableWrapperComponent: TableWrapperComponent,
        sortDescriptor: sortDescriptor,
        setSortDescriptor: setSortDescriptor,
        pageDescriptor: pageDescriptor,
        setPageDescriptor: setPageDescriptor,
    };
}
exports.useTableWrapper = useTableWrapper;
