import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { footerInfoAtom } from "recoil/layoutAtom";
import { colors } from "style/theme";

function Index() {
  const footerInfo = useRecoilValue(footerInfoAtom);

  useEffect(() => {
    console.log("footer inof", footerInfo);
  });

  return (
    <Footer>
      {Object.values(footerInfo).map((info) => (
        <span>{info}</span>
      ))}
    </Footer>
  );
}

const Footer = styled.footer`
  width: 100%;
  height: 8rem;
  padding: 1.7rem;
  background-color: ${colors.footerColor};
  display: flex;
  align-items: center;
  justify-content: space-between;

  & span {
    color: white;
    font-size: 4.8rem;
    font-family: MBK CorpoA;
    font-weight: 400;
    letter-spacing: 0.336rem;
    word-wrap: break-word;
  }
`;

export default Index;
