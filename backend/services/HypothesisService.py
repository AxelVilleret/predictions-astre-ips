import json
from models import Hypothesis


class HypothesisService:
    def __init__(self, file_path='data/hypotheses.json'):
        self.file_path = file_path
        self.hypotheses = self._read_hypotheses()

    def get_hypotheses(self):
        return self.hypotheses
    
    def add_hypothesis(self, hypothesis):
        if self._is_existing_hypothesis(hypothesis) or hypothesis.key_words == []:
            return False
        self.hypotheses.append(hypothesis)
        self._write_hypotheses(self.hypotheses)
        return True
    
    def remove_hypothesis(self, hypothesis):
        if not self._is_existing_hypothesis(hypothesis):
            return False
        self.hypotheses = [h for h in self.hypotheses if h != hypothesis]
        self._write_hypotheses(self.hypotheses)
        return True
    
    def update_hypothesis(self, hypothesis):
        if not self._is_existing_hypothesis(hypothesis):
            return False
        self.hypotheses = [h if h != hypothesis else hypothesis for h in self.hypotheses]
        self._write_hypotheses(self.hypotheses)
        return True
    
    def _is_existing_hypothesis(self, hypothesis):
        return hypothesis in self.hypotheses
    
    def _write_hypotheses(self, hypotheses):
        with open(self.file_path, 'w') as file:
            json.dump([h.model_dump() for h in hypotheses], file)
    
    def _read_hypotheses(self):
        with open(self.file_path, 'r') as file:
            data = json.load(file)
            return [Hypothesis(**item) for item in data]
