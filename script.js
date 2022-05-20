let myLeads = [];
const inputText = document.getElementById("input-text");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulLeads = document.getElementById("ul-leads");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));


if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}
console.log(leadsFromLocalStorage);

inputBtn.addEventListener("click", function() {
    myLeads.push(inputText.value);
    inputText.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    console.log(localStorage.getItem("myLeads"));  
})

tabBtn.addEventListener("click", function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {     //Chrome API
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads);
    })
})
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();                           //clearing the local storage
    myLeads.length = 0;                             //clearing myLeads array, other way is myLeads = []  (reassigning it)
    render(myLeads);                                //calling the renderLeads() function to clear the screen as the array is empty now.
})
function render(leads) {
    let listItems = ""
    for(let i=0; i< leads.length; i++) {
        listItems += `
                    <li>
                        <a target="_blank" href="${leads[i]}">
                            ${leads[i]}
                        </a> 
                    </li>
                    `;
    }
    ulLeads.innerHTML = listItems;
}
