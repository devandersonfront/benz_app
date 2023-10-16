import styled from "@emotion/styled";
import { colors, deviceSize } from "style/theme";
import { useEffect, useRef, useState } from "react";
import errorBoundary from "utils/errorBoundary";
import { css } from "@emotion/react";
import { icons } from "modules/icons";
import useFindCenterlist from "./hook/useFindCenterlist";
import useGetAuthToken from "./hook/useGetAuthToken";

function Auth() {
  const [centerName, setCenterName] = useState("");
  const [isLoginStep, setIsLoginStep] = useState(false);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const formData = useRef<Map<string, any>>(new Map());

  const { isCenterLoading, isCenterError, centerData } = useFindCenterlist();
  const { isLoginLoading, loginRefetch } = useGetAuthToken();

  const onSignIn = async () => {
    const emailValue = formData.current.get("id");
    const passwordValue = formData.current.get("password");
    const validate = emailValue && passwordValue;

    if (validate) {
      await errorBoundary(loginRefetch);
    } else {
      alert("please enter email, password");
    }
  };

  useEffect(() => {
    isLoginStep &&
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 500);
  }, [isLoginStep]);

  return (
    <Container>
      <OverflowHideArea>
        <CenterContainer isLoginStep={isLoginStep}>
          <SelectedCenterBox>
            <label>센터 설정</label>
            <div className="centerName">
              {centerName}

              <ul>
                {centerData?.data?.centerlist?.map((center) => (
                  <li key={center} onClick={() => setCenterName(center)}>
                    {center}
                  </li>
                ))}
              </ul>
            </div>
            <DarkBtn
              onClick={() => {
                centerName && setIsLoginStep(true);
              }}
            >
              완료
            </DarkBtn>
          </SelectedCenterBox>
        </CenterContainer>
        <LoginContainer isLoginStep={isLoginStep}>
          <LoginForm onSubmit={(e) => e.preventDefault()}>
            <InputBoxWrapper>
              <InputBox>
                <InputLabel>아이디</InputLabel>
                <Input
                  ref={firstInputRef}
                  type="text"
                  onChange={(e) => {
                    formData.current.set("id", e.target.value);
                  }}
                />
              </InputBox>

              <InputBox>
                <InputLabel>패스워드</InputLabel>
                <Input
                  type="text"
                  onChange={(e) => {
                    formData.current.set("password", e.target.value);
                  }}
                />
              </InputBox>
            </InputBoxWrapper>

            <LoginBtn onClick={onSignIn}>로그인</LoginBtn>
          </LoginForm>
        </LoginContainer>

        <GobackBtn isLoginStep={isLoginStep} onClick={() => setIsLoginStep(false)}>
          {<icons.Arrow_Icon />}
        </GobackBtn>
      </OverflowHideArea>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 4.1rem 5.1rem;
`;

const OverflowHideArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: hidden;
  position: relative;
`;

const CenterContainer = styled.div<{ isLoginStep: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s ease-in-out;

  ${({ isLoginStep }) =>
    isLoginStep
      ? css`
          transform: translateX(-100%);
        `
      : css`
          transform: translateX(0);
        `}
`;

const DarkBtn = styled.button`
  width: 10rem;
  height: 100%;

  color: white;
  font-size: 3.2rem;
  font-family: MBK CorpoS;
  font-weight: 400;
  letter-spacing: 0.032rem;
  word-wrap: break-word;
  border: 0.4rem solid transparent;
  border-image: linear-gradient(-10deg, #ffffff, #6c6a6a);
  border-image-slice: 1;

  @media screen and (min-width: ${deviceSize.tablet}) {
    width: 20rem;
  }
`;

const SelectedCenterBox = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;

  & label {
    color: white;
    font-size: 3.6rem;
    font-family: MBK CorpoA;
    font-weight: 400;
    letter-spacing: 0.336rem;
    word-wrap: break-word;
  }

  & .centerName {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    color: white;
    font-size: 3.6rem;
    font-family: MBK CorpoA;
    font-weight: 400;
    letter-spacing: 0.336rem;
    word-wrap: break-word;
    background: ${colors.grayGradient_100};
    padding: 1.6rem;

    & ul {
      width: 100%;
      max-height: 50vh;
      position: absolute;
      top: 100%;
      margin-top: 5rem;
      display: flex;
      flex-direction: column;
      gap: 4.1rem;
      overflow-y: auto;
      direction: rtl;

      ::-webkit-scrollbar {
        width: 1rem;
      }

      ::-webkit-scrollbar-track {
        background: rgba(217, 217, 217, 0.23);
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(217, 217, 217, 0.44);
      }

      & li {
        text-align: left;
        padding-left: 5rem;
        cursor: pointer;
      }
    }
  }
`;

const LoginContainer = styled(CenterContainer)`
  position: absolute;
  left: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isLoginStep }) =>
    isLoginStep
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 100rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4.5rem;
  /* background-color: blue; */
`;

const InputBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3rem;
`;
const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6.4rem;
  gap: 3rem;
`;
const InputLabel = styled.label`
  width: 30%;
  color: white;
  font-size: 3rem;
  font-family: MBK CorpoA;
  font-weight: 400;
  letter-spacing: 0.336rem;
  word-wrap: break-word;
  text-align: right;
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background: ${colors.grayGradient_100};
  padding: 1.2rem;
  font-size: 2.5rem;
  color: white;
`;

const LoginBtn = styled(DarkBtn)`
  width: 15rem;
  font-size: 2.2rem;
  padding: 2.2rem;
  background-color: black;
  transform: translateX(30%);

  @media screen and (min-width: ${deviceSize.tablet}) {
    width: 20rem;
  }
`;

const GobackBtn = styled.button<{ isLoginStep: boolean }>`
  width: 7rem;
  height: 7rem;
  border: 1px solid gray;
  position: absolute;
  top: 0;
  right: 0;

  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease-in-out;

  ${({ isLoginStep }) =>
    isLoginStep &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

export default Auth;
