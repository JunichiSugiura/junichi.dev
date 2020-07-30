"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function Test(_a) {
    var name = _a.name;
    var _b = react_1.useState(0), count = _b[0], setCount = _b[1];
    return (<>
      <p>hello {name}</p>
      <button onClick={function () { return setCount(count + 1); }}>Count: {count}</button>
    </>);
}
exports.default = Test;
//# sourceMappingURL=test.js.map