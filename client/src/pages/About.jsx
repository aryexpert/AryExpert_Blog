import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-6xl mx-auto p-3 text-center">
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>AryExpert-Blog</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              AryExpert-Blog a pour principal objectif de regrouper les dernières informations sur l'intelligence Artificielle (IA). 
              Les internautes seront en mesure de commenter des publications sur les sujets qui les passionnent, de poster des images 
              pour illustrer les idées ou pour étayer leurs propos. A ce sujet, nous avons trois principaux thèmes à savoir:<br/>
              - Actualité_IA
              - Environnement_IA
              - IA_Afrique - <br/><br/>
              Le premier Billet que nous avons proposé aux internautes a pour titre l'IA: MENACE OU OPPORTUNITE 
              (https://aryexpert-blog.onrender.com/post/lia--menace-ou-opportunité). 
              C’est ici une question générale ayant pour but de recueillir l'avis d'un maximum de personnes sur le sujet. 
              Ensuite, nous avons proposé un sujet plus précis pour toucher une communauté particulière. 
              Il est intitulé : DES PROJETS EN INTELLIGENCE ARTIFICIELLE PAR DES FEMMES AFRICAINES. 
              (https://aryexpert-blog.onrender.com/post/des-projets-en-intelligence-artificielle-par-des-femmes-africaines)
              Au travers de ces Billets, on peut comprendre que la technologie nouvelle demande d'une part beaucoup plus 
              d'attention qu’elle ne l’a déjà des pouvoirs publics (menaces) et des organisations internationales et une bonne 
              communication d'autre part afin que les couches sociales défavorisées puissent elles aussi s'y mettre et en bénéficier. 
              Afin de toucher un maximum de personnes nous avons invité des internautes à visiter notre blog via 
              - Twitter (X)
              - Facebook
              - Whatsapp 
              - Linkedin
              - Teams <br/><br/>
              Pour ce qui est des actions menées, nous avons opté pour un blog personnalisé écrit en Réact. 
              Nous avons fait de la veille technologique via Feedly pour récupérer les actualités sur le sujet. 
              Avec la configuration Google pour les mails, on pouvait obtenir des notifications et une synchronisation 
              des informations directement dans la plateforme de flux rss. Nous avons lié notre initiative à Google 
              Analytics afin de pouvoir récupérer les statistiques de fréquentation des internautes.
              En ce qui concerne les fréquentations sur la page pour les deux posts, nous avons relevé 8 
              utilisateurs enregistrés pour un total de 6 commentaires.<br/><br/>

              Avec Google Analytics nous avons observé que les actions menés ont joué un grand rôle pour la visibilité des pages. 
              On constate que l’Amérique du nord est la principale zone intéressé et pourtant l’Afrique qui a 
              fait l’objet d’un billet n’a pas beaucoup interagi, du moins comme on s’y attendait.  On peut dire que WhatsApp et 
              Teams ont été les référents les plus importants avec le grand nombre de groupes avec qui nous avons pu échanger sur 
              le sujet.

            </p>
            {/* <p>
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
            </p> */}
          </div>
        </div>
      </div>
    </div>
  )
}
