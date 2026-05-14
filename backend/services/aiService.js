const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

exports.analyzeCode = async (prompt) => {

  try {

    console.log(
      "Using Gemini 2.5 Flash"
    );

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

    const result =
      await model.generateContent(
        prompt
      );

    return result.response.text();

  } catch (error) {

    console.error(
      "GEMINI ERROR:",
      error
    );

    throw new Error(
      "AI generation failed"
    );
  }
};