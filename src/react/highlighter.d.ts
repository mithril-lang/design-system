// Upstream typings cover the extensionless path; native ESM requires .js.
declare module "react-syntax-highlighter/dist/esm/styles/prism/one-dark.js" {
  const style: Record<string, import("react").CSSProperties>;
  export default style;
}
