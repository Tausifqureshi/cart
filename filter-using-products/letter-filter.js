//ye filter sub ko check kare ke 3 td ko
// function filterTable() {
//     const inputValue = document.getElementById('inp').value.toUpperCase();
//     const tableRows = document.querySelectorAll('table tr');

//     tableRows.forEach(row => {
//         let rowText = '';
//         // console.log(rowText)
//         row.querySelectorAll('td').forEach(cell => {
//             rowText += cell.textContent || cell.innerText;
//         });

//         if (rowText.toUpperCase().indexOf(inputValue) > -1) {
//             row.style.display = '';
//         } else {
//             row.style.display = 'none';
//         }
//     });
// }

// const inputTag = document.getElementById('inp');
// inputTag.addEventListener('input', filterTable);


// ==========================================Tapa ka chapter=================================================//
//is filter se 0 index search kar re ge jaise Tauaif kar re ge tu pura tr tag ay ga jitne us me td tag o show hogi ?
function filterTable() {
// console.log(filterTable)
const inputValue = document.getElementById('inp').value.toUpperCase(); //jo bhi serach kar re ge o letter aye ga ?
// console.log(inputValue)
let myTable = document.getElementById("myTable"); //pura table mile ga yaha se ?
// console.log(myTable)
let tr = myTable.getElementsByTagName('tr'); //ek ek tr tag mile ge yaha se ?
// console.log(tr)

for (let i = 0; i < tr.length; i++) { //ek shat pura tr mile ga yah se
//    console.log(tr[i])
let td = tr[i].getElementsByTagName("td")[0]; // 0 index pe jo td o mile ga? menas Tausif,qureshi ye jo jo apne tr ke 0 index pe hai o yaha se mile ge [1] use is me tu Mumbai pune wala tr tag mile ga?
// console.log(td)
if (td) {
    let textValue = td.textContent || td.innerHTML //or || oparetor use dono me se ek value true tu answer aye ga is se ? textconetnt and html means jo td tag ke ander text o mile ga na ke pura tr tag nhi mile ga ? 
    console.log(textValue) 
    if (textValue.toUpperCase().indexOf(inputValue) > -1) {// inputvalue variable ki value agar nhi milti tu indexof() se -1 deta hai ye method
        tr[i].style.display ='' ; //agar value milti hai tu hame value show ho jaye gi tr tag ke ander jo td tag hai us ki value ?
    }else{
    tr[i].style.display ='none' ; //agar value nhi mili tu display none tr tag ke ander td tag ki jo value hai ?
    }
}
    
}
}

const inputTag = document.getElementById('inp');
// console.log(inputTag)
inputTag.addEventListener('input', filterTable); //function call filterTable call hora hai ?





























