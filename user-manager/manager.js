lastRowId = 0;
function checkCell(index)
{
    document.getElementById('commit').disabled = true;
    for ($i = 1; $i <= lastRowId; $i++) {
        var element = document.getElementById("edit" + $i);
        if (typeof (element) !== 'undefined' && element !== null) {
            if ($i !== index)
            {
                element.disabled = true;
            }
            else
            {
                element.disabled = false;
            }
        }
    }
}
function insertRow()
{
    if (document.getElementById("commit").value === 'Add') {
        document.getElementById("key").value = "";
        document.getElementById("ten").value = "";
        document.getElementById("sn").value = "";
        document.getElementById('sn').disabled = false;
        document.getElementById('key').disabled = false;
        document.getElementById('ten').disabled = false;
        document.getElementById("commit").value = 'Save';
    }
    else {
        var idHasvalue = true;
        var nameHasvalue = true;
        var birthdayHasvalue = true;

        if ((document.getElementById("key").value).length === 0) {
            idHasvalue = false;
        }
        if ((document.getElementById("ten").value).length === 0) {
            nameHasvalue = false;
        }
        if ((document.getElementById("sn").value).length === 0) {
            birthdayHasvalue = false;
        }
        if (idHasvalue === false) {
            document.getElementById("idValidate").innerHTML = "Chưa nhập mã số";
        }
        if (idHasvalue === false) {
            document.getElementById("nameValidate").innerHTML = "Chưa nhập tên";
        }
        if (idHasvalue === false) {
            document.getElementById("birthdayValidate").innerHTML = "Chưa Nhập Ngày Sinh";
        }
        if (idHasvalue === false || nameHasvalue === false || birthdayHasvalue === false)
        {
            return false;
        }
        lastRowId += 1;
        var row = document.getElementById('tb1').insertRow(1);

        var ma = document.getElementById('key').value;
        var c1 = row.insertCell(0);
        c1.innerHTML = ma;

        var ten = document.getElementById('ten').value;
        var c2 = row.insertCell(1);
        c2.innerHTML = ten;

        var ngaysinh = document.getElementById('sn').value;
        var c3 = row.insertCell(2);
        c3.innerHTML = ngaysinh;

        var c4 = row.insertCell(3);
        c4.innerHTML = "<input value='Delete' id='delete" + lastRowId + "' onclick='deleteRow(this)'type='button'>";

        var c5 = row.insertCell(4);
        c5.innerHTML = "<input value='Edit' id='edit" + lastRowId + "' onclick='editRow(this, " + lastRowId + ")'type='button'>";
        document.getElementById("key").value = "";
        document.getElementById("ten").value = "";
        document.getElementById("sn").value = "";
        disabledFormItems();
        document.getElementById("commit").value = 'Add';
        document.getElementById("idValidate").innerHTML = "";
        document.getElementById("nameValidate").innerHTML = "";
        document.getElementById("birthdayValidate").innerHTML = "";
    }
}

function disabledFormItems()
{
    document.getElementById('sn').disabled = true;
    document.getElementById('key').disabled = true;
    document.getElementById('ten').disabled = true;
}

function show(row)
{
    var index = row.parentNode.parentNode.rowIndex;
    var table = document.getElementById('tb1');

    var tb = document.getElementById("key");
    tb.value = table.rows[index].cells[0].innerHTML;

    var tb = document.getElementById("ten");
    tb.value = table.rows[index].cells[1].innerHTML;

    var tb = document.getElementById("sn");
    tb.value = table.rows[index].cells[2].innerHTML;
}

function deleteRow(row)
{
    document.getElementById('tb1').deleteRow(row.parentNode.parentNode.rowIndex);
}

function editRow(row, rowId)
{

    var i = row.parentNode.parentNode.rowIndex;

    if (document.getElementById("edit" + rowId).value === 'Edit')
    {
        checkCell(rowId);
        show(row);
        document.getElementById("edit" + rowId).value = 'Save';
        document.getElementById('sn').disabled = false;
        document.getElementById('key').disabled = false;
        document.getElementById('ten').disabled = false;
    }
    else
    {
        document.getElementById('commit').disabled = false;
        for ($i = 1; $i <= lastRowId; $i++) {
        var element = document.getElementById("edit" + $i);
        if (typeof (element) !== 'undefined' && element !== null) {
                element.disabled = false;
        }
    }
        var table = document.getElementById('tb1');
        var row = table.rows[i];
        row.cells[0].innerHTML = document.getElementById("key").value;
        row.cells[1].innerHTML = document.getElementById("ten").value;
        row.cells[2].innerHTML = document.getElementById("sn").value;
        document.getElementById("edit" + rowId).value = 'Edit';
        disabledFormItems();
    }
}
