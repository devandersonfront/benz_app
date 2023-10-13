import styled from "@emotion/styled";
import { BaseTable } from "components/Table/Atom";
import { icons } from "modules/icons";
import { SelectColumn } from "react-data-grid";
import type { Column, FormatterProps } from "react-data-grid";
import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import EditModal from "./EditModal";

export interface Row {
  id: number;
  inboundDate: string;
  carNumber: number;
  vin: string;
  modelName: string;
  manager: string;
  progressState: string;
  deliveryState: string;
  clientName: string;
  phoneNumber: string;
  note: string;
  options: null;
}
function ReceptionTable(orders: number = 5, page: number = 1) {
  function createRows(): readonly Row[] {
    const rows: Row[] = [];

    for (let i = 1; i < orders; i++) {
      rows.push({
        id: i,
        inboundDate: Date.now().toLocaleString(),
        carNumber: 232323,
        vin: "vin" + i,
        modelName: "modelname" + i,
        manager: "manager" + i,
        progressState: "progressState",
        clientName: "김또띠",
        phoneNumber: "0102123123",
        deliveryState: "deliveryState",
        note: "여러 이유로 수정",
        options: null,
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
      key: "inboundDate",
      name: "입고일시",
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
      key: "carNumber",
      name: "차량번호",
      sortable: true,
      resizable: true,
      //   formatter: (props) => {
      //     return <></>;
      //   },
    },
    {
      key: "vin",
      name: "VIN",
      sortable: true,
      resizable: true,
    },
    {
      key: "modelName",
      name: "모델명",
      sortable: true,
      resizable: true,
    },
    {
      key: "manager",
      name: "담당자",
      sortable: true,
      resizable: true,
    },
    {
      key: "progressState",
      name: "진행상태",
      sortable: true,
      resizable: true,
    },
    {
      key: "deliveryState",
      name: "출고상태",
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
      formatter: OptionFormatter,
    },
  ];

  const [rows, setRows] = useState(createRows);
  const [selectedRows, setSelectedRows] = useState((): ReadonlySet<any> => new Set());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return {
    selectedRows,
    Table: () => (
      <>
        <BaseTable
          columns={columns}
          rows={rows}
          rowKeyGetter={(row: Row) => row.id}
          onRowsChange={setRows}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
        />
      </>
    ),
  };
}

const OptionFormatter = (formatterProps: FormatterProps<Row, unknown>) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <OptionBox>
        <OptionBtn>
          <icons.Eye_Icon />
        </OptionBtn>

        <OptionBtn
          onClick={() => {
            setIsEditModalOpen(true);
          }}
        >
          <icons.Pencil_Icon />
        </OptionBtn>

        <OptionBtn>
          <icons.Trash_Icon />
        </OptionBtn>
      </OptionBox>
      <EditModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} formatterProps={formatterProps} />
    </>
  );
};

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
