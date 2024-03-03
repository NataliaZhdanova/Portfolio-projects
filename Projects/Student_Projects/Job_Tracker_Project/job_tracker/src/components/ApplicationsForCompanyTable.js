// CompaniesPage -> includes -> AllCompanies
// AllCompanies -> is extended by -> NewCompanyCard
// AllCompanies -> CompanyPage -> includes -> CompanyCard
// CompanyCard -> includes -> PositionsForCompanyTable
// CompanyCard -> includes -> ApplicationsForCompanyTable
// CompanyCard -> is extended by -> ModalAddPosition (similar to NewPositionCard)
// CompanyCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard)

// PositionCard -> includes -> ApplicationsTable


import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'title', headerName: 'Position', width: 200, sortable: true },
  { field: 'url', headerName: 'URL', width: 160 },
  { field: 'senddate', headerName: 'Applied', width: 90, sortable: true },
  { field: 'status', headerName: 'Status', width: 90, sortable: true },
  ];

export default function ApplicationsForCompanyTable({ data }) {
  const rows = data;
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.applicationid}
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