import Box from '../Box'

const FormWhatYouWant = (props) => {

    return (
        <Box>
            <h2 className="subTitle"> O que você deseja fazer? </h2>
            <form onSubmit={ (event) => {
                event.preventDefault()

                const dataForm = new FormData(event.target);
 

                const comunity = {
                    id: new Date().toISOString(),
                    title: dataForm.get('title'),
                    image: dataForm.get('image')
                }

                const attComunities = [...props.comunities,  comunity];
                props.setComunities(attComunities);
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