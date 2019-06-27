var table = document.querySelector("table");
var tr = table.querySelectorAll("tr");
var headings = table.querySelectorAll("tr th");
var rowCollection = {};
for (var i = 1; i < tr.length; i++) {
    var td = tr[i].querySelectorAll('td');
    var row = {};
    td.forEach(function (value, key) {
        row[headings[key].textContent.trim().replace(/(\r\n|\n|\r|\s)/gm, "").toLowerCase()] = value.textContent.trim().replace(/(\r\n|\n|\r)/gm, "");
    });
    rowCollection['job-' + i] = row;
}
console.log(rowCollection);
