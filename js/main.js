// global var
var sitNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var tRow = document.getElementById("tRow");
var addBtn = document.getElementById("addBtn");
var errorMsg = document.querySelector('.error-msg');
var cancelBtn = document.getElementById('cancel');
var webSiteList = [];
(function(){
    if(localStorage.getItem('site'))
    webSiteList = JSON.parse(localStorage.getItem('site'));
    display(webSiteList);
})();
// all function on add btn
addBtn.addEventListener('click' , function(){
   addWebSite();
   clear();
   sitNameInput.classList.remove("is-valid");
   siteUrlInput.classList.remove("is-valid");
   display(webSiteList);
})

// add web site function
function addWebSite() {
    if (nameRegx() && siteRegx()){
        var webSiteUrl = {
            siteName : sitNameInput.value,
            siteUrl : siteUrlInput.value,
        }
        webSiteList.push(webSiteUrl);
        localStorage.setItem('site' , JSON.stringify(webSiteList));
    }
    else {
        notMatch();
    }
}

// display website function
function display(url) {
    var box = ``;
    for(var i = 0 ; i<url.length; i++){
        box+=`
        <tr>
                        <td>${i + 1}</td>
                        <td>${url[i].siteName}</td>
                        <td><button class="btn btn-success text-white"><i class="fa-regular fa-eye pe-2">
                        </i><a href="https://${url[i].siteUrl}" target="_blank">Visit</a>
                        </button></td>
                        <td><button class="btn btn-danger text-white" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                    </tr>
        `
    }
    tRow.innerHTML = box;
}

// delete function
function deleteSite(index) {
    webSiteList.splice(index , 1);
    localStorage.setItem('site' , JSON.stringify(webSiteList));
    display(webSiteList);
}
// visit site function
function visitSite(index) {
    siteUrlInput.value
}
// clear input 
function clear() {
    sitNameInput.value = '';
    siteUrlInput.value = '';
}
// regx pattern
function nameRegx(){
    var regx = /[a-zA-Z]{5,}$/
    if(regx.test(sitNameInput.value) == true){
        sitNameInput.classList.add("is-valid");
        sitNameInput.classList.remove("is-invalid");
        return true;

    }
    else if(regx.test(sitNameInput.value) == false){
        sitNameInput.classList.add("is-invalid");
        sitNameInput.classList.remove("is-valid");
        return false;
    }
}
sitNameInput.addEventListener("input" , function(){
    nameRegx ()
})
function siteRegx() {
    var regx = /[a-zA-Z]\.com$/ 
    if(regx.test(siteUrlInput.value) == true){
        siteUrlInput.classList.add("is-valid");
        siteUrlInput.classList.remove("is-invalid");
        return true;

    }else if(regx.test(siteUrlInput.value) == false){
        siteUrlInput.classList.add("is-invalid");
        siteUrlInput.classList.remove("is-valid");
        return false;
    }
   
}
siteUrlInput.addEventListener("input" , function(){
    siteRegx ();
})
function notMatch() {
    if(!nameRegx()){
        errorMsg.classList.replace("d-none" , "d-block");
    }
    else if(!siteRegx()){
        errorMsg.classList.replace("d-none" , "d-block");
    }
}

cancelBtn.addEventListener("click" , function(){
    cancelBtn.classList.add("d-none");
})
