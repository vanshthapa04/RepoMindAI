const {
  fetchRepoFiles,
  fetchFileContent,
} = require("../services/githubService");

const {
  analyzeCode,
} = require("../services/aiService");

const {
  extractRelevantFiles,
  prioritizeFiles,
} = require("../utils/helper");

let repoContext = "";

//repo summary
exports.getRepoSummary = async (
  req,
  res
) => {

  const { repoUrl } = req.body;

  try {

    
    const files =
      await fetchRepoFiles(repoUrl);

    
    let relevantFiles =
      extractRelevantFiles(files);

    relevantFiles =
      prioritizeFiles(relevantFiles);

    console.log(
      "Files fetched:",
      relevantFiles.length
    );

    let combinedContent = "";

    
    for (let file of relevantFiles.slice(0, 8)) {

      if (file.download_url) {

        const content =
          await fetchFileContent(
            file.download_url
          );

        
        const safeContent =
          typeof content === "string"
            ? content
            : JSON.stringify(content);

        combinedContent += `

FILE: ${file.path}

${safeContent.slice(0, 1200)}

`;
      }
    }

    
    combinedContent =
      combinedContent.slice(0, 15000);

    
    const finalPrompt = `
Analyze this GitHub repository.

Return response in CLEAN MARKDOWN.

Use this exact structure:

## Project
Short explanation

## Tech Stack
- item

## Features
- item

## Architecture
- item

## Notes
- item

Repository Content:

${combinedContent}
`;

    const finalSummary =
      await analyzeCode(finalPrompt);

    
    repoContext = combinedContent;

    res.json({
      summary: finalSummary,
    });

  } catch (err) {

    console.error(
      "SUMMARY ERROR:",
      err
    );

    res.status(500).json({
      error: err.message,
    });
  }
};

//chat feature
exports.chatWithRepo = async (
  req,
  res
) => {

  const { question } = req.body;

  try {

    if (!repoContext) {

      return res.status(400).json({
        error:
          "No repo loaded. Analyze repo first.",
      });
    }

    const prompt = `
You are RepoMind AI.

Answer questions about the repository.

Rules:
- Keep answers short
- Be conversational
- No unnecessary explanation
- Maximum 5 lines

Repository Context:

${repoContext.slice(0, 5000)}

User Question:
${question}
`;

    const answer =
      await analyzeCode(prompt);

    res.json({
      answer,
    });

  } catch (err) {

    console.error(
      "CHAT ERROR:",
      err
    );

    res.status(500).json({
      error: err.message,
    });
  }
};