import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BaseDropdown } from "components/Dropdown/Atom";
import { LabeledInput } from "components/Input/Atom";
import { BaseModal } from "components/Modal/Atom";
import ModalPortal from "components/ModalPortal";
import LabeledTextarea from "components/Textarea/Atom/LabeledTextarea";
import { useAddECSCommand } from "hook/useAddECSCommand";
import { icons } from "modules/icons";
import { useEffect, useRef } from "react";
import { FormatterProps } from "react-data-grid";
import { colors } from "style/theme";
import { Row } from "./ReceptionTable";

const EditModal = ({
  isOpen,
  setIsOpen,
  formatterProps: { row, onRowChange },
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formatterProps: FormatterProps<Row, unknown>;
}) => {
  const formData = useRef<Map<string, any>>(new Map());
  const modelFilterlist = ["E 300", "E 600", "E 900"];
  const progressStateFilterlist = ["접수완료", "진행중", "출고대기", "출고"];

  useAddECSCommand(() => {
    setIsOpen(false);
  });

  const onSubmit = () => {
    const updatedRow = { ...row, ...Object.fromEntries(formData.current?.entries()) };
    const isEmptyExist = Object.values(updatedRow).some((e) => e === undefined || e === "");

    const onReject = () => {
      alert("업데이트 못한다!");
    };

    const onConfirm = () => {
      onRowChange(updatedRow);
    };

    isEmptyExist ? onReject() : onConfirm();
  };

  return isOpen ? (
    <ModalPortal>
      <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContentWrapper>
          <ModalHeader>
            <h2>접수 추가</h2>

            <div className="options">
              <div className="icon-box" onClick={() => setIsOpen(false)}>
                <icons.Close_Icon />
              </div>
            </div>
          </ModalHeader>

          <ModalFiledset>
            <LabeledInput
              initialValue={row.carNumber}
              isFirstInput
              htmlFor="carNumber"
              labelText="차량번호"
              notifier={(value) => {
                formData.current?.set("carNumber", value);
              }}
            />

            <BaseDropdown
              initialValue={row.modelName}
              labelText="모델"
              filterList={modelFilterlist}
              notifier={(value) => {
                formData.current?.set("modelName", value);
              }}
            />

            <LabeledInput
              initialValue={row.vin}
              htmlFor="vin"
              labelText="VIN"
              notifier={(value) => {
                formData.current?.set("vin", value);
              }}
            />

            <BaseDropdown
              initialValue={row.progressState}
              labelText="상태"
              filterList={progressStateFilterlist}
              notifier={(value) => {
                formData.current?.set("progressState", value);
              }}
            />

            <ClientInfoBox>
              <LabeledInput
                initialValue={row.clientName}
                htmlFor="clientname"
                labelText="고객명"
                additionalCSS={css`
                  width: 100%;
                `}
                notifier={(value) => {
                  formData.current?.set("clientname", value);
                }}
              />

              <LabeledInput
                initialValue={row.phoneNumber}
                htmlFor="phonenumber"
                labelText="전화번호"
                additionalCSS={css`
                  width: 100%;
                `}
                notifier={(value) => {
                  formData.current?.set("phonenumber", value);
                }}
              />
            </ClientInfoBox>

            <LabeledTextarea
              initialValue={row.note}
              htmlFor="note"
              labelText="비고"
              placeholder="Type event details"
              notifier={(value) => {
                formData.current?.set("note", value);
              }}
            />
          </ModalFiledset>

          <ModalConfirmBtnBox>
            <button className="cancel_btn" onClick={() => setIsOpen(false)}>
              취소
            </button>
            <button onClick={onSubmit}>추가</button>
          </ModalConfirmBtnBox>
        </ModalContentWrapper>
      </BaseModal>
    </ModalPortal>
  ) : (
    <></>
  );
};

export default EditModal;

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

const ClientInfoBox = styled.div`
  display: flex;
  gap: 20px;
`;

const ModalConfirmBtnBox = styled.div`
  padding: 24px 0;
  display: flex;
  justify-content: flex-end;
  gap: 20px;

  & button {
    width: 54px;
    height: 40px;
    background-color: ${colors.pointColorBlue};
    color: white;
    border-radius: 6px;

    &.cancel_btn {
      background-color: white;
      color: ${colors.graySix};
    }
  }
`;
