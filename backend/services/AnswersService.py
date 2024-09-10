import csv
from models import QuestionnaireResponse


class AnswersService:
    def __init__(self, file_path='data/corpus.csv'):
        self.file_path = file_path
        self.answers = []

    def execute(self):
        csv_reader = self._read_file()
        for row in csv_reader:
            student_number = self._get_student_number(row)
            answers = self._get_answers(row)
            choices = self._get_choices(answers)
            self.answers.append(QuestionnaireResponse(student_number=student_number, choices=choices))
        return self.answers

    def _read_file(self):
        with open(self.file_path, newline='') as csvfile:
            csv_reader = csv.reader(csvfile, delimiter=',')
            next(csv_reader) 
            return list(csv_reader)

    def _get_answers(self, row):
        return row[2:]
    
    def _get_student_number(self, row):
        return row[1].rstrip()
    
    def _get_choices(self, answers):
        choices = set()
        for answer in answers:
            choices.update(answer.split(';'))
        return choices