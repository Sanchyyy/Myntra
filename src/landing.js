const search=document.getElementById("search");
const logo=document.querySelector(".navbar__logo-img");

search.addEventListener("keydown",function navigate(e){
    if(e.key==="Enter"){
        const ans=search.value.trim();
        if(ans.length>=3){
            window.location.href="index.html"
        }
    }
})

logo.addEventListener("click",function reload(e){
    window.location.href="landing.html"
})