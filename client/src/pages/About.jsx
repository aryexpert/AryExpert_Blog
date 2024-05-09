import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>AryExpert-Blog</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
            Ce blog a pour principal objectif de regrouper les dernières informations sur l'intelligence Artificielle (IA)
            les internautes seront donc en mesure de commenter, des publications sur les sujets qui les passionnent, de poster 
            des images pour illustrer les idées ou étayer leurs propos. Il est donc bon de savoir 
            que tout auteur est responsable de ses sources et les administrateurs ont un droit de regard sur
            les différents Billets...
            </p>
            <p>
              Le terme « intelligence artificielle », créé par <span className='underline'>John McCarthy</span>,
              est souvent abrégé par le sigle « IA »
              (ou « AI » en anglais, pour artificial intelligence).
              McCarthy dans 
              <a className='text-blue-200' target='_blank' 
                href="https://fr.wikipedia.org/wiki/Intelligence_artificielle"> wikipédia
              </a> définit l'IA ainsi 
              : « C'est la science et l'ingénierie de la fabrication 
              de machines intelligentes, 
              en particulier de programmes informatiques intelligents. Elle est liée à la tâche similaire qui consiste à utiliser 
              des ordinateurs pour comprendre l'intelligence humaine, mais l'IA <span className='underline'>ne doit pas se limiter 
              aux méthodes qui sont biologiquement observables</span> . » 
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
