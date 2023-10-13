import { SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";
import { InputHTMLAttributes, LabelHTMLAttributes, forwardRef, useEffect, useRef, useState } from "react";

type Attributes = LabelHTMLAttributes<HTMLLabelElement> & InputHTMLAttributes<HTMLInputElement>;

export interface Props extends Attributes {
  initialValue?: string | number;
  labelText: string;
  isFirstInput?: boolean;
  additionalCSS?: SerializedStyles;
  notifier?: (value: string, ...args: any) => any;
}

const LabeledInput = (props: Props) => {
  const [value, setValue] = useState(props.initialValue ?? "");
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (props.isFirstInput) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <InputBox additionalCSS={props.additionalCSS}>
      <Label htmlFor={props.htmlFor}>{props.labelText}</Label>
      <Input
        value={value}
        ref={inputRef}
        placeholder={props.placeholder}
        id={props.htmlFor}
        onChange={(e) => {
          const _value = e.target.value;
          setValue(_value);
          props.notifier && props.notifier(_value);
        }}
      />
    </InputBox>
  );
};

const InputBox = styled.div<{ additionalCSS?: SerializedStyles }>`
  ${({ additionalCSS }) => additionalCSS && additionalCSS}
`;
const Label = styled.label`
  color: #eef0f4;
  font-size: 12px;
  font-family: Roboto;
  font-weight: 500;
  word-wrap: break-word;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;

  padding: 12px 10px 12px 20px;

  background: #3b4758;
  border-radius: 6px;
  justify-content: flex-start;
  align-items: center;
  display: inline-flex;
  border: none;

  position: relative;

  color: #bac4d1;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
  word-wrap: break-word;

  ::-webkit-input-placeholder {
    color: #bac4d1;
    font-size: 14px;
    font-family: Roboto;
    font-weight: 400;
    word-wrap: break-word;
  }
`;

export default LabeledInput;
