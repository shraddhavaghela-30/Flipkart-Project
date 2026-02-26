import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function AboutUs() {
  const [aboutus, setAboutUs] = useState([])


  useEffect(() => {
    getData()
  }, [])
  const getData = async() => {
    const res = await axios.get("http://localhost:1700/backend/aboutus")
    setAboutUs(res.data)
    console.log(res.data)
  }
  return (
    <div className='aboutus-div container'>
        <div className='flipkart-group'>
            <img src={`img/${aboutus.image_one}`} alt="flipkart-group" className='flipkart-grp-img'/>
            <div className='f-grp-details'>
              <div>
                  <h3 className='f-grp-heading'>{aboutus.heading_one}</h3>
                  <p className='f-grp-para'>{aboutus.content_one}</p>
              </div>

                <button type="button" className='f-grp-btn'>ABOUT US</button>
            </div>
        </div>

        <div className='ethics'>
          <h1 className='ethics-h1'>{aboutus.image_two}</h1>
          <img src={`img/${aboutus.image_two}`} alt="ethics" className='ethics-img'/>
          <p className='ethics-para'>{aboutus.content_two}</p>
          <button type="button" className='ethics-btn'>Know More</button>
        </div>
    </div>
  )
}
