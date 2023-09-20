"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLockedBody = void 0;
var react_1 = require("react");
var useIsomorphicLayoutEffect_1 = require("./useIsomorphicLayoutEffect");
var useLockedBody = function (initialLocked) {
    if (initialLocked === void 0) { initialLocked = false; }
    var _a = (0, react_1.useState)(initialLocked), locked = _a[0], setLocked = _a[1];
    // Do the side effect before render
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(function () {
        if (!locked) {
            return;
        }
        // Save initial body style
        var originalOverflow = document.body.style.overflow;
        var originalPaddingRight = document.body.style.paddingRight;
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        // Get the scrollBar width
        var root = document.getElementById('___gatsby'); // or root
        var scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;
        // Avoid width reflow
        if (scrollBarWidth) {
            document.body.style.paddingRight = "".concat(scrollBarWidth, "px");
        }
        return function () {
            document.body.style.overflow = originalOverflow;
            if (scrollBarWidth) {
                document.body.style.paddingRight = originalPaddingRight;
            }
        };
    }, [locked]);
    // Update state if initialValue changes
    (0, react_1.useEffect)(function () {
        if (locked !== initialLocked) {
            setLocked(initialLocked);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialLocked]);
    return [locked, setLocked];
};
exports.useLockedBody = useLockedBody;
