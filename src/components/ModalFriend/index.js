import React from 'react';
import styled, { keyframes } from 'styled-components';
const { SiteClient } = require('datocms-client');
const client = new SiteClient('2f09188895af0fd9fe6e983a14e677')

function ModalCommunity(props) {
    async function createRecord(data) {
        console.log('data',data)
        await client.items.create({
            itemType: '971922',
            title: data.login,
            image_url: data.avatar_url,
        })
    }
    return (
        <>
            <Wrapper isModalCommunityOpen={props.isModalFriendOpen} />
            <Div isModalCommunityOpen={props.isModalFriendOpen}>
                <p className="title"> Adicionar amigo </p>
                <form id='newFriendForm'>
                    <div className="divInput">
                        <div >
                            <input
                            placeholder='Qual o username do Github do seu novo amigo?'
                            id='username'
                            name='username'
                            aria-label='Qual o username do Github do seu novo amigo?' 
                            type='text'
                            />
                        </div>
                    </div>
                    <div className='buttonsDiv'>
                        <button type='submit' onClick={(event) => {
                            event.preventDefault();
                            if(document.getElementById('username').value === '') {
                                document.querySelector('#username').classList.add('error')
                            } else {
                                props.setIsModalFriendOpen(false);
                                document.querySelector('#username').classList.remove('error')
                                const newFriendForm = document.getElementById('newFriendForm');
                                const dataFriendForm = new FormData(newFriendForm);
                                const friendForm = {
                                    title: dataFriendForm.get('username')
                                }
                                fetch(`https://api.github.com/users/${friendForm.title}`)
                                .then(async (res) => {
                                    const data = await res.json();
                                    createRecord(data)
                                })
                            }
                        }}>
                            Adicionar amigo
                        </button>
                        <a className='cancelButton' onClick={() => {
                            document.querySelector('#title').classList.remove('error')
                            props.setIsModalFriendOpen(false)}
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
        background-color: #03bb85;
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