# Welcome

This project facilitates the following workflow: 

1. Translate speech to text
2. Use said speech to prompt a response
3. Read back the response

It makes use of OpenAI's *gpt-3-turbo* model, by default, to generate text. For text/speech conversion it uses the standard [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). 


## Setup

Follow the steps on [OpenAI's Platform Page](https://platform.openai.com/) to get started with OpenAI's API. 

Once you have your own API key, create a file at */src/txt-gen/config.ts* and add your key there. It should follow this format: 

```js
export default "your-open-ai-api-key"
```

Once you're finished, you're all set to go! The rest is simple...

```bash
npm install
npm run dev
```
... navigate your browser to ```http://localhost:5173/``` and try it out!