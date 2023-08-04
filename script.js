const accessKey="BBuTHq_gW2M_zUr9L2frYtAlGU48krGMXepziLITdpc"
const formEl=document.querySelector("form")
const input=document.getElementById("search-input")
const searchReasults=document.querySelector(".search-results")
const showMore=document.getElementById("show-more-button")

let inputData=""
let page=1;

async function searchImages(){
    inputData=input.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const response=await fetch(url)
    const data=await response.json()
    
    const results=data.results

    if(page==1){
        searchReasults.innerHTML=""
    }

    results.map((result)=>{
        const iamgeWrapper=document.createElement('div')
        iamgeWrapper.classList.add("search-result")
        const image=document.createElement("img")
        image.src=result.urls.small
        image.alt=result.alt_description
        const imageLink=document.createElement('a')
        imageLink.href=result.links.html
        imageLink.target="_blank"
        imageLink.textContent=result.alt_description

        iamgeWrapper.appendChild(image)
        iamgeWrapper.appendChild(imageLink)
        searchReasults.appendChild(iamgeWrapper)


    });

    page++
    if(page>1){
        showMore.style.display="block"

    }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault()
    page=1;
    searchImages()
})


showMore.addEventListener("click",()=>{
    searchImages()
})
