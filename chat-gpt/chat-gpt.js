const express = require('express')
const router = express.Router()
const { Configuration, OpenAIApi } = require("openai");

const gptInstructions = `
Extract endpoints as json from this code, without any assumption and only respond with json file.

""""
Example:
{
    "endpoints": [
        {
            "method": "HTTP_METHOD",
            "url": "API_ENDPOINT_URL",
            "request_body": {
                "BODY_PARAM_1": "TYPE",
                "BODY_PARAM_2": "TYPE",
                "BODY_PARAM_3": "TYPE"
            },
            "request_headers": {
                "HEADER_PARAM_1": "TYPE",
                "HEADER_PARAM_2": "TYPE",
                "HEADER_PARAM_3": "TYPE"
            },
            "response_body": {
                "BODY_PARAM_1": "TYPE",
                "BODY_PARAM_2": "TYPE",
                "BODY_PARAM_3": "TYPE"
            },
            "response_headers": {
                "HEADER_PARAM_1": "TYPE",
                "HEADER_PARAM_2": "TYPE",
                "HEADER_PARAM_3": "TYPE"
            }
        }
    ]
}
`

router.post('/', async (req, res) => {
    try {
        console.log('POST_CHAT_GPT_MESSAGE')
        const { code } = req.body;
        const codeDocumnetation = await documentCode(code);
        return res.status(200).send({ message: 'Success', data: {codeDocumnetation}})
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Something went wrong', error: err });
    }
})

const documentCode = async (code) => {
    try {
        const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        
        const completion = await openai.createEdit({
            model: "gpt-3.5-turbo",
            input: code,
            instruction: gptInstructions
        });
        return completion.data.choices[0].text;
    } catch (err) {
        throw err
    }
}

module.exports = router