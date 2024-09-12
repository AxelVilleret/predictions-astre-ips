from models import StudentScore


class ScoresService:

    def __init__(self, answers):
        self.answers = answers
        self.results = []

    def execute(self, hypotheses):
        self._init_results()
        for answer in self.answers:
            for hypothesis in hypotheses:
                if self._is_valid_hypothesis(hypothesis, answer):
                    self._validate_hypothesis(answer.student_number, hypothesis)
        return self.results

    def _init_results(self):
        self.results = [StudentScore(student_number=answer.student_number, value=0) for answer in self.answers]

    def _is_valid_hypothesis(self, hypothesis, answer):
        return all(keyword in answer.choices for keyword in hypothesis.key_words)

    def _validate_hypothesis(self, student_number, hypothesis):
        self.results = [result if result.student_number != student_number else self._update_result(result, hypothesis) for result in self.results]
    
    def _update_result(self, result, hypothesis):
        result.value += hypothesis.weight
        return result