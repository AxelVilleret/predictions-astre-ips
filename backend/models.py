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

    @classmethod
    def from_string(cls, key_words: str):
        return cls(key_words=key_words.split(" | "), weight=0)

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
