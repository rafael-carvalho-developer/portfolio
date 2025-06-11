import React from 'react';

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <h2 className="heading">Contact <span>Me!</span></h2>
      <form action="#">
        <div className="input-box">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Mobile Number" />
          <input type="text" placeholder="Email Subject" />
        </div>
        <textarea cols="30" rows="10" placeholder="Write your message..."></textarea>
        <input type="submit" value="Send Message" className="contact-btn" />
      </form>
    </section>
  );
}
