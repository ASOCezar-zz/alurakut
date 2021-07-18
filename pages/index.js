import React, { useState, useEffect } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import ProfileSidebar from '../src/components/ProfileSidebar';
import { AlurakutMenu } from '../src/lib/AlurakutCommons'
import BoxWelcomeArea from '../src/components/BoxWelcomeArea';
import FormWhatYouWant from '../src/components/FormWhatYouWant';
import ProfileRelationsContent from '../src/components/ProfileRelationsContent';
import ModalCommunity from '../src/components/ModalCommunity';
import ModalFriend from '../src/components/ModalFriend';


export default function Home(props) {


  const githubUser = props.githubUser;

  const [friends, setFriends] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isModalFriendOpen, setIsModalFriendOpen] = useState(false);
  const [isModalCommunityOpen, setIsModalCommunityOpen] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
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

      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': 'da9d5c1afd56a59b4de7acbbadf7e4',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 'query': `query{ allFriends { id, title, imageUrl} }` })
      })
      .then((res) => res.json())
      .then((res) => {
        setFriends(res.data.allFriends)
      })
      .catch(err => console.error(err.message))
  }, [])


  function followersDefault(){
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

  function arrayDefault(props){
    let communityAtt = [];
    props.map(item => {
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

          
          
          <FormWhatYouWant
            isModalCommunityOpen={isModalCommunityOpen}
            setIsModalCommunityOpen={setIsModalCommunityOpen}
            isModalFriendOpen={isModalFriendOpen}
            setIsModalFriendOpen={setIsModalFriendOpen}
          />

          <ModalCommunity
            isModalCommunityOpen={isModalCommunityOpen}
            setIsModalCommunityOpen={setIsModalCommunityOpen}
            communities={communities}
            setCommunities={setCommunities}
          />

          <ModalFriend
            isModalFriendOpen={isModalFriendOpen}
            setIsModalFriendOpen={setIsModalFriendOpen}
            friends={friends}
            setFriends={setFriends}
          />

        </div>

        <div className='profileRelationsArea' style={{gridArea:'profileRelationsArea'}}>
          
          <ProfileRelationsContent
            name = 'Communities'
            array = {arrayDefault(communities)}
            sourceImage='http://placehold.it/300x800'
          />

          <ProfileRelationsContent
            name='Friends'
            array={arrayDefault(friends)}
            sourceImage='http://placehold.it/300x800'
          />

          <ProfileRelationsContent
            name='Followers'
            array={followersDefault()}
            sourceImage='http://placehold.it/300x800'
          />

          
        </div>

      </ MainGrid>
    </>
    )
}

export async function getServerSideProps(context) {
  
  const token = nookies.get(context).USER_TOKEN;

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: { Authorization: token }
  })
  .then(res => res.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  
  return {
    props: {
      githubUser,
    }, 
  }
}