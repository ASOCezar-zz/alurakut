import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import ProfileSidebar from '../src/components/ProfileSidebar';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'



export default function Home() {

  const githubUser = 'ASOCezar'

  const pessoasFavoritas = [
    'dsohenrique',
    'juunegreiros',
    'omariosouto',
    'peas',
    'maykbrito',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>

        <div className="profileArea" style={{gridArea:'profileArea'}}>
          <ProfileSidebar  githubUser={githubUser} />
        </div>

        <div className='welcomeArea' style={{gridArea:'welcomeArea'}}>
        <Box>
          <h1 className='title'>
            Bem Vindo(a)
          </h1>

          <OrkutNostalgicIconSet />
        </Box>
        </div>

        <div className='profileRelationsArea' style={{gridArea:'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper >
            <h2 className='smallTitle'>
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
            {pessoasFavoritas.map(pessoa => {
                return (
                  <li>
                    <a href={`/users/${pessoa}`} key = {pessoa}>
                      <img src={`https://github.com/${pessoa}.png`} />
                      <span> {pessoa} </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>

      </ MainGrid>
    </>
    )
}
