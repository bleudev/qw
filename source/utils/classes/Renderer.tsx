import React from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import config from '../config.js';
import { Modes } from '../annotations.js';

type RendererProps = {
  height: number;
  width: number;
  y_pointer: number;
  setYPointer: (new_ypointer: number) => void;
  data: string;
  setData: (new_data: string) => void;
  mode: Modes;
}


export default class Renderer extends React.Component {
  override props: Readonly<RendererProps> = {
    height: 0,
    width: 0,
    y_pointer: 1,
    setYPointer: (_) => {},
    data: "",
    setData: (_) => {},
    mode: Modes.VIEW
  };
  override state: Readonly<{debug: string}>;

  constructor(props: RendererProps) {
    super(props);
    this.props = props;
    this.state = {debug: ""};
  }

  private debug(...msg: any): void {
    const to_set = msg.join(" ").toString();
    if (this.state.debug !== to_set) this.setState({debug: to_set});
  }

  private renderRow(i: number): React.ReactNode {
    const lines = this.props.data.split('\n');
    const isActive = i === this.props.y_pointer;
    const lineContent = lines[i-1] || '';

    if (isActive) {
      return (
        <Box key={i}>
          <Text color={config.colors.row_num.active}>{`> ${i} `}</Text>
          <TextInput
            value={lineContent}
            onChange={(v) => {
              if (this.props.mode === Modes.INPUT) {
                const newLines = [...lines];
                newLines[i-1] = v;
                this.props.setData(newLines.join('\n'));
              }
            }}
            onSubmit={() => {
              if (this.props.mode === Modes.INPUT) {
                const newLines = [...lines];
                newLines.splice(i, 0, '');
                this.props.setData(newLines.join('\n'));
                this.props.setYPointer(this.props.y_pointer + 1);
              }
            }}
            showCursor={this.props.mode === Modes.INPUT}
          />
        </Box>
      );
    }

    return (
      <Text key={i} color={config.colors.row_num.inactive}>
        {`  ${i} ${lineContent}`}
      </Text>
    );
  }

  private getVisibleRows(): React.ReactNode[] {
    const lines = this.props.data.split('\n');
    const totalLines = lines.length;
    const cliHeight = this.props.height - 2; // минус место для bottom bar
    const halfScreen = Math.floor(cliHeight / 2);

    let start = Math.max(1, this.props.y_pointer - halfScreen);
    let end = Math.min(totalLines, start + cliHeight - 1);

    // Корректируем если в конце осталось место
    if (end - start + 1 < cliHeight) {
      start = Math.max(1, end - cliHeight + 1);
    }

    const rows: React.ReactNode[] = [];
    
    for (let i = start; i <= end; i++) {
      rows.push(this.renderRow(i));
    }

    // Добавляем тильды для пустых строк в конце
    while (rows.length < cliHeight) {
      rows.push(<Text key={`empty-${rows.length}`}>~</Text>);
    }

    return rows;
  }

  private get bottom_bar() {
    return (
      <Box>
        {[
          <Text color={config.colors.bottom.modes[this.props.mode]}>{this.props.mode}</Text>,
          <Text color='green'>{this.props.y_pointer}:</Text>,
          <Text color='yellow'>{this.state.debug}</Text>
        ].map(v => [v, <Text> </Text>])}
      </Box>
    );
  }

  override render() {
    // this.debug(
    //   `Lines: ${this.props.data.split('\n').length}`,
    //   `Height: ${this.props.height}`,
    //   `Pointer: ${this.props.y_pointer}`
    // );

    return (
      <Box flexDirection="column">
        {this.getVisibleRows()}
        {this.bottom_bar}
      </Box>
    );
  }
}