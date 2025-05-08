import React, { FunctionComponent, PropsWithChildren } from "react";
import { Box, Text } from "ink";
import { average_color, gradient_array } from "../colors.js";
import { log } from "../log.js";

type GradientTextProps = {
    colors: string[];
};

const GradientText: FunctionComponent<PropsWithChildren<GradientTextProps>> = ({colors, children: content}) => {
  if (Array.isArray(content)) content = content.join('')

  if (typeof content == "string") {
    if (typeof colors == "string")
      colors = [colors];
    const con_len = content.length;
    const col_len = colors.length;

    if (col_len == 1) {
      var grarray: string[] = Array(con_len).fill(colors[0]);
    }
    else {
      var grarray = gradient_array(colors[0] || '#000000', colors[1] || '#000000', Math.ceil(con_len / (col_len - 1)));
  
      for (let i = 1; i < colors.length - 1; i++) {
        grarray.push(...gradient_array(colors[i] || '#000000', colors[i+1] || '#000000', Math.ceil(con_len / (col_len - 1))).slice(1))
      }
    }

    return (
      <Box>
        {grarray.map(
            (v, i) => (
                <Text color={v}>
                    {content[i]}
                </Text>
            )
        )}
      </Box>
    );
  }

  return content;
}

export default GradientText;
