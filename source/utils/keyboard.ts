import { Key } from "ink";
import { log, logInput } from "./log.js";

const keymaps = {
  "qwertyuiop[]asdfghjkl;'zxcvbnm,./": [
    "йцукенгшщзхъфывапролджэячсмитьбю." // Russian keymap
  ]
}

export function get_kmap_keys(orig_key: string) {
  let another_inputs = [];

  for (const [key, value] of Object.entries(keymaps))
    another_inputs.push(...value.map(v => v.at(key.indexOf(orig_key))));

  return [orig_key, ...another_inputs];
}

export function get_orig_keys(kmap_key: string) {
  let orig_keys = [];

  if (kmap_key !== '')
    for (const [key, value] of Object.entries(keymaps)) {
      if (key.includes(kmap_key)) orig_keys.push(kmap_key);

      let kmap = value.find(v => v.includes(kmap_key));
      if (kmap) {
        let index = kmap?.indexOf(kmap_key);
        if (index !== -1) orig_keys.push(key.at(index));
      }
    }

  return orig_keys;
}

export default function key_switcher(
  commands: {[key: string]: (key: Key) => void},
  input: string,
  key: Key
) {
  var inputs = get_orig_keys(input);
  inputs.forEach(v => {
    if (v && commands[v])
      commands[v](key)});

  // Backspace fix
  if (
    (key.backspace || key.delete ||
    input === '\x7F' || input === '\b') &&
    commands['backspace'])
    commands['backspace'](key);

  // Other keys
  var ignore_keys = ['backspace']
  Object.entries(key).forEach(([keyn, keyb]) => {
    if (keyn in ignore_keys) return;
    if (commands[keyn] && keyb) commands[keyn](key);  
  });
}
