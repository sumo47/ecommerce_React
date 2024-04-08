import React from 'react'
import styled from 'styled-components'
import { useAuth0 } from "@auth0/auth0-react";


function Contact() {
  const { isAuthenticated, user } = useAuth0()
  return (
    <Wrapper>
      <h2 className='common-heading'>Contact us</h2>
      <iframe title='contact' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17884.341382256887!2d82.98450647056313!3d25.31884894543108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x68131710853ff0b5!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1708111327620!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
      <div className="container">
        <div className="contact-form">
          <form action="https://formspree.io/f/moqgdpdz" method="POST" className='contact-inputs'>
            <input type="text" placeholder='username' name='username' required autoComplete='off' value={isAuthenticated ? user.name : "Login first"} />
            <input type="email" name='Email' placeholder='Email' autoComplete='off' required value={isAuthenticated ? user.email : "Login first"} />
            <textarea name="Messages" cols="30" rows="10" placeholder='Enter your messages' autoComplete='off' required></textarea>
            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </Wrapper>

  )
}

const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }`;
export default Contact
