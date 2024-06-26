import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
function AccountPage() {
  
  let {subpage} = useParams()
  const {user,ready,setUser} = useContext(UserContext)

  console.log('ready is',ready);
  console.log('user value is ',user);

  console.log(subpage);
  if(subpage === undefined){
    subpage = 'profile'

  }

  const navigate = useNavigate()
 

  if(ready && !user){
    console.log('ready is',ready);
    console.log('user value is ',user);
    console.log('inside checker function');
 
    navigate('/login')

  }
  if(!ready && user === null ){
    console.log('insede');
    navigate('/login')
  }
  
  if(!ready){
    return 'Loading...'
  }
 
  

  function linkClasses(type=null){
    let classes = 'py-2 px-4 inline-flex gap-1 rounded-full'
    if(type===subpage ){
      
      classes += ' bg-primary text-white '
    }else{
      classes+= ' bg-gray-200'
    }
    return classes
    

   
  }
  const logout=async()=>{
    console.log('logout clicked')
    await axios.post('/logout')
    navigate('/')
    setUser(null)

    }

  
  
  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-2 mb-8 '> 
        <Link className={linkClasses('profile')} to='/account'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

          My Profile</Link>
        <Link className={linkClasses('bookings')} to='/account/bookings'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

          My bookings
          </Link>
        <Link className={linkClasses('places')} to='/account/places'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

          My Accomodations
          </Link>
      </nav>
      {
        subpage === 'profile' && (
          <div className='text-center  max-w-lg mx-auto'>
            Logged in as {user.name} ({user.email}) <br />
            <button onClick={logout} className="primary max-w-sm mt-2">Logout </button>
          </div>
        )
      }
      {
        subpage === 'places' && (
          <PlacesPage/>
        )
      }
    </div>
  )
}

export default AccountPage
