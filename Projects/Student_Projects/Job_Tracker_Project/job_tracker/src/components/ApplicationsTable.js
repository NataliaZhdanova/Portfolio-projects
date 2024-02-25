import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'title', headerName: 'Position', width: 140, sortable: true },
  { field: 'url', headerName: 'URL', width: 160 },
  { field: 'senddate', headerName: 'Send Date', width: 90, sortable: true },
  { field: 'status', headerName: 'Status', width: 90, sortable: true },
  ];

export default function ApplicationsTable({ data }) {
  const rows = data;
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.applicationid}
        rows={ rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}