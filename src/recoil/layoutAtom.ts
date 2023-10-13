import { ContentTitle, MenuId, MenuName, menuList } from "modules/sidebar";
import { atom } from "recoil";

//Aside
export interface CurrentMenu {
  id: MenuId;
  name: MenuName;
  contentTitle: ContentTitle;
}

export interface FooterInfo {
  centerLocation: string;
  centerName: string;
  managerName: string;
}

export const currentMenuAtom = atom<CurrentMenu>({
  key: "currentMenuAtom",
  default: {
    id: menuList[0].id,
    name: menuList[0].name,
    contentTitle: menuList[0].contentTitle,
  },
});

export const footerInfoAtom = atom<FooterInfo>({
  key: "footerInfoAtom",
  default: {
    centerLocation: "",
    centerName: "",
    managerName: "",
  },
});
