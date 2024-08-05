import { ExtensionContext, window } from "vscode";
const kk = "co.apiKey";

export async function getApiKey(context: ExtensionContext): Promise<string | undefined> {
  const apiKey = await context.secrets.get(kk);
  if (apiKey) {
    return apiKey;
  } else {
    const newApiKey = await askApiKey();
    if (newApiKey) {
      await storeApiKey(context, newApiKey);
    }
    return newApiKey;
  }
}

export async function storeApiKey(context: ExtensionContext, apiKey: string) {
  await context.secrets.store(kk, apiKey);
}

export async function askApiKey() {
  return await window.showInputBox({
    placeHolder: "Enter your OpenAI API key",
  });
} 