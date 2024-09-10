from pydantic import BaseModel


class StudentScore(BaseModel):
    student_number: str
    value: int
    def __eq__(self, value: object) -> bool:
        if not isinstance(value, StudentScore):
            return False
        return self.student_number == value.student_number


class Hypothesis(BaseModel):
    key_words: list
    weight: int
    def __eq__(self, value: object) -> bool:
        if not isinstance(value, Hypothesis):
            return False
        return self.key_words == value.key_words


class QuestionnaireResponse(BaseModel):
    student_number: str
    choices: list
    def __eq__(self, value: object) -> bool:
        if not isinstance(value, QuestionnaireResponse):
            return False
        return self.student_number == value.student_number
