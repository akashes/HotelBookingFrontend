import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'

function IndexPage() {
    const {user} = useContext(UserContext)
    console.log(user);
  return (
    <div>
index page
   </div>
  )
}

export default IndexPage
