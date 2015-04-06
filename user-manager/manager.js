lastRowId = 0;

function checkCell(index,type) {
    queryElement('commit').disabled = true;
    for ($i = 1; $i <= lastRowId; $i++) {
        var element = queryElement("edit" + $i);
        if (typeof (element) !== 'undefined' && element !== null) {
            element.disabled = ($i !== index);
        }
    }
}

function validate(id, idValidationId) {
    if (!queryElement(id).value) {
        queryElement(idValidationId).innerHTML = "Chưa nhập dữ liệu";
        return false;
    }
}

function queryElement(variable) {
    return  document.getElementById(variable)
}

function insertRow()
{
    if (queryElement("commit").value === 'Add') {
        queryElement("idname").value = "";
        queryElement("idBirthday").value = "";
        queryElement('idBirthday').disabled = false;
        queryElement('idname').disabled = false;
        queryElement("commit").value = 'Save';
    }
    else {
        var nameHasvalue = validate("idname", "nameValidate");
        var birthdayHasvalue = validate("idBirthday", "birthdayValidate");
        if (nameHasvalue === false || birthdayHasvalue === false)
        {
            return false;
        }
        lastRowId += 1;
        var row = queryElement('tb1').insertRow(1);
        var c1 = row.insertCell(0);
        c1.innerHTML = '<a id="myLink" href="#" onclick="enableEdit(this,' + lastRowId + ');">' + lastRowId + '</a>';

        var c2 = row.insertCell(1);
        var name = queryElement('idname').value;
        c2.innerHTML = name;

        var c3 = row.insertCell(2);
        var birthday = queryElement('idBirthday').value;
        c3.innerHTML = birthday;

        var c4 = row.insertCell(3);
        c4.innerHTML = "<input value='Delete' id='delete" + lastRowId + "' onclick='deleteRow(this)'type='button'>";

        var c5 = row.insertCell(4);
        c5.innerHTML = "<input value='Edit' id='edit" + lastRowId + "' onclick='editRow(this, " + lastRowId + ")'type='button'>";

        $row = "'row" + lastRowId + "'";

        queryElement("idname").value = "";
        queryElement("idBirthday").value = "";
        toggleForm(true);
        queryElement("commit").value = 'Add';
        queryElement("nameValidate").innerHTML = "";
        queryElement("birthdayValidate").innerHTML = "";
    }
}

function toggleForm(status) {
    queryElement('idBirthday').disabled = status;
    queryElement('idname').disabled = status;
}

function enableEdit(row, rowId) {
    if (queryElement("edit" + rowId).value === 'Edit') {
        checkCell(rowId);
        display(row);
        queryElement("edit" + rowId).value = 'Save';
        toggleForm(false);
    }
}

function display(row) {
    var index = row.parentNode.parentNode.rowIndex;
    var table = queryElement('tb1');

    var tb = queryElement("idname");
    tb.value = table.rows[index].cells[1].innerHTML;

    var tb = queryElement("idBirthday");
    tb.value = table.rows[index].cells[2].innerHTML;
}

function deleteRow(row) {
    queryElement('tb1').deleteRow(row.parentNode.parentNode.rowIndex);
}

function editRow(row, rowId) {
    if (!queryElement('idname').disabled) {
        var i = row.parentNode.parentNode.rowIndex;
        queryElement('commit').disabled = false;
        for ($i = 1; $i <= lastRowId; $i++) {
            var element = queryElement("edit" + $i);
            if (typeof (element) !== 'undefined' && element !== null) {
                element.disabled = false;
            }
        }
        var table = queryElement('tb1');
        var row = table.rows[i];
        row.cells[1].innerHTML = queryElement("idname").value;
        row.cells[2].innerHTML = queryElement("idBirthday").value;
        queryElement("edit" + rowId).value = 'Edit';
   
        toggleForm(true);
    }
}
