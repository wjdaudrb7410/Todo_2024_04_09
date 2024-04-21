import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/noto-sans-kr";
const theme = extendTheme({
  fonts: {
    heading: '"Noto Sans KR","sans-serif"',
    body: '"Noto Sans KR","sans-serif"',
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#eee", "#121212")(props),
      },
    }),
  },
});
export default theme;
