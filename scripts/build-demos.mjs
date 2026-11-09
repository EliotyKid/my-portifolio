import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const source = resolve(process.argv[2] || "../../Projects/Testes");
const destination = resolve("public/demos");
const demos = ["forma", "oryzo", "slush", "alex-morgan", "nexus-one"];
const selected = process.argv[3];
mkdirSync(destination, { recursive: true });

for (const [index, slug] of demos.entries()) {
  if (selected && selected !== slug) continue;
  const original = join(source, `site-teste-${index + 1}`);
  if (!existsSync(join(original, "node_modules")))
    throw new Error(`Install the demo dependencies first: ${original}`);
  const temporary = mkdtempSync(join(tmpdir(), `portfolio-${slug}-`));
  try {
    cpSync(original, temporary, {
      recursive: true,
      filter: (p) =>
        ![
          "node_modules",
          ".next",
          "out",
          ".git",
          "test-results",
          "artifacts",
        ].includes(p.split("/").at(-1)),
    });
    symlinkSync(
      join(original, "node_modules"),
      join(temporary, "node_modules"),
      "dir",
    );
    if (index === 0) {
      execFileSync(
        join(temporary, "node_modules/.bin/esbuild"),
        ["script.js", "--bundle", "--minify", "--outfile=assets/site.js"],
        { cwd: temporary, stdio: "inherit" },
      );
    } else {
      const prefix = `/demos/${slug}`;
      const assets = readdirSync(join(temporary, "public"));
      const rewrite = (directory) => {
        for (const item of readdirSync(directory, { withFileTypes: true })) {
          const path = join(directory, item.name);
          if (item.isDirectory()) rewrite(path);
          else if (/\.(tsx?|jsx?|css|scss)$/.test(item.name)) {
            let text = readFileSync(path, "utf8");
            for (const asset of assets) {
              const escaped = asset.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              text = text.replace(
                new RegExp(`(["'\x60(])/${escaped}(?=[/"'\x60)])`, "g"),
                `$1${prefix}/${asset}`,
              );
            }
            writeFileSync(path, text);
          }
        }
      };
      for (const dir of ["app", "components", "lib"])
        if (existsSync(join(temporary, dir))) rewrite(join(temporary, dir));
      for (const file of readdirSync(temporary))
        if (/^next.config\./.test(file)) rmSync(join(temporary, file));
      writeFileSync(
        join(temporary, "next.config.mjs"),
        `export default { output: 'export', trailingSlash: true, basePath: '${prefix}', images: { unoptimized: true }, experimental: { cpus: 2 } };\n`,
      );
      execFileSync(
        process.execPath,
        [
          join(temporary, "node_modules/next/dist/bin/next"),
          "build",
          "--webpack",
        ],
        {
          cwd: temporary,
          stdio: "inherit",
          env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
        },
      );
    }
    const output = index === 0 ? temporary : join(temporary, "out");
    const target = join(destination, slug);
    mkdirSync(target, { recursive: true });
    if (index === 0) {
      for (const file of ["index.html", "styles.css", "assets"])
        cpSync(join(output, file), join(target, file), { recursive: true });
    } else cpSync(output, target, { recursive: true });
    console.log(`Demo ready: ${slug}`);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}
