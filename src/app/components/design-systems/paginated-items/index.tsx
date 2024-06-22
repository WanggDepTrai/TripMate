import { useSearchParamsHook } from '@hooks';
import { Pagination } from '@mui/material';
import ReactPaginate from 'react-paginate';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const PaginatedItems = ({ total_page }: { total_page: number }) => {
   const { setParams, searchParams } = useSearchParamsHook();

   return (
      <div className="flex flex-col items-center">
         <Pagination
            variant="outlined"
            onChange={(_, page) => setParams('page', String(page))}
            count={total_page ?? 1}
            page={Number(searchParams['page']) || 1}
            siblingCount={1}
         />
      </div>
   );
};
