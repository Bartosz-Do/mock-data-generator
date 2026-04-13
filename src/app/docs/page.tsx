import { cn } from "@/utilities";
import { CodeGroup, Card, CodeBlock, Callout } from "@prose-ui/next";
import { basicApiFetchCode } from "./codes";
import * as Prism from "prismjs";
import "prismjs/components/prism-python";

const highlightCode = (code: string, language: string) => {
  return `<pre><code>${Prism.highlight(code, Prism.languages[language], language).split("\n").reduce((acc, el) => {
    return acc + `<span class="line">${el}</span>`;
  }, "")}</code></pre>`;
};

export default function DocsPage() {
  return (
    <div className={cn("prose-ui", "center")}>
      <h1>API docs</h1>
      <Card title="API documentation" icon="scroll-text" color="var(--color-brand-primary)">
        Our web application provides an API that allows you to generate sample
        data using `faker`, an npm library. This makes it easy to quickly create
        test records, mocks, or prototype data without having to build them by
        hand.
      </Card>

      <h3>Example code to fetch API</h3>
      <CodeGroup tabs={[{
        title: "Basic API fetch code",
        variants: {
          javascript: {
            code: basicApiFetchCode.js,
            highlightedCode: highlightCode(basicApiFetchCode.js, "javascript"),
            showLineNumbers: true,
          },
          python: {
            code: basicApiFetchCode.py,
            highlightedCode: highlightCode(basicApiFetchCode.py, "python"),
            showLineNumbers: true,
          }
        },
      }]} languages={[
        { value: "javascript", label: "JavaScript" },
        { value: "python", label: "Python" }
      ]} />

      <h3>In concole you should see:</h3>
      <CodeBlock title="Result" code={basicApiFetchCode.res} language="json" highlightedCode={highlightCode(basicApiFetchCode.res, "javascript")}>test</CodeBlock>
      <Callout variant="info" title="Note">
        Values in your console can be a bit different because seed is not set and data is generated randomly.
      </Callout>
    </div >
  )
}
