import styled from "@emotion/styled";
import { BaseTable } from "components/Table/Atom";
import { icons } from "modules/icons";
import { SelectColumn } from "react-data-grid";
import type { Column } from "react-data-grid";
import { css } from "@emotion/css";
import { useEffect, useState } from "react";

function ReceptionTable(orders: number = 5, page: number = 1) {
  interface Row {
    id: number;
    order: string;
    userNumber: number;
    userid: string;
    position: string;
    department: string;
    options: "";
  }

  function createRows(): readonly Row[] {
    const rows: Row[] = [];

    for (let i = 1; i < orders; i++) {
      rows.push({
        id: i,
        order: Date.now().toLocaleString(),
        userNumber: 232323,
        userid: "userid" + i,
        position: "position" + i,
        department: "department" + i,
        options: "",
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
      key: "order",
      name: "order",
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
      key: "userNumber",
      name: "사번",
      sortable: true,
      resizable: true,
      formatter: (props) => {
        return <>hello</>;
      },
    },
    {
      key: "userid",
      name: "아이디",
      sortable: true,
      resizable: true,
    },
    {
      key: "position",
      name: "포지션",
      sortable: true,
      resizable: true,
    },
    {
      key: "department",
      name: "소속",
      sortable: true,
      resizable: true,
    },
    {
      key: "options",
      name: "options",
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

  const [rows, setRows] = useState(createRows);
  const [selectedRows, setSelectedRows] = useState((): ReadonlySet<any> => new Set());

  return {
    selectedRows,
    Table: () => (
      <BaseTable
        columns={columns}
        rows={rows}
        rowKeyGetter={(row: Row) => row.id}
        onRowsChange={setRows}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
      />
    ),
  };
}

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

export default ReceptionTable;
