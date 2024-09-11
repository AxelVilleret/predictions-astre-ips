import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

export default function MyForm({ onFormValidated }) {
    const options = ['C', 'Domotique', 'Arduino', 'JavaScript, HTML, CSS', 'VSCode', 'PME / Startups', 'Créer du contenu', 'Téléphone'];

    const [selectedOption, setSelectedOption] = useState('ips');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [weight, setWeight] = useState(1);
    const [show, setShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('danger');

    const updateSelectedKeywords = (event) => {
        const value = event.target.value;
        setSelectedKeywords(prevState =>
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
        onFormValidated({
            key_words: selectedKeywords,
            weight: selectedOption === 'ips' ? weight : -weight,
        }).then(() => {
            setAlertMessage('Hypothèse ajoutée avec succès');
            setAlertType('success');
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 2000);
        }).catch((error) => {
            setAlertMessage(error.message);
            setAlertType('danger');
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 2000);
        });
    }

    return (
        <>
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
                        checked={selectedKeywords.includes(option)}
                        onChange={updateSelectedKeywords}
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
        </>
    );
}
