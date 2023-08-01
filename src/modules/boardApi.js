// Helper function to handle API errors
const handleApiError = () => {
  // Handle API request error
};

// Helper function to make API requests
const makeApiRequest = async (url, method, body) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const { result } = await response.json();
    return result;
  } catch (error) {
    handleApiError(error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Create a new game and save the game ID
export const createGame = async (gameName) => {
  try {
    const response = await makeApiRequest('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', 'POST', {
      name: gameName,
    });

    const gameId = response.split(' ')[3];
    localStorage.setItem('gameId', gameId);
  } catch (error) {
    handleApiError(error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Retrieve all scores for the game
export const retrieveScores = async () => {
  const gameId = localStorage.getItem('gameId');

  try {
    const response = await makeApiRequest(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`, 'GET');
    return response;
  } catch (error) {
    handleApiError(error);
    return []; // Return an empty array to indicate no scores available
  }
};

// Save a score for the game
export const addYourScore = async (userName, score) => {
  const gameId = localStorage.getItem('gameId');

  // Validate user input
  if (!userName || !score || Number.isNaN(parseInt(score, 10))) {
    // Invalid input, handle the error appropriately
    return;
  }

  try {
    await makeApiRequest(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`, 'POST', {
      user: userName,
      score: parseInt(score, 10),
    });
  } catch (error) {
    handleApiError(error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
