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

export default function ApplicationsTable({ callback, data }) {

    const handleDeleteClick = (applicationid) => {
        callback(applicationid);
    }
    const columns = [
        { 
            field: 'title', 
            headerName: 'Position', 
            width: 200, 
            sortable: true,
            renderCell: (params) => <a href={'/applications/' + params.row.applicationid}>{params.row.title}</a> 
        },
        { 
            field: 'url', 
            headerName: 'URL', 
            width: 160 
        },
        { 
            field: 'senddate', 
            headerName: 'Applied', 
            width: 90, 
            sortable: true 
        },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 90, 
            sortable: true 
        },
        { 
            field: 'delete', 
            headerName: '', 
            width: 100, 
            sortable: false, 
            renderCell: (params) => {
                if (rowSelectionModel.length !== 0) {
                    return <button onClick={() => handleDeleteClick(params.row.applicationid)}>Delete</button>
                };
            },
        },
        ];

  const rows = data;

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

    const handleRowSelectionModelChange = (newSelection) => {
        setRowSelectionModel(newSelection);
    }; 

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
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={handleRowSelectionModelChange}
      />
    </div>
  );
}