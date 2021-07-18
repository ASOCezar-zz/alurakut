import Box from '../Box'
import WrapperModalCommunity from '../ModalCommunity'

const FormWhatYouWant = (props) => {

    return (
        <Box>
            <h2 className="subTitle"> O que você deseja fazer? </h2>
            
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <button onClick={() => {
                        props.setIsModalCommunityOpen(!props.isModalCommunityOpen)
                    }}>
                        Criar Comunidade
                    </button>
                    

                {/* <button onClick={() => {
                    props.setIsModalFriendOpen(!props.isModalFriendOpen) 
                    console.log(props.isModalFriendOpen)
                }}>
                    Adicionar um Amigo
                </button> */}
            </div>
        </Box>
    )
}

export default FormWhatYouWant;