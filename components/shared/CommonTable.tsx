"use client";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, Button, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import {
  MRT_RowData,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef
} from 'material-react-table';


type CommonTableProps<T extends MRT_RowData> = {
  columns: MRT_ColumnDef<T>[];
  data: T[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  enableColumnResizing?: boolean;
  detailPanel?: any;
  refetch: Function;
  addNew?: {
    title: string;
    onClick: Function;
  },
  rest?: any,
}


const CommonTable = <T extends MRT_RowData>({
  columns,
  data,
  isLoading,
  isFetching,
  addNew,
  enableColumnResizing = false,
  detailPanel,
  rest,
  refetch }: CommonTableProps<T>) => {

  const LargeScreen = useMediaQuery('(min-width:1000px)');

  const table = useMaterialReactTable({
    columns: columns,
    renderDetailPanel: detailPanel,
    enableExpandAll: false, //disable expand all button
    muiDetailPanelProps: () => ({
      sx: {
        backgroundColor: '#f9f9f9',
      },
    }),
    //custom expand button rotation
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
      sx: {
        transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s',
      },
    }),
    data: data ?? [],
    initialState: { showColumnFilters: false, showGlobalFilter: true },
    state: { isLoading, isSaving: isFetching },
    defaultColumn: {
      maxSize: 400,
      minSize: 150,
      size: 200,
    },
    enableColumnResizing,
    columnResizeMode: 'onChange',
    muiTablePaperProps: {
      sx: {
        borderRadius: '1rem',
      },
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
        {addNew && (!LargeScreen
          ? <Tooltip title={addNew?.title}>
            <IconButton
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                borderRadius: '50%',
                padding: '0.5rem',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
              onClick={() => addNew?.onClick?.()}
            >
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
          : <Button
            variant="contained"
            color="primary"
            onClick={() => addNew?.onClick?.()}
            startIcon={<AddOutlinedIcon />}
          >
            {addNew?.title}
          </Button>)}
      </Box>
    ),
  });

  return (<MaterialReactTable table={table} />);
};

export default CommonTable;

