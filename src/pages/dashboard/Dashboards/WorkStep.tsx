import styled from "@emotion/styled";
import { icons } from "modules/icons";
import { colors } from "style/theme";
import DataGrid from "react-data-grid";
import type { Column } from "react-data-grid";
import { css } from "@emotion/css";
import { useState } from "react";

interface Row {
  browser: string;
  percentage: number;
  value: number;
}

function WorkStep() {
  const columns: readonly Column<Row>[] = [
    {
      key: "browser",
      name: "# Browser",
      sortable: true,
      resizable: true,
      formatter({ row: { browser } }) {
        const textNumber = browser === "입고" ? 1 : browser === "정비" ? 2 : browser === "출고" ? 3 : "";
        return <span>{`${textNumber} ${browser}`}</span>;
      },
    },
    {
      key: "percentage",
      name: "Percentage %",
      sortable: true,
      resizable: true,
      headerCellClass: css`
        justify-content: center;
      `,
      cellClass: css`
        justify-content: center;
      `,
      formatter({ row: { percentage } }) {
        return <span>{`${percentage ?? "error"}%`}</span>;
      },
    },
    {
      key: "value",
      name: "Value",
      sortable: true,
      resizable: true,
      headerCellClass: css`
        justify-content: flex-end;
      `,
      cellClass: css`
        justify-content: flex-end;
      `,
      formatter({ row: { value } }) {
        return (
          <ValueContainer className={value < 0 ? "minus_value" : "plus_value"}>
            <icons.Increment_Icon />
            <span>{Math.abs(value ?? 0)}</span>
          </ValueContainer>
        );
      },
    },
  ];

  const createRows = () => [
    { browser: "입고", percentage: 36, value: -2.2 },
    { browser: "정비", percentage: 36, value: 2.2 },
    { browser: "출고", percentage: 36, value: -2.2 },
  ];

  const [rows, setRows] = useState(createRows);

  function rowKeyGetter(row: Row) {
    return row.browser;
  }

  return (
    <WorkstepBox>
      <WorkstepHeader>
        <h3>작업단계별 현황</h3>

        <div className="more_btn">
          <icons.Dot_Icon />
        </div>
      </WorkstepHeader>

      <GridWrapper>
        <DataGrid className="fill-grid" columns={columns} rows={rows} rowKeyGetter={rowKeyGetter} />
      </GridWrapper>
    </WorkstepBox>
  );
}

const WorkstepBox = styled.div`
  width: 500px;
  height: fit-content;

  padding: 20px 24px;
  background-color: ${colors.indigo};
  border-radius: 12px;
`;

const WorkstepHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;

  & h3 {
    color: #eef0f4;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 700;
    word-wrap: break-word;
  }
`;

const GridWrapper = styled.div`
  .fill-grid {
    --rdg-background-color: transparent;
    border-left: none;
    border-right: none;
    border-top: 0.5px solid #3b4758;
    border-bottom: 0.5px solid #3b4758;
    height: fit-content;

    & *[role="columnheader"] {
      background-color: ${colors.indigo};
      color: #7d8fa9;
      font-size: 12px;
      font-family: Roboto;
      font-weight: 500;
      word-wrap: break-word;
      border: none;
      box-shadow: none;
      display: flex;
      align-items: center;
    }

    & *[role="row"] {
    }

    & *[role="gridcell"] {
      display: flex;
      align-items: center;
      border-left: none;
      border-right: none;
      border-top: 0.5px solid #3b4758;
      border-bottom: 0.5px solid #3b4758;
      box-shadow: none;

      & > * {
        justify-content: flex-start;
      }
    }
  }
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  & svg {
    transform: translateY(-2px);
  }

  &.plus_value {
    color: #10d096;

    & svg {
      fill: #10d096;
    }
  }

  &.minus_value {
    color: #ff316a;

    & svg {
      transform: scaleY(-1);
      fill: #ff316a;
    }
  }
`;

export default WorkStep;
