import React from 'react'
import Image from 'next/image'
import SignInFormClient from '@/features/auth/components/signin-form-client'

const SignInPage = () => {
  return (
    <div className='space-y-0 flex flex-col items-center justify-center'>
      <Image src={"/logo.png"} alt="Logo Image" width={500} height={400} />
      <SignInFormClient />
    </div>
  )  
}

export default SignInPage
