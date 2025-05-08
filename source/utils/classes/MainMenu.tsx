import { Box, Newline, Text, useInput } from "ink";
import React, { FunctionComponent, useState } from "react";
import { VERSION } from "../info.js";
import key_switcher from "../keyboard.js";
import HelpPage from "./HelpPage.js";
import config from "../config.js";
import GradientText from "./GradientText.js";

type MainMenuProps = {
    height: number;
    width: number;
}

const MainMenu: FunctionComponent<MainMenuProps> = ({height, width}) => {
  const [quit, setQuit] = useState(false);
  const [help, setHelp] = useState(false);
  
  useInput((input, key) => {
    key_switcher({
      q: async () => {
        setQuit(true);
        await new Promise(r => setTimeout(r, 100));
        setQuit(false);
        setTimeout(process.exit, 200);
      },
      h: () => setHelp(!help)
    }, input, key);
  })

  return (
    <>
      <Box justifyContent={help ? "flex-start" : "center"} alignItems={help ? "flex-start" : "center"} flexDirection="column" height={height - 2} width={width}>
          {!help && (
            <>
              <Box>
                <GradientText data={config().colors.main.name.quick}>Quick</GradientText>
                <GradientText data={config().colors.main.name.write}>Write</GradientText>
                <GradientText data={config().colors.main.name.version}> {VERSION}</GradientText>
              </Box>
              <GradientText data={config().colors.main.name.description}>Vim-like terminal text editor</GradientText>
            </>
          )}
          {help && <HelpPage/>}
      </Box>
      <Box justifyContent="center">
        {!quit && (
          <GradientText data={config().colors.main.bottom.quit.inactive}> q - quit </GradientText>
        )}
        {quit && (
          <GradientText data={config().colors.main.bottom.quit.active}> q - quit </GradientText>
        )}

        <Text> </Text>
        {!help && (
          <GradientText data={config().colors.main.bottom.help.inactive}> h - show help </GradientText>
        )}
        {help && (
          <GradientText data={config().colors.main.bottom.help.active}> h - show help </GradientText>
        )}
      </Box>
    </>
  );
}

export default MainMenu;
