import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';




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
                            type='text'
                            />
                        </div>
                    </div>
                    <div className='buttonsDiv'>
                        <button type='submit' onClick={(event) => {
                            event.preventDefault();
                            props.setIsModalCommunityOpen(false);
                            const form = document.getElementById('form');
                            const dataForm = new FormData(form);
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
                        }}>
                            Criar comunidade
                        </button>
                        <button className='cancelButton' onClick={() => props.setIsModalCommunityOpen(false)}>
                            Cancelar
                        </button>
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


    background-color: rgba(0,0,0,0.7);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    justify-content: center;

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

    width: 55%;
    height: 30%;
    max-width: 650px;

    display:grid;
    flex-direction: column;

    position: absolute;

    transition: opacity 0.2s linear;

    opacity: ${props => props.isModalCommunityOpen ? 1 : 0};

    top: ${props => props.isModalCommunityOpen? '20%' : '-20%'};

    animation: ${props => props.isModalCommunityOpen ? slideUp : slideDown} 0.2s linear;

    z-index: 3;

    .title {
        font-size: 32px;
        font-weight: 400;
        margin-bottom: 20px;
        text-align: left;
    }
    form{
        align-items: center;
        justify-content: center;
        padding: 0;
    }
    input {
        width: 100%;
        background-color: #F4F4F4;
        color: #333333;
        border: 0;
        padding: 14px 16px;
        margin-bottom: 14px;
        border-radius: 10000px;
        ::placeholder {
            color: #333333;
            opacity: 1;
        }   
    }
    
    button {
        border: 0;
        padding: 8px 12px;
        color: #FFFFFF;
        border-radius: 10000px;
        background-color: #6F92BB;
    }

    .cancelButton{
        background-color: #c74646;
    }

    .buttonsDiv{
        display:flex;
        flex-direction: row;
        justify-content: space-between
    }
`

export default ModalCommunity;