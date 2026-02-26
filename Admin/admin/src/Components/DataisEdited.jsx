import React from 'react'

export default function DataisEdited({gototable, message}) {
  return (
    <div style={{
        position: 'fixed',
        inset: '0',
        backdropFilter: 'blur(4px)',
        zIndex: '9998',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '55px 0 0 290px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        boxShadow: "0 0 20px rgba(1,41,112,0.1)",
        borderRadius: '10px',
        padding: '15px',
        backgroundColor: '#fff'
      }}>
        <p style={{
            color: '#012970'
        }}>{message}</p>
        <button onClick={gototable} style={{
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#012970',
            color: '#fff',
            padding: '10px'
        }}>OK</button>
      </div>
    </div>
  )
}
