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
exports.TableWrapper = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@nextui-org/react");
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
var TableWrapper = function (props) {
    var columns = props.columns, items = props.items, renderRow = props.renderRow, emptyContent = props.emptyContent, sortDescriptor = props.sortDescriptor, setSortDescriptor = props.setSortDescriptor, pagingDescriptor = props.pagingDescriptor, isLoading = props.isLoading, linkFunction = props.linkFunction;
    var _a = pagingDescriptor || {}, pageDescriptor = _a.pageDescriptor, setPageDescriptor = _a.setPageDescriptor, hasMore = _a.hasMore;
    var handleSortChange = function (sortDescriptor) {
        if (setSortDescriptor) {
            setSortDescriptor(sortDescriptor);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: " flex w-full flex-col gap-4", children: [(0, jsx_runtime_1.jsxs)(react_1.Table, { sortDescriptor: sortDescriptor, onSortChange: function (sortDescriptor) { return handleSortChange(sortDescriptor); }, "aria-label": "Table for model rows", selectionMode: "single", onRowAction: function (key) { return linkFunction(key); }, children: [(0, jsx_runtime_1.jsx)(react_1.TableHeader, { columns: columns, children: function (column) { return ((0, jsx_runtime_1.jsx)(react_1.TableColumn, { hideHeader: column.key === 'actions', align: column.align === 'center' ? 'center' : 'start', allowsSorting: column.allowsSorting, children: column.label }, column.key)); } }), (0, jsx_runtime_1.jsx)(react_1.TableBody, { items: items || [], emptyContent: items ? emptyContent : ' ', isLoading: isLoading, loadingContent: (0, jsx_runtime_1.jsx)(react_1.Spinner, { label: "Loading..." }), children: function (item) { return ((0, jsx_runtime_1.jsx)(react_1.TableRow, { children: function (columnKey) { return (
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            (0, jsx_runtime_1.jsx)(react_1.TableCell, { children: renderRow({ item: item, columnKey: columnKey }) })); } })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-3 mt-3 flex items-center justify-center gap-2", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { size: "sm", variant: "flat", color: "secondary", isDisabled: (pageDescriptor === null || pageDescriptor === void 0 ? void 0 : pageDescriptor.page) === 1, onPress: function () {
                            if (pageDescriptor && setPageDescriptor) {
                                var page = pageDescriptor.page > 1 ? pageDescriptor.page - 1 : pageDescriptor.page;
                                setPageDescriptor(__assign(__assign({}, pageDescriptor), { page: page }));
                            }
                        }, children: "Previous" }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center text-gray-400", children: pageDescriptor === null || pageDescriptor === void 0 ? void 0 : pageDescriptor.page }), (0, jsx_runtime_1.jsx)(react_1.Button, { size: "sm", variant: "flat", color: "secondary", isDisabled: hasMore === false, onPress: function () {
                            if (pageDescriptor && setPageDescriptor) {
                                var page = pageDescriptor.page + 1;
                                setPageDescriptor(__assign(__assign({}, pageDescriptor), { page: page }));
                            }
                        }, children: "Next" })] })] }));
};
exports.TableWrapper = TableWrapper;
