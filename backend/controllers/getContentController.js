const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const genImage = async (prompt) => {
  try {
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
      {
        input: {
          width: 1024,
          height: 1024,
          prompt: prompt,
          scheduler: "K_EULER",
          num_outputs: 1,
          guidance_scale: 0,
          negative_prompt: "worst quality, low quality",
          num_inference_steps: 4,
        },
      }
    );
    console.log("Generated Image", output);
    return output[0];
  } catch (error) {
    console.log("error in genImage", error);
    throw error;
  }
};

const getText = async (prompt) => {
  const input = {
    top_k: 0,
    top_p: 0.9,
    prompt: `Does this message want to generate a new message an Ai picture,image,art or anything similar? '${prompt}' .Simply answer with yes or no`,
    max_tokens: 512,
    min_tokens: 0,
    temperature: 0.6,
    system_prompt: "You are a helpful assistant",
    length_penalty: 1,
    stop_sequences: "<|end_of_text|>,<|eot_id|>",
    prompt_template:
      "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
    presence_penalty: 1.15,
    log_performance_metrics: false,
  };
  let output = "";
  for await (const event of replicate.stream("meta/meta-llama-3-70b-instruct", {
    input,
  })) {
    const data = event.toString();
    process.stdout.write(data);
    output += data;  // Append the event data to the output variable
  }
  

  console.log("Received Text",output)
  return output;
};
const getActualText = async (prompt) => {
  const input = {
    top_k: 0,
    top_p: 0.9,
    prompt: prompt,
    max_tokens: 100,
    min_tokens: 0,
    temperature: 0.6,
    system_prompt: "You are a helpful assistant",
    length_penalty: 1,
    stop_sequences: "<|end_of_text|>,<|eot_id|>",
    prompt_template:
      "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
    presence_penalty: 1.15,
    log_performance_metrics: false,
  };
  let output = "";
  for await (const event of replicate.stream("meta/meta-llama-3-70b-instruct", {
    input,
  })) {
    const data = event.toString();
    process.stdout.write(data);
    output += data;  // Append the event data to the output variable
  }
  console.log("Received actual Text",output)
  return output;
};

const getContentController = async (req, res) => {
  try {
    console.log("Received request with prompt:", req.body.prompt);
    const condRespnse = await getText(req.body.prompt);
    
    console.log("Response from getText:", condRespnse);
    console.log("Type of response:", typeof condRespnse);

    let response;

    // Trim the response and compare it in a case-sensitive manner
    if (typeof condRespnse === "string" && condRespnse.trim() === "No") {
      response = await getActualText(req.body.prompt);
    } else {
      response = await genImage(req.body.prompt);
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getContentController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getContentController };
