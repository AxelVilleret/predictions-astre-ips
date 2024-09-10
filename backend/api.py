from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from models import StudentScore, Hypothesis
from services.ScoresService import ScoresService
from services.AnswersService import AnswersService
from services.HypothesisService import HypothesisService
from fastapi import HTTPException

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scoresService = ScoresService(AnswersService().execute())
hypothesisService = HypothesisService()


@app.get('/scores')
def get_results_controller() -> List[StudentScore]:
    return scoresService.execute(hypothesisService.get_hypotheses())


@app.post('/hypothesis')
def post_results_controller(body: Hypothesis) -> Hypothesis:
    if hypothesisService.add_hypothesis(body):
        return body
    raise HTTPException(status_code=400, detail="Failed to add hypothesis")


@app.get('/hypotheses')
def get_hypotheses_controller() -> List[Hypothesis]:
    return hypothesisService.get_hypotheses()


@app.delete('/hypothesis')
def delete_hypothesis_controller(body: Hypothesis) -> Hypothesis:
    if hypothesisService.remove_hypothesis(body):
        return body
    raise HTTPException(status_code=400, detail="Failed to delete hypothesis")


@app.put('/hypothesis')
def put_hypothesis_controller(body: Hypothesis) -> Hypothesis:
    if hypothesisService.update_hypothesis(body):
        return body
    raise HTTPException(status_code=400, detail="Failed to update hypothesis")
