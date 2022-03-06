import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

export default function Generator({name, imgSrc, func}) {
  return (
    <div className='generator-div'>
        <h1>{name}</h1>
        <div>
            <img className='img-container' src={imgSrc} />
        </div>
        <OverlayTrigger
            key={`${name}tooltip`}
            placement='right'
            overlay={
                <Tooltip>
                  <strong>Click to generate random {name} pic.</strong>
                </Tooltip>
              }
        >
        <Button style={{margin: 10}} onClick={() => func(name)}>Click me!</Button>
        </OverlayTrigger>
    </div>
  )
}
