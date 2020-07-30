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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./idle-callback-polyfill");
var react_1 = __importStar(require("react"));
var react_2 = require("@mdx-js/react");
function hydrate(_a, components) {
    var source = _a.source, renderedOutput = _a.renderedOutput, _b = _a.scope, scope = _b === void 0 ? {} : _b;
    // our default result is the server-rendered output
    // we get this in front of users as quickly as possible
    var _c = react_1.useState(react_1.default.createElement('span', {
        dangerouslySetInnerHTML: {
            __html: renderedOutput,
        },
    })), result = _c[0], setResult = _c[1];
    // if we're server-side, we can return the raw output early
    if (typeof window === 'undefined')
        return result;
    // if we're on the client side, we hydrate the mdx content inside
    // requestIdleCallback, since we can be fairly confident that
    // markdown - embedded components are not a high priority to get
    // to interactive compared to...anything else on the page.
    //
    // once the hydration is complete, we update the state/memo value and
    // react re-renders for us
    react_1.useEffect(function () {
        var handle = window.requestIdleCallback(function () {
            // first we set up the scope which has to include the mdx custom
            // create element function as well as any components we're using
            var fullScope = __assign(__assign({ mdx: react_2.mdx }, components), scope);
            var keys = Object.keys(fullScope);
            var values = Object.values(fullScope);
            // now we eval the source code using a function constructor
            // in order for this to work we need to have React, the mdx createElement,
            // and all our components in scope for the function, which is the case here
            // we pass the names (via keys) in as the function's args, and execute the
            // function with the actual values.
            var hydratedFn = new (Function.bind.apply(Function, __spreadArrays([void 0, 'React'], keys, [source + "\n      return React.createElement(MDXContent, {});"])))().apply(void 0, __spreadArrays([react_1.default], values));
            // wrapping the content with MDXProvider will allow us to customize the standard
            // markdown components (such as "h1" or "a") with the "components" object
            var wrappedWithMdxProvider = react_1.default.createElement(react_2.MDXProvider, { components: components }, hydratedFn);
            // finally, set the output as the new result so that react will re-render for us
            // and cancel the idle callback since we don't need it anymore
            setResult(wrappedWithMdxProvider);
            window.cancelIdleCallback(handle);
        });
    }, [source]);
    return result;
}
exports.default = hydrate;
//# sourceMappingURL=hydrate.js.map