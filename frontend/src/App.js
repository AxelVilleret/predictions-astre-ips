import './App.css';
import BarChart from "./components/BarChartComponent";
import { useState, useEffect, useMemo } from "react";
import FormComponent from "./components/NewHypothesisFormComponent";
import 'bootstrap/dist/css/bootstrap.css';
import HypothesesGroupComponent from './components/HypothesesGroupComponent';
import { getScores, addHypothesis, deleteHypothesis, updateHypothesis, getHypotheses } from './services/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import { Hypothesis } from './models/Hypothesis';

function App() {

  const [studentScores, setStudentScores] = useState([]);
  const [hypotheses, setHypotheses] = useState([]);

  const ipsHypotheses = useMemo(() => hypotheses.filter((hypo) => hypo.isIps()), [hypotheses]);
  const astreHypotheses = useMemo(() => hypotheses.filter((hypo) => hypo.isAstre()), [hypotheses]);

  useEffect(() => {
    getHypotheses().then(setHypotheses);
  }, []);

  useEffect(() => {
    getScores().then(setStudentScores);
  }, [hypotheses]);

  const resetHypotheses = () => {
    getHypotheses(true).then(setHypotheses);
  }

  const updateHypo = (hypothesis) => {
    updateHypothesis(hypothesis).then((updatedHypothesis) => {
      setHypotheses(hypotheses.map((hypo) => hypo.equals(updatedHypothesis) ? updatedHypothesis : hypo));
    });
  }

  const addHypo = (newHypothesis) => {
    return addHypothesis(newHypothesis).then((addedHypothesis) => {
      setHypotheses([...hypotheses, addedHypothesis]);
    });
  }

  const deleteHypo = (hypothesis) => {
    deleteHypothesis(hypothesis.toString()).then(() => {
      setHypotheses(hypotheses.filter((hypo) => !hypo.equals(hypothesis)));
    });
  }

  return (
    <div className="App">
      <h1>Prédictions ASTRE/IPS</h1>
      <Button variant="primary" onClick={resetHypotheses}>
        <i className="bi bi-arrow-clockwise"></i> Réinitialiser les hypothèses
      </Button>
      <div className='container_hypothesis'>
        <div className='container_hypothesis__item'>
          <h2>Hypothèses IPS</h2>
          <HypothesesGroupComponent hypotheses={ipsHypotheses} onUpdateHypothesis={updateHypo} onDeleteHypothesis={deleteHypo} />
        </div>
        <div className='container_hypothesis__item'>
          <h2>Ajouter une hypothèse</h2>
          <FormComponent onFormValidated={addHypo} />
        </div>
        <div className='container_hypothesis__item'>
          <h2>Hypothèses ASTRE</h2>
          <HypothesesGroupComponent hypotheses={astreHypotheses} onUpdateHypothesis={updateHypo} onDeleteHypothesis={deleteHypo} />
        </div>
      </div>
      <div className='container_hypothesis'>
        <div className='container_hypothesis__item'>
          <h2>Prédictions</h2>
          <BarChart data={studentScores} />
        </div>
      </div>
    </div>
  );
}

export default App;
