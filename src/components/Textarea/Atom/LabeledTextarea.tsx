import { SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";
import { LabelHTMLAttributes, TextareaHTMLAttributes, useState } from "react";

type Attributes = LabelHTMLAttributes<HTMLLabelElement> & TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface Props extends Attributes {
  initialValue?: string;
  labelText: string;
  additionalCSS?: SerializedStyles;
  notifier?: (value: string, ...args: any) => any;
}

function LabeledTextarea(props: Props) {
  const [value, setValue] = useState(props.initialValue ? props.initialValue : "");

  return (
    <InputBox additionalCSS={props.additionalCSS}>
      <Label htmlFor={props.htmlFor}>{props.labelText}</Label>
      <Textarea
        value={value}
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
}

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
const Textarea = styled.textarea`
  width: 100%;
  height: 88px;
  resize: none;

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

  &:focus {
    outline: none;
  }

  ::-webkit-input-placeholder {
    color: #7d8fa9;
    font-size: 14px;
    font-family: Roboto;
    font-weight: 400;
    word-wrap: break-word;
  }
`;

export default LabeledTextarea;
