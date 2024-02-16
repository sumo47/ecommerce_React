import React from 'react'
import styled from 'styled-components'

function Contact() {
  return (
    <Wrapper>
      <iframe title='contact' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17884.341382256887!2d82.98450647056313!3d25.31884894543108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x68131710853ff0b5!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1708111327620!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{border:0}}
        allowFullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
    </Wrapper>
  )
}

const Wrapper = styled.section``;
export default Contact
