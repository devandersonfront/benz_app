import { Global, css, useTheme } from "@emotion/react";
import { useEffect } from "react";
import { deviceSize } from "./theme";

function GlobalStyle() {
  const theme = useTheme();

  // useEffect(() => {
  //   const html = document.querySelector("html");
  //   html && (html.style.backgroundColor = theme.backgroundColor);
  // }, [theme]);

  const globalCSS = css`
    :root {
      --zIndex-0st: 11000;
      --zIndex-1st: 10000;
      --zIndex-2st: 9000;
      --zIndex-3st: 8000;

      --header-height: 2.5rem;
      --option-btn-right: 1rem;
    }

    @font-face {
      font-family: "NotoSansKR";
      src: url("/fonts/NotoSans-Regular.woff") format("woff");
      font-style: normal;
      font-weight: normal;
      font-display: "";
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      word-break: keep-all;
    }

    html {
      font-size: 5px;

      @media screen and (min-width: ${deviceSize.tablet}) {
        font-size: 8px;
      }
    }
    body {
      font-family: "NotoSansKR", sans-serif;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
    }
    a {
      text-decoration: none;
      color: black;
    }
    ul {
      list-style-type: none;
    }
    img {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    button {
      border: none;
      background-color: transparent;
      border-radius: 1rem;
      cursor: pointer;
      &:active,
      &:focus {
        outline: none;
      }
    }
    input {
      outline: none;
      &:focus::placeholder {
        color: transparent;
      }
    }
  `;

  return <Global styles={[globalCSS]} />;
}

export default GlobalStyle;
