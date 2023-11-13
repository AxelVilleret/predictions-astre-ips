# Student Option Prediction Project

This project aims to establish hypotheses and predict the future option choices (Astre or IPS) of students in our school, based on responses to a questionnaire. A web interface is also available for viewing results and editing hypotheses.

## Installation

Before starting, you need to install the necessary dependencies.

For the front-end, use npm:

```bash
npm install
```

For the script, use pip:

```bash
pip install fastapi uvicorn
```

## Usage

To run the script, navigate to the src.script subfolder and run the following command:

```bash
uvicorn script:app --reload
```

To start the front-end server, use the following command:

```bash
npm run start
```

Enjoy exploring the data and predicting student option choices!
