import React from 'react'

const Thankyou=()=>{
    return(<div>
<div className="content">
  <div className="wrapper-1 h-screen flex flex-col">
    <div className="wrapper-2 flex-grow">
      <h1 className="font-kaushan text-4xl md:text-5xl tracking-wide text-blue-500 mb-6">Thank you!</h1>
      <p className="text-lg text-gray-700">Thanks for filling the form.</p>
      <p className="text-lg text-gray-700">You should receive a confirmation email soon.</p>
      {/* <button className="go-home bg-blue-500 text-white py-3 px-12 mt-6 rounded-full text-lg uppercase shadow-lg">go home</button> */}
    </div>
    <div className="footer-like bg-blue-100 py-1">
      <p className="text-lg text-blue-500">
        Email not received? <a href="#" className="font-semibold">Click here to send again</a>
      </p>
    </div>
  </div>
</div>

    </div>)
}

export default Thankyou