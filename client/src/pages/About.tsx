
import kelly from '../../assets/images/kelly.png';
import gage from '../../assets/images/gage.png';
import nick from '../../assets/images/nick-cowboy.jpg';

function About() {
 
    return (
            <section>
                <h2>Meet our Team!</h2>
                <div className='eats-container'>
                    <div className='team-img'> 
                    <h2>Design and Database</h2>
                        <img src={kelly}></img>
                        <h2>Kelly</h2>
                        <p>Hi Friend!
                            I love data and design. I have experience in using React, SQL, JS, NPM, and CSS.<br></br>
                            I am a certified HR Professional with a passion for the Haunted Attraction industry.<br></br>
                            Additonally, I love dogs and crafting.</p>
                    </div>
                    <div  className='team-img'>
                    <h2>Backend Development</h2>
                        <img src={nick}></img>
                        <h2>Nick</h2>
                        <p>I am a software developer who loves to learn and excels in javascript and typescript.<br></br>
                        I have two cats and am also learning japanese.<br></br>
                        </p>
                    </div>
                    <div  className='team-img'>
                    <h2>Front End Development</h2>
                        <img src={gage}></img>
                        <h2>Gage</h2>
                        <p>Hello! I’m a (future) junior developer from hailing from rural Minnesota.
                            I enjoy working on the front end as well as styling. I have experience in using React, SQL, JS, NPM, and CSS.<br></br>
                            Fitness is a significant part of my life, and I am a regular gym-goer at Los Campeones. 
                            The discipline and focus I gain from working out help me tackle challenges in my professional life. 
                            Additionally, I’m a horror movie enthusiast, and some of my favorites include the Babadook and Hereditary.</p>
                    </div>
                    </div>
            </section>
    );
  }
  
  export default About;