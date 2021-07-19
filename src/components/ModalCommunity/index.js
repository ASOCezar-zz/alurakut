import React from 'react';
import styled, { keyframes } from 'styled-components';
import Box from '../Box'

function ModalCommunity(props) {
    return (
        <>
            <Wrapper isModalCommunityOpen={props.isModalCommunityOpen} />
            <Div isModalCommunityOpen={props.isModalCommunityOpen}>
                <p className="title"> Criar Comunidade </p>
                <form id='form'>
                    <div className="divInput">
                        <div >
                            <input
                            placeholder='Qual vai ser o nome da sua comunidade?'
                            id='title'
                            name='title'
                            aria-label='Qual vai ser o nome da sua comunidade?' 
                            type='text'
                            />
                        </div>
                        <div>
                        <input
                            placeholder='Coloque uma URL para usarmos de capa'
                            id='image'
                            name='image'
                            aria-label='Coloque uma URL para usarmos de capa' 
                            type='url'
                            />
                        </div>
                    </div>
                    <div className='buttonsDiv'>
                        <button type='submit' onClick={(event) => {
                            event.preventDefault();
                            if(document.getElementById('image').value === '' || document.getElementById('title').value === '') {
                                if(document.getElementById('title').value === '') document.querySelector('#title').classList.add('error')
                                if(document.getElementById('image').value === '') document.querySelector('#image').classList.add('error')
                            } else {
                                props.setIsModalCommunityOpen(false);
                                document.querySelector('#title').classList.remove('error')
                                document.querySelector('#image').classList.remove('error')
                                const newCommunityform = document.getElementById('form');
                                const dataForm = new FormData(newCommunityform);
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
                            }
                        }}>
                            Criar comunidade
                        </button>
                        <a className='cancelButton' onClick={() => {
                            document.querySelector('#title').classList.remove('error')
                            document.querySelector('#image').classList.remove('error')
                            props.setIsModalCommunityOpen(false)}
                        }>
                            Cancelar
                        </a>
                    </div>
                    
                </form>
            </Div>
        </>
    )
}



const slideUp = keyframes`
    from { top: 0 }
    to { top: 20% }
`

const slideDown = keyframes`
    from { top: 20% }
    to { top: -20% }
`

const showBackground = keyframes`
    from { height: 0 }
    to { height: 100% }
`

const hideBackground = keyframes`
    from { height: 100% }
    to { height: 0 }
`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 0;

    background-color: rgba(0,0,0,0.7);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;


    transition: opacity 0.3s linear;
    animation: ${props => props.isModalCommunityOpen ? showBackground : hideBackground} 0.3s linear;

    height: ${props => props.isModalCommunityOpen ? '100%' : '0'};

    opacity: ${props => props.isModalCommunityOpen ? 1 : 0} ;

    z-index: 2;
`

const Div = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    width: 80%;
    height: 40%;


    @media(min-width: 860px) {
        width: 60%;
        height: 30%;
        max-width: 650px;
    }

    @media(max-width: 860px){
        display: grid;
    }

    position: fixed;

    margin: auto;

    transition: opacity 0.2s linear;

    opacity: ${props => props.isModalCommunityOpen ? 1 : 0};

    top: ${props => props.isModalCommunityOpen? '20%' : '-100%'};

    animation: ${props => props.isModalCommunityOpen ? slideUp : slideDown} 0.2s linear;

    z-index: 3;



    .title {
        @media(min-width: 860px) {
            font-size: 32px;
            margin-bottom: 20px;
        }
        font-size: 20px;
        font-weight: 400;
        text-align: left;
        margin-bottom: 0;
        padding: 0;
    }
    .divInput {
        @media(max-width: 860px) {
            display: grid;
            gap: 12px;
        }
    }
    form{
        align-items: center;
        justify-content: center;
        padding: 0;
        display: grid;
        grid-row-gap: 5px;
        grid-template-columns: 100%;
    }
    input {
        width: 100%;
        background-color: #F4F4F4;
        color: #333333;
        border: 0;
        padding: 14px 16px;
        border-radius: 10000px;
        @media(min-width: 860px) {
            margin-bottom: 14px;
        }
        ::placeholder {

            @media(max-width: 860px) {
                font-size: 8pt;
            }
            color: #333333;
            opacity: 1;
        }   
    }
    .error {
        border: 2px solid red;
    }
    
    button {
        border: 0;
        padding: 8px 12px;
        color: #FFFFFF;
        border-radius: 10000px;
        background-color: #6F92BB;
    }

    a {
        border: 0;
        font-size: 12px;
        padding: 8px 12px;
        color: #FFFFFF;
        border-radius: 10000px;
        background-color: #c74646;
    }

    .buttonsDiv{
            position: relative;
            display:flex;
            flex-direction: row;
            justify-content: space-between;
    }
`

export default ModalCommunity;