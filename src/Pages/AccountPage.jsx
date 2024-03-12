import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
function AccountPage() {
  const navigate = useNavigate()
  const {user,ready} = useContext(UserContext)
  if(ready && !user){
    navigate('/login')

  }
  if(!ready){
    return 'Loading...'
  }
  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-2 '> 
        <Link className='py-2 px-6 bg-primary text-white rounded-full' to='/account'>My Profile</Link>
        <Link className='py-2 px-6' to='/account/bookings'>My bookings</Link>
        <Link className='py-2 px-6' to='/account/places'>My Accomodations</Link>
      </nav>
    </div>
  )
}

export default AccountPage
