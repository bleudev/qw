import React, { useEffect, useState } from 'react';
import { Box, Text, useInput, useStdout } from 'ink';
import Renderer from './utils/classes/Renderer.js';
import config from './utils/config.js'
import { Modes } from './utils/annotations.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'node:fs';

const argv = ( yargs(hideBin(process.argv))
  .option('file', {
    alias: 'f',
    type: 'string',
    description: 'Файл для редактирования',
    default: ''
  })
  .parse() as {_: Array<any>})

type Props = {
};

export default function App(props: Props) {
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
	
  const setYPointer = (v: ((old: number) => number)) => s_setYPointer(old => Math.max(1, v(old)))

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
		if (mode !== Modes.INPUT)
      switch (input) {
        case 'q': // Quit
          process.exit();
        case 'i': // Enable input mode
          setMode(Modes.INPUT);
          break;
        case 's': // Save file
          fs.writeFile(filename, data, err => {
            if (err) console.error(err);
          });
      }

    if (key.escape && mode === Modes.INPUT) setMode(Modes.VIEW);

    let change_YPointer = key.shift ? config.shift_strength : 1;

    if (key.upArrow) setYPointer(old => old - change_YPointer);
    else if (key.downArrow) setYPointer(old => old + change_YPointer);
  });

  console.log(props)
	return (
		<Box flexDirection="column">
      <Renderer height={height} width={width} y_pointer={y_pointer} data={data} mode={mode} setData={setData}/>
		</Box>
	);
}
