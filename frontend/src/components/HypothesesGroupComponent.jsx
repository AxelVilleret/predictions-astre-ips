import React from 'react';
import { Form, CloseButton } from 'react-bootstrap';

export default function HypothesesGroupComponent({ hypotheses, onUpdateHypothesis, onDeleteHypothesis }) {
    return (
        <>
            {
                hypotheses.map((hypo) => {
                    return (
                        <Form.Group controlId={hypo.key_words.join(' | ')} key={hypo.key_words.join(' | ')}>
                            <Form.Label>{hypo.key_words.join(' | ')}</Form.Label>
                            <CloseButton id={hypo.key_words.join(' | ')} onClick={() => onDeleteHypothesis(hypo)} />
                            <Form.Control
                                type="range"
                                min="1"
                                max="5"
                                value={Math.abs(hypo.weight)}
                                onChange={(e) => onUpdateHypothesis(hypo, e.target.value)}
                            />
                        </Form.Group>
                    );
                })
            }
        </>
    );
}
