import styled from "@emotion/styled";
import LineChart from "./Linechart";
import WorkStep from "./WorkStep";
import ProgressByCenter from "./ProgressByCenter";

function Dashboards() {
  return (
    <ContentContainer>
      <WorkstepAndLineWrapper>
        <WorkStep />
        <LineChart />
      </WorkstepAndLineWrapper>

      <ProgressByCenter />
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const WorkstepAndLineWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export default Dashboards;
