const axios = require("axios");

// folders to ignore
const ignoredFolders = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
  "vendor",
  "__pycache__",
];

// recursive fetch
const fetchAllFiles = async (url) => {
  const response = await axios.get(url, {
    headers: {
      "User-Agent": "RepoMind-AI",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  let files = [];

  for (let item of response.data) {

    console.log("Checking:", item.path);

    // skip ignored folders
    if (
      item.type === "dir" &&
      ignoredFolders.includes(item.name)
    ) {
      console.log("Skipping folder:", item.name);
      continue;
    }

    // add files
    if (item.type === "file") {
      files.push(item);
    }

    // recurse directories
    else if (item.type === "dir") {
      const nestedFiles = await fetchAllFiles(item.url);

      files = [...files, ...nestedFiles];
    }
  }

  return files;
};

// fetch repo files
const fetchRepoFiles = async (repoUrl) => {
  const parts = repoUrl.split("/");

  const owner = parts[3];
  const repo = parts[4];

  const url = `https://api.github.com/repos/${owner}/${repo}/contents`;

  return await fetchAllFiles(url);
};

// fetch file content
const fetchFileContent = async (fileUrl) => {
  try {
    const response = await axios.get(fileUrl, {
      headers: {
        "User-Agent": "RepoMind-AI",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    return response.data;

  } catch (error) {

    console.error(
      "FILE FETCH ERROR:",
      error.message
    );

    throw new Error(
      "Failed to fetch file content"
    );
  }
};

module.exports = {
  fetchRepoFiles,
  fetchFileContent,
};