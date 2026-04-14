import { cn } from "@/utilities";
import { CodeGroup, Card, CodeBlock, Callout } from "@prose-ui/next";
import { basicApiFetchCode, seedApiFetchCode } from "./codes";
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
      <Callout variant="warning" title="Note">
        Values in your console can be a bit different because seed is not set and data is generated randomly.
      </Callout>

      <h3>You can change count of records, fields and seed:</h3>
      <CodeGroup tabs={[
        {
          title: "Seed API fetch code",
          variants: {
            javascript: {
              code: seedApiFetchCode.js,
              highlightedCode: highlightCode(seedApiFetchCode.js, "javascript"),
              showLineNumbers: true,
            },
            python: {
              code: seedApiFetchCode.py,
              highlightedCode: highlightCode(seedApiFetchCode.py, "python"),
              showLineNumbers: true,
            },
          },
        }
      ]} languages={[
        { value: "javascript", label: "JavaScript" },
        { value: "python", label: "Python" }
      ]} />

      <h3>In concole you will get:</h3>
      <CodeBlock title="Result" code={seedApiFetchCode.res} language="json" highlightedCode={highlightCode(seedApiFetchCode.res, "javascript")}>test</CodeBlock>
      <Callout variant="info" title="Info">
        count can be between 1 and 300,<br />
        you can use as many fields as you need,<br />
        seed is optional, if you don&apos;t set it, data will be generated randomly.
      </Callout>

      <h3>All working fields</h3>
      <div className="prose-ui-table-div">
        <table>
          <thead>
            <tr>
              <th>Column name</th>
              <th>Column value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&quot;firstName&quot;</td>
              <td>First name of user like &quot;John&quot;</td>
            </tr>
            <tr>
              <td>&quot;lastName&quot;</td>
              <td>Last name of user like &quot;Doe&quot;</td>
            </tr>
            <tr>
              <td>&quot;fullName&quot;</td>
              <td>Full name of user like &quot;John Doe&quot;</td>
            </tr>
            <tr>
              <td>&quot;email&quot;</td>
              <td>Email of user like &quot;john.doe@example.com&quot;</td>
            </tr>
            <tr>
              <td>&quot;username&quot;</td>
              <td>Username of user like &quot;john_doe&quot;</td>
            </tr>
            <tr>
              <td>&quot;password&quot;</td>
              <td>Password of user like &quot;password123&quot;</td>
            </tr>
            <tr>
              <td>&quot;avatar&quot;</td>
              <td>Avatar of user like &quot;https://example.com/avatar.png&quot;</td>
            </tr>
            <tr>
              <td>&quot;phrase&quot;</td>
              <td>Phrase of user with computer science terms</td>
            </tr>
            <tr>
              <td>&quot;anytime&quot;</td>
              <td>Random date and time</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
