import {React, useEffect, useState} from 'react'
import axios from 'axios'
export default function ContactUs() {

  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [contactus, setContactus] = useState([])

  const cust_id = localStorage.getItem("customer_id")

  useEffect(() => {
    getData()
  }, [])

  const getData = async() => {
    const res = await axios.get('http://localhost:1700/backend/admincontact')
    setContactus(res.data)
  } 

  const handleInsertData = async() => {
    if(fname === ''){
      alert('Give us first name to identify you!')
      return
    }
    if(lname === ''){
      alert('Give us last name to identify you!')
      return
    }
    if(email === ''){
      alert('Give us email to identify you!')
      return
    }
    if(phone === ''){
      alert('Give us mobile number to identify you!')
      return
    }
    if(message === ''){
      alert('Enter a message!')
      return
    }
    const payload = {
      "first_name": fname,
      "last_name": lname,
      "email": email,
      "mobile_no": phone,
      "message": message,
      "entry_by": cust_id
    }
    const res = await axios.post("http://localhost:1700/backend/contactus", payload)
    console.log(res.data)
    alert('Thank you for reaching us!')
    setFName('')
    setLName('')
    setEmail('')
    setPhone('')
    setMessage('')
  }
  return (
    <div className='contactus-main-div'>
      <div className='contactus-div2'>

        <div className='contact-div1'>
          <div className='contact-name-line'>
            <h1 className='contact-names'>Phone &nbsp;<i class="fa-solid fa-phone contact-icons"></i></h1>
            <div className='contact-line1'></div>
          </div>
          <div>
            <span className='contact-email-div'>{contactus.contact_no}</span>
          </div>
        </div>

        <div className='contact-div1'>
          <div className='contact-name-line'>
            <h1 className='contact-names'>Email &nbsp;<i class="fa-solid fa-envelope contact-icons"></i></h1>
            <div className='contact-line1'></div>
          </div>
          <div>
            <span className='contact-email-div'>{contactus.email}</span>
          </div>
        </div>

        <div className='contact-div1'>
          <div className='contact-name-line'>
            <h1 className='contact-names'>Address &nbsp;<i class="fa-solid fa-location-dot contact-icons"></i></h1>
            <div className='contact-line1 contact-address-line'></div>
          </div>
          <div>
            <span className='contact-address-div'>{contactus.address}</span>
          </div>
        </div>

      </div>
      <div className='contactus-div'>
        <div className='get-in-touch-div'>
          <h1>Get in <span className='touch-span'>touch</span></h1>
          <div className='contact-line'></div>
        </div>
        <p className='contact-para'>We’re here to help! If you have questions about your orders, payments, deliveries, or need support with any of our services, feel free to reach out to us.</p>

        <div className='contact-inputs'>
          <div className='left-inputs'>
              <input type="text" name="fname" id="fname" placeholder='First Name' className='c-inputs' value={fname} onChange={(e) => setFName(e.target.value)}/>

              <input type="text" name="lname " id="lname" placeholder='Last Name' className='c-inputs' value={lname} onChange={(e) => setLName(e.target.value)}/>

              <input type="email" name="email" id="email" placeholder='Email' className='c-inputs' value={email} onChange={(e) => setEmail(e.target.value)}/>

              <input type="tel" name="tel" id="tel" placeholder='Phone Number' className='c-inputs' value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </div>
          <div className='right-inputs'>
              <textarea name="message" id="message" cols="45" rows="10" placeholder='Message'className='contact-msg c-inputs' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>
        </div>

        <button type="button" className='send-btn' onClick={handleInsertData}>send</button>
      </div>
    </div>
  )
}
