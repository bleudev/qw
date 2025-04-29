import { Box, Newline, Text, useInput } from "ink";
import React, { FunctionComponent, useState } from "react";
import { VERSION } from "../info.js";
import key_switcher from "../keyboard.js";
import HelpPage from "./HelpPage.js";
import config from "../config.js";

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
                <Text color="greenBright">Q</Text>
                <Text color="green">uick</Text>
                <Text color="blueBright">W</Text>
                <Text color="blue">rite</Text>
                <Text color="grey"> {VERSION}</Text>
              </Box>
              <Text>Vim-like terminal text editor</Text>
            </>
          )}
          {help && <HelpPage/>}
      </Box>
      <Box justifyContent="center">
        {!quit && (
          <Text
            color={config.colors.main.bottom.quit.inactive.fg}
            backgroundColor={config.colors.main.bottom.quit.inactive.bg}
          > q - quit </Text>
        )}
        {quit && (
          <Text
            color={config.colors.main.bottom.quit.active.fg}
            backgroundColor={config.colors.main.bottom.quit.active.bg}
          > q - quit </Text>
        )}

        <Text> </Text>
        {!help && (
          <Text
            color={config.colors.main.bottom.help.inactive.fg}
            backgroundColor={config.colors.main.bottom.help.inactive.bg}
          > h - show help </Text>
        )}
        {help && (
          <Text
            color={config.colors.main.bottom.help.active.fg}
            backgroundColor={config.colors.main.bottom.help.active.bg}
          > h - show help </Text>
        )}
      </Box>
    </>
  );
}

export default MainMenu;
