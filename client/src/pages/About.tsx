import React from 'react';
import kelly from '../../assets/images/kelly.png';
import gage from '../../assets/images/gage.png';
import nick from '../../assets/images/nick.png';

function About() {
 
    return (
            <section>
                <h2>Meet our Team!</h2>
                <div className='eats-container'>
                    <div className='team-img'> 
                    <h2>Design and Database</h2>
                        <img src={kelly}></img>
                        <p>Kelly</p>
                    </div>
                    <div  className='team-img'>
                    <h2>Backend Development</h2>
                        <img src={nick}></img>
                        <p>Nick</p>
                    </div>
                    <div  className='team-img'>
                    <h2>Front End Development</h2>
                        <img src={gage}></img>
                        <p>Gage</p>
                    </div>
                    </div>
            </section>
    );
  }
  
  export default About;