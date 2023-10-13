import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import DataGrid from "react-data-grid";
import type { DataGridProps } from "react-data-grid";
import { colors } from "style/theme";

interface Props extends Partial<DataGridProps<any>> {
  additionalCSS?: SerializedStyles;
}

export default function BaseTable({ additionalCSS, rows, columns, ...rest }: Props) {
  return (
    <GridWrapper additionalCSS={additionalCSS}>
      <DataGrid
        className="fill-grid"
        rows={rows ?? []}
        columns={columns ?? []}
        headerRowHeight={44}
        rowHeight={80}
        {...rest}
      />
    </GridWrapper>
  );
}

const GridWrapper = styled.div<Pick<Props, "additionalCSS">>`
  .fill-grid {
    --rdg-background-color: transparent;
    border-left: none;
    border-right: none;
    border-top: 0.5px solid #3b4758;
    border-bottom: 0.5px solid #3b4758;
    height: 445px;
    // table max height = 현재 보이게 할 갯수 * rowheight + headerRowHeight + 1(스크롤 안되게 하기 위함)
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

  ${({ additionalCSS }) => additionalCSS && additionalCSS}
`;
