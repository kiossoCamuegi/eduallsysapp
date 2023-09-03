import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; 

const rowSpan = (params) => {
  var athlete = params.data ? params.data.athlete : undefined;
  if (athlete === 'Aleksey Nemov') {
    // have all Russia age columns width 2
    return 2;
  } else if (athlete === 'Ryan Lochte') {
    // have all United States column width 4
    return 4;
  } else {
    // all other rows should be just normal
    return 1;
  }
};

function TableX() {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
      {
        field: 'athlete',
        rowSpan: rowSpan,
        cellClassRules: {
          'cell-span': "value==='Aleksey Nemov' || value==='Ryan Lochte'",
        },
        width: 200,
      },
      { field: 'age', width: 100 },
      { field: 'country' },
      { field: 'year', width: 100 },
      { field: 'date' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ]);
    const defaultColDef = useMemo(() => {
      return {
        width: 170,
        resizable: true,
      };
    }, []);
  
    const onGridReady = useCallback((params) => {
     setRowData( 
      [
        {"athlete":"Michael Phelps","age":23,"country":"United States","year":2008,"date":"24/08/2008","sport":"Swimming","gold":8,"silver":0,"bronze":0,"total":8},{"athlete":"Michael Phelps","age":19,"country":"United States","year":2004,"date":"29/08/2004","sport":"Swimming","gold":6,"silver":0,"bronze":2,"total":8},{"athlete":"Michael Phelps","age":27,"country":"United States","year":2012,"date":"12/08/2012","sport":"Swimming","gold":4,"silver":2,"bronze":0,"total":6},{"athlete":"Natalie Coughlin","age":25,"country":"United States","year":2008,"date":"24/08/2008","sport":"Swimming","gold":1,"silver":2,"bronze":3,"total":6},{"athlete":"Aleksey Nemov","age":24,"country":"Russia","year":2000,"date":"01/10/2000","sport":"Gymnastics","gold":2,"silver":1,"bronze":3,"total":6}
     ])
    }, []);
  
    return (
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            suppressRowTransform={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    );
}

export default TableX

 
 