// import OpenAI from "openai";
// async function main() {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "system", content: "You are a helpful assistant." }],
//       model: "gpt-3.5-turbo",
//     }); 

//     console.log(completion.choices[0]);
//   } 


import OpenAI from 'openai';

const openai = new OpenAI({apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

export async function sendMsgToOpenAI(message) {
    // const response = await openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [{ role: "system", content: "You are a helpful assistant." }],
    //     prompt: message,
    //     temperature: 0.7,
    //     max_tokens: 256,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    // });
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: "system", content: "You are a helpful assistant." }].concat(message), 
    }); 
    console.log(response.choices[0]);
    return response.choices[0];
}
