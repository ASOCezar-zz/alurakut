import { ProfileRelationsBoxWrapper } from "../ProfileRelations"

const ProfileRelationsContent = (props) => {
    return (
        <ProfileRelationsBoxWrapper >
            <h2 className='smallTitle'>
              {props.name} ({props.array.length})
            </h2>

            <ul>
            {props.array.map(item => {
                return (
                  <li key={item.id}>
                    <a href={`/users/${item.title}`} key = {item.title}>
                      <img src={item.image} />
                      <span> {item.title} </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
    )
}

export default ProfileRelationsContent;