export const CHINESE_OUTPUT_DIRECTIVE = `

Language requirement:
- 用简体中文输出所有自然语言内容。
- 保留必需的 XML/JSON 标签名、属性名、对象键、枚举值、文件路径、标识符、命令、代码和引用原文，不要翻译这些结构化或可执行内容。
- 如果要求输出纯文本，也必须使用简体中文。`;

export function withChineseOutputDirective(prompt: string): string {
  if (prompt.includes("用简体中文输出所有自然语言内容")) {
    return prompt;
  }
  return `${prompt.trimEnd()}${CHINESE_OUTPUT_DIRECTIVE}`;
}
