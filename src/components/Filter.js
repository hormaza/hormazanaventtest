import React, { useState } from 'react'
import styled from 'styled-components'

import { IoIosArrowDown as Arrow, IoMdSearch } from 'react-icons/io'

const Filter = props => {
    const [hideAddress, setHideAddress] = useState(false)
    const [hideTypeOperation, setHideTypeOperation] = useState(false)

    const { operationType, onChangeDirection, onOperationTypeChange } = props

    const onChangeDirectionHandler = e => {
        e.preventDefault()
        const direction = e.nativeEvent.target.elements[0].value
        onChangeDirection(direction)
    }
    return <Styles>
        <div className='title'>
            <h3>Filtrado Actual</h3>
        </div>
        <hr />
        <div className='title'>
            <h3>Dirección</h3>
            <span className='arrow'
                style={{ transform: `rotate(${!!hideAddress ? 0 : 180}deg)` }}
                onClick={() => {
                    setHideAddress(!hideAddress)
                }}><Arrow size='20' /></span>
        </div>
        <form className='fieldset' onSubmit={onChangeDirectionHandler} style={{ maxHeight: !!hideAddress ? 0 : 200 }}>
            <input placeholder='Buscar por dirección' type='text'></input>
            <button><IoMdSearch size='20' /></button>
        </form>
        <hr />
        <div className='title'>
            <h3>Tipo de operacion</h3>
            <span className='arrow'
                style={{ transform: `rotate(${!!hideTypeOperation ? 0 : 180}deg)` }}
                onClick={() => {
                    setHideTypeOperation(!hideTypeOperation)
                }}><Arrow size='20' /></span>
        </div>
        <form className='fieldset' style={{ maxHeight: !!hideTypeOperation ? 0 : 200 }}>
            <div className='checkboxes'>
                <input
                    id='Comprar'
                    type='radio'
                    checked={operationType === 'Comprar'}
                    onClick={() => onOperationTypeChange('Comprar')} />
                <label htmlFor='Comprar'>Comprar</label>
                <br />
                <input
                    id='Alquiler'
                    type='radio'
                    checked={operationType === 'Alquiler'}
                    onClick={() => onOperationTypeChange('Alquiler')} />
                <label htmlFor='Alquiler'>Alquiler</label>
                <br />
                <input
                    id='Temporal'
                    type='radio'
                    checked={operationType === 'Temporal'}
                    onClick={() => onOperationTypeChange('Temporal')} />
                <label htmlFor='Temporal'>Temporal</label>
                <br />
                <input
                    id='Todos'
                    type='radio'
                    checked={operationType === 'Todos'}
                    onClick={() => onOperationTypeChange('Todos')} />
                <label htmlFor='Todos'>Todos</label>
            </div>
        </form>
        <div>
        </div>

    </Styles>
}

const Styles = styled.nav`
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 3px 7px 0 rgba(0,0,0,.03);
    background-color: #fff;
    border: .8px solid hsla(0,0%,77.3%,.56);
    padding: 15px 12px;
    border-radius: 4px;
    position: relative;

    .title{
            position: relative;
        .arrow{
            position:absolute;
            top: 0;
            right: 0;
            cursor:pointer;
            display: flex;
            align-items: center;
        }
    }

    .fieldset{
        border: none;
        overflow: hidden;
        padding: 0;
        transition: max-height 0.2s ease-out;
        display: flex;

        input[type=text] {
            font-size: 13px;
            border-radius: 5px;
            border: 1px solid #ddd;
            padding: 0 15px;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,.03);
            box-sizing: border-box;
            flex-grow: 9;
        }
        button {
            flex-grow: 1;
            border: none;
            width: 38px;
            height: 38px;
            margin: 1px 5px;
            border-radius: 5px;
            box-shadow: 0 0 3px 0 rgba(0,0,0,.15);
            box-sizing: bordex-box;
            background-color: #fff;
            color: #1ea7dd;
            cursor: pointer;
        }
    }

    hr {
        border-top: none;
        margin: 20px 0;
    }
`

export default Filter