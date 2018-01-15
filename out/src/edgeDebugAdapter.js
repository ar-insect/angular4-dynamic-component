"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_chrome_debug_core_1 = require("vscode-chrome-debug-core");
const edgeDebugSession_1 = require("./edgeDebugSession");
const edgeUtils = require("./utilities");
const childProcess = require("child_process");
const path = require("path");
const fs = require("fs");
class EdgeDebugAdapter extends vscode_chrome_debug_core_1.ChromeDebugAdapter {
    //private _launchAdapter(url?:string, port?:number, adapterExePath?:string ):Promise<any> {
    _launchAdapter(args) {
        let adapterExePath = args.runtimeExecutable;
        if (!adapterExePath) {
            adapterExePath = edgeUtils.getAdapterPath();
        }
        vscode_chrome_debug_core_1.logger.log(`Launching adapter at: '${adapterExePath}', ${JSON.stringify(arguments)})`);
        // Check exists
        if (!fs.existsSync(adapterExePath)) {
            if (vscode_chrome_debug_core_1.utils.getPlatform() == 0 /* Windows */) {
                return vscode_chrome_debug_core_1.utils.errP(`No Edge Diagnostics Adapter was found. Install the Edge Diagnostics Adapter (https://github.com/Microsoft/edge-diagnostics-adapter) and specify a valid 'adapterExecutable' path`);
            }
            else {
                return vscode_chrome_debug_core_1.utils.errP(`Edge debugging is only supported on Windows 10.`);
            }
        }
        let adapterArgs = [];
        if (!args.port) {
            args.port = 9222;
        }
        // We always tell the adpater what port to listen on so there's no shared info between the adapter and the extension
        let portCmdArg = '--port=' + args.port;
        adapterArgs.push(portCmdArg);
        if (args.url) {
            let launchUrlArg = '--launch=' + args.url;
            adapterArgs.push(launchUrlArg);
        }
        // The adapter might already be running if so don't spawn a new one
        return vscode_chrome_debug_core_1.utils.getURL(`http://127.0.0.1:${args.port}/json/version`).then((jsonResponse) => {
            try {
                const responseArray = JSON.parse(jsonResponse);
                let targetBrowser = responseArray.Browser;
                targetBrowser = targetBrowser.toLocaleLowerCase();
                if (targetBrowser.indexOf('edge') > -1) {
                    return Promise.resolve(args);
                }
                return vscode_chrome_debug_core_1.utils.errP(`Sever for ${targetBrowser} already listening on :9222`);
            }
            catch (ex) {
                return vscode_chrome_debug_core_1.utils.errP(`Sever already listening on :9222 returned ${ex}`);
            }
        }, error => {
            vscode_chrome_debug_core_1.logger.log(`spawn('${adapterExePath}', ${JSON.stringify(adapterArgs)})`);
            this._adapterProc = childProcess.execFile(adapterExePath, adapterArgs, (err) => {
                vscode_chrome_debug_core_1.logger.error(`Adapter error: ${err}`);
                this.terminateSession(err);
            }, (data) => {
                vscode_chrome_debug_core_1.logger.log(`Adapter output: ${data}`);
            });
            return Promise.resolve(args);
        });
    }
    constructor(opts, debugSession) {
        if (debugSession == null) {
            debugSession = new edgeDebugSession_1.EdgeDebugSession(false);
        }
        super(opts, debugSession);
    }
    launch(args) {
        vscode_chrome_debug_core_1.logger.log(`Launching Edge`);
        let launchUrl;
        if (args.file) {
            launchUrl = 'file:///' + path.resolve(args.cwd, args.file);
        }
        else if (args.url) {
            launchUrl = args.url;
        }
        return this._launchAdapter(args).then((attachArgs) => {
            return super.attach(attachArgs);
        });
    }
    attach(args) {
        vscode_chrome_debug_core_1.logger.log(`Attaching to Edge`);
        return this._launchAdapter(args).then((attachArgs) => {
            return super.attach(attachArgs);
        });
    }
    clearEverything() {
        if (this._adapterProc) {
            this._adapterProc.kill('SIGINT');
            this._adapterProc = null;
        }
        super.clearTargetContext();
    }
}
exports.EdgeDebugAdapter = EdgeDebugAdapter;

//# sourceMappingURL=edgeDebugAdapter.js.map
