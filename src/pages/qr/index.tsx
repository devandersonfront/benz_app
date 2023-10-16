import styled from "@emotion/styled";
import { startCamera } from "pages/qr/util/startCamera";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";

function QR() {
  const [data, setData] = useState<any>("hello");
  const qrRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   startCamera();
  // }, []);

  useEffect(() => {
    const qrScanner = new Html5Qrcode("qr-reader");
    qrScanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText, decodedResult) => {
        console.log("dt", decodedText, "dr", decodedResult);
        alert(decodedText);
      },
      () => {}
    );
  }, []);

  return (
    <Container>
      <Title>QR 코드 인식</Title>
      <QRBox id="qr-reader" />
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
  font-size: 4.8rem;
  font-family: MBK CorpoA;
  font-weight: 400;
  letter-spacing: 0.336rem;
  word-wrap: break-word;
  padding: 3.3rem 0;
`;

const QRBox = styled.div`
  width: 50%;
  height: 50%;
  width: 62.7rem;
  height: 62.7rem;
  overflow: hidden;

  & video {
    width: 100%;
    height: 100%;
  }
`;

const ResultText = styled.div`
  width: 500px;
  height: 100px;
  background-color: blue;
  color: white;
  font-size: 100px;
`;

export default QR;
