import React from 'react';
import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';

function App() {
  const [devs, setDevs] = React.useState([]);

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

  React.useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username: githubUsername,
      skils,
      latitude,
      longitude
    });

    setGithubUsername('');
    setSkils('');

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
       
      </aside>
      <main>
        <ul>
          {devs.map((item, key) => (
            <DevItem item={item} key={key} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
