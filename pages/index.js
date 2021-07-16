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

  const [communities, setCommunities] = useState([]);

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/peas/followers`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {setFollowers(res)})
      .catch(err => console.error(err.message));

      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': 'da9d5c1afd56a59b4de7acbbadf7e4',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 'query': `query{ allCommunities { id, title, imageUrl, slugCreator }}`})
      })
      .then((res) => res.json())
      .then((res) =>{
        setCommunities(res.data.allCommunities)
      })
      .catch(err => console.error(err.message))
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

  function communityDefault(){
    let communityAtt = [];
    communities.map(item => {
      communityAtt.push({
        id: (item.id),
        title: (item.title),
        image: (item.imageUrl)
      })
    })
    return communityAtt;
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
          <FormWhatYouWant communities={communities} setCommunities={setCommunities} />
        </div>

        <div className='profileRelationsArea' style={{gridArea:'profileRelationsArea'}}>
          
          <ProfileRelationsContent
            name = 'communities'
            array = {communityDefault()}
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
