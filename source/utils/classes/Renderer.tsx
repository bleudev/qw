import React from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import config from '../config.js';
import { Modes } from '../annotations.js';

type RendererProps = {
  height: number;
  width: number;
  y_pointer: number;
  data: string;
  setData: (new_data: string) => void;
  mode: Modes;
}


export default class Renderer extends React.Component {
  override props: Readonly<RendererProps> = {
    height: 0,
    width: 0,
    y_pointer: 1,
    data: "",
    setData: (_) => {},
    mode: Modes.VIEW
  };

  constructor(props: RendererProps) {
    super(props);
    this.props = props;
  }

  override render() {
    let columns = [];

    for (let i = 1; i <= this.props.height - 2; i++) {
      if (i === this.props.y_pointer) {
        columns.push(
          <Box>
            <Text color={config.colors.row_num.active}>{`> ${i} `}</Text>
            <TextInput
              value={this.props.data.split('\n')[i-1] || ''}
              onChange={(v) => {
                if (this.props.mode === Modes.INPUT) {
                  let new_data = this.props.data.split('\n');
                  new_data[i-1] = v;
                  this.props.setData(new_data.join('\n'));
                }}}
              showCursor={this.props.mode === Modes.INPUT} />
          </Box>
        );
      }
      else {
        columns.push(
          <Text color={config.colors.row_num.inactive}>
            {`  ${i} ${this.props.data.split('\n')[i-1] || ''}`}
          </Text>
        );
      }
    }

    // Bottom bar
    columns.push(
      <Box>
        <Text color={config.colors.bottom.modes[this.props.mode]}>{this.props.mode} </Text>
        <Text color='green'>{this.props.y_pointer}:</Text>
      </Box>
    )
    
    return (
      <Box flexDirection="column">
        {columns}
      </Box>
    );
  }
}