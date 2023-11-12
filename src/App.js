import logo from './logo.svg';
import './App.css';
import BarChart from "./BarChartComponent";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FormComponent from "./FormComponent";
import CloseButton from 'react-bootstrap/CloseButton';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const [etus, setEtus] = useState([]);
  const [scores, setScores] = useState([]);
  const [hypothesis, setHypothesis] = useState([]);

  useEffect(() => {
    getScores();
    getHypothesis();
  }, []);

  const getScores = () => {
    axios.get("http://localhost:8000/results").then((res) => {
      // console.log(res.data);
      setEtus(res.data.map((etu) => etu.num_etu));
      setScores(res.data.map((etu) => etu.value));
    });
  }

  const getHypothesis = () => {
    axios.get("http://localhost:8000/hypothesis").then((res) => {
      console.log(res.data);
      setHypothesis(res.data);
    });
  }

  const updateHypothesis = (e) => {
    console.log(e.target.value);
    setHypothesis(hypothesis.map((hypo) => {
      if (hypo.key_words.join(' | ') === e.target.id) {
        if (hypo.weight > 0) {
          return {
            ...hypo,
            weight: e.target.value
          }
        } else {
          return {
            ...hypo,
            weight: -e.target.value
          }
        }
      }
      return hypo;
    }));
  }

  const updateResults = () => {
    console.log('ok');

    axios.post("http://localhost:8000/results", hypothesis).then((res) => {
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
          {
            hypothesis.filter((hypo) => (hypo.weight > 0)).map((hypo) => {
              return (
                <Form.Group controlId={hypo.key_words.join(' | ')}>
                  <Form.Label>{hypo.key_words.join(' | ')}</Form.Label>
                  <CloseButton id={hypo.key_words.join(' | ')} onClick={deleteHypothesis} />
                  <Form.Control type="range" min="1" max="5" value={Math.abs(hypo.weight)} onChange={updateHypothesis} />
                  
                </Form.Group>
              )
            })
          }
          <br />
          <Button onClick={updateResults}>Mettre à jour</Button>
        </div>
        <div className='container_hypothesis__item'>
          <h2>Hypothèses ASTRE</h2>
          {
            hypothesis.filter((hypo) => (hypo.weight < 0)).map((hypo) => {
              return (
                <Form.Group controlId={hypo.key_words.join(' | ')}>
                  <Form.Label>{hypo.key_words.join(' | ')}</Form.Label>
                  <CloseButton id={hypo.key_words.join(' | ')} onClick={deleteHypothesis} />
                  <Form.Control type="range" min="1" max="5" value={Math.abs(hypo.weight)} onChange={updateHypothesis} />
                  
                </Form.Group>
              )
            })
          }
          <br />
          <Button onClick={updateResults}>Mettre à jour</Button>
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
