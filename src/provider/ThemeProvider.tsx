import { ThemeProvider } from "@emotion/react";
import React, { PropsWithChildren } from "react";

import { themeMode } from "style/theme";

function Index({ children }: PropsWithChildren) {
  return <ThemeProvider theme={themeMode("dark")}>{children}</ThemeProvider>;
}

export default Index;
