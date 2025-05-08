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

const default_config = {
  colors: {
    main: {
      name: {
        qGrad: ["#00ff00", "#004000"],
        wGrad: ["#0000ff", "#000060"],
        verGrad: ["#aaaaaa", "#555555"],
        descGrad: ["#ff0000", "#800000", "#ff0000"]
      },
      bottom: {
        quit: {
          inactive: { fg: "grey" },
          active: { fg: "green" }
        },
        help: {
          inactive: { fg: "grey" },
          active: { bg: "grey" }
        }
      }
    },
    editor: {
      row_num: {
        active: { fg: "yellow" },
        inactive: { fg: "white" }
      },
      bottom: {
        modes: {
          view: { bg: "cyan" },
          input: { bg: "green" },
          select: { bg: "blue" }
        }
      }
    }
  },
  editor: {
    shift_strength: 10
  }
}

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
