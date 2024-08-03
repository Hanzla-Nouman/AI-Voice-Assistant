const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, 
});

const genImage = async () => {
  try {
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
      {
        input: {
          width: 1024,
          height: 1024,
          prompt: "self-portrait of a woman, lightning in the background",
          scheduler: "K_EULER",
          num_outputs: 1,
          guidance_scale: 0,
          negative_prompt: "worst quality, low quality",
          num_inference_steps: 4,
        },
      }
    );
    return output;
  } catch (error) {
    console.log("error in genImage", error);
  }
};
const input = {
    top_k: 50,
    top_p: 0.9,
    prompt: "Does this message want to generate a new message an Ai picture,image,art or anything similiar? 'Draw a pic of astraunots' .Simply answer with yes or no",
    max_tokens: 200,
    min_tokens: 0,
    temperature: 0.6,
    system_prompt: "You are a helpful assistant.",
    presence_penalty: 0,
    frequency_penalty: 0,
  };
  
  const getOutput = async () => {
    let output = "";
  
    for await (const event of replicate.stream("meta/meta-llama-3.1-405b-instruct", { input })) {
      output += event; // Accumulate the event data
      process.stdout.write(event.toString()); // Optionally write to stdout
    }
  
    // console.log("\nComplete Output:\n", output); // Output the complete response
  };
  
  getOutput().catch(error => console.error("Error in streaming:", error));
  
// const testGenImage = async () => {
//   const result = await genImage();
//   console.log(result);
// };

// testGenImage();

const generateImageCont = async (req, res) => {
  try {
    const imageResponse = await genImage();
    res.status(200).json(imageResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { generateImageCont };
