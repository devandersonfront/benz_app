import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useMemo, useState } from "react";

import DataGrid, { SelectColumn, TextEditor } from "react-data-grid";
import type { Column, SortColumn } from "react-data-grid";
import { colors } from "style/theme";
import { icons } from "modules/icons";

interface Row {
  id: number;
  task: string;
  complete: number;
  priority: string;
  issueType: string;
}

function createRows(): readonly Row[] {
  const rows: Row[] = [];

  for (let i = 1; i < 7; i++) {
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ["Critical", "High", "Medium", "Low"][Math.round(Math.random() * 3)],
      issueType: ["Bug", "Improvement", "Epic", "Story"][Math.round(Math.random() * 3)],
    });
  }

  return rows;
}

const columns: readonly Column<Row>[] = [
  {
    ...SelectColumn,
    width: "auto",
    maxWidth: 500,
    resizable: true,
    headerCellClass: css`
      & > * {
        justify-content: flex-start;
        padding-left: 24px;
      }
    `,
    cellClass: css`
      .rdg-checkbox-label {
        padding-left: 24px;
      }
    `,
  },
  {
    key: "id",
    name: "ID",
    resizable: true,

    cellClass: css`
      color: #dde1e8;
      font-size: 14px;
      font-family: Roboto;
      font-weight: 700;
      word-wrap: break-word;
    `,
  },
  {
    key: "task",
    name: "Title",
    // renderEditCell: TextEditor,
    sortable: true,
    resizable: true,

    formatter: (props) => {
      console.log(props);
      return <>hello</>;
    },
  },
  {
    key: "priority",
    name: "Priority",
    sortable: true,
    resizable: true,
  },
  {
    key: "issueType",
    name: "Issue Type",
    sortable: true,
    resizable: true,
  },
  {
    key: "complete",
    name: "% Complete",
    sortable: true,
    resizable: true,

    headerCellClass: css`
      justify-content: flex-end;
    `,
    cellClass: css`
      justify-content: flex-end;
    `,

    formatter(props) {
      return (
        <OptionBox>
          <OptionBtn>
            <icons.Eye_Icon />
          </OptionBtn>

          <OptionBtn>
            <icons.Pencil_Icon />
          </OptionBtn>

          <OptionBtn>
            <icons.Trash_Icon />
          </OptionBtn>
        </OptionBox>
      );
    },
  },
];

export default function BaseTable({ direction }: any) {
  type Comparator = (a: Row, b: Row) => number;

  function getComparator(sortColumn: string): Comparator {
    switch (sortColumn) {
      case "task":
      case "priority":
      case "issueType":
        return (a, b) => {
          return a[sortColumn].localeCompare(b[sortColumn]);
        };
      case "complete":
        return (a, b) => {
          return a[sortColumn] - b[sortColumn];
        };
      default:
        throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    }
  }

  // table max height = 현재 보이게 할 갯수 * rowheight + headerRowHeight + 1(스크롤 안되게 하기 위함)

  const [rows, setRows] = useState(createRows);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  return (
    <GridWrapper>
      <DataGrid
        className="fill-grid"
        columns={columns}
        rows={sortedRows}
        rowKeyGetter={(row) => row.id}
        onRowsChange={setRows}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        direction={direction}
        headerRowHeight={44}
        rowHeight={80}
      />
    </GridWrapper>
  );
}

const GridWrapper = styled.div`
  .fill-grid {
    --rdg-background-color: transparent;
    border-left: none;
    border-right: none;
    border-top: 0.5px solid #3b4758;
    border-bottom: 0.5px solid #3b4758;
    height: 445px;
    max-height: 445px;

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

const OptionBox = styled.fieldset`
  display: flex;
  gap: 10px;
  border: none;
`;
const OptionBtn = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
