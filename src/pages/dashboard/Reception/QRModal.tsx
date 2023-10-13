import styled from "@emotion/styled";
import { BaseModal } from "components/Modal/Atom";
import ModalPortal from "components/ModalPortal";
import { useAddECSCommand } from "hook/useAddECSCommand";
import { icons } from "modules/icons";
import { colors } from "style/theme";

const QRModal = ({
  isOpen,
  setIsOpen,
  selectedRows,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRows: ReadonlySet<any>;
}) => {
  useAddECSCommand(() => setIsOpen(false));

  return (
    <ModalPortal>
      <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContentWrapper>
          <ModalHeader>
            <h2>QR 라벨 출력</h2>

            <div className="options">
              <div className="icon-box" onClick={() => setIsOpen(false)}>
                <icons.Close_Icon />
              </div>
            </div>
          </ModalHeader>
        </ModalContentWrapper>
      </BaseModal>
    </ModalPortal>
  );
};

export default QRModal;

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
