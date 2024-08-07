import { api_key } from "@/constants";
import axios from "axios";


const client = axios.create({
    headers: {
        "Authorization":"Bearer "+api_key,
        "Content-Type":"application/json"
     }
  });


const chatGptEndpoint = 'https://api.openai.com/v1/chat/completions';
const dalleEndpoint = 'https://api.openai.com/v1/images/generations';

export const apiCall = async(prompt,messages)=>{
    try {

        
        const res = await axios.post(chatGptEndpoint,{
          
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Does this message want to generate a new message an Ai picture,image,art or anything similiar? ${prompt}  .Simply answer with yes or no`
              }]
        },{  headers: {
            "Authorization":"Bearer "+api_key,
            "Content-Type":"application/json"
         },})
       

    } catch (error) {
        console.log("Here is error",error)
        return
    }
}