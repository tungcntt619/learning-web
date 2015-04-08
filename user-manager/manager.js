lastRowId = 0;
var data = new Array();
current_page = 1;
num_rows_in_page = 3;
var position = 1;
function checkCell(index, type) {
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
        data[lastRowId] = {'name': queryElement('idname').value, 'birthday': queryElement('idBirthday').value};
        showRowsInPage();

        queryElement("idname").value = "";
        queryElement("idBirthday").value = "";
        toggleForm(true);
        queryElement("commit").value = 'Add';
        queryElement("nameValidate").innerHTML = "";
        queryElement("birthdayValidate").innerHTML = "";
        num_page = parseInt(data.length / 3);
        if (num_page * 3 < data.length)
            num_page++;
        document.getElementById('pager').innerHTML = '';
        for (i = 1; i <= num_page; i++) {
            addPageLink(i);
        }
    }
}
function addPageLink(id) {
    var div = document.getElementById('pager');
    if(id ===1){
       div.innerHTML +=  '<a style="color: red;text-decoration: none; " id="' + id + '" onclick="page(this, ' + id + ')" href="#">page ' + id + '</a>&nbsp&nbsp'; 
    }
    else{
        div.innerHTML += '<a style="text-decoration: none; " id="' + id + '" onclick="page(this, ' + id + ')" href="#">page ' + id + '</a>&nbsp&nbsp';
    }
    
}
function showRowsInPage() {
    var rowCount = queryElement('tb1').rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        queryElement('tb1').deleteRow(x);
    }
    index = 1;
    start = num_rows_in_page * (current_page - 1) + 1;
    end = start + num_rows_in_page - 1;
    for (var id in data) {
        if (index >= start && index <= end)
            insert(id, data[id]['name'], data[id]['birthday']);
        index++;
    }
}
function insert(id, name, birth) {
    var row = queryElement('tb1').insertRow(1);
    var c1 = row.insertCell(0);
    c1.innerHTML= '<a id="myLink" href="#" onclick="enableEdit(this,' + id + ');">' + id + '</a>';
         
    

    var c2 = row.insertCell(1);
    //var name = queryElement('idname').value;
    c2.innerHTML = name;

    var c3 = row.insertCell(2);
    //var birthday = queryElement('idBirthday').value;
    c3.innerHTML = birth;

    var c4 = row.insertCell(3);
    c4.innerHTML = "<input value='Delete' id='delete" + id + "' onclick='deleteRow(this)'type='button'>";

    var c5 = row.insertCell(4);
    c5.innerHTML = "<input value='Edit' id='edit" + id + "' onclick='editRow(this, " + id + ")'type='button'>";
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
function page(link, Id) {
    current_page = Id;
    showRowsInPage();
    var element = queryElement('' + Id + '');
    var div = queryElement('' + position + '');
    if (Id === position) {
        element.innerHTML = '<a style="color: red;text-decoration: none; " id="' + position + '" onclick="page(this, ' + position + ')" href="#">page ' + position + '</a>&nbsp&nbsp';
    }
    else {   
        element.innerHTML = '<a style="color: red;text-decoration: none; " id="' + Id + '" onclick="page(this, ' + Id + ')" href="#">page ' + Id + '</a>&nbsp&nbsp';
        div.innerHTML = '<a style="text-decoration: none; " id="' + position + '" onclick="page(this, ' + position + ')" href="#">page ' + position + '</a>&nbsp&nbsp';
    }
    position = Id;
   
}
function temp(link, Id) {
//    current_page = Id;
//    showRowsInPage();
//    var element = queryElement('' + Id + '');
//    var div = queryElement('' + position + '');
//    if (Id === position) {
//        element.innerHTML = '<a style="color: red;text-decoration: none; " id="' + position + '" onclick="page(this, ' + position + ')" href="#">page ' + position + '</a>&nbsp&nbsp';
//    }
//    else {   
//        element.innerHTML = '<a style="color: red;text-decoration: none; " id="' + Id + '" onclick="page(this, ' + Id + ')" href="#">page ' + Id + '</a>&nbsp&nbsp';
//        div.innerHTML = '<a style="text-decoration: none; " id="' + position + '" onclick="page(this, ' + position + ')" href="#">page ' + position + '</a>&nbsp&nbsp';
//    }
//    position = Id;
   
}
