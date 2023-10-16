import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import Auth from "pages/auth";
import QR from "pages/qr";
import ProtedctedRoute from "components/Router/ProtedctedRoute";
import { useCheckAuth } from "utils/checkAuth";
import styled from "@emotion/styled";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
import { useEffect } from "react";

function Index() {
  useLocation();
  const auth = useCheckAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtedctedRoute redirectCondition={auth} redirectPath="/qr">
              <Auth />
            </ProtedctedRoute>
          }
        />
        <Route
          path="/qr"
          element={
            <ProtedctedRoute redirectCondition={!auth} redirectPath="/">
              <QR />
            </ProtedctedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

const Layout = () => {
  return (
    <Main>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Main>
  );
};
const Main = styled.main`
  min-width: 100vw;
  min-height: 100vh;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.backgroundColor};
  background-color: #4d4d4d;
  display: flex;
  flex-direction: column;
`;

const Content = styled.section`
  flex: 1;
`;

export default Index;
