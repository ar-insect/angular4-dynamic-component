"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_chrome_debug_core_1 = require("vscode-chrome-debug-core");
const path = require("path");
const EDGE_ADAPTER_PATH = {
    OSX: '',
    WINx64: path.resolve(__dirname, '../../node_modules/edge-diagnostics-adapter/dist/x64/EdgeDiagnosticsAdapter.exe'),
    WINx86: path.resolve(__dirname, '../../node_modules/edge-diagnostics-adapter/dist/x86/EdgeDiagnosticsAdapter.exe'),
    LINUX: ''
};
function getAdapterPath() {
    const platform = vscode_chrome_debug_core_1.utils.getPlatform();
    // There is no good way to get the system arch so detecting the program files dir
    let arch;
    if (process.env.hasOwnProperty('ProgramFiles(x86)')) {
        arch = 'x64';
    }
    else {
        arch = 'x86';
    }
    if (platform === 0 /* Windows */) {
        if (arch === 'x64') {
            return EDGE_ADAPTER_PATH.WINx64;
        }
        else if (arch === 'x86') {
            return EDGE_ADAPTER_PATH.WINx86;
        }
    }
    return null;
}
exports.getAdapterPath = getAdapterPath;

//# sourceMappingURL=utilities.js.map
