import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Card from '@/components/Card';
import { getData } from '@/services/swDataHandler';
import './App.css';

function App() {
  const [entity, setEntity] = useState('people');
  const [id, setId] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;

    getData(id, entity).then((result) => {
      if (!ignore) {
        setData(result);
      }
    });

    return () => {
      ignore = true;
    };
  }, [id, entity]);

  const handleSelect = (nextEntity) => {
    if (nextEntity !== entity) {
      setData(null);
      setEntity(nextEntity);
    }
    setId(1);
  };

  const handleNext = () => setId((current) => current + 1);

  return (
    <div className="app">
      <Header active={entity} onSelect={handleSelect} />
      <main className="app__main">
        <Card entity={entity} id={id} data={data} />
        <button type="button" className="app__next" onClick={handleNext}>
          Next
        </button>
      </main>
    </div>
  );
}

export default App;
