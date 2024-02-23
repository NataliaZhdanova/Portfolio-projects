import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'title', headerName: 'Title', width: 140, sortable: true },
  { field: 'url', headerName: 'URL', width: 160 },
  { field: 'requirements', headerName: 'Requirements', width: 160 },
  { field: 'keywords', headerName: 'Keywords', width: 160 },
  { field: 'discoverydate', headerName: 'Discovery Date', width: 90, sortable: true },
  ];

export default function ApplicationsTable(data) {
  const rows = data;
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
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