import { ExtensionContext, window, workspace } from "vscode";
import DocumentDecorationManager from "./documentDecorationManager";
export function activate(context: ExtensionContext) {
    const documentDecorationManager = new DocumentDecorationManager();

    context.subscriptions.push(
        
        workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration("bracketPairColorizer")) {
                documentDecorationManager.reset();
            }
        }),

        window.onDidChangeVisibleTextEditors(() => {
            documentDecorationManager.updateAllDocuments();
        }),

        workspace.onDidChangeTextDocument((event) => {
            documentDecorationManager.onDidChangeTextDocument(event.document, event.contentChanges);
        }),

        workspace.onDidCloseTextDocument((event) => {
            documentDecorationManager.onDidCloseTextDocument(event);
        }),

        workspace.onDidOpenTextDocument((event) => {
            documentDecorationManager.onDidOpenTextDocument(event);
        }),

        window.onDidChangeTextEditorSelection((event) => {
            documentDecorationManager.onDidChangeSelection(event);
        }),
        
    );

    documentDecorationManager.reset();
}

// tslint:disable-next-line:no-empty
export function deactivate() {
}
