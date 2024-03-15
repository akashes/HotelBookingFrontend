import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function PhotosUploader({addedPhotos,setAddedPhotos}) {

    const[photoLink,setPhotoLink]=useState("")

      //for adding photo using link
  const addPhotoByLink=async(e)=>{
    e.preventDefault()
  const{data:filename}= await axios.post('/upload-by-link',{link:photoLink})
console.log(filename);
setAddedPhotos((prev)=>{
 return [...prev,filename]
})  
setPhotoLink("")
}

//for adding photo from device
const uploadPhoto=(e)=>{
  const files = e.target.files
  const data = new FormData()
  for(let i =0;i<files.length;i++){
    data.append('photos',files[i])
  }
  axios.post('/upload',data,{
    headers:{'Content-type':'multipart/form-data'}
  }).then((response)=>{
    console.log('rsponse is ',response.data);
    const{data:filename}=response
    console.log("filename is",filename);

    //every link is coming with a \ symbol so to remove it mapping throuhg every link
    const newFileNames = filename.map(link => link.substring(1));


  
    setAddedPhotos(prev=>{
      return [...prev,...newFileNames]
    })
  }).catch((err)=>{
    console.log(err);
  })




}

  return (
    <div>
              <div className="flex gap-2">
              <input
              value={photoLink} 
              onChange={(e)=>setPhotoLink(e.target.value)}
                type="text"
                name=""
                placeholder="add using link ...jpeg"
                id=""
              />
              <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;Photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
             {
              addedPhotos.length>0 && addedPhotos.map((link)=>{
                console.log('link hree is ',link);
                return(
                  <div className="h-32 flex" key={link} >
                  <img
                  //  style={{minHeight:'180px'}} 
                   className="rounded-2xl w-full object-cover "
                    src={`http://localhost:4000/uploads/`+link} alt="" />
                </div>
                )
              })
              
              
             }
              <label className="h-32 cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl text-gray-500 flex justify-center items-center gap-1">
              <input onChange={uploadPhoto} className="hidden" multiple type="file" name="" id="" />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                upload
              </label>
            </div>
    </div>
  )
}

export default PhotosUploader
