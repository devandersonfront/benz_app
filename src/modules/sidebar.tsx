import { icons } from "./icons";

export const menuList = [
  {
    id: "dashboards",
    name: "Dashboards",
    contentTitle: "작업장 전체 현황",
    icon: <icons.Dashboard_Icon />,
  },
  {
    id: "receptions",
    name: "접수건",
    contentTitle: "접수건 관리",
    icon: <icons.Receptions_Icon />,
  },
  // {
  //   id: "receptionWatings",
  //   name: "접수 대기 분석",
  //   contentTitle: "",
  //   icon: <icons.ReceptionWatings_Icon />,
  // },
  // {
  //   id: "centers",
  //   name: "워크센터별 분석",
  //   contentTitle: "",
  //   icon: <icons.Centers_Icon />,
  // },
  {
    id: "users",
    name: "사용자 관리",
    contentTitle: "사용자 관리",
    icon: <icons.Users_Icon />,
  },
  {
    id: "projects",
    name: "Projects",
    contentTitle: "센터 관리",
    icon: <icons.Projects_Icon />,
  },
] as const;

type MenuItem = (typeof menuList)[number];

export type MenuId = MenuItem["id"];
export type MenuName = MenuItem["name"];
export type ContentTitle = MenuItem["contentTitle"];
