import React from 'react';
import { useState, useEffect } from 'react';
import { analyzeImage, isConfigured as isConfiguredAnalysis } from "./azure-image-analysis";
import { generateImage, isConfigured as isConfiguredGeneration } from "./azure-image-generation";

function App() {
  const [isConfiguredAllServices, setIsConfiguredAllServices] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [dataValue, setDataValue] = useState('');
  const [imageValue, setImageValue] = useState('');

  useEffect(() => {
   (async () => {
    var result = (await isConfiguredAnalysis() && await isConfiguredGeneration());
    setIsConfiguredAllServices(result);
   })();
  }, []);

  const onInputChange = (event) => {
		setInputValue(event.target.value);
	};
  
	const onClickAnalyze = (event) => {
    event.preventDefault();
    
		const value = inputValue.trim();
    
		if (value.length <= 1)
      return;
  
    setImageValue(inputValue);
		setInputValue('');

    const getImageData = async () => {
      const result = await analyzeImage(inputValue);
        setDataValue(result);
    };

    getImageData();
	};

  const onClickGenerate = (event) => {
    event.preventDefault();
    
		const value = inputValue.trim();
    
		if (value.length <= 1)
      return;
  
    setInputValue('');
    
    const postImage = async () => {
      const result = await generateImage(inputValue);
      
      if (result.error === undefined) {
        setDataValue(result.prompt);
        setImageValue(result.data[0].url);
      }
      else {
        setDataValue(result.error.message);
      }
    };

    postImage();
	};

  return (
    <div> 
    {
      (isConfiguredAllServices) ?
        <div>
          <h1>Computer vision</h1>
          <p>Insert URL or type prompt:</p>
          <input 
            type="text"
            placeholder='Enter URL to analyze or textual prompt to generate an image'
            value={inputValue}
            onChange={onInputChange}
          />
          <div>
            <button onClick={onClickAnalyze}>Analyze</button>
            <button onClick={onClickGenerate}>Generate</button>
          </div>
          <div>
            <h2>Computer Vision Analysis</h2>
            <img src={imageValue} alt="Object analized or generated"/>
            <p>{dataValue}</p>
          </div>
        </div>
        :
        <p>Key and/or endpoint not configured for cognitive services</p>
    }
    </div>
  );
}

export default App;
