import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { HTMLAttributes, PropsWithChildren } from "react";
import { colors } from "style/theme";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  additionalCSS?: SerializedStyles;
}

function BaseButton({ children, additionalCSS, ...attrs }: PropsWithChildren<Props>) {
  return (
    <Button additionalCSS={additionalCSS} {...attrs}>
      {children}
    </Button>
  );
}

const Button = styled.button<Props>`
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border-radius: 6px;
  background-color: ${colors.pointColorGreen};

  color: white;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
  word-wrap: break-word;

  ${({ additionalCSS }) => additionalCSS && additionalCSS};
`;

export default BaseButton;
