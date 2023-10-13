import "@emotion/react";
import { ThemeType } from "style/theme";

declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}
