// utils/helper.js

const ALLOWED_EXTENSIONS = [
    ".js", ".ts", ".jsx", ".tsx", ".json", ".md"
  ];
  
  const PRIORITY_FOLDERS = [
    "src", "controllers", "services", "utils", "components", "lib"
  ];
  
  const IGNORE_FOLDERS = [
    "node_modules", "dist", "build", ".git", "coverage"
  ];
  
  // 🔹 Filter files
  const extractRelevantFiles = (files) => {
    return files.filter(file => {
      if (!file.name || !file.path) return false;
  
      const lowerPath = file.path.toLowerCase();
  
      if (IGNORE_FOLDERS.some(f => lowerPath.includes(f))) return false;
  
      return ALLOWED_EXTENSIONS.some(ext =>
        file.name.toLowerCase().endsWith(ext)
      );
    });
  };
  
  // 🔹 Prioritize important folders
  const prioritizeFiles = (files) => {
    return files.sort((a, b) => {
      const aScore = PRIORITY_FOLDERS.some(f => a.path.includes(f)) ? 1 : 0;
      const bScore = PRIORITY_FOLDERS.some(f => b.path.includes(f)) ? 1 : 0;
      return bScore - aScore;
    });
  };
  
  // 🔹 Clean
  const cleanFiles = (files) => {
    return files.filter(f => f.content && f.content.length < 20000);
  };
  
  // 🔥 NEW: Create chunks
  const createChunks = (files, chunkSize = 3) => {
    const chunks = [];
  
    for (let i = 0; i < files.length; i += chunkSize) {
      const chunk = files.slice(i, i + chunkSize);
  
      const chunkText = chunk.map(file => `
  FILE: ${file.path}
  --------------------
  ${file.content.slice(0, 1200)}
  `).join("\n\n");
  
      chunks.push(chunkText);
    }
  
    return chunks;
  };
  
  module.exports = {
    extractRelevantFiles,
    prioritizeFiles,
    cleanFiles,
    createChunks
  };