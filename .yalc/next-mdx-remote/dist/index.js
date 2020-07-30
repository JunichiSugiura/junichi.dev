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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
module.exports = function BabelPluginMdxBrowser() {
    return {
        visitor: {
            // remove all imports, we will add these to scope manually
            ImportDeclaration: function (path) {
                path.remove();
            },
            // the `makeShortcode` template is nice for error handling but we
            // don't need it here as we are manually injecting dependencies
            VariableDeclaration: function (path) {
                // this removes the `makeShortcode` function
                if (path.node.declarations[0].id.name === 'makeShortcode') {
                    path.remove();
                }
                // this removes any variable that is set using the `makeShortcode` function
                if (path.node &&
                    path.node.declarations &&
                    path.node.declarations[0] &&
                    path.node.declarations[0].init &&
                    path.node.declarations[0].init.callee &&
                    path.node.declarations[0].init.callee.name === 'makeShortcode') {
                    path.remove();
                }
            },
        },
    };
};
if (typeof window !== 'undefined') {
    window.requestIdleCallback =
        window.requestIdleCallback ||
            function (cb) {
                var start = Date.now();
                return setTimeout(function () {
                    cb({
                        didTimeout: false,
                        timeRemaining: function () {
                            return Math.max(0, 50 - (Date.now() - start));
                        },
                    });
                }, 1);
            };
    window.cancelIdleCallback =
        window.cancelIdleCallback ||
            function (id) {
                clearTimeout(id);
            };
}
System.register("types", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("hydrate", ["./idle-callback-polyfill", "react", "@mdx-js/react"], function (exports_2, context_2) {
    "use strict";
    var react_1, react_2;
    var __moduleName = context_2 && context_2.id;
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
                console.log(wrappedWithMdxProvider);
                // finally, set the the output as the new result so that react will re-render for us
                // and cancel the idle callback since we don't need it anymore
                setResult(wrappedWithMdxProvider);
                window.cancelIdleCallback(handle);
            });
        }, [source]);
        return result;
    }
    exports_2("default", hydrate);
    return {
        setters: [
            function (_1) {
            },
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (react_2_1) {
                react_2 = react_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("render-to-string", ["@mdx-js/mdx", "@mdx-js/react", "@babel/core", "@babel/preset-env", "@babel/preset-react", "react-dom/server", "react", "babel-plugin-mdx-browser"], function (exports_3, context_3) {
    "use strict";
    var mdx_1, react_3, core_1, preset_env_1, preset_react_1, server_1, react_4, babel_plugin_mdx_browser_1;
    var __moduleName = context_3 && context_3.id;
    function renderToString(source, components, options, scope) {
        if (scope === void 0) { scope = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var code, _a, now, later, component;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mdx_1.default(source, __assign(__assign({}, options), { skipExport: true }))];
                    case 1:
                        code = _b.sent();
                        return [4 /*yield*/, Promise.all([
                                // this one is for immediate evaluation so we can renderToString below
                                core_1.transformAsync(code, {
                                    presets: [preset_react_1.default, preset_env_1.default],
                                    configFile: false,
                                }),
                                // this one is for the browser to eval and rehydrate, later
                                core_1.transformAsync(code, {
                                    presets: [preset_react_1.default, preset_env_1.default],
                                    plugins: [babel_plugin_mdx_browser_1.default],
                                    configFile: false,
                                }),
                            ])];
                    case 2:
                        _a = _b.sent(), now = _a[0], later = _a[1];
                        if (!now || !later) {
                            throw new Error('Failed to trnasform mdx source code');
                        }
                        component = new (Function.bind.apply(Function, __spreadArrays([void 0, 'React',
                            'MDXProvider',
                            'mdx',
                            'components'], Object.keys(scope), [now.code + "\nreturn React.createElement(MDXProvider, { components },\n  React.createElement(MDXContent, {})\n);"])))().apply(void 0, __spreadArrays([react_4.default, react_3.MDXProvider, react_3.mdx, components], Object.values(scope)));
                        return [2 /*return*/, {
                                source: later.code,
                                // react: render to string
                                renderedOutput: server_1.renderToString(component),
                                scope: scope,
                            }];
                }
            });
        });
    }
    exports_3("default", renderToString);
    return {
        setters: [
            function (mdx_1_1) {
                mdx_1 = mdx_1_1;
            },
            function (react_3_1) {
                react_3 = react_3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (preset_env_1_1) {
                preset_env_1 = preset_env_1_1;
            },
            function (preset_react_1_1) {
                preset_react_1 = preset_react_1_1;
            },
            function (server_1_1) {
                server_1 = server_1_1;
            },
            function (react_4_1) {
                react_4 = react_4_1;
            },
            function (babel_plugin_mdx_browser_1_1) {
                babel_plugin_mdx_browser_1 = babel_plugin_mdx_browser_1_1;
            }
        ],
        execute: function () {
        }
    };
});
var spawn = require('cross-spawn');
var path = require('path');
var fs = require('fs');
var puppeteer = require('puppeteer');
var handler = require('serve-handler');
var http = require('http');
var rmfr = require('rmfr');
var renderToString = require('../render-to-string');
var React = require('react');
var paragraphCustomAlerts = require('@hashicorp/remark-plugins').paragraphCustomAlerts;
jest.setTimeout(30000);
test('rehydrates correctly in browser', function () {
    buildFixture('basic');
    var result = readOutputFile('basic', 'index');
    // server renders correctly
    expect(result).toMatch('<h1>foo</h1><span><h1>Headline</h1><p>hello <!-- -->jeff</p><button>Count: <!-- -->0</button><p>Some <strong class="custom-strong">markdown</strong> content</p><div class="alert alert-warning g-type-body" role="alert"><p>Alert</p></div></span>');
    // hydrates correctly
    var browser, server;
    return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        var page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    page.on('console', function (msg) { return console.log(msg.text()); });
                    return [4 /*yield*/, serveStatic('basic')];
                case 3:
                    server = _a.sent();
                    return [4 /*yield*/, page.exposeFunction('__NEXT_HYDRATED_CB', function () { return __awaiter(void 0, void 0, void 0, function () {
                            var buttonCount;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    // click the button, flakes with one click for some reason
                                    return [4 /*yield*/, page.click('button')];
                                    case 1:
                                        // click the button, flakes with one click for some reason
                                        _a.sent();
                                        return [4 /*yield*/, page.click('button')
                                            // wait for react to render
                                        ];
                                    case 2:
                                        _a.sent();
                                        // wait for react to render
                                        return [4 /*yield*/, page.waitFor(function () {
                                                return document.querySelector('button').innerText !== 'Count: 0';
                                            })
                                            // pull the text for a test confirm
                                        ];
                                    case 3:
                                        // wait for react to render
                                        _a.sent();
                                        buttonCount = page.$eval('button', function (el) { return el.innerText; });
                                        resolve(buttonCount);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.goto('http://localhost:1235', { waitUntil: 'domcontentloaded' })];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }).then(function (buttonText) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect(buttonText).not.toEqual('Count: 0');
                    // close the browser and dev server
                    return [4 /*yield*/, browser.close()];
                case 1:
                    // close the browser and dev server
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) { return server.close(resolve); })];
            }
        });
    }); });
});
test('renderToString minimal', function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, renderToString('foo **bar**')];
            case 1:
                result = _a.sent();
                expect(result.renderedOutput).toEqual('<p>foo <strong>bar</strong></p>');
                return [2 /*return*/];
        }
    });
}); });
test('renderToString with component', function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, renderToString('foo <Test />', {
                    Test: function () { return React.createElement('span', null, 'hello world'); },
                })];
            case 1:
                result = _a.sent();
                expect(result.renderedOutput).toEqual('<p>foo <span>hello world</span></p>');
                return [2 /*return*/];
        }
    });
}); });
test('renderToString with options', function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, renderToString('~> hello', null, {
                    remarkPlugins: [paragraphCustomAlerts],
                })];
            case 1:
                result = _a.sent();
                expect(result.renderedOutput).toEqual('<div class="alert alert-warning g-type-body" role="alert"><p>hello</p></div>');
                return [2 /*return*/];
        }
    });
}); });
test('renderToString with scope', function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, renderToString('<Test name={bar} />', { Test: function (_a) {
                        var name = _a.name;
                        return React.createElement('p', null, name);
                    } }, null, {
                    bar: 'test',
                })];
            case 1:
                result = _a.sent();
                expect(result.renderedOutput).toEqual('<p>test</p>');
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, rmfr(path.join(__dirname, 'fixtures/basic/out'))];
            case 1:
                _a.sent();
                return [4 /*yield*/, rmfr(path.join(__dirname, 'fixtures/basic/.next'))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//
// utility functions
//
function buildFixture(fixture) {
    spawn.sync('next', ['build'], {
        stdio: 'inherit',
        cwd: path.join(__dirname, 'fixtures', fixture),
        env: __assign(__assign({}, process.env), { NODE_ENV: undefined, __NEXT_TEST_MODE: true }),
    });
    spawn.sync('next', ['export'], {
        stdio: 'inherit',
        cwd: path.join(__dirname, 'fixtures', fixture),
        env: __assign(__assign({}, process.env), { NODE_ENV: undefined, __NEXT_TEST_MODE: true }),
    });
}
function readOutputFile(fixture, name) {
    return fs.readFileSync(path.join(__dirname, 'fixtures', fixture, 'out', name + ".html"), 'utf8');
}
function serveStatic(fixture) {
    return new Promise(function (resolve) {
        var server = http.createServer(function (req, res) {
            return handler(req, res, {
                public: path.join(__dirname, 'fixtures', fixture, 'out'),
            });
        });
        server.listen(1235, function () { return resolve(server); });
    });
}
System.register("__tests__/fixtures/basic/components/test", ["react"], function (exports_4, context_4) {
    "use strict";
    var react_5;
    var __moduleName = context_4 && context_4.id;
    function Test(_a) {
        var name = _a.name;
        var _b = react_5.useState(0), count = _b[0], setCount = _b[1];
        return (<>
      <p>hello {name}</p>
      <button onClick={function () { return setCount(count + 1); }}>Count: {count}</button>
    </>);
    }
    exports_4("default", Test);
    return {
        setters: [
            function (react_5_1) {
                react_5 = react_5_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("__tests__/fixtures/basic/pages/index", ["fs", "path", "gray-matter", "render-to-string", "hydrate", "../components/test", "@hashicorp/remark-plugins"], function (exports_5, context_5) {
    "use strict";
    var fs_1, path_1, gray_matter_1, render_to_string_1, hydrate_1, test_1, remark_plugins_1, MDX_COMPONENTS;
    var __moduleName = context_5 && context_5.id;
    function TestPage(_a) {
        var data = _a.data, mdxSource = _a.mdxSource;
        return (<>
      <h1>{data.title}</h1>
      {hydrate_1.default(mdxSource, MDX_COMPONENTS)}
    </>);
    }
    exports_5("default", TestPage);
    function getStaticProps() {
        return __awaiter(this, void 0, void 0, function () {
            var fixturePath, _a, data, content, mdxSource;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fixturePath = path_1.default.join(process.cwd(), 'mdx/test.mdx');
                        _a = gray_matter_1.default(fs_1.default.readFileSync(fixturePath, 'utf8')), data = _a.data, content = _a.content;
                        return [4 /*yield*/, render_to_string_1.default(content, MDX_COMPONENTS, {
                                remarkPlugins: [remark_plugins_1.paragraphCustomAlerts],
                            }, data)];
                    case 1:
                        mdxSource = _b.sent();
                        return [2 /*return*/, { props: { mdxSource: mdxSource, data: data } }];
                }
            });
        });
    }
    exports_5("getStaticProps", getStaticProps);
    return {
        setters: [
            function (fs_1_1) {
                fs_1 = fs_1_1;
            },
            function (path_1_1) {
                path_1 = path_1_1;
            },
            function (gray_matter_1_1) {
                gray_matter_1 = gray_matter_1_1;
            },
            function (render_to_string_1_1) {
                render_to_string_1 = render_to_string_1_1;
            },
            function (hydrate_1_1) {
                hydrate_1 = hydrate_1_1;
            },
            function (test_1_1) {
                test_1 = test_1_1;
            },
            function (remark_plugins_1_1) {
                remark_plugins_1 = remark_plugins_1_1;
            }
        ],
        execute: function () {
            MDX_COMPONENTS = {
                Test: test_1.default,
                strong: function (props) { return <strong className="custom-strong" {...props}/>; },
            };
        }
    };
});
//# sourceMappingURL=index.js.map