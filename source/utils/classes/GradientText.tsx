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
        const len = content.length;
        return (
            <Box>
                {gradient_array(colors[0] || '#000000', colors[colors.length - 1] || '#000000', len).map(
                    (v, i) => (
                        <Text color={v}>
                            {content[i]}
                        </Text>
                    )
                )}
            </Box>
        )
    }
    
    return content;
}

export default GradientText;
