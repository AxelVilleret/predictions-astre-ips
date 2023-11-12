import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

function MyForm({ onFormValidated, validationCallback }) {
    const options = ['C', 'Domotique', 'Arduino'];

    const [selectedOption, setSelectedOption] = useState('ips');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [weight, setWeight] = useState(1);
    const [show, setShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('danger');

    const handleChangeHypothesis = (event) => {
        const value = event.target.value;
        setSelectedOptions(prevState =>
            prevState.includes(value) ? prevState.filter(option => option !== value) : [...prevState, value]
        );
    }

    const handleChangeFiliere = (event) => {
        setSelectedOption(event.target.value);
    }

    const handleChangeWeight = (event) => {
        setWeight(event.target.value);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedOptions.length === 0) {
            setAlertType('danger');
            setShow(true);
            setAlertMessage('Veuillez sélectionner au moins un mot clé');
            setTimeout(() => {
                setShow(false);
            }, 3000);
            return;
        }
        if (validationCallback(selectedOptions)) {
            setAlertType('danger');
            setShow(true);
            setAlertMessage('Cette hypothèse existe déjà');
            setTimeout(() => {
                setShow(false);
            }, 3000);
            return;
        }
        setAlertType('success');
        setShow(true);
        setAlertMessage('Hypothèse ajoutée');
        setTimeout(() => {
            setShow(false);
        }, 3000);
        onFormValidated({
            key_words: selectedOptions,
            weight: selectedOption === 'ips' ? weight : -weight
        });
    }

    return (
        <div>
            <h2>Ajouter une hypothèse</h2>
            {show && <Alert variant={alertType}>
                {alertMessage}
            </Alert>
            }
            <Form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <strong><Form.Label>Filière</Form.Label></strong>
                <Form.Check
                    type="radio"
                    label="IPS"
                    name="filiere"
                    id="ips"
                    value="ips"
                    checked={selectedOption === 'ips'}
                    onChange={handleChangeFiliere}
                />
                <Form.Check
                    type="radio"
                    label="ASTRE"
                    name="filiere"
                    id="astre"
                    value="astre"
                    checked={selectedOption === 'astre'}
                    onChange={handleChangeFiliere}
                />

                <strong><Form.Label>Mots Clés</Form.Label></strong>

                {options.map((option, index) => (
                    <Form.Check
                        key={index}
                        type="checkbox"
                        label={option}
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={handleChangeHypothesis}
                    />
                ))}

                <strong><Form.Label>Poids</Form.Label></strong>
                <Form.Control type="range" min="1" max="5" value={weight} onChange={handleChangeWeight} />
                <br />

                <div style={{ textAlign: 'center' }}>
                    <Button variant="primary" type="submit" >
                        Ajouter
                    </Button>
                </div>

                
            </Form>
        </div>
    );
}

export default MyForm;
