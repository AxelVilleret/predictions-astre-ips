import './App.css';
import BarChart from "./components/BarChartComponent";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import FormComponent from "./components/NewHypothesisFormComponent";
import 'bootstrap/dist/css/bootstrap.css';
import HypothesesGroupComponent from './components/HypothesesGroupComponent';

const HYPOTHESES_ENDPOINT = "/hypotheses";
const RESULTS_ENDPOINT = "/results";

function App() {


  

  const [etus, setEtus] = useState([]);
  const [scores, setScores] = useState([]);
  const [hypothesis, setHypothesis] = useState([]);

  const areHypothesesEqual = (hypo1, hypo2) => {
    return hypo1.key_words.join(' | ') === hypo2.key_words.join(' | ');
  }

  const ipsHypotheses = useMemo(() => hypothesis.filter((hypo) => hypo.weight > 0), [hypothesis]);
  const astreHypotheses = useMemo(() => hypothesis.filter((hypo) => hypo.weight < 0), [hypothesis]);



  useEffect(() => {
    getScores();
    getHypothesis();
  }, []);

  const getScores = () => {
    axios.get(process.env.REACT_APP_BACKEND_BASE_URL + RESULTS_ENDPOINT).then((res) => {
      
      setEtus(res.data.map((etu) => etu.num_etu));
      setScores(res.data.map((etu) => etu.value));
    });
  }

  const getHypothesis = () => {
    axios.get(process.env.REACT_APP_BACKEND_BASE_URL + HYPOTHESES_ENDPOINT).then((res) => {
      console.log(res.data);
      setHypothesis(res.data);
    });
  }

  const updateHypothesis = (e, hypothesis) => {
    hypothesis.weight = hypothesis.weight > 0 ? e.target.value : -e.target.value;
    setHypothesis(hypothesis.map((h) => areHypothesesEqual(hypothesis, h) ? hypothesis : h));



    // console.log(e.target.value);
    // setHypothesis(hypothesis.map((hypo) => {
    //   if (hypo.key_words.join(' | ') === e.target.id) {
    //     if (hypo.weight > 0) {
    //       return {
    //         ...hypo,
    //         weight: e.target.value
    //       }
    //     } else {
    //       return {
    //         ...hypo,
    //         weight: -e.target.value
    //       }
    //     }
    //   }
    //   return hypo;
    // }));
  }

  const updateResults = () => {
    axios.post(process.env.REACT_APP_BACKEND_BASE_URL + RESULTS_ENDPOINT, hypothesis).then((res) => {
      console.log(res.data);
      setEtus(res.data.map((etu) => etu.num_etu));
      setScores(res.data.map((etu) => etu.value));
    });
  }

  const addHypothesis = (newHypothesis) => {
    setHypothesis([...hypothesis, newHypothesis]);
  }

  const deleteHypothesis = (event) => {
    console.log(event.target.id);
    setHypothesis(hypothesis.filter((hypo) => (hypo.key_words.join(' | ') !== event.target.id)));
  }

  const isHypothesisexisting = (newHypothesis) => {  
    console.log(newHypothesis);
    return hypothesis.filter((hypo) => (hypo.key_words.join(' | ') === newHypothesis.join(' | '))).length > 0;
  }


  return (
    <div className="App">
      <h1>Prédictions ASTRE/IPS</h1>

      <div className='container_hypothesis'>
        <div className='container_hypothesis__item'>
          <h2>Hypothèses IPS</h2>
          <HypothesesGroupComponent hypotheses={ipsHypotheses} onUpdateHypothesis={updateHypothesis} onDeleteHypothesis={deleteHypothesis} />
        </div>
        <div className='container_hypothesis__item'>
          <h2>Hypothèses ASTRE</h2>
          <HypothesesGroupComponent hypotheses={astreHypotheses} onUpdateHypothesis={updateHypothesis} onDeleteHypothesis={deleteHypothesis} />
        </div>
        <div className='container_hypothesis__item'>
          <FormComponent onFormValidated={addHypothesis} validationCallback={isHypothesisexisting} />
        </div>
      </div>
      <div className='container_hypothesis'>
        <div className='container_hypothesis__item'>
          <BarChart datas={scores} title={'Prédictions'} labels={etus} />
        </div>
        
        </div>
    </div>
  );
}

export default App;
