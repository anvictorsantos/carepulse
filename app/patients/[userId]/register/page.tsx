import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'

const Register = async ({params: {userId}}: SearchParamProps) => {
  const user = await getUser(userId);

  const getYear = () => {
    return new Date().getFullYear();
  }

  return (
     <div className="flex h-screen max-h-screen">
      <section className="my-auto container remove-scrollbar">
        <div className="max-w-[496px] sub-container">
          <Image  
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt='patient'
            className='mb-12 w-fit h-10'
          />

          <RegisterForm user={user} />

          <div className='flex justify-between mt-20 text-14-regular'>
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © {getYear()} CarePulse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt='patient'
        className='max-w-[50%] side-img'
      />
    </div>
  )
}

export default Register