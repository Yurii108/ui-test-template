// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

// Third Party Imports
import type { useReactTable } from '@tanstack/react-table'

type TablePaginationProps = {
  table: ReturnType<typeof useReactTable>
  shape?: 'circular' | 'rounded'
  label?: 'entries' | 'lessons'
}

const TablePaginationComponent = ({ table, shape = 'rounded', label = 'entries' }: TablePaginationProps) => {
  const { pageSize, pageIndex } = table.getState().pagination
  const totalRows = table.getFilteredRowModel().rows.length
  const startRow = pageIndex * pageSize + 1
  const endRow = Math.min(startRow + pageSize, totalRows)

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>{`Showing ${startRow} to ${endRow} of ${totalRows} ${label}`}</Typography>
      <Pagination
        shape={shape}
        color='primary'
        variant='tonal'
        count={Math.ceil(totalRows / pageSize)}
        page={pageIndex + 1}
        onChange={(_, page) => {
          table.setPageIndex(page - 1)
        }}
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default TablePaginationComponent
