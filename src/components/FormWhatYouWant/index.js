import Box from '../Box'

const FormWhatYouWant = (props) => {

    return (
        <Box>
            <h2 className="subTitle"> O que você deseja fazer? </h2>
            <form onSubmit={ (event) => {
                event.preventDefault()

                const dataForm = new FormData(event.target);
 
                const communityForm = {
                    title: dataForm.get('title'),
                    imageUrl: dataForm.get('image'),
                    slugCreator: 'ASOCezar'
                }


                fetch('/api/communities', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(communityForm)
                })
                .then(async(res) => {
                    const data = await res.json();
                    const community = data.createdCommunity;
                    const attCommunties = [...props.communities, community]
                    props.setCommunities(attCommunties);
                })

                
            } } >
                <div>
                    <input
                    placeholder='Qual vai ser o nome da sua comunidade?'
                    name='title'
                    aria-label='Qual vai ser o nome da sua comunidade?' 
                    type='text'
                    />
                </div>
                <div>
                <input
                    placeholder='Coloque uma URL para usarmos de capa'
                    name='image'
                    aria-label='Coloque uma URL para usarmos de capa' 
                    type='text'
                    />
                </div>

                <button>
                    Criar comunidade
                </button>
            </form>
        </Box>
    )
}

export default FormWhatYouWant;