// GET DATA FOR TEXT BOOK

let displayalltextbook= document.getElementById("displayalltextbook")

// Save all strapi data for text book



// Function for get data
let getTextBook=async()=>{
 
    let saveTextBookData="";
    await axios.get("http://localhost:1337/api/textbooks?populate=*",{

        // This headers cod by difalt from strapi, to check login status. If some logd in they have permition to run this function.
        
                headers:{
                    Authorization:`Bearer ${sessionStorage.getItem("token")}`
                
                        }
                
            })
            
    .then((res)=>{
       
        if(displayalltextbook.style.display !=="block"){
            displayalltextbook.style.display="block"
            }
           
           else{
            displayalltextbook.style.display="none"
               }   
    

        let newres=res.data.data
        newres.forEach(element=>{
            let newelement=element.attributes

            let catagories=newelement.catagories.data
             catagories.forEach(cata=>{
            
            let newcatagory=cata.attributes
           
            
           
            let image=newelement.image.data
            let newimage=image.attributes

                saveTextBookData+=`<h3>Book:${newelement.titel}<br> Writer:${newelement.writer}<br> Grade:${newelement.grade}<br> Page: ${newelement.page} <br> Catagory:${newcatagory.name} <br> <img src="http://localhost:1337${newimage.url}" alt="" height="200px" width="200px"> </h3> <hr>`

           displayalltextbook.innerHTML=saveTextBookData
            
        })
     })
  

   })

 }
if(document.getElementById("textbook")){
document.getElementById("newtextbook").addEventListener("click",getTextBook)
}






 // GET DATA FOR AUDIO BOOK 

let displayallaudiobook= document.getElementById("displayallaudiobook")

// Save all strapi data for audio book



// Function for get data
let getAudioBook=async()=>{
    let saveAudioBookData=""
   
    await axios.get("http://localhost:1337/api/audiobooks?populate=*",{

// This headers cod by difalt from strapi, to check login status. If some logd in they have permition to run this function.

        headers:{
            Authorization:`Bearer ${sessionStorage.getItem("token")}`
        
                }
        
    })
    .then((respo)=>{
        

        if(displayallaudiobook.style.display !=="block"){
            displayallaudiobook.style.display="block"
            }
           
           else{
            displayallaudiobook.style.display="none"
            } 


        let newrespo=respo.data.data
       

        newrespo.forEach(newdata=>{
            
            let allaudiodata=newdata.attributes
            
            let catagories= allaudiodata.catagories.data

            catagories.forEach(newcat=>{
            let newcatagories=newcat.attributes
           

            let audioimage=allaudiodata.image.data.attributes

            saveAudioBookData+=`<h3>Book Name:${allaudiodata.titel}<br> Duration :${allaudiodata.duration}<br>Published on:${allaudiodata.published}<br> Grade:${allaudiodata.grade}<br> Catagory:${newcatagories.name}<br> <img src="http://localhost:1337${audioimage.url}" alt="" height="200px" width="200px"> <hr>`
            
            displayallaudiobook.innerHTML=saveAudioBookData
            
        })
    })
 
 })

}

if(document.getElementById("audiobook")){

document.getElementById("newaudiobook").addEventListener("click",getAudioBook)
}       




// LOG IN FUNCTION

let whoisloggdin=""

let loginFunction= async()=>{
   
    const username= document.getElementById("username").value;
    const password=document.getElementById("password").value;
    if(username==""){
        alert("You have to put right username and password")
    }
    else{

   // Strapi by default url and identifire,password to get auther permission

   let logrespo=await axios.post("http://localhost:1337/api/auth/local",{

        identifier:username,
        password:password
    });
    

    console.log(logrespo)
  let mytocken=logrespo.data.jwt
  sessionStorage.setItem("token",mytocken)


  if(sessionStorage.getItem("token")){
      alert("You are logged in now")
      window.location.href = "./index.html";
      
    
  }
 
  const Username=logrespo.data.user.username;
  const Userid=logrespo.data.user.id;
  const Usermail=logrespo.data.user.email;
  console.log(Username,Userid,Usermail)

  sessionStorage.setItem("username",Username)
  sessionStorage.setItem("id",Userid)
  sessionStorage.setItem("email",Usermail)

}

}
if(document.getElementById("mysubmit"))
document.getElementById("mysubmit").addEventListener("click",loginFunction)







// REGISTRATION FUNCTION

// Strapi by default URL and username,email,password to creat regestration

let registration=async()=>{
    let newusername=document.getElementById("newusername").value;
    let email=document.getElementById("email").value;
    let newpassword= document.getElementById("newpassword").value;
    console.log(newusername,newpassword,email)

   let newregistration= await axios.post("http://localhost:1337/api/auth/local/register",{
        username:newusername,
        email:email,
        password:newpassword

    })
    

    let regtocken=newregistration.data.jwt
    sessionStorage.setItem("token",regtocken)
    if(sessionStorage.getItem("token")){
        alert("Your registration complited.You can log in now")
        location.reload()
        window.location.href = "./profile.html"; 
    }
}

if(document.getElementById("registration")){
document.getElementById("registration").addEventListener("click",registration)
}


// To display who is logged in


if(sessionStorage.getItem("token")){

  let newuswername=sessionStorage.getItem("username")
  let newuserid=sessionStorage.getItem("id")
  let newusermail=sessionStorage.getItem("email")

  whoisloggdin+=`Username:${newuswername}<br>User-id: ${newuserid} <br> User email: ${newusermail}`

  document.getElementById("test").innerHTML=whoisloggdin 
}

