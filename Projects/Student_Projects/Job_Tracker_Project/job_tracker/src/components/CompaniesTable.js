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
  { field: 'companyname', headerName: 'Company Name', width: 200, sortable: true },
  { field: 'url', headerName: 'URL', width: 160 },
  { field: 'businessoverview', headerName: 'Business Overview', width: 200 },
//   { field: 'delete', headerName: '', width: 100, sortable: false, renderCell: (params) => <button onClick={() => deleteCompany(params.row.companyid)}>Delete</button>},
  ];

export default function CompaniesTable({ data }) {
  const rows = data;
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.companyid}
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