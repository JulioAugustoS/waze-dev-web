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
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
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
