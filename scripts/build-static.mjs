import { spawn } from "node:child_process";
const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  { stdio: "inherit", env: { ...process.env, PORTFOLIO_STATIC_EXPORT: "1" } },
);
child.on("exit", (code) => process.exit(code ?? 1));
