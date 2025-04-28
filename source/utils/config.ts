function color_scheme(
  data: {bg: string, fg: string} | {bg: string} | {fg: string}
): {bg: string, fg: string} {
  var new_data = {bg: '', fg: 'white'};
  return {...new_data, ...data};
}

const config = {
  colors: {
    row_num: {
      active: "yellow",
      inactive: "white"
    },
    bottom: {
      modes: {
        view: color_scheme({bg: "cyan"}),
        input: color_scheme({bg: "green"}),
        select: color_scheme({bg: "blue"})
      }
    }
  },
  shift_strength: 10
};
export default config;