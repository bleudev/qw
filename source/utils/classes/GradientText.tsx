import React, { FunctionComponent, PropsWithChildren } from "react";
import { Box, Text } from "ink";
import { average_color, gradient_array } from "../colors.js";
import { log } from "../log.js";

type GradientTextProps = {
    fg?: string[];
    bg?: string[];
    data?: {fg?: string[], bg?: string[]}
};

function get_gradarr(colors: string[], len: number): string[] {
  if (colors.length == 1) {
    var gradarr: string[] = Array(len).fill(colors[0]);
  }
  else {
    var gradarr = gradient_array(colors[0] || '#000000', colors[1] || '#000000', Math.ceil(len / (colors.length - 1)));

    for (let i = 1; i < colors.length - 1; i++) {
      gradarr.push(...gradient_array(colors[i] || '#000000', colors[i+1] || '#000000', Math.ceil(len / (colors.length - 1))).slice(1))
    }
  }
  return gradarr;
}

const GradientText: FunctionComponent<PropsWithChildren<GradientTextProps>> = ({fg = 'white', bg = '', data = null, children: content}) => {
  if (data) { if (data.fg) fg = data.fg; if (data.bg) bg = data.bg; }
  
  if (Array.isArray(content)) content = content.join('')

  if (typeof content == "string") {
    if (typeof fg == "string")
      fg = [fg];
    if (typeof bg == "string")
      bg = [bg];

    const fg_gradarr = get_gradarr(fg, content.length);
    const bg_gradarr = get_gradarr(bg, content.length);

    return (
      <Box>
        {Array(content.length).fill(null).map(
            (_, i) => (
                <Text color={fg_gradarr[i]} backgroundColor={bg_gradarr[i]}>
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
