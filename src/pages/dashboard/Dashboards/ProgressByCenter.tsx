import styled from "@emotion/styled";
import { colors } from "style/theme";
import { icons } from "modules/icons";

function ProgressByCenter() {
  const data = [
    { workbay: "워크베이1", percentage: 33 },
    { workbay: "워크베이2", percentage: 72 },
    { workbay: "워크베이3", percentage: 99 },
    { workbay: "워크베이4", percentage: 7 },
    { workbay: "워크베이5", percentage: 22 },
    { workbay: "워크베이6", percentage: 77 },
    { workbay: "워크7", percentage: 9 },
  ];

  const gageParameter = [0, 20, 40, 60, 80, 100];

  return (
    <Container>
      <TitleBox>
        <h3>워크센터별 작업현황</h3>
        <div className="more_btn">
          <icons.Dot_Icon />
        </div>
      </TitleBox>

      <ProgressBox>
        {data.map((e) => (
          <LabeledProgress key={e.workbay} label={e.workbay} value={e.percentage} />
        ))}
        <ProgressGage>
          <div className="spacer" />
          <div className="gage">
            {gageParameter.map((gage) => (
              <div className="parameter" key={gage}>
                <span>╷</span>
                <span>{`${gage}%`}</span>
              </div>
            ))}
          </div>
        </ProgressGage>
      </ProgressBox>
    </Container>
  );
}

const Container = styled.section`
  background-color: ${colors.indigo};
  border-radius: 12px;
  margin-top: 20px;
  padding: 20px 24px 0 24px;
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;

  & h3 {
    color: #eef0f4;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 700;
    word-wrap: break-word;
  }
`;

const ProgressBox = styled.div`
  width: 100%;
  padding-left: 55px;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
`;
const ProgressLabel = styled.label`
  color: #dde1e8;
  font-size: 12px;
  font-family: Roboto;
  font-weight: 400;
  word-wrap: break-word;
  flex: 0.05;
`;
const ProgressBar = styled.progress`
  appearance: none;
  width: 100%;
  flex: 1;

  &::-webkit-progress-bar {
    background: ${colors.pointColorGray};
  }

  &::-webkit-progress-value {
    background-color: ${colors.pointColorBlue};
  }
`;

const ProgressGage = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  transform: translateY(-10px);

  & .spacer {
    flex: 0.05;
  }

  & .gage {
    flex: 1;
    display: flex;
    justify-content: space-between;

    & .parameter {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;

      color: #7d8fa9;
      font-size: 12px;
      font-family: Roboto;
      font-weight: 400;
      word-wrap: break-word;

      &:first-of-type {
        transform: translateX(-7px);
      }

      &:last-of-type {
        transform: translateX(13px);
      }
    }
  }
`;

const LabeledProgress = ({ label, value }: { label: string; value: number }) => {
  return (
    <ProgressBarWrapper>
      <ProgressLabel>{label}</ProgressLabel>
      <ProgressBar value={value} max={100} />
    </ProgressBarWrapper>
  );
};

export default ProgressByCenter;
