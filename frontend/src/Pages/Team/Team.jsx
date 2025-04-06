import React from 'react';
import './Team.css';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';

// Import images
import hrmanImg from "../../assets/hrman.png"
import vetImg from "../../assets/vet.png"
import vetnurseImg from "../../assets/vetnurse.png"
import mobilevetImg from "../../assets/mobilevet.png"
import managerImg from "../../assets/manager.png"
import vetdocImg from "../../assets/vetdoc.png"


const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'BEN FRANKFURT',
      position: 'ENGINEER',
      image: hrmanImg,
      socialLinks: {
        facebook: 'https://www.facebook.com/profile',
        linkedin: 'https://www.linkedin.com/profile',
        google: 'https://plus.google.com/profile'
      }
    },
    {
      id: 2,
      name: 'GLORIA FLECK',
      position: 'FINANCE',
      image: vetImg,
      socialLinks: {
        facebook: 'https://www.facebook.com/profile',
        linkedin: 'https://www.linkedin.com/profile',
        google: 'https://plus.google.com/profile'
      }
    },
    {
      id: 3,
      name: 'REBECCA MILLS',
      position: 'LEGAL',
      image: vetnurseImg,
      socialLinks: {
        facebook: 'https://www.facebook.com/profile',
        linkedin: 'https://www.linkedin.com/profile',
        google: 'https://plus.google.com/profile'
      }
    },
    {
      id: 4,
      name: 'DAN SLOAN',
      position: 'MARKETING',
      image: mobilevetImg,
      socialLinks: {
        facebook: 'https://www.facebook.com/profile',
        linkedin: 'https://www.linkedin.com/profile',
        google: 'https://plus.google.com/profile'
      }
    },
    {
      id: 5,
      name: 'CHRIS TROVE',
      position: 'DEVELOPMENT',
      image: managerImg,
      socialLinks: {
        facebook: 'https://www.facebook.com/profile',
        linkedin: 'https://www.linkedin.com/profile',
        google: 'https://plus.google.com/profile'
      }
    },
    {
      id: 6,
      name: 'RACHEL FLEET',
      position: 'SALES',
      image: vetdocImg,
      socialLinks: {
        facebook: 'https://www.facebook.com/profile',
        linkedin: 'https://www.linkedin.com/profile',
        google: 'https://plus.google.com/profile'
      }
    }
  ];

  return (
    <div className="team-container">
      <div className="team-header">
      <br></br><br></br><br></br>
        <h1>OUR <span className="bold-text">TALENTED TEAM</span></h1>
        <p>Meet our experienced leadership team</p>
      </div>
      
      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-member">
            <div className="member-image">
              <img src={member.image} alt={member.name} />
              <div className="member-name-badge">
                <span>{member.name}</span>
              </div>
            </div>
            <div className="member-info">
              <h3>{member.position}</h3>
              <p className="lorem-text">Lorem ipsum dolor sit amet, eleifend. Condimentum sed enim. Magna sociosqu arcu.</p>
              <div className="social-links">
                <a href={member.socialLinks.facebook} className="social-link">
                  <FaFacebook /> <span>www.facebook.com/profile</span>
                </a>
                <a href={member.socialLinks.linkedin} className="social-link">
                  <FaLinkedin /> <span>www.linkedin.com/profile</span>
                </a>
                <a href={member.socialLinks.google} className="social-link">
                  <FaGoogle /> <span>www.plus.google.com/profile</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;