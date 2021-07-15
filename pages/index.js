import React, { useState, useEffect } from 'react';
import MainGrid from '../src/components/MainGrid'
import ProfileSidebar from '../src/components/ProfileSidebar';
import { AlurakutMenu } from '../src/lib/AlurakutCommons'
import BoxWelcomeArea from '../src/components/BoxWelcomeArea';
import FormWhatYouWant from '../src/components/FormWhatYouWant';
import ProfileRelationsContent from '../src/components/ProfileRelationsContent';



export default function Home() {

  const githubUser = 'ASOCezar'

  const pessoasFavoritas = [ 
    {id: 1, title: 'dsohenrique', image: 'http://github.com/dsohenrique.png'},
    {id: 2, title:'juunegreiros', image: 'http://github.com/juunegreiros.png'},
    {id: 3, title:'omariosouto', image: 'http://github.com/omariosouto.png'},
    {id: 4, title:'peas', image: 'http://github.com/peas.png'},
    {id: 5, title:'maykbrito', image: 'http://github.com/maykbrito.png'},
    {id: 6, title:'felipefialho', image: 'http://github.com/felipefialho.png'}
  ]

  const [comunities, setComunities] = useState([{
    id: "412455151",
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/peas/followers`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {setFollowers(res)})
      .catch(err => console.error(err.message));
  }, [])

  function arrayDefault(){
    let arrayAtt = [];
    followers.map(item => {
      arrayAtt.push({
        id: (item.id),
        title: (item.login),
        image: (item.avatar_url)
      })
    })
    return arrayAtt;
  }
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>

        <div className="profileArea" style={{gridArea:'profileArea'}}>
          <ProfileSidebar  githubUser={githubUser} />
        </div>

        <div className='welcomeArea' style={{gridArea:'welcomeArea'}}>
          <BoxWelcomeArea />
          <FormWhatYouWant comunities={comunities} setComunities={setComunities}/>
        </div>

        <div className='profileRelationsArea' style={{gridArea:'profileRelationsArea'}}>
          
          <ProfileRelationsContent
            name = 'Comunities'
            array = {comunities}
            sourceImage='http://placehold.it/300x800'
          />

          <ProfileRelationsContent
            name='Friends'
            array={pessoasFavoritas}
            sourceImage='http://placehold.it/300x800'
          />

          <ProfileRelationsContent
            name='Followers'
            array={arrayDefault()}
            sourceImage='http://placehold.it/300x800'
          />
          
        </div>

      </ MainGrid>
    </>
    )
}
