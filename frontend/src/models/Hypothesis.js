// src/models/Hypothesis.js
export class Hypothesis {
    constructor(key_words, weight) {
        this.key_words = key_words;
        this.weight = weight;
    }

    updateWeight(newWeight) {
        this.weight = newWeight;
        return this;
    }

    equals(otherHypothesis) {
        if (!(otherHypothesis instanceof Hypothesis)) {
            return false;
        }
        return this.toString() === otherHypothesis.toString();
    }

    toString() {
        return this.key_words.join(' | ');
    }

    isIps() {
        return this.weight > 0;
    }

    isAstre() {
        return this.weight < 0;
    }
}
