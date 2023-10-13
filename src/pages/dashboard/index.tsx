import styled from "@emotion/styled";
import Aside from "components/Layout/Aside";
import Header from "components/Layout/Header";
import { Suspense, createContext, useContext } from "react";
import { useRecoilValue } from "recoil";
import { currentMenuAtom } from "recoil/layoutAtom";
import Dashboards from "./Dashboards";
import Receptions from "./Reception";
import ReceptionWatings from "./ReceptionWatings";
import Centers from "./Centers";
import Users from "./Users";
import Projects from "./Projects";

export const DashboardCTX = createContext<any>(null);

function Index() {
  const currentMenu = useRecoilValue(currentMenuAtom);
  const contextValue = { test: "true" };

  const contentList = {
    dashboards: <Dashboards />,
    receptions: <Receptions />,
    // receptionWatings: <ReceptionWatings />,
    // centers: <Centers />,
    users: <Users />,
    projects: <Projects />,
  };

  return (
    <Container>
      <Aside />

      <ContentSection>
        <Header />
        <ContentBox>
          <ContentTitle>{currentMenu.contentTitle}</ContentTitle>

          <MainContent>
            <DashboardCTX.Provider value={contextValue}>
              <>{contentList[currentMenu.id]}</>
            </DashboardCTX.Provider>
          </MainContent>
        </ContentBox>
      </ContentSection>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;

  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 20px 23px;
  display: flex;
  gap: 17px;
`;

const ContentSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ContentTitle = styled.h1`
  color: #eef0f4;
  font-size: 24px;
  font-family: Roboto;
  font-weight: 700;
  word-wrap: break-word;
  margin: 30px 0;
`;

const MainContent = styled.div`
  flex: 1;
`;

export default Index;
