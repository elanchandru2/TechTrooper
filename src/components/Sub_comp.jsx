import React from 'react'
import "../styles/Sub_comp.css"
import Pop from "./Pop"

const Sub_comp = () => {
  return (
    <div className='background'> {/* Apply the background class to the root element */}
      <div className='d-flex sm-flex-column lg-flex-row'>
        <div className='mt-5 ms-5'>
          <span style={{color:"#f502dd"}}>Review</span>
          <h1 className='text-white'>what client say?</h1>
          <p className='text-white'>"We're proud to share the experiences of our valued clients. <br /> Here's what they have to say about their journey with us."</p>
        </div>
        <div className='pt-2'>
          <h2 className='text-white ps-4'>Click to view</h2>
          <Pop/>
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sub_comp
