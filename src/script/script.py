import csv
import json
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from script import *
from fastapi.middleware.cors import CORSMiddleware

class Student(BaseModel):
    num_etu: str
    value: int

class Hypothesis(BaseModel):
    key_words: list
    weight: int

def split_answers(answers):
    return answers.split(';')

def read_file():
    answers = {}
    with open('corpus.csv', newline='') as csvfile:
        lecteur_csv = csv.reader(csvfile, delimiter=',')
        next(lecteur_csv)  # saute la première ligne
        for ligne in lecteur_csv:
            answers[ligne[1]] = set()
            for i in range(2, len(ligne)):
                choices = split_answers(ligne[i])
                for choice in choices:
                    answers[ligne[1]].add(choice)
    return answers

hypothesis = [
    Hypothesis(key_words={'VR/AR', 'ENSIMERSION'}, weight=4),
    Hypothesis(key_words={'Java', 'Frontend / Backend'}, weight=4),
    Hypothesis(key_words={'UX/UI'}, weight=2),
    Hypothesis(key_words={'Moteurs de jeux vidéo', 'ENSIMERSION'}, weight=4),
    Hypothesis(key_words={'Freelance (Indépendant)'}, weight=2),
    Hypothesis(key_words={'C', 'Robotique'}, weight=-3),
    Hypothesis(key_words={'C++', 'Robotique'}, weight=-3),
    Hypothesis(key_words={"ENSIM'ELEC"}, weight=-1),
    Hypothesis(key_words={'Domotique'}, weight=-2),
    Hypothesis(key_words={'Arduino'}, weight=-1),
]


answers = {}

def get_results(hypothesis, answers):
    students_list = []
    for etu in answers.keys():
        students_list.append(Student(num_etu=etu, value=0))

    for etu, choices in answers.items():
        for item in hypothesis:
            if all(elem in choices for elem in item.key_words):
                for student in students_list:
                    if student.num_etu == etu:
                        student.value += item.weight
    
    return students_list

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/results')
def get_results_controller() -> List[Student]:
    global answers
    global hypothesis
    if len(answers) == 0:
        answers = read_file()
    return get_results(hypothesis, answers)

@app.post('/results')
def post_results_controller(body: List[Hypothesis]) -> List[Student]:
    global answers
    global hypothesis
    hypothesis = body
    # print(hypothesis)
    if len(answers) == 0:
        answers = read_file()
    return get_results(hypothesis, answers)

@app.get('/hypothesis')
def get_hypothesis_controller() -> List[Hypothesis]:
    global hypothesis
    return hypothesis


        

