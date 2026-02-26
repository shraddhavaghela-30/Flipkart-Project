import React from 'react'

export default function ViewDetails({isOpen, onClose, address}) {
    if(!isOpen) return null;
  return (
    <div className='all-div'
        style={{
            position: 'fixed',
            inset: '0',
            backdropFilter: 'blur(4px)',
            zIndex: '9998',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '55px 0 0 290px',
        }}>
        <div
            style={{ 
                boxShadow: '0 10px 20px rgba(1,41,112,0.2)',
                backgroundColor: '#fff',
                padding: '20px',
                position: 'relative',
                zIndex: '9999',
                width: '50%',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

            <p
                style={{fontSize: '15px' , color: '#012970'}}
            >{address}</p>
            <button type="button" onClick={onClose}
                style={{
                    border: 'none',
                    backgroundColor: "#012970",
                    color: "#fff",
                    borderRadius: "2px",
                    padding: '5px 10px',
                    fontSize: '16px',
                    width: 'fit-content'
                }}
            ><i class="fa-solid fa-xmark"></i></button>
        </div>
    </div>
  )
}
