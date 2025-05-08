import { Box, Text } from "ink";
import React from "react";
import config from "../config.js";
import { Modes } from "../annotations.js";
import GradientText from "./GradientText.js";

type BottomBarProps = {
    mode: Modes,
    y_pointer: number,
    filename: string
};

export default class BottomBar extends React.Component {
  override props: Readonly<BottomBarProps> = {
      mode: Modes.VIEW,
      y_pointer: 1,
      filename: ""
  };
  override state: Readonly<{debug: string}>;

  constructor(props: BottomBarProps) {
      super(props);
      this.props = props;
      this.state = {debug: ""};
  }

  public debug(...msg: any): void {
      const to_set = msg.join(" ").toString();
      if (this.state.debug !== to_set) this.setState({debug: to_set});
    }
  
  override render(): React.ReactNode {
    const left_modules = [
      <GradientText data={config().colors.editor.bottom.modes[this.props.mode]}> {this.props.mode} </GradientText>,
      <GradientText data={config().colors.editor.bottom.rowcol_num}>{this.props.y_pointer}:</GradientText>,
    ]

    const right_modules = [
      <GradientText data={config().colors.editor.bottom.filename}>{this.props.filename}</GradientText>,
    ]

    return (
      <Box width="100%" justifyContent="space-between">
        <Box>
          {left_modules.map((v, i) => (
            <React.Fragment key={i}>
              {v}
              <Text> </Text>
            </React.Fragment>
          ))}
        </Box>
        <Box>
          {right_modules.map((v, i) => (
            <React.Fragment key={i}>
              {v}
              <Text> </Text>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    );
  }
}