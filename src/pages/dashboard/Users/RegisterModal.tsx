import styled from "@emotion/styled";
import { BaseDropdown } from "components/Dropdown/Atom";
import { LabeledInput } from "components/Input/Atom";
import { BaseModal } from "components/Modal/Atom";
import ModalPortal from "components/ModalPortal";
import LabeledTextarea from "components/Textarea/Atom/LabeledTextarea";
import { useAddECSCommand } from "hook/useAddECSCommand";
import { icons } from "modules/icons";
import { useEffect, useRef } from "react";
import { colors } from "style/theme";

const RegisterModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formData = useRef<Map<string, any>>(new Map());
  const positionFilterList = ["엔지니어", "관리자", "사원"];

  const onSubmit = () => {};

  useAddECSCommand(() => setIsOpen(false));

  return isOpen ? (
    <ModalPortal>
      <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContentWrapper>
          <ModalHeader>
            <h2>사용자 추가</h2>

            <div className="options">
              <div className="icon-box" onClick={() => setIsOpen(false)}>
                <icons.Close_Icon />
              </div>
            </div>
          </ModalHeader>

          <ModalFiledset>
            <LabeledInput
              isFirstInput
              htmlFor="username"
              labelText="사용자명"
              notifier={(value) => {
                formData.current?.set("username", value);
              }}
            />

            <LabeledInput
              htmlFor="userNumber"
              labelText="사번"
              notifier={(value) => {
                formData.current?.set("userNumber", value);
              }}
            />

            <LabeledInput
              htmlFor="userID"
              labelText="아이디"
              notifier={(value) => {
                formData.current?.set("userID", value);
              }}
            />

            <BaseDropdown
              labelText="포지션"
              filterList={positionFilterList}
              notifier={(value) => {
                formData.current?.set("position", value);
              }}
            />

            <LabeledInput
              htmlFor="password"
              labelText="패스워드"
              notifier={(value) => {
                formData.current?.set("password", value);
              }}
            />

            <LabeledInput
              htmlFor="password-check"
              labelText="패스워드 확인"
              notifier={(value) => {
                formData.current?.set("passwordCheck", value);
              }}
            />

            <LabeledTextarea
              htmlFor="description"
              labelText="Description"
              placeholder="Type event details"
              notifier={(value) => {
                formData.current?.set("description", value);
              }}
            />
          </ModalFiledset>

          <ModalConfirmBtnBox>
            <button onClick={onSubmit}>추가</button>
          </ModalConfirmBtnBox>
        </ModalContentWrapper>
      </BaseModal>
    </ModalPortal>
  ) : (
    <></>
  );
};

export default RegisterModal;

const ModalContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & h2 {
    color: #eef0f4;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 700;
    word-wrap: break-word;
  }

  & .options {
    & .icon-box {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
`;

const ModalFiledset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  margin-top: 26.5px;

  gap: 20px;
`;

const ModalConfirmBtnBox = styled.div`
  padding: 24px 0;
  display: flex;
  justify-content: flex-end;

  & button {
    width: 54px;
    height: 40px;
    background-color: ${colors.pointColorBlue};
    color: white;
    border-radius: 6px;
  }
`;
