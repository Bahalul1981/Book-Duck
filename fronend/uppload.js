


let uploadTextBook=()=>{
    console.log();
        let newtitle=document.getElementById("title")
        let newwriter=document.getElementById("writer")
        let newgrade=document.getElementById("grade")
        let newpage=document.getElementById("page")
        let newimage=document.getElementById("image").files;
        let iamgedata=new FormData();
        iamgedata.append("files",newimage[0]);


        axios.post("http://localhost:1337/api/upload",iamgedata,{
                headers:{
                    Authorization:`Bearer ${sessionStorage.getItem("token")}`}

        })
        
        .then(res=>{

        let imageid=res.data[0].id;
        axios.post("http://localhost:1337/api/textbooks",{
            data:{
                titel:newtitle.value,
                writer:newwriter.value,
                page:newpage.value,
                grade:newgrade.value,
                image:imageid,
                catagories:[1]
            }
        },
        {
            headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}
        })
    })
}


if(document.getElementById("textsubmit")){
    document.getElementById("textsubmit").addEventListener("click",uploadTextBook)
        
}











// Uppload Audio book


let upploaNewAudioBook=()=>{

    
    let audiobookname=document.getElementById("book")
    let audiobookduration=document.getElementById("duration")
    let published=document.getElementById("published")
    let audiograde=document.getElementById("newgrade")
    let audioimage=document.getElementById("myaudioimage").files;
    let newimagedata= new FormData();
    newimagedata.append("files",audioimage[0]);



    axios.post("http://localhost:1337/api/upload",newimagedata,{
        headers:{
            Authorization:`Bearer ${sessionStorage.getItem("token")}`}

})

.then(res=>{

        let newimageid=res.data[0].id;
        axios.post("http://localhost:1337/api/audiobooks",{
            
            data:{
                titel:audiobookname.value,
                duration:audiobookduration.value,
                published:published.value,
                grade:audiograde.value,
                image:newimageid,
                catagories:[1]
            }
            
        },

        {
            headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}
    })

  })
}


if(document.getElementById("audiosubmit")){
    document.getElementById("audiosubmit").addEventListener("click",upploaNewAudioBook)

}

//Move to upload page

document.getElementById("upploadNewBook").addEventListener("click",function(){
    window.location.href="/fronend/upload.html"
})

// Display what you upploaded


