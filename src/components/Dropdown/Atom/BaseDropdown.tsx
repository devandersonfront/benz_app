import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { BaseButton } from "components/Button/Atom";
import { useEffect, useState } from "react";
import { colors } from "style/theme";
import { icons } from "modules/icons";

interface Props {
  initialValue?: string | number;
  labelText: string;
  filterList: string[];
  additionalCSS: SerializedStyles;
  notifier: (...args: any) => any;
}

function BaseDropdown({ initialValue, labelText, additionalCSS, filterList, notifier }: Partial<Props>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue ? initialValue : filterList ? filterList[0] : "");

  useEffect(() => {
    notifier && notifier(selectedValue);
  }, []);

  return (
    <Container>
      {labelText && <Label>{labelText}</Label>}
      <Button additionalCSS={additionalCSS} onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <p>{selectedValue}</p>
        <icons.Arrowdown_Icon />

        <OrderDropdown isDropdownOpen={isDropdownOpen} onClick={(e) => e.stopPropagation()}>
          {filterList?.map((listValue) => (
            <OrderList
              key={listValue}
              onClick={() => {
                setSelectedValue(listValue);
                setIsDropdownOpen(false);
                notifier && notifier(listValue);
              }}
            >
              {listValue}
            </OrderList>
          ))}
        </OrderDropdown>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Label = styled.label`
  color: #eef0f4;
  font-size: 12px;
  font-family: Roboto;
  font-weight: 500;
  word-wrap: break-word;
`;

const Button = styled(BaseButton)`
  width: 100%;
  height: 40px;
  background-color: ${colors.pointColorGray};
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const OrderDropdown = styled.ul<{ isDropdownOpen: boolean }>`
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: auto;
  left: 0;
  top: 110%;
  z-index: var(--zIndex-1st);
  background-color: ${colors.pointColorGray};
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  visibility: hidden;
  opacity: 0;
  transform: scaleY(0);
  transition: all 0.2s ease-in;
  transform-origin: top;

  ${({ isDropdownOpen }) =>
    isDropdownOpen &&
    css`
      visibility: visible;
      opacity: 1;
      transform: scaleY(1);
    `}
`;
const OrderList = styled.li`
  width: 100%;
  height: auto;
  display: flex;
`;

export default BaseDropdown;
