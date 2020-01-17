import React from 'react';

import './styles.css';

const DevForm = ({ onSubmit }) => {
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLogitude] = React.useState('');
  const [githubUsername, setGithubUsername] = React.useState('');
  const [skils, setSkils] = React.useState('');

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLogitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username: githubUsername,
      skils,
      latitude,
      longitude
    });

    setGithubUsername('');
    setSkils('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input 
          name="github_username" 
          id="github_username" 
          required 
          value={githubUsername}
          onChange={(e => setGithubUsername(e.target.value))}
        />
      </div>
      
      <div className="input-block">
        <label htmlFor="skils">Tecnologias</label>
        <input 
          name="skils" 
          id="skils" 
          required 
          value={skils}
          onChange={(e => setSkils(e.target.value))}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input 
            type="number" 
            name="latitude" 
            id="latitude" 
            value={latitude} 
            required 
            onChange={e => setLatitude(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input 
            type="number" 
            name="longitude" 
            id="longitude" 
            value={longitude} 
            required 
            onChange={e => setLogitude(e.target.value)}
          />
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;