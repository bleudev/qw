import React, { useEffect, useState } from 'react';
import { Box, useInput, useStdout } from 'ink';
import Renderer from './utils/classes/Renderer.js';
import config from './utils/config.js'
import { Modes } from './utils/annotations.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'node:fs';
import BottomBar from './utils/classes/BottomBar.js';
import key_switcher from './utils/keyboard.js';

const argv = ( yargs(hideBin(process.argv))
  .option('file', {
    alias: 'f',
    type: 'string',
    description: 'Файл для редактирования',
    default: ''
  })
  .parse() as {_: Array<any>})

export default function App(_: {}) {
  const { stdout } = useStdout();
  const [width, setWidth] = useState(stdout?.columns || 80);
  const [height, setHeight] = useState(stdout?.rows || 24);
  
  const [y_pointer, s_setYPointer] = useState(1);
  
  const filename = argv._[0];
  const [data, setData] = useState("");

  fs.readFile(filename, 'utf8', (err, filedata) => {
    if (err) {
      console.error(err);
      return;
    }

    if (!data) setData(filedata);
  });

  const [mode, setMode] = useState(Modes.VIEW);
	
  const setYPointer = (v: ((old: number) => number)) => {
    s_setYPointer(old => {
      const newValue = v(old);
      const maxLines = data.split('\n').length;
      return Math.max(1, Math.min(maxLines, newValue));
    });
  }

  useEffect(() => {
    if (!stdout) return;

    const handleResize = () => {
      setWidth(stdout.columns);
      setHeight(stdout.rows);
    };

    stdout.on('resize', handleResize);
    return () => {
      stdout.off('resize', handleResize);
    };
  }, [stdout]);

  useInput((input, key) => {
    var change_YPointer = key.shift ? config.shift_strength : 1;
    var _input = mode === Modes.INPUT;
    var not_input = mode !== Modes.INPUT;
    key_switcher({
      q: () => { if (not_input) process.exit() },
      i: () => { if (not_input) setMode(Modes.INPUT) },
      s: () => {
        if (not_input)
          fs.writeFile(filename, data, err => {
            if (err) console.error(err);
          });
      },
      backspace: () => {
        if (_input && data.split('\n')[y_pointer - 1] === '' && y_pointer > 1) {
          const lines = data.split('\n');
          lines.splice(y_pointer - 1, 1);
          setData(lines.join('\n'));
          setYPointer(v => v - 1);
        }
      },
      escape: () => {if (_input) setMode(Modes.VIEW)},
      upArrow: () => setYPointer(old => old - change_YPointer),
      downArrow: () => setYPointer(old => old + change_YPointer)
    }, input, key)
  });

	return (
		<Box flexDirection="column">
      <Renderer height={height} width={width} y_pointer={y_pointer} setYPointer={v => setYPointer(_ => v)} data={data} mode={mode} setData={setData}/>
      <BottomBar mode={mode} y_pointer={y_pointer} filename={filename}/>
		</Box>
	);
}
