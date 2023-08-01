import './index.css';
import { createGame, addYourScore, retrieveScores } from './modules/boardApi.js';

// Refresh scores and update the UI
const refreshScores = async () => {
  const scoresContainer = document.getElementById('scores-container');
  scoresContainer.innerHTML = '';

  try {
    const scores = await retrieveScores();

    if (scores.length === 0) {
      const noScoresMessage = document.createElement('p');
      noScoresMessage.textContent = 'Lets begin';
      scoresContainer.appendChild(noScoresMessage);
    } else {
      scores.forEach(({ user, score }) => {
        const listItem = document.createElement('li');
        const playerNameSpan = document.createElement('span');
        playerNameSpan.textContent = user;
        const scoreSpan = document.createElement('span');
        scoreSpan.textContent = score;
        const seperator = document.createElement('span');
        seperator.textContent = ': ';
        listItem.appendChild(playerNameSpan);
        listItem.appendChild(seperator);
        listItem.appendChild(scoreSpan);
        scoresContainer.appendChild(listItem);
      });
    }
  } catch (error) {
    // Handle API request error
  }
};

// Event listener for the Refresh button
const refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', refreshScores);

// Event listener for the Submit button
const submitForm = document.querySelector('.add-form');
submitForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { Player: userName, score } = submitForm.elements;

  addYourScore(userName.value, score.value);
  submitForm.reset();
  refreshScores();
});

// Create a new game and initialize the app
document.addEventListener('DOMContentLoaded', async () => {
  const gameName = 'My Beauty Game';
  try {
    await createGame(gameName);
  } catch (error) {
    // Handle API request error
  }
});
