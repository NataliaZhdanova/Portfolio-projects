// PositionsPage -> includes -> AllPositions
// AllPositions -> includes -> PositionsTable
// AllPositions -> is extended by -> NewPositionCard
// AllPositions -> PositionPage -> includes -> PositionCard
// PositionCard -> includes -> ApplicationsTable
// PositionCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard)

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function PositionsTable({ callback, data }) {

    const handleDeleteClick = (positionid) => {
        callback(positionid);
    }

    const columns = [
        { 
            field: 'title', 
            headerName: 'Title', 
            width: 200, 
            sortable: true,
            renderCell: (params) => <a href={'/positions/' + params.row.positionid}>{params.row.title}</a> 
        },
        { 
            field: 'url', 
            headerName: 'URL', 
            width: 200,
            renderCell: (params) => <a href={params.row.url} target="_blank" rel="noreferrer">{params.row.url}</a> 
        },
        { 
            field: 'requirements', 
            headerName: 'Requirements', 
            width: 400 
        },
        { 
            field: 'keywords', 
            headerName: 'Keywords', 
            width: 160 
        },
        { 
            field: 'discoverydate', 
            headerName: 'Discovery Date', 
            width: 140, 
            sortable: true 
        },
        { 
            field: 'delete', 
            headerName: '', 
            width: 100, 
            sortable: false, 
            renderCell: (params) => {
                if (rowSelectionModel.length !== 0) {
                    return <button onClick={() => handleDeleteClick(params.row.positionid)}>Delete</button>
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
            getRowId={(row) => row.positionid}
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