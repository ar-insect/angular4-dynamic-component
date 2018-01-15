"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_chrome_debug_core_1 = require("vscode-chrome-debug-core");
const edgeDebugAdapter_1 = require("./edgeDebugAdapter");
class EdgeDebugSession extends vscode_chrome_debug_core_1.ChromeDebugSession {
    constructor(targetLinesStartAt1, isServer = false) {
        let version = "edge." + require('../../package.json').version;
        super(targetLinesStartAt1, isServer, { adapter: edgeDebugAdapter_1.EdgeDebugAdapter, extensionName: "vscode-edge-debug" });
    }
}
exports.EdgeDebugSession = EdgeDebugSession;

//# sourceMappingURL=edgeDebugSession.js.map
