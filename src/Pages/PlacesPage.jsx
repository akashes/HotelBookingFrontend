import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Perks from "../Components/Perks";
import axios from "axios";
import PhotosUploader from "../Components/PhotosUploader";

function PlacesPage() {
  const navigate = useNavigate()
  const { action } = useParams();
  const[title,setTitle]=useState("")
  const[address,setAddress]=useState("")

  const[description,setDescription]=useState("")
  const[perks,setPerks]=useState([])
  const[addedPhotos,setAddedPhotos]=useState([])

  const[extraInfo,setExtraInfo]=useState("")
  const[checkIn,setCheckIn]=useState("")
  const[checkOut,setCheckOut]=useState("")
  const[maxGuests,setMaxGuests]=useState(1)

  // const[redirect,setRedirect]=useState('')

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

  const addNewPlace=async(e)=>{
    e.preventDefault()
    axios.post('/places',{
      title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests
    })
    // setRedirect('/account/places')
    navigate('/account/places')
  }

  // if(redirect){
  //   navigate(redirect)
  // }


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
          <form onSubmit={addNewPlace} action="">
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
            <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
    


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
