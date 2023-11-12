import clsx from 'clsx';
import { useSp } from '@/hooks/useSp';
import ss from './pagination.module.scss';

type Props = {
  page: number; // selected page number
  totalNumber: number; // total page number
  perPage: number; // rows per page
  onPaging: (page: number) => void;
  className?: string;
};

export const Pagination = (props: Props) => {
  const isSp = useSp();
  const maxViewPage = isSp ? 4 : 6;
  const { page, totalNumber, perPage, onPaging } = props;

  const totalPages: number = Math.ceil(totalNumber / perPage) - 1;
  const paginationMax: number = totalPages < maxViewPage ? totalPages : maxViewPage;

  const handlePagination = (page: number) => {
    onPaging(page);
  };

  const Paginations: JSX.Element[] = [];

  if (page > 0) {
    Paginations.push(
      <div className={ss.item} key={'Top'} aria-label='Top' onClick={() => handlePagination(0)}>
        <span aria-hidden='true'>TOP</span>
      </div>,
      <div className={ss.item} key={'Previous'} aria-label='Previous' onClick={() => handlePagination(page - 1)}>
        <span className={ss.symbol} aria-hidden='true'>&lsaquo;</span>
      </div>,
    );
  }

  const paginationCenterNum = Math.ceil(paginationMax / 2);
  let paginationStartNum = page - paginationCenterNum;
  if (page <= paginationCenterNum) {
    paginationStartNum = 0;
  } else if (page >= totalPages - paginationCenterNum) {
    paginationStartNum = totalPages - paginationMax;
  }

  for (let i = 0; i <= paginationMax; i++) {
    const paginationNum = paginationStartNum + i;
    Paginations.push(
      page === paginationNum ? (
        <div key={i}>
          <div className={ss.active} onClick={() => handlePagination(paginationNum)}>
            {paginationNum + 1}
          </div>
          <div className={ss.bar}></div>
        </div>
      ) : (
        <div className={ss.item} key={i} onClick={() => handlePagination(paginationNum)}>
          {paginationNum + 1}
        </div>
      ),
    );
  }

  if (page < totalPages) {
    Paginations.push(
      <div className={ss.item} key={'Next'} aria-label='Next' onClick={() => handlePagination(page + 1)}>
        <span className={ss.symbol} aria-hidden='true'>&rsaquo;</span>
      </div>,
      <div className={ss.item} key={'End'} aria-label='End' onClick={() => handlePagination(totalPages)}>
        <span aria-hidden='true'>END</span>
      </div>,
    );
  }

  return <div className={clsx(ss.container, props.className)}>{Paginations}</div>;
};
