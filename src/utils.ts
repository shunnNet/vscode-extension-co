import * as vscode from "vscode";
export async function chooseWorkspaceFolder() {
	const wfs = vscode.workspace.workspaceFolders;

	if (!wfs) {
		vscode.window.showErrorMessage('No workspace found');
		return null;
	}
	if (wfs.length === 1) {
		return wfs[0];
	}
	const choosenName = await vscode.window.showQuickPick(wfs.map(wf => wf.name));

	if (!choosenName) {
		vscode.window.showErrorMessage('No workspace selected.');
		return null;
	}


	const wf = wfs.find((wf) => wf.name === choosenName);

	if (!wf) {
		vscode.window.showErrorMessage(`Workspace ${choosenName} not found.`);
		return null;
	}

	return wf;
}
