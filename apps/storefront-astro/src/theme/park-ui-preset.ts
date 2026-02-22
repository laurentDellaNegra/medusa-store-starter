// Auto-extracted from @park-ui/panda-preset (accentColor: tomato, grayColor: sand, borderRadius: sm)
// This file replaces the @park-ui/panda-preset dependency

import { definePreset } from "@pandacss/dev";

export const parkUiPreset = definePreset({
  name: "park-ui-local",
  conditions: {
  "extend": {
    "collapsed": "&:is([aria-collapsed=true], [data-collapsed], [data-state=\"collapsed\"])",
    "current": "&:is([data-current])",
    "hidden": "&:is([hidden])",
    "hover": [
      "@media (hover: hover) and (pointer: fine)",
      "&:is(:hover, [data-hover])"
    ],
    "indeterminate": "&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state=indeterminate])",
    "off": "&:is([data-state=\"off\"])",
    "on": "&:is([data-state=\"on\"])",
    "today": "&:is([data-today])",
    "underValue": "&:is([data-state=\"under-value\"])",
    "dark": ".dark &",
    "light": ":root &, .light &",
    "invalid": "&:is([aria-invalid])"
  }
},
  globalCss: {
  "html": {
    "lineHeight": 1.5,
    "MozOsxFontSmoothing": "grayscale",
    "textRendering": "optimizeLegibility",
    "WebkitFontSmoothing": "antialiased",
    "WebkitTextSizeAdjust": "100%"
  },
  "body": {
    "background": "bg.canvas",
    "color": "fg.default",
    "_dark": {
      "colorScheme": "dark"
    }
  },
  "*, *::before, *::after": {
    "borderColor": "border.subtle",
    "borderStyle": "solid",
    "boxSizing": "border-box"
  },
  "*::placeholder": {
    "opacity": 1,
    "color": "fg.subtle"
  },
  "*::selection": {
    "bg": "accent.a4"
  }
},
  theme: {
    extend: {
      tokens: {
  "animations": {
    "backdrop-in": {
      "value": "fade-in 250ms {easings.emphasized-in}"
    },
    "backdrop-out": {
      "value": "fade-out 200ms {easings.emphasized-out}"
    },
    "dialog-in": {
      "value": "slide-in 400ms {easings.emphasized-in}"
    },
    "dialog-out": {
      "value": "slide-out 200ms {easings.emphasized-out}"
    },
    "drawer-in-left": {
      "value": "slide-in-left 400ms {easings.emphasized-in}"
    },
    "drawer-out-left": {
      "value": "slide-out-left 200ms {easings.emphasized-out}"
    },
    "drawer-in-right": {
      "value": "slide-in-right 400ms {easings.emphasized-in}"
    },
    "drawer-out-right": {
      "value": "slide-out-right 200ms {easings.emphasized-out}"
    },
    "skeleton-pulse": {
      "value": "skeleton-pulse 2s {easings.pulse} infinite"
    },
    "fade-in": {
      "value": "fade-in 400ms {easings.emphasized-in}"
    },
    "collapse-in": {
      "value": "collapse-in 250ms {easings.emphasized-in}"
    },
    "collapse-out": {
      "value": "collapse-out 200ms {easings.emphasized-out}"
    },
    "spin": {
      "value": "spin 1s linear infinite"
    }
  },
  "blurs": {
    "sm": {
      "value": "4px"
    },
    "base": {
      "value": "8px"
    },
    "md": {
      "value": "12px"
    },
    "lg": {
      "value": "16px"
    },
    "xl": {
      "value": "24px"
    },
    "2xl": {
      "value": "40px"
    },
    "3xl": {
      "value": "64px"
    }
  },
  "borders": {
    "none": {
      "value": "none"
    }
  },
  "colors": {
    "current": {
      "value": "currentColor"
    },
    "black": {
      "DEFAULT": {
        "value": "#000000"
      },
      "a1": {
        "value": "rgba(0, 0, 0, 0.05)"
      },
      "a2": {
        "value": "rgba(0, 0, 0, 0.1)"
      },
      "a3": {
        "value": "rgba(0, 0, 0, 0.15)"
      },
      "a4": {
        "value": "rgba(0, 0, 0, 0.2)"
      },
      "a5": {
        "value": "rgba(0, 0, 0, 0.3)"
      },
      "a6": {
        "value": "rgba(0, 0, 0, 0.4)"
      },
      "a7": {
        "value": "rgba(0, 0, 0, 0.5)"
      },
      "a8": {
        "value": "rgba(0, 0, 0, 0.6)"
      },
      "a9": {
        "value": "rgba(0, 0, 0, 0.7)"
      },
      "a10": {
        "value": "rgba(0, 0, 0, 0.8)"
      },
      "a11": {
        "value": "rgba(0, 0, 0, 0.9)"
      },
      "a12": {
        "value": "rgba(0, 0, 0, 0.95)"
      }
    },
    "white": {
      "DEFAULT": {
        "value": "#ffffff"
      },
      "a1": {
        "value": "rgba(255, 255, 255, 0.05)"
      },
      "a2": {
        "value": "rgba(255, 255, 255, 0.1)"
      },
      "a3": {
        "value": "rgba(255, 255, 255, 0.15)"
      },
      "a4": {
        "value": "rgba(255, 255, 255, 0.2)"
      },
      "a5": {
        "value": "rgba(255, 255, 255, 0.3)"
      },
      "a6": {
        "value": "rgba(255, 255, 255, 0.4)"
      },
      "a7": {
        "value": "rgba(255, 255, 255, 0.5)"
      },
      "a8": {
        "value": "rgba(255, 255, 255, 0.6)"
      },
      "a9": {
        "value": "rgba(255, 255, 255, 0.7)"
      },
      "a10": {
        "value": "rgba(255, 255, 255, 0.8)"
      },
      "a11": {
        "value": "rgba(255, 255, 255, 0.9)"
      },
      "a12": {
        "value": "rgba(255, 255, 255, 0.95)"
      }
    },
    "transparent": {
      "value": "rgb(0 0 0 / 0)"
    },
    "gray": {
      "light": {
        "1": {
          "value": "#fdfdfc"
        },
        "2": {
          "value": "#f9f9f8"
        },
        "3": {
          "value": "#f1f0ef"
        },
        "4": {
          "value": "#e9e8e6"
        },
        "5": {
          "value": "#e2e1de"
        },
        "6": {
          "value": "#dad9d6"
        },
        "7": {
          "value": "#cfceca"
        },
        "8": {
          "value": "#bcbbb5"
        },
        "9": {
          "value": "#8d8d86"
        },
        "10": {
          "value": "#82827c"
        },
        "11": {
          "value": "#63635e"
        },
        "12": {
          "value": "#21201c"
        },
        "a1": {
          "value": "#55550003"
        },
        "a2": {
          "value": "#25250007"
        },
        "a3": {
          "value": "#20100010"
        },
        "a4": {
          "value": "#1f150019"
        },
        "a5": {
          "value": "#1f180021"
        },
        "a6": {
          "value": "#19130029"
        },
        "a7": {
          "value": "#19140035"
        },
        "a8": {
          "value": "#1915014a"
        },
        "a9": {
          "value": "#0f0f0079"
        },
        "a10": {
          "value": "#0c0c0083"
        },
        "a11": {
          "value": "#080800a1"
        },
        "a12": {
          "value": "#060500e3"
        }
      },
      "dark": {
        "1": {
          "value": "#111110"
        },
        "2": {
          "value": "#191918"
        },
        "3": {
          "value": "#222221"
        },
        "4": {
          "value": "#2a2a28"
        },
        "5": {
          "value": "#31312e"
        },
        "6": {
          "value": "#3b3a37"
        },
        "7": {
          "value": "#494844"
        },
        "8": {
          "value": "#62605b"
        },
        "9": {
          "value": "#6f6d66"
        },
        "10": {
          "value": "#7c7b74"
        },
        "11": {
          "value": "#b5b3ad"
        },
        "12": {
          "value": "#eeeeec"
        },
        "a1": {
          "value": "#00000000"
        },
        "a2": {
          "value": "#f4f4f309"
        },
        "a3": {
          "value": "#f6f6f513"
        },
        "a4": {
          "value": "#fefef31b"
        },
        "a5": {
          "value": "#fbfbeb23"
        },
        "a6": {
          "value": "#fffaed2d"
        },
        "a7": {
          "value": "#fffbed3c"
        },
        "a8": {
          "value": "#fff9eb57"
        },
        "a9": {
          "value": "#fffae965"
        },
        "a10": {
          "value": "#fffdee73"
        },
        "a11": {
          "value": "#fffcf4b0"
        },
        "a12": {
          "value": "#fffffded"
        }
      }
    },
    "red": {
      "light": {
        "1": {
          "value": "#fffcfc"
        },
        "2": {
          "value": "#fff7f7"
        },
        "3": {
          "value": "#feebec"
        },
        "4": {
          "value": "#ffdbdc"
        },
        "5": {
          "value": "#ffcdce"
        },
        "6": {
          "value": "#fdbdbe"
        },
        "7": {
          "value": "#f4a9aa"
        },
        "8": {
          "value": "#eb8e90"
        },
        "9": {
          "value": "#e5484d"
        },
        "10": {
          "value": "#dc3e42"
        },
        "11": {
          "value": "#ce2c31"
        },
        "12": {
          "value": "#641723"
        },
        "a1": {
          "value": "#ff000003"
        },
        "a2": {
          "value": "#ff000008"
        },
        "a3": {
          "value": "#f3000d14"
        },
        "a4": {
          "value": "#ff000824"
        },
        "a5": {
          "value": "#ff000632"
        },
        "a6": {
          "value": "#f8000442"
        },
        "a7": {
          "value": "#df000356"
        },
        "a8": {
          "value": "#d2000571"
        },
        "a9": {
          "value": "#db0007b7"
        },
        "a10": {
          "value": "#d10005c1"
        },
        "a11": {
          "value": "#c40006d3"
        },
        "a12": {
          "value": "#55000de8"
        }
      },
      "dark": {
        "1": {
          "value": "#191111"
        },
        "2": {
          "value": "#201314"
        },
        "3": {
          "value": "#3b1219"
        },
        "4": {
          "value": "#500f1c"
        },
        "5": {
          "value": "#611623"
        },
        "6": {
          "value": "#72232d"
        },
        "7": {
          "value": "#8c333a"
        },
        "8": {
          "value": "#b54548"
        },
        "9": {
          "value": "#e5484d"
        },
        "10": {
          "value": "#ec5d5e"
        },
        "11": {
          "value": "#ff9592"
        },
        "12": {
          "value": "#ffd1d9"
        },
        "a1": {
          "value": "#f4121209"
        },
        "a2": {
          "value": "#f22f3e11"
        },
        "a3": {
          "value": "#ff173f2d"
        },
        "a4": {
          "value": "#fe0a3b44"
        },
        "a5": {
          "value": "#ff204756"
        },
        "a6": {
          "value": "#ff3e5668"
        },
        "a7": {
          "value": "#ff536184"
        },
        "a8": {
          "value": "#ff5d61b0"
        },
        "a9": {
          "value": "#fe4e54e4"
        },
        "a10": {
          "value": "#ff6465eb"
        },
        "a11": {
          "value": "#ff9592"
        },
        "a12": {
          "value": "#ffd1d9"
        }
      }
    },
    "sand": {
      "light": {
        "1": {
          "value": "#fdfdfc"
        },
        "2": {
          "value": "#f9f9f8"
        },
        "3": {
          "value": "#f1f0ef"
        },
        "4": {
          "value": "#e9e8e6"
        },
        "5": {
          "value": "#e2e1de"
        },
        "6": {
          "value": "#dad9d6"
        },
        "7": {
          "value": "#cfceca"
        },
        "8": {
          "value": "#bcbbb5"
        },
        "9": {
          "value": "#8d8d86"
        },
        "10": {
          "value": "#82827c"
        },
        "11": {
          "value": "#63635e"
        },
        "12": {
          "value": "#21201c"
        },
        "a1": {
          "value": "#55550003"
        },
        "a2": {
          "value": "#25250007"
        },
        "a3": {
          "value": "#20100010"
        },
        "a4": {
          "value": "#1f150019"
        },
        "a5": {
          "value": "#1f180021"
        },
        "a6": {
          "value": "#19130029"
        },
        "a7": {
          "value": "#19140035"
        },
        "a8": {
          "value": "#1915014a"
        },
        "a9": {
          "value": "#0f0f0079"
        },
        "a10": {
          "value": "#0c0c0083"
        },
        "a11": {
          "value": "#080800a1"
        },
        "a12": {
          "value": "#060500e3"
        }
      },
      "dark": {
        "1": {
          "value": "#111110"
        },
        "2": {
          "value": "#191918"
        },
        "3": {
          "value": "#222221"
        },
        "4": {
          "value": "#2a2a28"
        },
        "5": {
          "value": "#31312e"
        },
        "6": {
          "value": "#3b3a37"
        },
        "7": {
          "value": "#494844"
        },
        "8": {
          "value": "#62605b"
        },
        "9": {
          "value": "#6f6d66"
        },
        "10": {
          "value": "#7c7b74"
        },
        "11": {
          "value": "#b5b3ad"
        },
        "12": {
          "value": "#eeeeec"
        },
        "a1": {
          "value": "#00000000"
        },
        "a2": {
          "value": "#f4f4f309"
        },
        "a3": {
          "value": "#f6f6f513"
        },
        "a4": {
          "value": "#fefef31b"
        },
        "a5": {
          "value": "#fbfbeb23"
        },
        "a6": {
          "value": "#fffaed2d"
        },
        "a7": {
          "value": "#fffbed3c"
        },
        "a8": {
          "value": "#fff9eb57"
        },
        "a9": {
          "value": "#fffae965"
        },
        "a10": {
          "value": "#fffdee73"
        },
        "a11": {
          "value": "#fffcf4b0"
        },
        "a12": {
          "value": "#fffffded"
        }
      }
    },
    "tomato": {
      "light": {
        "1": {
          "value": "#fffcfc"
        },
        "2": {
          "value": "#fff8f7"
        },
        "3": {
          "value": "#feebe7"
        },
        "4": {
          "value": "#ffdcd3"
        },
        "5": {
          "value": "#ffcdc2"
        },
        "6": {
          "value": "#fdbdaf"
        },
        "7": {
          "value": "#f5a898"
        },
        "8": {
          "value": "#ec8e7b"
        },
        "9": {
          "value": "#e54d2e"
        },
        "10": {
          "value": "#dd4425"
        },
        "11": {
          "value": "#d13415"
        },
        "12": {
          "value": "#5c271f"
        },
        "a1": {
          "value": "#ff000003"
        },
        "a2": {
          "value": "#ff200008"
        },
        "a3": {
          "value": "#f52b0018"
        },
        "a4": {
          "value": "#ff35002c"
        },
        "a5": {
          "value": "#ff2e003d"
        },
        "a6": {
          "value": "#f92d0050"
        },
        "a7": {
          "value": "#e7280067"
        },
        "a8": {
          "value": "#db250084"
        },
        "a9": {
          "value": "#df2600d1"
        },
        "a10": {
          "value": "#d72400da"
        },
        "a11": {
          "value": "#cd2200ea"
        },
        "a12": {
          "value": "#460900e0"
        }
      },
      "dark": {
        "1": {
          "value": "#181111"
        },
        "2": {
          "value": "#1f1513"
        },
        "3": {
          "value": "#391714"
        },
        "4": {
          "value": "#4e1511"
        },
        "5": {
          "value": "#5e1c16"
        },
        "6": {
          "value": "#6e2920"
        },
        "7": {
          "value": "#853a2d"
        },
        "8": {
          "value": "#ac4d39"
        },
        "9": {
          "value": "#e54d2e"
        },
        "10": {
          "value": "#ec6142"
        },
        "11": {
          "value": "#ff977d"
        },
        "12": {
          "value": "#fbd3cb"
        },
        "a1": {
          "value": "#f1121208"
        },
        "a2": {
          "value": "#ff55330f"
        },
        "a3": {
          "value": "#ff35232b"
        },
        "a4": {
          "value": "#fd201142"
        },
        "a5": {
          "value": "#fe332153"
        },
        "a6": {
          "value": "#ff4f3864"
        },
        "a7": {
          "value": "#fd644a7d"
        },
        "a8": {
          "value": "#fe6d4ea7"
        },
        "a9": {
          "value": "#fe5431e4"
        },
        "a10": {
          "value": "#ff6847eb"
        },
        "a11": {
          "value": "#ff977d"
        },
        "a12": {
          "value": "#ffd6cefb"
        }
      }
    }
  },
  "durations": {
    "fastest": {
      "value": "50ms"
    },
    "faster": {
      "value": "100ms"
    },
    "fast": {
      "value": "150ms"
    },
    "normal": {
      "value": "200ms"
    },
    "slow": {
      "value": "300ms"
    },
    "slower": {
      "value": "400ms"
    },
    "slowest": {
      "value": "500ms"
    }
  },
  "easings": {
    "pulse": {
      "value": "cubic-bezier(0.4, 0.0, 0.6, 1.0)"
    },
    "default": {
      "value": "cubic-bezier(0.2, 0.0, 0, 1.0)"
    },
    "emphasized-in": {
      "value": "cubic-bezier(0.05, 0.7, 0.1, 1.0)"
    },
    "emphasized-out": {
      "value": "cubic-bezier(0.3, 0.0, 0.8, 0.15)"
    }
  },
  "fonts": {
    "sans": {
      "value": [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "\"Segoe UI\"",
        "Roboto",
        "\"Helvetica Neue\"",
        "Arial",
        "\"Noto Sans\"",
        "sans-serif",
        "\"Apple Color Emoji\"",
        "\"Segoe UI Emoji\"",
        "\"Segoe UI Symbol\"",
        "\"Noto Color Emoji\""
      ]
    },
    "serif": {
      "value": [
        "ui-serif",
        "Georgia",
        "Cambria",
        "\"Times New Roman\"",
        "Times",
        "serif"
      ]
    },
    "mono": {
      "value": [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "\"Liberation Mono\"",
        "\"Courier New\"",
        "monospace"
      ]
    }
  },
  "fontSizes": {
    "2xs": {
      "value": "0.5rem"
    },
    "xs": {
      "value": "0.75rem"
    },
    "sm": {
      "value": "0.875rem"
    },
    "md": {
      "value": "1rem"
    },
    "lg": {
      "value": "1.125rem"
    },
    "xl": {
      "value": "1.25rem"
    },
    "2xl": {
      "value": "1.5rem"
    },
    "3xl": {
      "value": "1.875rem"
    },
    "4xl": {
      "value": "2.25rem"
    },
    "5xl": {
      "value": "3rem"
    },
    "6xl": {
      "value": "3.75rem"
    },
    "7xl": {
      "value": "4.5rem"
    },
    "8xl": {
      "value": "6rem"
    },
    "9xl": {
      "value": "8rem"
    }
  },
  "fontWeights": {
    "thin": {
      "value": "100"
    },
    "extralight": {
      "value": "200"
    },
    "light": {
      "value": "300"
    },
    "normal": {
      "value": "400"
    },
    "medium": {
      "value": "500"
    },
    "semibold": {
      "value": "600"
    },
    "bold": {
      "value": "700"
    },
    "extrabold": {
      "value": "800"
    },
    "black": {
      "value": "900"
    }
  },
  "letterSpacings": {
    "tighter": {
      "value": "-0.05em"
    },
    "tight": {
      "value": "-0.025em"
    },
    "normal": {
      "value": "0em"
    },
    "wide": {
      "value": "0.025em"
    },
    "wider": {
      "value": "0.05em"
    },
    "widest": {
      "value": "0.1em"
    }
  },
  "lineHeights": {
    "none": {
      "value": "1"
    },
    "tight": {
      "value": "1.25"
    },
    "normal": {
      "value": "1.5"
    },
    "relaxed": {
      "value": "1.75"
    },
    "loose": {
      "value": "2"
    }
  },
  "radii": {
    "none": {
      "value": "0"
    },
    "2xs": {
      "value": "0.0625rem"
    },
    "xs": {
      "value": "0.125rem"
    },
    "sm": {
      "value": "0.25rem"
    },
    "md": {
      "value": "0.375rem"
    },
    "lg": {
      "value": "0.5rem"
    },
    "xl": {
      "value": "0.75rem"
    },
    "2xl": {
      "value": "1rem"
    },
    "3xl": {
      "value": "1.5rem"
    },
    "full": {
      "value": "9999px"
    }
  },
  "sizes": {
    "0": {
      "value": "0rem"
    },
    "1": {
      "value": "0.25rem"
    },
    "2": {
      "value": "0.5rem"
    },
    "3": {
      "value": "0.75rem"
    },
    "4": {
      "value": "1rem"
    },
    "5": {
      "value": "1.25rem"
    },
    "6": {
      "value": "1.5rem"
    },
    "7": {
      "value": "1.75rem"
    },
    "8": {
      "value": "2rem"
    },
    "9": {
      "value": "2.25rem"
    },
    "10": {
      "value": "2.5rem"
    },
    "11": {
      "value": "2.75rem"
    },
    "12": {
      "value": "3rem"
    },
    "14": {
      "value": "3.5rem"
    },
    "16": {
      "value": "4rem"
    },
    "20": {
      "value": "5rem"
    },
    "24": {
      "value": "6rem"
    },
    "28": {
      "value": "7rem"
    },
    "32": {
      "value": "8rem"
    },
    "36": {
      "value": "9rem"
    },
    "40": {
      "value": "10rem"
    },
    "44": {
      "value": "11rem"
    },
    "48": {
      "value": "12rem"
    },
    "52": {
      "value": "13rem"
    },
    "56": {
      "value": "14rem"
    },
    "60": {
      "value": "15rem"
    },
    "64": {
      "value": "16rem"
    },
    "72": {
      "value": "18rem"
    },
    "80": {
      "value": "20rem"
    },
    "96": {
      "value": "24rem"
    },
    "0.5": {
      "value": "0.125rem"
    },
    "1.5": {
      "value": "0.375rem"
    },
    "2.5": {
      "value": "0.625rem"
    },
    "3.5": {
      "value": "0.875rem"
    },
    "4.5": {
      "value": "1.125rem"
    },
    "2xs": {
      "value": "16rem"
    },
    "xs": {
      "value": "20rem"
    },
    "sm": {
      "value": "24rem"
    },
    "md": {
      "value": "28rem"
    },
    "lg": {
      "value": "32rem"
    },
    "xl": {
      "value": "36rem"
    },
    "2xl": {
      "value": "42rem"
    },
    "3xl": {
      "value": "48rem"
    },
    "4xl": {
      "value": "56rem"
    },
    "5xl": {
      "value": "64rem"
    },
    "6xl": {
      "value": "72rem"
    },
    "7xl": {
      "value": "80rem"
    },
    "8xl": {
      "value": "90rem"
    },
    "full": {
      "value": "100%"
    },
    "min": {
      "value": "min-content"
    },
    "max": {
      "value": "max-content"
    },
    "fit": {
      "value": "fit-content"
    }
  },
  "spacing": {
    "0": {
      "value": "0rem"
    },
    "1": {
      "value": "0.25rem"
    },
    "2": {
      "value": "0.5rem"
    },
    "3": {
      "value": "0.75rem"
    },
    "4": {
      "value": "1rem"
    },
    "5": {
      "value": "1.25rem"
    },
    "6": {
      "value": "1.5rem"
    },
    "7": {
      "value": "1.75rem"
    },
    "8": {
      "value": "2rem"
    },
    "9": {
      "value": "2.25rem"
    },
    "10": {
      "value": "2.5rem"
    },
    "11": {
      "value": "2.75rem"
    },
    "12": {
      "value": "3rem"
    },
    "14": {
      "value": "3.5rem"
    },
    "16": {
      "value": "4rem"
    },
    "20": {
      "value": "5rem"
    },
    "24": {
      "value": "6rem"
    },
    "28": {
      "value": "7rem"
    },
    "32": {
      "value": "8rem"
    },
    "36": {
      "value": "9rem"
    },
    "40": {
      "value": "10rem"
    },
    "44": {
      "value": "11rem"
    },
    "48": {
      "value": "12rem"
    },
    "52": {
      "value": "13rem"
    },
    "56": {
      "value": "14rem"
    },
    "60": {
      "value": "15rem"
    },
    "64": {
      "value": "16rem"
    },
    "72": {
      "value": "18rem"
    },
    "80": {
      "value": "20rem"
    },
    "96": {
      "value": "24rem"
    },
    "0.5": {
      "value": "0.125rem"
    },
    "1.5": {
      "value": "0.375rem"
    },
    "2.5": {
      "value": "0.625rem"
    },
    "3.5": {
      "value": "0.875rem"
    },
    "4.5": {
      "value": "1.125rem"
    }
  },
  "zIndex": {
    "hide": {
      "value": -1
    },
    "base": {
      "value": 0
    },
    "docked": {
      "value": 10
    },
    "dropdown": {
      "value": 1000
    },
    "sticky": {
      "value": 1100
    },
    "banner": {
      "value": 1200
    },
    "overlay": {
      "value": 1300
    },
    "modal": {
      "value": 1400
    },
    "popover": {
      "value": 1500
    },
    "skipLink": {
      "value": 1600
    },
    "toast": {
      "value": 1700
    },
    "tooltip": {
      "value": 1800
    }
  }
},
      semanticTokens: {
  "colors": {
    "red": {
      "1": {
        "value": {
          "_light": "{colors.red.light.1}",
          "_dark": "{colors.red.dark.1}"
        }
      },
      "2": {
        "value": {
          "_light": "{colors.red.light.2}",
          "_dark": "{colors.red.dark.2}"
        }
      },
      "3": {
        "value": {
          "_light": "{colors.red.light.3}",
          "_dark": "{colors.red.dark.3}"
        }
      },
      "4": {
        "value": {
          "_light": "{colors.red.light.4}",
          "_dark": "{colors.red.dark.4}"
        }
      },
      "5": {
        "value": {
          "_light": "{colors.red.light.5}",
          "_dark": "{colors.red.dark.5}"
        }
      },
      "6": {
        "value": {
          "_light": "{colors.red.light.6}",
          "_dark": "{colors.red.dark.6}"
        }
      },
      "7": {
        "value": {
          "_light": "{colors.red.light.7}",
          "_dark": "{colors.red.dark.7}"
        }
      },
      "8": {
        "value": {
          "_light": "{colors.red.light.8}",
          "_dark": "{colors.red.dark.8}"
        }
      },
      "9": {
        "value": {
          "_light": "{colors.red.light.9}",
          "_dark": "{colors.red.dark.9}"
        }
      },
      "10": {
        "value": {
          "_light": "{colors.red.light.10}",
          "_dark": "{colors.red.dark.10}"
        }
      },
      "11": {
        "value": {
          "_light": "{colors.red.light.11}",
          "_dark": "{colors.red.dark.11}"
        }
      },
      "12": {
        "value": {
          "_light": "{colors.red.light.12}",
          "_dark": "{colors.red.dark.12}"
        }
      },
      "a1": {
        "value": {
          "_light": "{colors.red.light.a1}",
          "_dark": "{colors.red.dark.a1}"
        }
      },
      "a2": {
        "value": {
          "_light": "{colors.red.light.a2}",
          "_dark": "{colors.red.dark.a2}"
        }
      },
      "a3": {
        "value": {
          "_light": "{colors.red.light.a3}",
          "_dark": "{colors.red.dark.a3}"
        }
      },
      "a4": {
        "value": {
          "_light": "{colors.red.light.a4}",
          "_dark": "{colors.red.dark.a4}"
        }
      },
      "a5": {
        "value": {
          "_light": "{colors.red.light.a5}",
          "_dark": "{colors.red.dark.a5}"
        }
      },
      "a6": {
        "value": {
          "_light": "{colors.red.light.a6}",
          "_dark": "{colors.red.dark.a6}"
        }
      },
      "a7": {
        "value": {
          "_light": "{colors.red.light.a7}",
          "_dark": "{colors.red.dark.a7}"
        }
      },
      "a8": {
        "value": {
          "_light": "{colors.red.light.a8}",
          "_dark": "{colors.red.dark.a8}"
        }
      },
      "a9": {
        "value": {
          "_light": "{colors.red.light.a9}",
          "_dark": "{colors.red.dark.a9}"
        }
      },
      "a10": {
        "value": {
          "_light": "{colors.red.light.a10}",
          "_dark": "{colors.red.dark.a10}"
        }
      },
      "a11": {
        "value": {
          "_light": "{colors.red.light.a11}",
          "_dark": "{colors.red.dark.a11}"
        }
      },
      "a12": {
        "value": {
          "_light": "{colors.red.light.a12}",
          "_dark": "{colors.red.dark.a12}"
        }
      },
      "default": {
        "value": {
          "_light": "{colors.red.9}",
          "_dark": "{colors.red.9}"
        }
      },
      "emphasized": {
        "value": {
          "_light": "{colors.red.10}",
          "_dark": "{colors.red.10}"
        }
      },
      "fg": {
        "value": {
          "_light": "white",
          "_dark": "white"
        }
      },
      "text": {
        "value": {
          "_light": "{colors.red.a11}",
          "_dark": "{colors.red.a11}"
        }
      }
    },
    "sand": {
      "1": {
        "value": {
          "_light": "{colors.sand.light.1}",
          "_dark": "{colors.sand.dark.1}"
        }
      },
      "2": {
        "value": {
          "_light": "{colors.sand.light.2}",
          "_dark": "{colors.sand.dark.2}"
        }
      },
      "3": {
        "value": {
          "_light": "{colors.sand.light.3}",
          "_dark": "{colors.sand.dark.3}"
        }
      },
      "4": {
        "value": {
          "_light": "{colors.sand.light.4}",
          "_dark": "{colors.sand.dark.4}"
        }
      },
      "5": {
        "value": {
          "_light": "{colors.sand.light.5}",
          "_dark": "{colors.sand.dark.5}"
        }
      },
      "6": {
        "value": {
          "_light": "{colors.sand.light.6}",
          "_dark": "{colors.sand.dark.6}"
        }
      },
      "7": {
        "value": {
          "_light": "{colors.sand.light.7}",
          "_dark": "{colors.sand.dark.7}"
        }
      },
      "8": {
        "value": {
          "_light": "{colors.sand.light.8}",
          "_dark": "{colors.sand.dark.8}"
        }
      },
      "9": {
        "value": {
          "_light": "{colors.sand.light.9}",
          "_dark": "{colors.sand.dark.9}"
        }
      },
      "10": {
        "value": {
          "_light": "{colors.sand.light.10}",
          "_dark": "{colors.sand.dark.10}"
        }
      },
      "11": {
        "value": {
          "_light": "{colors.sand.light.11}",
          "_dark": "{colors.sand.dark.11}"
        }
      },
      "12": {
        "value": {
          "_light": "{colors.sand.light.12}",
          "_dark": "{colors.sand.dark.12}"
        }
      },
      "a1": {
        "value": {
          "_light": "{colors.sand.light.a1}",
          "_dark": "{colors.sand.dark.a1}"
        }
      },
      "a2": {
        "value": {
          "_light": "{colors.sand.light.a2}",
          "_dark": "{colors.sand.dark.a2}"
        }
      },
      "a3": {
        "value": {
          "_light": "{colors.sand.light.a3}",
          "_dark": "{colors.sand.dark.a3}"
        }
      },
      "a4": {
        "value": {
          "_light": "{colors.sand.light.a4}",
          "_dark": "{colors.sand.dark.a4}"
        }
      },
      "a5": {
        "value": {
          "_light": "{colors.sand.light.a5}",
          "_dark": "{colors.sand.dark.a5}"
        }
      },
      "a6": {
        "value": {
          "_light": "{colors.sand.light.a6}",
          "_dark": "{colors.sand.dark.a6}"
        }
      },
      "a7": {
        "value": {
          "_light": "{colors.sand.light.a7}",
          "_dark": "{colors.sand.dark.a7}"
        }
      },
      "a8": {
        "value": {
          "_light": "{colors.sand.light.a8}",
          "_dark": "{colors.sand.dark.a8}"
        }
      },
      "a9": {
        "value": {
          "_light": "{colors.sand.light.a9}",
          "_dark": "{colors.sand.dark.a9}"
        }
      },
      "a10": {
        "value": {
          "_light": "{colors.sand.light.a10}",
          "_dark": "{colors.sand.dark.a10}"
        }
      },
      "a11": {
        "value": {
          "_light": "{colors.sand.light.a11}",
          "_dark": "{colors.sand.dark.a11}"
        }
      },
      "a12": {
        "value": {
          "_light": "{colors.sand.light.a12}",
          "_dark": "{colors.sand.dark.a12}"
        }
      },
      "default": {
        "value": {
          "_light": "{colors.sand.9}",
          "_dark": "{colors.sand.9}"
        }
      },
      "emphasized": {
        "value": {
          "_light": "{colors.sand.10}",
          "_dark": "{colors.sand.10}"
        }
      },
      "fg": {
        "value": {
          "_light": "white",
          "_dark": "white"
        }
      },
      "text": {
        "value": {
          "_light": "{colors.sand.12}",
          "_dark": "{colors.sand.12}"
        }
      }
    },
    "tomato": {
      "1": {
        "value": {
          "_light": "{colors.tomato.light.1}",
          "_dark": "{colors.tomato.dark.1}"
        }
      },
      "2": {
        "value": {
          "_light": "{colors.tomato.light.2}",
          "_dark": "{colors.tomato.dark.2}"
        }
      },
      "3": {
        "value": {
          "_light": "{colors.tomato.light.3}",
          "_dark": "{colors.tomato.dark.3}"
        }
      },
      "4": {
        "value": {
          "_light": "{colors.tomato.light.4}",
          "_dark": "{colors.tomato.dark.4}"
        }
      },
      "5": {
        "value": {
          "_light": "{colors.tomato.light.5}",
          "_dark": "{colors.tomato.dark.5}"
        }
      },
      "6": {
        "value": {
          "_light": "{colors.tomato.light.6}",
          "_dark": "{colors.tomato.dark.6}"
        }
      },
      "7": {
        "value": {
          "_light": "{colors.tomato.light.7}",
          "_dark": "{colors.tomato.dark.7}"
        }
      },
      "8": {
        "value": {
          "_light": "{colors.tomato.light.8}",
          "_dark": "{colors.tomato.dark.8}"
        }
      },
      "9": {
        "value": {
          "_light": "{colors.tomato.light.9}",
          "_dark": "{colors.tomato.dark.9}"
        }
      },
      "10": {
        "value": {
          "_light": "{colors.tomato.light.10}",
          "_dark": "{colors.tomato.dark.10}"
        }
      },
      "11": {
        "value": {
          "_light": "{colors.tomato.light.11}",
          "_dark": "{colors.tomato.dark.11}"
        }
      },
      "12": {
        "value": {
          "_light": "{colors.tomato.light.12}",
          "_dark": "{colors.tomato.dark.12}"
        }
      },
      "a1": {
        "value": {
          "_light": "{colors.tomato.light.a1}",
          "_dark": "{colors.tomato.dark.a1}"
        }
      },
      "a2": {
        "value": {
          "_light": "{colors.tomato.light.a2}",
          "_dark": "{colors.tomato.dark.a2}"
        }
      },
      "a3": {
        "value": {
          "_light": "{colors.tomato.light.a3}",
          "_dark": "{colors.tomato.dark.a3}"
        }
      },
      "a4": {
        "value": {
          "_light": "{colors.tomato.light.a4}",
          "_dark": "{colors.tomato.dark.a4}"
        }
      },
      "a5": {
        "value": {
          "_light": "{colors.tomato.light.a5}",
          "_dark": "{colors.tomato.dark.a5}"
        }
      },
      "a6": {
        "value": {
          "_light": "{colors.tomato.light.a6}",
          "_dark": "{colors.tomato.dark.a6}"
        }
      },
      "a7": {
        "value": {
          "_light": "{colors.tomato.light.a7}",
          "_dark": "{colors.tomato.dark.a7}"
        }
      },
      "a8": {
        "value": {
          "_light": "{colors.tomato.light.a8}",
          "_dark": "{colors.tomato.dark.a8}"
        }
      },
      "a9": {
        "value": {
          "_light": "{colors.tomato.light.a9}",
          "_dark": "{colors.tomato.dark.a9}"
        }
      },
      "a10": {
        "value": {
          "_light": "{colors.tomato.light.a10}",
          "_dark": "{colors.tomato.dark.a10}"
        }
      },
      "a11": {
        "value": {
          "_light": "{colors.tomato.light.a11}",
          "_dark": "{colors.tomato.dark.a11}"
        }
      },
      "a12": {
        "value": {
          "_light": "{colors.tomato.light.a12}",
          "_dark": "{colors.tomato.dark.a12}"
        }
      },
      "default": {
        "value": {
          "_light": "{colors.tomato.9}",
          "_dark": "{colors.tomato.9}"
        }
      },
      "emphasized": {
        "value": {
          "_light": "{colors.tomato.10}",
          "_dark": "{colors.tomato.10}"
        }
      },
      "fg": {
        "value": {
          "_light": "white",
          "_dark": "white"
        }
      },
      "text": {
        "value": {
          "_light": "{colors.tomato.a11}",
          "_dark": "{colors.tomato.a11}"
        }
      }
    },
    "gray": {
      "1": {
        "value": {
          "_light": "{colors.sand.light.1}",
          "_dark": "{colors.sand.dark.1}"
        }
      },
      "2": {
        "value": {
          "_light": "{colors.sand.light.2}",
          "_dark": "{colors.sand.dark.2}"
        }
      },
      "3": {
        "value": {
          "_light": "{colors.sand.light.3}",
          "_dark": "{colors.sand.dark.3}"
        }
      },
      "4": {
        "value": {
          "_light": "{colors.sand.light.4}",
          "_dark": "{colors.sand.dark.4}"
        }
      },
      "5": {
        "value": {
          "_light": "{colors.sand.light.5}",
          "_dark": "{colors.sand.dark.5}"
        }
      },
      "6": {
        "value": {
          "_light": "{colors.sand.light.6}",
          "_dark": "{colors.sand.dark.6}"
        }
      },
      "7": {
        "value": {
          "_light": "{colors.sand.light.7}",
          "_dark": "{colors.sand.dark.7}"
        }
      },
      "8": {
        "value": {
          "_light": "{colors.sand.light.8}",
          "_dark": "{colors.sand.dark.8}"
        }
      },
      "9": {
        "value": {
          "_light": "{colors.sand.light.9}",
          "_dark": "{colors.sand.dark.9}"
        }
      },
      "10": {
        "value": {
          "_light": "{colors.sand.light.10}",
          "_dark": "{colors.sand.dark.10}"
        }
      },
      "11": {
        "value": {
          "_light": "{colors.sand.light.11}",
          "_dark": "{colors.sand.dark.11}"
        }
      },
      "12": {
        "value": {
          "_light": "{colors.sand.light.12}",
          "_dark": "{colors.sand.dark.12}"
        }
      },
      "a1": {
        "value": {
          "_light": "{colors.sand.light.a1}",
          "_dark": "{colors.sand.dark.a1}"
        }
      },
      "a2": {
        "value": {
          "_light": "{colors.sand.light.a2}",
          "_dark": "{colors.sand.dark.a2}"
        }
      },
      "a3": {
        "value": {
          "_light": "{colors.sand.light.a3}",
          "_dark": "{colors.sand.dark.a3}"
        }
      },
      "a4": {
        "value": {
          "_light": "{colors.sand.light.a4}",
          "_dark": "{colors.sand.dark.a4}"
        }
      },
      "a5": {
        "value": {
          "_light": "{colors.sand.light.a5}",
          "_dark": "{colors.sand.dark.a5}"
        }
      },
      "a6": {
        "value": {
          "_light": "{colors.sand.light.a6}",
          "_dark": "{colors.sand.dark.a6}"
        }
      },
      "a7": {
        "value": {
          "_light": "{colors.sand.light.a7}",
          "_dark": "{colors.sand.dark.a7}"
        }
      },
      "a8": {
        "value": {
          "_light": "{colors.sand.light.a8}",
          "_dark": "{colors.sand.dark.a8}"
        }
      },
      "a9": {
        "value": {
          "_light": "{colors.sand.light.a9}",
          "_dark": "{colors.sand.dark.a9}"
        }
      },
      "a10": {
        "value": {
          "_light": "{colors.sand.light.a10}",
          "_dark": "{colors.sand.dark.a10}"
        }
      },
      "a11": {
        "value": {
          "_light": "{colors.sand.light.a11}",
          "_dark": "{colors.sand.dark.a11}"
        }
      },
      "a12": {
        "value": {
          "_light": "{colors.sand.light.a12}",
          "_dark": "{colors.sand.dark.a12}"
        }
      },
      "default": {
        "value": {
          "_light": "{colors.sand.9}",
          "_dark": "{colors.sand.9}"
        }
      },
      "emphasized": {
        "value": {
          "_light": "{colors.sand.10}",
          "_dark": "{colors.sand.10}"
        }
      },
      "fg": {
        "value": {
          "_light": "white",
          "_dark": "white"
        }
      },
      "text": {
        "value": {
          "_light": "{colors.sand.12}",
          "_dark": "{colors.sand.12}"
        }
      }
    },
    "accent": {
      "1": {
        "value": {
          "_light": "{colors.tomato.light.1}",
          "_dark": "{colors.tomato.dark.1}"
        }
      },
      "2": {
        "value": {
          "_light": "{colors.tomato.light.2}",
          "_dark": "{colors.tomato.dark.2}"
        }
      },
      "3": {
        "value": {
          "_light": "{colors.tomato.light.3}",
          "_dark": "{colors.tomato.dark.3}"
        }
      },
      "4": {
        "value": {
          "_light": "{colors.tomato.light.4}",
          "_dark": "{colors.tomato.dark.4}"
        }
      },
      "5": {
        "value": {
          "_light": "{colors.tomato.light.5}",
          "_dark": "{colors.tomato.dark.5}"
        }
      },
      "6": {
        "value": {
          "_light": "{colors.tomato.light.6}",
          "_dark": "{colors.tomato.dark.6}"
        }
      },
      "7": {
        "value": {
          "_light": "{colors.tomato.light.7}",
          "_dark": "{colors.tomato.dark.7}"
        }
      },
      "8": {
        "value": {
          "_light": "{colors.tomato.light.8}",
          "_dark": "{colors.tomato.dark.8}"
        }
      },
      "9": {
        "value": {
          "_light": "{colors.tomato.light.9}",
          "_dark": "{colors.tomato.dark.9}"
        }
      },
      "10": {
        "value": {
          "_light": "{colors.tomato.light.10}",
          "_dark": "{colors.tomato.dark.10}"
        }
      },
      "11": {
        "value": {
          "_light": "{colors.tomato.light.11}",
          "_dark": "{colors.tomato.dark.11}"
        }
      },
      "12": {
        "value": {
          "_light": "{colors.tomato.light.12}",
          "_dark": "{colors.tomato.dark.12}"
        }
      },
      "a1": {
        "value": {
          "_light": "{colors.tomato.light.a1}",
          "_dark": "{colors.tomato.dark.a1}"
        }
      },
      "a2": {
        "value": {
          "_light": "{colors.tomato.light.a2}",
          "_dark": "{colors.tomato.dark.a2}"
        }
      },
      "a3": {
        "value": {
          "_light": "{colors.tomato.light.a3}",
          "_dark": "{colors.tomato.dark.a3}"
        }
      },
      "a4": {
        "value": {
          "_light": "{colors.tomato.light.a4}",
          "_dark": "{colors.tomato.dark.a4}"
        }
      },
      "a5": {
        "value": {
          "_light": "{colors.tomato.light.a5}",
          "_dark": "{colors.tomato.dark.a5}"
        }
      },
      "a6": {
        "value": {
          "_light": "{colors.tomato.light.a6}",
          "_dark": "{colors.tomato.dark.a6}"
        }
      },
      "a7": {
        "value": {
          "_light": "{colors.tomato.light.a7}",
          "_dark": "{colors.tomato.dark.a7}"
        }
      },
      "a8": {
        "value": {
          "_light": "{colors.tomato.light.a8}",
          "_dark": "{colors.tomato.dark.a8}"
        }
      },
      "a9": {
        "value": {
          "_light": "{colors.tomato.light.a9}",
          "_dark": "{colors.tomato.dark.a9}"
        }
      },
      "a10": {
        "value": {
          "_light": "{colors.tomato.light.a10}",
          "_dark": "{colors.tomato.dark.a10}"
        }
      },
      "a11": {
        "value": {
          "_light": "{colors.tomato.light.a11}",
          "_dark": "{colors.tomato.dark.a11}"
        }
      },
      "a12": {
        "value": {
          "_light": "{colors.tomato.light.a12}",
          "_dark": "{colors.tomato.dark.a12}"
        }
      },
      "default": {
        "value": {
          "_light": "{colors.tomato.9}",
          "_dark": "{colors.tomato.9}"
        }
      },
      "emphasized": {
        "value": {
          "_light": "{colors.tomato.10}",
          "_dark": "{colors.tomato.10}"
        }
      },
      "fg": {
        "value": {
          "_light": "white",
          "_dark": "white"
        }
      },
      "text": {
        "value": {
          "_light": "{colors.tomato.a11}",
          "_dark": "{colors.tomato.a11}"
        }
      }
    },
    "bg": {
      "canvas": {
        "value": {
          "_light": "{colors.gray.1}",
          "_dark": "{colors.gray.1}"
        }
      },
      "default": {
        "value": {
          "_light": "white",
          "_dark": "{colors.gray.2}"
        }
      },
      "subtle": {
        "value": {
          "_light": "{colors.gray.2}",
          "_dark": "{colors.gray.3}"
        }
      },
      "muted": {
        "value": {
          "_light": "{colors.gray.3}",
          "_dark": "{colors.gray.4}"
        }
      },
      "emphasized": {
        "value": {
          "_light": "{colors.gray.4}",
          "_dark": "{colors.gray.5}"
        }
      },
      "disabled": {
        "value": {
          "_light": "{colors.gray.5}",
          "_dark": "{colors.gray.6}"
        }
      }
    },
    "fg": {
      "default": {
        "value": {
          "_light": "{colors.gray.12}",
          "_dark": "{colors.gray.12}"
        }
      },
      "muted": {
        "value": {
          "_light": "{colors.gray.11}",
          "_dark": "{colors.gray.11}"
        }
      },
      "subtle": {
        "value": {
          "_light": "{colors.gray.10}",
          "_dark": "{colors.gray.10}"
        }
      },
      "disabled": {
        "value": {
          "_light": "{colors.gray.9}",
          "_dark": "{colors.gray.9}"
        }
      },
      "error": {
        "value": {
          "_light": "{colors.red.9}",
          "_dark": "{colors.red.9}"
        }
      }
    },
    "border": {
      "default": {
        "value": {
          "_light": "{colors.gray.7}",
          "_dark": "{colors.gray.7}"
        }
      },
      "muted": {
        "value": {
          "_light": "{colors.gray.6}",
          "_dark": "{colors.gray.6}"
        }
      },
      "subtle": {
        "value": {
          "_light": "{colors.gray.4}",
          "_dark": "{colors.gray.4}"
        }
      },
      "disabled": {
        "value": {
          "_light": "{colors.gray.5}",
          "_dark": "{colors.gray.5}"
        }
      },
      "outline": {
        "value": {
          "_light": "{colors.gray.a9}",
          "_dark": "{colors.gray.a9}"
        }
      },
      "error": {
        "value": {
          "_light": "{colors.red.9}",
          "_dark": "{colors.red.9}"
        }
      }
    }
  },
  "shadows": {
    "xs": {
      "value": {
        "_light": "0px 1px 2px {colors.gray.a5}, 0px 0px 1px {colors.gray.a7}",
        "_dark": "0px 1px 1px {colors.black.a12}, 0px 0px 1px inset {colors.gray.a7}"
      }
    },
    "sm": {
      "value": {
        "_light": "0px 2px 4px {colors.gray.a3}, 0px 0px 1px {colors.gray.a7}",
        "_dark": "0px 2px 4px {colors.black.a10}, 0px 0px 1px inset {colors.gray.a7}"
      }
    },
    "md": {
      "value": {
        "_light": "0px 4px 8px {colors.gray.a3}, 0px 0px 1px {colors.gray.a7}",
        "_dark": "0px 4px 8px {colors.black.a10}, 0px 0px 1px inset {colors.gray.a7}"
      }
    },
    "lg": {
      "value": {
        "_light": "0px 8px 16px {colors.gray.a3}, 0px 0px 1px {colors.gray.a7}",
        "_dark": "0px 8px 16px {colors.black.a10}, 0px 0px 1px inset {colors.gray.a7}"
      }
    },
    "xl": {
      "value": {
        "_light": "0px 16px 24px {colors.gray.a3}, 0px 0px 1px {colors.gray.a7}",
        "_dark": "0px 16px 24px {colors.black.a10}, 0px 0px 1px inset {colors.gray.a7}"
      }
    },
    "2xl": {
      "value": {
        "_light": "0px 24px 40px {colors.gray.a3}, 0px 0px 1px {colors.gray.a7}",
        "_dark": "0px 24px 40px {colors.black.a10}, 0px 0px 1px inset {colors.gray.a7}"
      }
    }
  },
  "radii": {
    "l1": {
      "value": "{radii.xs}"
    },
    "l2": {
      "value": "{radii.sm}"
    },
    "l3": {
      "value": "{radii.md}"
    }
  }
},
      keyframes: {
  "fade-in": {
    "from": {
      "opacity": "0"
    },
    "to": {
      "opacity": "1"
    }
  },
  "fade-out": {
    "from": {
      "opacity": "1"
    },
    "to": {
      "opacity": "0"
    }
  },
  "slide-in": {
    "0%": {
      "opacity": "0",
      "transform": "translateY(64px)"
    },
    "100%": {
      "opacity": "1",
      "transform": "translateY(0)"
    }
  },
  "slide-out": {
    "0%": {
      "opacity": "1",
      "transform": "translateY(0)"
    },
    "100%": {
      "opacity": "0",
      "transform": "translateY(64px)"
    }
  },
  "slide-in-left": {
    "0%": {
      "transform": "translateX(-100%)"
    },
    "100%": {
      "transform": "translateX(0%)"
    }
  },
  "slide-out-left": {
    "0%": {
      "transform": "translateX(0%)"
    },
    "100%": {
      "transform": "translateX(-100%)"
    }
  },
  "slide-in-right": {
    "0%": {
      "transform": "translateX(100%)"
    },
    "100%": {
      "transform": "translateX(0%)"
    }
  },
  "slide-out-right": {
    "0%": {
      "transform": "translateX(0%)"
    },
    "100%": {
      "transform": "translateX(100%)"
    }
  },
  "collapse-in": {
    "0%": {
      "height": "0"
    },
    "100%": {
      "height": "var(--height)"
    }
  },
  "collapse-out": {
    "0%": {
      "height": "var(--height)"
    },
    "100%": {
      "height": "0"
    }
  },
  "fadeIn": {
    "0%": {
      "opacity": "0",
      "transform": "translateY(-4px)"
    },
    "100%": {
      "opacity": "1",
      "transform": "translateY(0)"
    }
  },
  "fadeOut": {
    "0%": {
      "opacity": "1",
      "transform": "translateY(0)"
    },
    "100%": {
      "opacity": "0",
      "transform": "translateY(-4px)"
    }
  },
  "skeleton-pulse": {
    "50%": {
      "opacity": "0.5"
    }
  },
  "spin": {
    "0%": {
      "transform": "rotate(0deg)"
    },
    "100%": {
      "transform": "rotate(360deg)"
    }
  }
},
      textStyles: {
  "xs": {
    "value": {
      "fontSize": "xs",
      "lineHeight": "1.125rem"
    }
  },
  "sm": {
    "value": {
      "fontSize": "sm",
      "lineHeight": "1.25rem"
    }
  },
  "md": {
    "value": {
      "fontSize": "md",
      "lineHeight": "1.5rem"
    }
  },
  "lg": {
    "value": {
      "fontSize": "lg",
      "lineHeight": "1.75rem"
    }
  },
  "xl": {
    "value": {
      "fontSize": "xl",
      "lineHeight": "1.875rem"
    }
  },
  "2xl": {
    "value": {
      "fontSize": "2xl",
      "lineHeight": "2rem"
    }
  },
  "3xl": {
    "value": {
      "fontSize": "3xl",
      "lineHeight": "2.375rem"
    }
  },
  "4xl": {
    "value": {
      "fontSize": "4xl",
      "lineHeight": "2.75rem",
      "letterSpacing": "-0.02em"
    }
  },
  "5xl": {
    "value": {
      "fontSize": "5xl",
      "lineHeight": "3.75rem",
      "letterSpacing": "-0.02em"
    }
  },
  "6xl": {
    "value": {
      "fontSize": "6xl",
      "lineHeight": "4.5rem",
      "letterSpacing": "-0.02em"
    }
  },
  "7xl": {
    "value": {
      "fontSize": "7xl",
      "lineHeight": "5.75rem",
      "letterSpacing": "-0.02em"
    }
  }
},
    },
  },
});
