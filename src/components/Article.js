import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { MdUpdate } from 'react-icons/md'

const Article = props => {
    const {
        title,
        address,
        zone,
        city,
        description,
        publishDate,
        picture,
        price,
        currency,
        plan,
        expenses
    } = props

    const currencySymbol = currency === 'ARS' ? '$'
        : currency === 'USD' ? 'US$'
            : ''

    const planColor = plan === 'SUPERHIGHLIGHTED' ? '#9371e0'
        : plan === 'HIGHLIGHTED' ? '#31d1a1'
            : '#00000000'

    const planName = plan === 'SUPERHIGHLIGHTED' ? 'Super Destacado'
        : plan === 'HIGHLIGHTED' ? 'Destacado'
            : 'Simple'

    const fromNow = moment(publishDate.split('/').join(), "DDMMYYYY").fromNow()

    return <Styles plan={plan} planColor={planColor} picture={picture}>
        <div className='picture'>
            <span className='plan'>
                {planName}
            </span>
            <div className='image'>
            </div>
            <div className='footer-picture'>
                <h1><b>{`${currencySymbol} ${price.toLocaleString('es')}`}</b></h1>
                <span>{expenses && `+ $${expenses} Expensas`}</span>
            </div>

        </div>
        <div className='description'>
            <h3>{title}</h3>
            <h4>{`${address}, ${zone}, ${city}`}</h4>
            <p>{description}</p>
            <div className='footer-description'>
                <span className='publishedDate'><MdUpdate size={24} />{`Publicado ${fromNow}`}</span>
                <button>Contactar</button>
            </div>
        </div>
    </Styles>
}

const Styles = styled.article`
    border-radius: 5px;
    background-color: #fff;
    width: 100%;
    display: flex;
    box-shadow: 0 2px 20px 0 rgba(0,0,0,.33);
    margin-bottom: 10px;
    position: relative;
    overflow:hidden;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
        width: 100%;
        height: 4px;
        background-color: ${props => props.planColor};
    }

    .picture {
        position: relative;
        flex-grow: ${props => props.plan === 'SUPERHIGHLIGHTED' ? '2' : '1'};
        width: 274px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .image {
            height: 100%;
            display: flex;
            background-image: url(' ${props => props.picture}');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }
        .plan {
            position: absolute;
            left: 12px;
            top: 12px;
            z-index: 2;
            color: #fff;
            font-size: 13px;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(0,0,0,.7);
        }
        .footer-picture {
            h1{
                margin: 5px 0;
            }
            height: 80px;
            margin: 10px 0 10px 10px;
            border-right: 1px solid #dddcbd;
        }
    }

    .description {
        width: 100px;
        padding: 14px 18px 10px 14px;
        display: flex;
        flex-direction: column;
        flex-grow: 9;
        
        
        h3{
            color: #1ea7dd;
            margin: 0;
        }
        p{
            color: #848484;
        }

        .footer-description{
            display:flex;
            justify-content: space-between;
            height: 50px;
            align-items: flex-end;
            margin: 10px 0px;

            .publishedDate{
                margin-bottom: 0;
                display: flex;
                align-items: center;
                font-size: 15px;
                color: #333;
                font-weight: bold;
                * {
                    margin-right: 5px;
                }
            }

            button {
                border: none;
                background-color: #fc7b27;
                font-size: 15px;
                font-weight: 500;
                letter-spacing: .5px;
                line-height: 35px;
                color: #fff;
                padding: 0 14px;
                border-radius: 5px;
                height: fit-content;
                cursor: pointer;
                outline: none;
            }
        }

        
    }
`

export default Article