/**
 * Eslint rule for no spacing between angular interpolation and the element
 */

module.exports = {
  rules: {
    "no-space-between-interpolation-and-element": {
      meta: {
        type: "layout",
        docs: {
          description:
            "Eslint rule for no spacing between angular interpolation and the element",
          category: "Best Practices",
          recommended: true,
        },
        schema: [],
      },
      create(context) {
        const sourceCode = context.getSourceCode();

        function checkInterpolationSpacing(node) {
          const { value } = node;
          const interpolationRegex = /{{.*?}}/g;
          let match;

          while ((match = interpolationRegex.exec(value)) !== null) {
            const start = match.index;
            const end = start + match[0].length;

            if (start > 0 && /[\s\n]/.test(value[start - 1])) {
              context.report({
                node,
                loc: {
                  start: sourceCode.getLocFromIndex(node.range[0] + start - 1),
                  end: sourceCode.getLocFromIndex(node.range[0] + start),
                },
                message: "No spaces or newlines allowed before interpolation",
              });
            }

            if (end < value.length && /[\s\n]/.test(value[end])) {
              context.report({
                node,
                loc: {
                  start: sourceCode.getLocFromIndex(node.range[0] + end),
                  end: sourceCode.getLocFromIndex(node.range[0] + end + 1),
                },
                message: "No spaces or newlines allowed after interpolation",
              });
            }
          }
        }

        return {
          Program(node) {
            if (!context.getFilename().endsWith(".html")) {
              return;
            }

            const htmlContent = sourceCode.getText(node);
            const htmlNodes = parseHTML(htmlContent);

            htmlNodes.forEach((htmlNode) => {
              if (htmlNode.type === "text") {
                checkInterpolationSpacing(htmlNode);
              }
            });
          },
        };
      },
    },
  },
};

function parseHTML(html) {
  const nodes = [];
  const regex = /<[^>]+>|[^<]+/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const value = match[0];
    nodes.push({
      type: value.startsWith("<") ? "tag" : "text",
      value,
      range: [match.index, regex.lastIndex],
    });
  }

  return nodes;
}
