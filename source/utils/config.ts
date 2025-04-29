function color_scheme(
  data: {bg: string, fg: string} | {bg: string} | {fg: string}
): {bg: string, fg: string} {
  var new_data = {bg: '', fg: 'white'};
  return {...new_data, ...data};
}

const config = {
  colors: {
    main: {
      name: {
        qGrad: ["#00ff00", "#000000"],
        wGrad: ["#0000ff", "#000000"]
      },
      bottom: {
        quit: {
          inactive: color_scheme({fg: "grey"}),
          active: color_scheme({fg: "green"})
        },
        help: {
          inactive: color_scheme({fg: "grey"}),
          active: color_scheme({bg: "grey"})
        }
      }
    },
    editor: {
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
    }
  },
  shift_strength: 10
};
export default config;