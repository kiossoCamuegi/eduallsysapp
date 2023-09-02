 

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

var filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString ===  null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

const FilterTable = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete' },
    { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 100 },
    {
      field: 'date',
      filter: 'agDateColumnFilter',
      filterParams: filterParams,
    },
    { field: 'country', filter: 'agSetColumnFilter' },
    { field: 'sport', filter: 'agMultiColumnFilter' },
    { field: 'gold', filter: 'agNumberColumnFilter' },
    { field: 'silver', filter: 'agNumberColumnFilter' },
    { field: 'bronze', filter: 'agNumberColumnFilter' },
    { field: 'total', filter: false },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: 'agTextColumnFilter',
      menuTabs: ['filterMenuTab'],
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};
 
export default FilterTable;