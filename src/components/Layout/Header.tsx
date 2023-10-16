import styled from "@emotion/styled";
import { colors } from "style/theme";
import { icons } from "modules/icons";
import { useCheckAuth } from "utils/checkAuth";
import { useLogout } from "hook/useLogout";

function Index() {
  const isLogin = useCheckAuth();
  const logout = useLogout();
  return (
    <Header>
      <Container>
        <div className="logo">
          <icons.Benz_Icon />
          <icons.BenzPhrase_Icon />
        </div>
      </Container>

      <AuthBox isLogin={isLogin}>
        <button onClick={logout}>로그아웃</button>
      </AuthBox>
      <GradientBar />
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  background-color: "black";
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const GradientBar = styled.div`
  width: 100%;
  height: 0.8rem;
  margin-top: 1.1rem;
  border-bottom: 0.5rem solid transparent;
  background: linear-gradient(to right, #000000, #565656, #ffffff, #565656, #000000); /* 그라데이션 배경 */
  background-clip: content-box;
`;

const AuthBox = styled.div<{ isLogin: boolean }>`
  position: absolute;
  right: 3.8rem;
  top: 50%;
  transform: translateY(-50%);
  display: ${({ isLogin }) => (isLogin ? "block" : "none")};

  & button {
    color: white;
    border: 0.1rem solid white;
    border-radius: 0;
    padding: 0.7rem;

    color: white;
    font-size: 3.2rem;
    font-family: MBK CorpoS;
    font-weight: 400;
    letter-spacing: 0.032rem;
    word-wrap: break-word;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 3.1rem 5.2rem 0;
  & .logo {
    display: flex;
    gap: 1rem;
    & svg {
      width: 100%;

      &:nth-of-type(1) {
        width: 10rem;
      }

      &:nth-of-type(2) {
        width: 20rem;
        align-self: flex-end;
      }
    }
  }
`;

export default Index;
