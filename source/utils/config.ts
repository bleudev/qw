import YAML from "yaml";
import fs from "fs";
import { homedir, type } from "os";
import path from "path";

function color_scheme(
  data: {bg: string, fg: string} | {bg: string} | {fg: string}
): {bg: string, fg: string} {
  var default_data = {bg: '', fg: 'white'};
  return {...default_data, ...data};
}

const default_config = YAML.parse(
`
colors:
  main:
    name:
      quick:
        fg:
          - "#00ff00"
          - "#004000"
      write:
        fg:
          - "#0000ff"
          - "#000060"
      version:
        fg: "#aaaaaa"
      description:
        fg:
          - "#ff0000"
          - "#800000"
          - "#ff0000"
        bg:
          - "#000000"
          - "#500000"
          - "#000000"
    bottom:
      quit:
        inactive:
          fg:
            - "#bbbbbb"
            - "#444444"
            - "#bbbbbb"
        active:
          fg:
            - "#00ff00"
            - "#009900"
      help:
        inactive:
          fg:
            - "#bbbbbb"
            - "#444444"
            - "#bbbbbb"
        active:
          bg:
            - "#bbbbbb"
            - "#aaaaaa"
            - "#bbbbbb"
  editor:
    row_num:
      active:
        fg:
          - "#ffff00"
          - "#999900"
      inactive:
        fg:
          - "#999999"
          - "#555555"
      empty:
        fg: "#333333"
    bottom:
      modes:
        view:
          bg:
            - "#00aaff"
            - "#00ffff"
        input:
          bg:
            - "#00ff00"
            - "#008822"
        select:
          bg:
            - "#0000ff"
            - "#220088"
      rowcol_num:
        fg: "#00ff00"
      filename:
        fg: "#555555"
editor:
  shift_strength: 10
`)

const configPath = (() => {
  var res = homedir()

  switch (type()) {
    case 'Linux':
    case 'Darwin':
      // Linux or MacOs
      res += '/.config/qw/config.yaml';
      break;
    case 'Windows_NT':
      // Windows
      res += '/AppData/Local/qw/config.yaml';
      break;
  }
  return res;
})();

function ensureConfigExists() {
  if (!fs.existsSync(configPath)) {
      const dir = path.dirname(configPath);
      if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(configPath, YAML.stringify(default_config));
  }
}

function processColorObject(obj: any): any {
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    if ('fg' in obj || 'bg' in obj) return color_scheme(obj);
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, processColorObject(value)])
    );
  }
  return obj;
}

export default function config() {
  ensureConfigExists();
  const filedata = fs.readFileSync(configPath, 'utf8');
  return processColorObject(YAML.parse(filedata));
}
