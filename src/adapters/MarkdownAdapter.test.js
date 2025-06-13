import fs from "fs";
import path from "path";
import DrawSteelAdapter from "./DrawSteelAdapter";
import MarkdownAdapter from "./MarkdownAdapter";

const drawSteelAdapter = new DrawSteelAdapter();
const markdownAdapter = new MarkdownAdapter();

const inputsDir = path.join(__dirname, "../__tests__/data/markdown-adapter/inputs");
const outputsDir = path.join(__dirname, "../__tests__/data/markdown-adapter/outputs");

describe("MarkdownAdapter", () => {
	const testFiles = fs.readdirSync(inputsDir).filter(file => file.endsWith(".txt"));

	testFiles.forEach(file => {
		const inputFile = path.join(inputsDir, file);
		const outputFile = path.join(outputsDir, file.replace(".txt", ".md"));

		if (fs.existsSync(outputFile)) {
			it(`should correctly convert ${file} to markdown`, () => {
				const input = fs.readFileSync(inputFile, "utf-8");
				const expectedOutput = fs.readFileSync(outputFile, "utf-8");

				const statblock = drawSteelAdapter.parse(input);
				const actualOutput = markdownAdapter.format(statblock);

				expect(actualOutput.trim()).toEqual(expectedOutput.trim());
			});
		} else {
			it.skip(`should correctly convert ${file} to markdown (output file not found)`, () => {
				// This test is skipped because the output file does not exist.
			});
		}
	});
});