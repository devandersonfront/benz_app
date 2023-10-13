import React, { useContext, useRef } from "react";
import { DashboardCTX } from ".";
import styled from "@emotion/styled";
import { LabeledInput } from "components/Input/Atom";
import { BaseCheckbox } from "components/Checkbox/Atom";
import { css } from "@emotion/react";
import { colors } from "style/theme";

function Projects() {
  const dashboardCTX = useContext(DashboardCTX);
  const inputFormdata = useRef<Map<string, any>>(new Map());
  const repairCheckFormdata = useRef<Set<string>>(new Set());
  const messageCheckFormdata = useRef<Set<string>>(new Set());

  const repairChecklist = {
    label: "수리 단계 사용",
    list: ["입고", "정비", "탈거", "판금", "도장", "조립", "출고"],
  };

  const messageChecklist = {
    label: "메세지 전송 사용",
    list: [...repairChecklist.list],
  };

  const onSave = () => {
    console.log(repairCheckFormdata, messageCheckFormdata);
  };

  return (
    <>
      <InputBox>
        <LabeledInput
          isFirstInput
          htmlFor="center-name"
          labelText="센터명"
          notifier={(value) => {
            inputFormdata.current?.set("center-name", value);
          }}
        />
        <LabeledInput
          htmlFor="center-cellNumber"
          labelText="센터 전화번호"
          notifier={(value) => {
            inputFormdata.current?.set("center-cellNumber", value);
          }}
        />
        <LabeledInput
          htmlFor="center-cellNumber"
          labelText="센터 전화번호"
          notifier={(value) => {
            inputFormdata.current?.set("center-cellNumber", value);
          }}
        />
      </InputBox>
      <Checkbox>
        <ul className="checkpart repair-part">
          <label>{repairChecklist.label}</label>
          {repairChecklist.list.map((key) => (
            <li>
              {BlueCheckbox(key, repairCheckFormdata.current)}
              <span>{key}</span>
            </li>
          ))}
        </ul>
        <ul className="checkpart message-part">
          <label>{messageChecklist.label}</label>
          {messageChecklist.list.map((key) => (
            <li>
              {BlueCheckbox(key, messageCheckFormdata.current)}
              <span>{key}</span>
            </li>
          ))}
        </ul>
      </Checkbox>
      <SaveButton onClick={onSave}>저장</SaveButton>
    </>
  );
}

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  /* margin-top: 65px; */
`;

const Checkbox = styled.div`
  display: flex;
  margin-top: 40px;

  & .checkpart {
    flex: 0.5;

    & label {
      color: #eef0f4;
      font-size: 12px;
      font-family: Roboto;
      font-weight: 500;
      word-wrap: break-word;
    }

    & li {
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 8px;

      & span {
        color: #eef0f4;
        font-size: 14px;
        font-family: Roboto;
        font-weight: 400;
        word-wrap: break-word;
      }
    }
  }
`;

const BlueCheckbox = (key?: string, formdata?: Set<string>) => (
  <BaseCheckbox
    additionalCSS={css`
      width: 24px;
      height: 24px;

      & .checkbox-label.isChecked {
        border: none;
        &::after {
          content: "✔";
          width: 100%;
          height: 100%;
          font-size: 20px;
          text-align: center;
          background-color: ${colors.pointColorBlue};
        }
      }
    `}
    notifier={(_) => {
      key && formdata?.add(key);
    }}
  />
);

const SaveButton = styled.button`
  margin-top: 42px;
  margin-bottom: 162px;
  width: 100%;
  height: 40px;
  background-color: ${colors.pointColorBlue};
  border-radius: 6px;

  color: white;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
  word-wrap: break-word;
`;

export default Projects;
