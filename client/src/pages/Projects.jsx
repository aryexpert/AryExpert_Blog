import React from 'react'
import { CallToAction } from '../components'

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Nos Projets</h1>
      <p className='text-md text-gray-500'>
       Ce contenu sera disponible très prochainement!
      </p>
        <CallToAction />
    </div>
  )
}
