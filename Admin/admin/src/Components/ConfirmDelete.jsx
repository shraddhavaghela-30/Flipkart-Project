import React from 'react'

export default function ConfirmDelete({yesDeleteData, noDeleteData}) {
  return (
    <div style={{
        position: 'fixed',
        inset: '0',
        backdropFilter: 'blur(4px)',
        zIndex: '9998',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '55px 0 0 290px',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(1,41,112,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <p style={{color: "#012970"}}>Are you sure you want to delete this data?</p>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '10px'
        }}>
            <button type="button" onClick={yesDeleteData} style={{
                backgroundColor: '#012970',
                color: "#fff",
                padding: '10px',
                borderRadius: '5px',
                border: 'none'
            }}>Yes</button>
            <button type="button" onClick={noDeleteData} style={{
                backgroundColor: '#012970',
                color: "#fff",
                padding: '10px',
                borderRadius: '5px',
                border: 'none'
            }}>No</button>
        </div>
      </div>
    </div>
  )
}
