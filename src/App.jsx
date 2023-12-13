import { useEffect, useState } from 'react';
import axios from 'axios';
import ContributionGraph from './components/ContributionGraph/ContributionGraph.jsx';
import Loader from "./components/UI/Loader/Loader.jsx";
import './App.css';

const App = () => {
  const [contributionData, setContributionData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getContributionData = async () => {
      try {
        setLoading(true);
        const { data } = await axios('https://dpg.gg/test/calendar.json');
        setContributionData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching contribution data:', error);
      }
    };

    getContributionData().catch();
  }, []);

  return (
    <div className="app">
      <h1>Contribution Graph Example</h1>
      {loading ? <Loader /> : (
        contributionData && <ContributionGraph data={contributionData} />
      )}
    </div>
  );
};

export default App;
