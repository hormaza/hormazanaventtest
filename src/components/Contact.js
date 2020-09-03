
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

let timer = null;
const Contact = props => {
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [messageError, setMessageError] = useState(false)

    const blockScroll = (block) => {
        const body = document.querySelector('body')
        body.style.overflow = block ? 'hidden' : 'auto'
    }

    useEffect(() => {
        blockScroll(true)
        clearTimeout(timer)
        timer = setTimeout(() => {
            setNameError(false)
            setEmailError(false)
            setMessageError(false)
        }, 5000)
        return () => blockScroll(false)
    })

    const onSubmit = (e) => {
        setNameError(false)
        setEmailError(false)
        setMessageError(false)

        e.preventDefault()
        const elements = [...e.nativeEvent.srcElement.elements]
        const inputs = elements.filter(element => element.nodeName === 'INPUT')
        const name = inputs.find(element => element.id === 'name').value
        const email = inputs.find(element => element.id === 'email').value
        const text = elements.find(element => element.nodeName === 'TEXTAREA').value


        const checkEmptyValue = value => !value
        const checkEmail = email => {
            const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regExp.test(email)
        }

        const isNameNotEmpty = !checkEmptyValue(name) || setNameError(true)
        const isEmailCorrect = (!checkEmptyValue(email) && checkEmail(email)) || setEmailError(true)
        const isTextNotEmpty = !checkEmptyValue(text) || setMessageError(true)

        if (
            isNameNotEmpty &&
            isEmailCorrect &&
            isTextNotEmpty
        ) {
            alert(`Email enviado, gracias ${name}`)
            props.close()
        }
    }

    return <Styles >
        <div className='contact-container'>
            <button className='close' onClick={props.close}>X</button>

            <form onSubmit={onSubmit}>
                <div className={`form-row ${nameError ? 'error' : ''}`} >
                    <label htmlFor='name'>Nombre:</label>
                    <input id='name' type='text' />
                </div>
                <div className={`form-row ${emailError ? 'error' : ''}`}>
                    <label htmlFor='email'>Email:</label>
                    <input id='email' type='text' />
                </div>
                <div className={`form-row ${messageError ? 'error' : ''}`}>
                    <label htmlFor='message'>Mensaje:</label>
                    <textarea min-height='200px' id='message' type='text' />
                    <button className='send'>Enviar</button>
                </div>
            </form>
        </div>
    </Styles>
}

const Styles = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background:#00000040;
   z-index:3;


   input,textarea{
        font-size: 13px;
        border-radius: 5px;
        border: 1px solid #ddd;
        padding: 0 15px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.03);
        box-sizing: border-box;
        flex-grow: 9;
        height: 30px;
   }
   
   textarea {
       height: 60px;
   }

   .contact-container{
        border-radius: 5px;
        background-color: #fff;
        display: flex;
        box-shadow: 0 2px 20px 0 rgba(0,0,0,.33);
        background: white;
        max-height: 320px;
        max-width: 600px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: block;
        margin: auto;
        button.close {
            position: absolute;
            right: 10px;
            top: 10px;
        }
        
        .form-row{
            margin: 20px 60px;
            display: flex;
            flex-direction: column;
        }
        button.send{
            justify-self: flex-end;
            margin: 10px 0;
            
        }
        .error {
            input, textarea{
                border: 2px solid red;
            }

        }
   }
`

export default Contact