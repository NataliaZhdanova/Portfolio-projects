// CompaniesPage -> includes -> AllCompanies
// AllCompanies -> is extended by -> NewCompanyCard
// AllCompanies -> CompanyPage -> includes -> CompanyCard
// CompanyCard -> includes -> PositionsTable
// CompanyCard -> includes -> ApplicationsTable
// CompanyCard -> is extended by -> ModalAddPosition (similar to NewPositionCard)
// CompanyCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard)

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'title', headerName: 'Title', width: 200, sortable: true },
  { field: 'url', headerName: 'URL', width: 160 },
  { field: 'requirements', headerName: 'Requirements', width: 200 },
  { field: 'keywords', headerName: 'Keywords', width: 160 },
  { field: 'discoverydate', headerName: 'Discovery Date', width: 90, sortable: true },
  ];

export default function PositionsTable({ data }) {
  const rows = data;
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.positionid}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}