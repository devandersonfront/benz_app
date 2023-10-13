import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { menuList } from "modules/sidebar";
import { colors } from "style/theme";
import { icons } from "modules/icons";
import { useRecoilState } from "recoil";
import { currentMenuAtom } from "recoil/layoutAtom";

function Index() {
  const [currentMenu, setCurrentMenu] = useRecoilState(currentMenuAtom);

  return (
    <Aside>
      <Aside_Logobox>
        <icons.Dashboard_Logo />
      </Aside_Logobox>
      <MenuUl>
        {menuList.map((menu) => (
          <MenuLi
            key={menu.id}
            isSelected={menu.id === currentMenu.id}
            onClick={() =>
              setCurrentMenu({
                id: menu.id,
                name: menu.name,
                contentTitle: menu.contentTitle,
              })
            }
          >
            <span>{menu.icon}</span>
            <span>{menu.name}</span>
          </MenuLi>
        ))}
      </MenuUl>
    </Aside>
  );
}

const Aside = styled.aside`
  width: 208px;
  height: auto;
  min-height: 100vh;
  background-color: ${colors.indigo};

  padding: 20px 16px 0px;
  box-shadow: 0px 4px 20px rgba(6.82, 6.02, 18.06, 0.1);
  border-radius: 12px;

  display: flex;
  flex-direction: column;
`;

const Aside_Logobox = styled.div``;
const MenuUl = styled.ul`
  width: 100%;
  margin-top: 25px;
`;
const MenuLi = styled.li<{ isSelected?: boolean }>`
  width: 100%;
  padding: 16px;
  color: ${colors.graySix};
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
  word-wrap: break-word;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  transition: all 0.15s ease-in;

  & path {
    fill: ${colors.graySix};
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: white;
      background-color: ${colors.pointColorBlue};
      & path {
        fill: white;
      }
    `}
`;

export default Index;
