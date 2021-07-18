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
        text-align: left;
    }
    form{
        display: flex;
        flex-direction: column;
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
        font-size: 14px;
        padding: 8px 12px;
        color: #FFFFFF;
        border-radius: 10000px;
        background-color: #c74646;
    }

    .buttonsDiv{
        margin-top: 30px;
        display:flex;
        flex-direction: row;
        justify-content: space-between
    }
`

export default ModalCommunity;