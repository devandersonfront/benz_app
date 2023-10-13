import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
import { colors } from "style/theme";

interface Props {
  isOpen?: boolean;
  onClose?: (...args: any) => any;
}

function BaseModal({ isOpen, onClose, children }: PropsWithChildren<Props>) {
  return (
    <ModalContainer isOpen={isOpen}>
      <Overlay onClick={onClose} />
      <ContentBox>{children}</ContentBox>
    </ModalContainer>
  );
}

const ModalContainer = styled.section<Pick<Props, "isOpen">>`
  width: 100%;
  height: 100%;
  position: fixed;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: var(--zIndex-0st);
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 0;
`;

const ContentBox = styled.div`
  max-width: 480px;
  width: 100%;
  height: auto;
  background-color: ${colors.indigo};
  box-shadow: 0px 4px 20px rgba(170, 169, 184, 0.1);
  border-radius: 12px;
  padding: 20px 24px;
  z-index: 100;
`;

export default BaseModal;
