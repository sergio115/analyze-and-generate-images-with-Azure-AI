

const url = `https://computer-vision-sepr.cognitiveservices.azure.com/computervision/imageanalysis:analyze?features=objects,read&model-version=latest&language=en&api-version=2023-02-01-preview`;
const apiKey = `${process.env.REACT_APP_COMPUTER_VISION_KEY}`;

const analyzeImage = async (imageUrl) => {

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": `${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: `${imageUrl}`,
    }),
  });

  const data = await response.text();

  return data; 
};

const isConfigured = async () => {

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": `${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: `https://moderatorsampleimages.blob.core.windows.net/samples/sample16.png`,
    }),
  });

  const data = await response.json();
  const objectResult = data.objectResult;

  return objectResult === undefined ?? false;
};

export {
  analyzeImage,
  isConfigured,
}