import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500
        justify-center items-center rounded-tl-3xl rounded-br-3xl text-center"
    >
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className="text-2xl">
                Voulez vous en savoir plus sur l'intelligence Artificielle?
            </h2>
            <p className='text-gray-500 my-2'> 
                Des ressources qui peuvent vous intéresser...
            </p>
            <Button gradientDuoTone="purpleToPink" className='rounded-tl-xl rounded-bl-none'>
                <a href="/" target="" rel='noopener noreferrer'>
                    Visitez le site...
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img className="h-96 w-full" src="https://img.freepik.com/photos-premium/personne-utilisant-outil-ai-au-travail_23-2150714239.jpg?w=740" 
                alt="Intelligence Artificielle" 
            />
        </div>
    </div>
  )
}
