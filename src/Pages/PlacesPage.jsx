import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Components/Perks";
import axios from "axios";

function PlacesPage() {
  const { action } = useParams();
  const[title,setTitle]=useState("")
  const[address,setAddress]=useState("")
  const[addedPhotos,setAddedPhotos]=useState([])
  const[photoLink,setPhotoLink]=useState("")
  const[description,setDescription]=useState("")
  const[perks,setPerks]=useState([])
  const[extraInfo,setExtraInfo]=useState("")
  const[checkIn,setCheckIn]=useState("")
  const[checkOut,setCheckOut]=useState("")
  const[maxGuests,setMaxGuests]=useState(1)
  console.log(addedPhotos);

  //found that there are many times h2 and p repeates in the form so used function to abstract the logic....[every h2 and p have same styles..]
  const inputHeader=(text)=>{
    return  <h2 className="text-2xl mt-4 ">{text}</h2>

  }

  const inputDescription=(text)=>{
    return  <p className="text-gray-500 text-sm">
    {text}
  </p>
  }

  const printInput=(header,desc)=>{
    return(
        <>
        {inputHeader(header)}
        {inputDescription(desc)}
        </>
    )
  }

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



  // const files = (e.target.files);
  // const data = new FormData()
  // data.set('photos',files)
  //  axios.post('/upload',data,{
  //   headers:{
  //     'Content-Type':'multipart/form-data'
  //   }
  // }).then((res)=>{
  // const{data:filename}=response
  // setAddedPhotos((prev)=>{
  // return [...prev,filename]
  // })
  // }).catch((err)=>{
  // console.log(err);
  // })

}


  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="  inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to="/account/places/new"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new Place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form action="">
            {printInput('Title',' title for your place. should be sharp and catchy')}
           
            <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
              type="text"
              name=""
              placeholder="title , for example my appartment"
              id=""
            />

            {printInput('Address','Address to this place')}
            <input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" name="" placeholder="address" id="" />


            {printInput('Photos','more = better')}
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


            {printInput("Description",'description of the place')}
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} name="" id="" cols="30" rows="10"></textarea>


      {printInput('Perks',"Select all the perks of your place")}
           
            <Perks perks={perks} setPerks={setPerks} />

           

{printInput('Extra info','house rules , etc')}
            <textarea value={extraInfo} onChange={(e)=>setExtraInfo(e.target.value)} name="" id="" cols="30" rows="10"></textarea>


{printInput("check in&out times"," add check in and out times, remember to have some time window for cleaning the room between guests")}
           
             

            <div className="grid sm:grid-cols-3 gap-2">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} type="text" name="" id="" placeholder="14" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} type="text" name="" id="" placeholder="11" />
              </div>
              <div>
                
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input value={maxGuests} onChange={(e)=>setMaxGuests(e.target.value)} type="number" name="" id="" />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PlacesPage;
