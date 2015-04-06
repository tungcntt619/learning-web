function deleteRow(row)
{
    var i=row.parentNode.parentNode.rowIndex;
    document.getElementById('POITable').deleteRow(i);
}


function insRow()
{
    var x=document.getElementById('POITable').insertRow(1);
    var c1=x.insertCell(0);
    var c2=x.insertCell(1);
    c1.innerHTML="NEW CELL1";
    c2.innerHTML="NEW CELL2";
}