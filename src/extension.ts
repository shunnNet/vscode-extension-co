// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { chooseWorkspaceFolder } from "./utils";
import { resolve } from "path";
import { Co } from "@imaginary-ai/core";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log("Extension 'co' is now active!");
	const coGenerateCommand = vscode.commands.registerCommand('co.generate', async () => {
		const configs = vscode.workspace.getConfiguration('co');
		const model = configs.get<string>('model');
		const apiKey = configs.get<string>('apiKey');
		if (!apiKey) {
			vscode.window.showErrorMessage('No OpenAI API key found, please set it in the settings');
			return;
		}

		const wf = await chooseWorkspaceFolder();
		if (!wf) {
			return;
		}
		const path = await vscode.window.showInputBox({
			placeHolder: "Enter the file path to generate (related to the project root)"
		});
		if (!(typeof path === 'string' && path.trim())) {
			vscode.window.showErrorMessage('No path entered');
			return;
		}
		const fullPath = resolve(wf.uri.fsPath, path);

		vscode.window.showInformationMessage(`Get input file at ${fullPath}...`);

		const co = new Co({
			baseDir: wf.uri.fsPath,
			generation: {
				text: {
					model: model || 'gpt-3.5-turbo',
					// model: 'gpt-4o',
					apiKey,
					temperature: 0,
				},
			},
		});
		try {
			vscode.window.showInformationMessage(`Generating file at ${fullPath}...`);
			await co.singleTargetFileGeneration(fullPath);
			vscode.window.showInformationMessage(`Generation complete! (path: ${fullPath})`);
		} catch (e) {
			vscode.window.showErrorMessage(`Generation failed: ${(e as Error).message}`);
		}

	});
	context.subscriptions.push(coGenerateCommand);
}

// This method is called when your extension is deactivated
export function deactivate() { }
