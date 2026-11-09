import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { projects } from "../src/Data/Projects.ts";

test("five original web demos have unique slugs and bilingual case studies", () => {
  assert.equal(projects.length, 5);
  assert.equal(new Set(projects.map((p) => p.slug)).size, 5);
  for (const p of projects) {
    assert.equal(p.category, "Web Development");
    assert.ok(p.stack.length);
    for (const lang of ["pt", "en"]) {
      assert.ok(p.summary[lang].length > 30);
      assert.ok(p.description[lang].length > 80);
      assert.equal(p.features[lang].length, 3);
    }
  }
});

test("every demo and cover exists locally", () => {
  for (const p of projects) {
    assert.ok(existsSync(`public${p.cover}`), p.cover);
    assert.ok(existsSync(`public${p.liveUrl}`), p.liveUrl);
  }
});
