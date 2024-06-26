import React from 'react';
import './emailTemplate.css'; 

const EmailTemplate = ({ fname, lname }) => {
  return (
    <div className="email-main-container-div" style={{ paddingTop: '20px' }}>
      <div className="email-container">
        <img
          src="https://www.yourdomain.com/path-to-your-image/email-logo.png"
          alt="Milele Car Rental"
          className="milele-icon"
          style={{ width: '100%', maxWidth: '600px' }}
        />

        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          border="0"
          style={{
            background: 'url(https://www.yourdomain.com/path-to-your-image/email-bg.png) no-repeat center center / cover',
            width: '100%',
            maxWidth: '600px',
            backgroundSize: 'contain',
          }}
        >
          <tr>
            <td style={{ padding: '50px' }}>
              <img
                src="https://www.yourdomain.com/path-to-your-image/mail-icon.png"
                alt="Email"
                width="60"
                style={{ verticalAlign: 'middle', marginRight: '8px' }}
              />
              <h1>Hi, {fname} {lname}!</h1>
              <h3>
                <b>
                  We have received your inquiry. You will be contacted by our
                  experts soon!
                </b>
              </h3>
              <div>
                <hr className="hr-divider" />
              </div>
              <p><b>If This Cannot Wait, Get In Touch With Us!</b></p>
              <p>
                <a
                  href="https://wa.me/971563298330"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <img
                    src="https://www.yourdomain.com/path-to-your-image/whatsapp-icon.png"
                    alt="WhatsApp"
                    width="30"
                    style={{ verticalAlign: 'middle', marginRight: '8px' }}
                  />
                </a>
                <a
                  href="tel:+971563298330"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <img
                    src="https://www.yourdomain.com/path-to-your-image/phone-icon.png"
                    alt="Phone"
                    width="30"
                    style={{ verticalAlign: 'middle', marginRight: '8px' }}
                  />
                </a>
                <b> +971 56 329 8330</b>
              </p>
            </td>
          </tr>
        </table>
      </div>

      <div className="email-footer">
        <div className="container">
          <div className="social-media-container">
            <a
              href="https://www.facebook.com/milelecarrental/"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src="https://www.yourdomain.com/path-to-your-image/facebook-icon.png"
                alt="Facebook"
                width="30"
                style={{ verticalAlign: 'middle', marginRight: '8px' }}
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCGZsbfATcMxEBbz1PWAKt0A"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src="https://www.yourdomain.com/path-to-your-image/youtube-icon.png"
                alt="Youtube"
                width="30"
                style={{ verticalAlign: 'middle', marginRight: '8px' }}
              />
            </a>
            <a
              href="https://www.instagram.com/milelecarrentals/"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src="https://www.yourdomain.com/path-to-your-image/instagram-icon.png"
                alt="Instagram"
                width="30"
                style={{ verticalAlign: 'middle', marginRight: '8px' }}
              />
            </a>
            <a
              href="https://www.tiktok.com/@milelecarrental"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src="https://www.yourdomain.com/path-to-your-image/tiktok-icon.png"
                alt="Tiktok"
                width="30"
                style={{ verticalAlign: 'middle', marginRight: '8px' }}
              />
            </a>
          </div>
          <div
            className="website-urls-integrate"
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <a href="https://www.milelecarrental.com/" style={{ color: 'inherit' }}>
              <b> Our Website</b>
            </a>

            <a
              href="https://www.milelecarrental.com/vehicles"
              style={{ color: 'inherit' }}
            >
              <b> Our Fleet</b>
            </a>
          </div>
          <hr
            style={{
              width: '80%',
              border: '1px solid #e87a28',
              margin: '1rem auto !important',
              opacity: 1,
            }}
          />
          <p>
            <span className="bottom-bar-copyright-text text-white">
              Copyright &copy; 2024. Milele Car rental <br />All Rights
              Reserved.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;
