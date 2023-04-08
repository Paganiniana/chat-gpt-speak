import { Configuration, OpenAIApi } from "openai";

import OPEN_AI_SECRET from "./config";

const configuration = new Configuration({
    apiKey: OPEN_AI_SECRET,
})

const openai = new OpenAIApi(configuration);

export async function runQuery(prompt: string):string {
    // const models = await openai.listModels()
    // console.log(models.data);
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}]
        })
        if (!completion.data.choices.length)
            throw new Error("No choices")
        let choice = completion.data.choices[0];
        let res = choice.message?.content;
        if (!res) res = "Sorry, I didn't understand that query."
        return res;
    } catch (err) {
        return "Sorry, something went wrong."
    }
}