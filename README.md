# VSCode extension: Co
> [!WARNING]
> Under Development Testing

`Co` is a tool for generating front-end code using LLMs (e.g., OpenAI).

The extension is built on [`@imaginary-ai/core`](https://github.com/shunnNet/co). You can check the documeatation in the link.

This extension is currently under development testing. Here are the features you can try:

## Setup
Before starting, you can go to user settings to set up the OpenAI API Key and model.

- `apiKey`: The API Key is required. The Co extension will not copy your API Key. If you are concerned, you can check the source code.
- `model`: The default model currently used is gpt-3.5-turbo. Basically, any model parameter supported by the OpenAI chatCompletion endpoint can be used.

## Command: Co: generate path (related to workspace root)
You can use `cmd + shift + p` and enter `Co: generate path`. The extension will ask you to enter a path relative to the workspace root, which is the file you want to generate (referred to as the target file). It will then scan all the files in the workspace and use all files that the target file depends on as the source (prompt) to generate the target file.