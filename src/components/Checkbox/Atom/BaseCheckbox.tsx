import { SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

interface Props {
  additionalCSS?: SerializedStyles;
  notifier?: (ischecked: boolean) => any;
}

function BaseCheckbox({ additionalCSS, notifier }: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const onClick = () => {
    const updateState = !isChecked;
    setIsChecked(updateState);
    notifier && notifier(updateState);
  };

  return (
    <CheckboxWrapper additionalCSS={additionalCSS}>
      <CheckLabel htmlFor="user-remember" onClick={onClick} className={`checkbox-label ${isChecked && "isChecked"}`} />
      <Checkbox type="checkbox" name="user-remember" className="checkbox-input" />
    </CheckboxWrapper>
  );
}

const CheckboxWrapper = styled.div<Pick<Props, "additionalCSS">>`
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  position: relative;

  ${({ additionalCSS }) => additionalCSS && additionalCSS}
`;
const Checkbox = styled.input`
  appearance: none;
`;
const CheckLabel = styled.label`
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid #7d8fa9;
  border-radius: 10%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  overflow: hidden;

  &.isChecked {
    &::after {
      content: "✔";
      width: 100%;
      height: 100%;
      font-size: 20px;
      text-align: center;
    }
  }
`;

export default BaseCheckbox;
