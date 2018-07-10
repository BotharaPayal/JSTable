
var tableHeader = '';
var baseUrl = "https://data.cityofnewyork.us/resource/5scm-b38n.json";
var tableFiltersList1 = {};
var allUsers = [];



function generateTableBody(arr) {
  let html = tableHeader;

  for (var i = 0; i < arr.length; i++) {
                    
                    html+="<tr class='row-user row'>";
                    html+="<td class='col-user col-xs-1 col-sm-1 col-md-1 col-lg-1'>"+arr[i].exam_no+"</td>";
                    html+="<td class='col-user col-xs-3 col-sm-3 col-md-3 col-lg-3'>"+arr[i].first_name+"</td>";
                    html+="<td class='col-user col-xs-3 col-sm-3 col-md-3 col-lg-3'>"+arr[i].last_name+"</td>";
                    html+="<td class='col-user col-xs-2 col-sm-2 col-md-2 col-lg-2'>"+arr[i].list_agency_desc+"</td>";
                    html+="<td class='col-user col-xs-2 col-sm-2 col-md-2 col-lg-2'>"+arr[i].list_title_desc+"</td>";
                    html+="<td class='col-user col-xs-1 col-sm-1 col-md-1 col-lg-1'>"+arr[i].published_date+"</td>";

                    html+="</tr>";

                }
                html+="</tbody></table>";
                document.getElementById("users-list").innerHTML = html;
}

function multiFilter(array, filters) {
  const filterKeys = Object.keys(filters);
  // filters all elements passing the criteria
  return array.filter((item) => {
    // dynamically validate all filter criteria
    return filterKeys.every(key => !!~filters[key].indexOf(item[key]));
  });
}

function updateUserListAndFilter() {

  let list1 = multiFilter(allUsers, tableFiltersList1);
  const filterKeys = Object.keys(tableFiltersList1);
  generateTableBody(list1);
  filterKeys.forEach(item => {
    let ele = document.getElementById(`filter-opt-${item}`);
    ele.style.display = 'block';

    let ele2 = document.getElementById(`${item}_string`);
    ele2.value = tableFiltersList1[item];

  })

}


function showFilter(name,key) {
  let ele = document.getElementById(`filter-opt-${key}`);
  if(ele.style.display == 'none') {
    ele.style.display = 'block';
    tableFiltersList1[key] = null;
    console.log("if none display")
  } else {
    ele.style.display = 'none';
    delete tableFiltersList1[key];
    updateUserListAndFilter()
  }
  
}

function searchFilter (fieldName, fieldProp) {
  let ele = document.getElementById(`${fieldProp}_string`);
  let valSearch = ele.value;

  tableFiltersList1[fieldProp] = valSearch;
  console.log("filterKeys list", tableFiltersList1)

  updateUserListAndFilter();

}



/**
 * this function will read JSON data and generate list of
 * users to be displayed in table
 */
function getJSON(url) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            loaderEle.style.display = 'none'
            let arr = JSON.parse(this.responseText)
            if(this.responseText.length) {

            
                var html = "<table class='list-user-data table table-bordered'>";
                html+="<thead class='thead-dark'><tr class='row'>"
                html+="<th class='header-list col-xs-1 col-sm-1 col-md-1 col-lg-1'>Exam No</th>";
                html+=`<th class='header-list col-xs-3 col-sm-3 col-md-3 col-lg-3'>First Name
                <span><i class='material-icons md-24 md-dark filter-icon' onclick='showFilter("firstname", "first_name")'>filter_list</i></span>
                <div id='filter-opt-first_name' style="display:none">
                    <input type='text' id='first_name_string' />
                    <input type="button" id="first" value="Filter" onclick="searchFilter('firstname', 'first_name');" />
                </div>
                </th>`;
                html+=`<th class='header-list col-xs-3 col-sm-3 col-md-3 col-lg-3'>Last Name<i class='material-icons md-24 md-dark filter-icon' onclick='showFilter("lastname", "last_name")'>filter_list</i>
                <div id='filter-opt-last_name' style="display:none">
                    <input type='text' id='last_name_string' />
                    <input type="button" id="last" value="Filter" onclick="searchFilter('lastname', 'last_name');" />
                </div>
                </th>`;
                html+="<th class='header-list col-xs-2 col-sm-2 col-md-2 col-lg-2'>Agency Description</th>";
                html+="<th class='header-list col-xs-2 col-sm-2 col-md-2 col-lg-2'>Title Description</th>";
                html+="<th class='header-list col-xs-1 col-sm-1 col-md-1 col-lg-1'>Published Date</th>";
                html+='</tr></thead>';
                html+='<tbody>'
                tableHeader = html;
                allUsers = arr;

                generateTableBody(allUsers)

            }
        }
    };

    let loaderEle = document.getElementById('loader-circle');
    loaderEle.style.display = 'block';

    xhttp.open("GET", url, true);
    xhttp.send();
}


getJSON(baseUrl);


