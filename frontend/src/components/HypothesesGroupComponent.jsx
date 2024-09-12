import React from 'react';
import { Form, CloseButton } from 'react-bootstrap';
import { Hypothesis } from '../models/Hypothesis'; // Assurez-vous d'importer la classe Hypothesis

export default function HypothesesGroupComponent({ hypotheses, onUpdateHypothesis, onDeleteHypothesis }) {
    return (
        <>
            {
                hypotheses.map((hypo) => {
                    return (
                        <Form.Group controlId={hypo.toString()} key={hypo.toString()}>
                            <Form.Label>{hypo.toString()}</Form.Label>
                            <CloseButton id={hypo.toString()} onClick={() => onDeleteHypothesis(hypo)} />
                            <Form.Control
                                type="range"
                                min="1"
                                max="5"
                                value={Math.abs(hypo.weight)}
                                onChange={(e) => onUpdateHypothesis(hypo.updateWeight(hypo.weight > 0 ? e.target.value : -e.target.value))}
                            />
                        </Form.Group>
                    );
                })
            }
        </>
    );
}
