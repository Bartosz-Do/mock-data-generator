import { CodeBlock, CodeGroup } from "@prose-ui/next";
import * as Prism from "prismjs";

export default function DocsPage() {
  const code = `const x = 'Hello world';
console.log(x);

const y = 'Hello world';
console.log(y);

const z = 'Hello world';
console.log(z);`;
  const highlightedCode = Prism.highlight(code, Prism.languages.javascript, "javascript");
  const highlightedCodeWithLines = `<code>${highlightedCode.split('\n').reduce((acc, line) => {
    return acc + `<span class="line">${line}</span>`;
  }, '')}</code>`;

  const secondCode = `typescript
const x = 'Hello world';
console.log(x);

const y = 'Hello world';
console.log(y);

const z = 'Hello world';
console.log(z);`;

  const secondHighlightedCode = Prism.highlight(secondCode, Prism.languages.javascript, "javascript");
  const secondHighlightedCodeWithLines = `<code>${secondHighlightedCode.split('\n').reduce((acc, line) => {
    return acc + `<span class="line">${line}</span>`;
  }, '')}</code>`;

  return (
    <>
      <h1>Docs</h1>
      <div className="prose-ui width-40">
        <CodeBlock language="js" title="Code block title" showLineNumbers code={code} highlightedCode={highlightedCodeWithLines}>
          test
        </CodeBlock>

        <CodeGroup
          groupId="example"
          languages={[
            { value: "javascript", label: "JavaScript" },
            { value: "typescript", label: "TypeScript" },
          ]}
          tabs={[
            {
              title: "Basic",
              variants: {
                javascript: {
                  code: code,
                  highlightedCode: highlightedCodeWithLines,
                  showLineNumbers: true,
                },
                typescript: {
                  code: secondCode,
                  highlightedCode: secondHighlightedCodeWithLines,
                  showLineNumbers: true,
                },
              },
            }
          ]}
        />
      </div>
    </>
  );
}
