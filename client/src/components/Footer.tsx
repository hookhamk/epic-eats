import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="row align-center mb-5">
      <div className="col-md-6">
        <p>Copyright by Epic Eats 2025</p>
      </div>
      <div className="col-md-6">
        <button
          onClick={() => window.open('https://github.com/Zubrungus/epic-eats', '_blank')}
        >
          Github
        </button>
      </div>
    </footer>
  );
};

export default Footer;
