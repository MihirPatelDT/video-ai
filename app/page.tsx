import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  return (
    redirect("/register")
  )
}

export default page