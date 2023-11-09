

const url = `https://api.openai.com/v1/images/generations`;
const bearerToken = `${process.env.REACT_APP_COMPUTER_VISION_KEY}`;

const generateImage = async (prompt) => {

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${bearerToken}`,
    },
    body: JSON.stringify({
      prompt: `${prompt}`,
      model: `dall-e-2`,
      n: 1,
      response_format: `url`,
      size: `1024x1024`
    }),
  });

  const data = await response.json();

  return data; 
};

const isConfigured = async () => {

  const result = await generateImage(`This is a test image`);

  return result.error === undefined ?? true; 
};

export {
  generateImage,
  isConfigured,
}