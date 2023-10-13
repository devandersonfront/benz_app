import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Arrow_Icon from "images/svg/arrow_icon.svg";
import { css } from "@emotion/react";
import { colors } from "style/theme";

interface Props {
  totalData?: number;
  countPerPage: number;
  pagelistDisplayLimit?: number;
  notifier?: (currentPage: number, ...args: any) => any;
}
type ArrowDirection = "left" | "right";

function BasePagination({ totalData = 0, countPerPage, pagelistDisplayLimit = 5, notifier }: Props) {
  const BUTTON_SIZE = 32;
  const GAP = 10;
  const PAGE_WRAPPER_MINWIDTH = BUTTON_SIZE * countPerPage + (GAP * countPerPage - 1);
  const LAST_PAGE = Math.ceil(totalData / countPerPage);
  const PAGELIST_LENGTH = LAST_PAGE < pagelistDisplayLimit ? LAST_PAGE : pagelistDisplayLimit;
  const defaultPagelist = Array(PAGELIST_LENGTH)
    .fill(undefined)
    .map((_, idx) => idx + 1);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageList, setPageList] = useState<number[]>(defaultPagelist);

  const handlePageList = (arrowDirection: ArrowDirection) => {
    if (arrowDirection === "left" && currentPage === pageList[0] && currentPage !== 1) {
      setPageList((prev) => prev.map((page) => page - 1));
    }

    if (arrowDirection === "right" && currentPage === pageList[pageList.length - 1] && currentPage !== LAST_PAGE) {
      setPageList((prev) => prev.map((page) => page + 1));
    }
  };
  const handleCurrentPage = (arrowDirection: ArrowDirection) => {
    const isMovingFromPageEnd =
      (arrowDirection === "left" && currentPage === 1) || (arrowDirection === "right" && currentPage === LAST_PAGE);

    if (!isMovingFromPageEnd) {
      arrowDirection === "left" ? setCurrentPage((prev) => prev - 1) : setCurrentPage((prev) => prev + 1);
    }
  };

  const onArrowButtonClick = (arrowDirection: ArrowDirection) => {
    handlePageList(arrowDirection);
    handleCurrentPage(arrowDirection);
  };

  useEffect(() => {
    notifier && notifier(currentPage);
  }, [currentPage]);

  return (
    <PageBox gap={GAP}>
      <ArrowButton icon={Arrow_Icon} size={BUTTON_SIZE} onClick={() => onArrowButtonClick("left")} />

      <PageWrapper minWidth={PAGE_WRAPPER_MINWIDTH}>
        {pageList.map((page) => (
          <PageButton
            key={page}
            active={currentPage === page}
            size={BUTTON_SIZE}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            {page}
          </PageButton>
        ))}
      </PageWrapper>

      <ArrowButton
        icon={Arrow_Icon}
        arrowDirection="right"
        size={BUTTON_SIZE}
        onClick={() => onArrowButtonClick("right")}
      />
    </PageBox>
  );
}

const PageBox = styled.div<{ gap: number }>`
  display: flex;
  gap: ${({ gap }) => `${gap}px`};
`;

const ArrowButton = styled.button<{
  icon: string;
  size: number;
  arrowDirection?: ArrowDirection;
}>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};

  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: center center;

  ${({ arrowDirection }) =>
    arrowDirection === "right" &&
    css`
      transform: scaleX(-1);
    `}
`;

const PageWrapper = styled.div<{ minWidth?: number }>`
  display: flex;
  gap: 10px;

  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${minWidth}px;
    `}
`;

const PageButton = styled.button<{ size: number; active?: boolean }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 100%;
  color: #eef0f4;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
  word-wrap: break-word;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ active }) =>
    active &&
    css`
      transition: all 0.25s ease-in-out;
      background-color: ${colors.pointColorBlue};
    `}
`;

export default BasePagination;
