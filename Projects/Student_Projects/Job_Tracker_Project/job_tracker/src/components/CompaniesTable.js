// CompaniesPage -> includes -> AllCompanies
// AllCompanies -> is extended by -> NewCompanyCard
// AllCompanies -> CompanyPage -> includes -> CompanyCard
// CompanyCard -> includes -> PositionsTable
// CompanyCard -> includes -> ApplicationsTable
// CompanyCard -> is extended by -> ModalAddPosition (similar to NewPositionCard)
// CompanyCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard)

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function CompaniesTable({ callback, data }) {

    const handleDeleteClick = (companyid) => {
        callback(companyid);
    }

    const columns = [
        { 
            field: 'companyname', 
            headerName: 'Company Name', 
            width: 140, 
            sortable: true, 
            renderCell: (params) => <a href={'/companies/' + params.row.companyid}>{params.row.companyname}</a>
        },
        { 
            field: 'url', 
            headerName: 'Company URL', 
            width: 200, 
            renderCell: (params) => <a href={params.row.url} target="_blank" rel="noreferrer">{params.row.url}</a>
        },
        { 
            field: 'businessoverview', 
            headerName: 'Business Overview', 
            width: 700
        },
        { 
            field: 'delete', 
            headerName: '', 
            width: 100, 
            sortable: false, 
            renderCell: (params) => {
                if (rowSelectionModel.length !== 0) {
                    return <button onClick={() => handleDeleteClick(params.row.companyid)}>Delete</button>
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
            getRowId={(row) => row.companyid}
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