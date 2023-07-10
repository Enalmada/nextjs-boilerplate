// https://medium.com/@samho1996/how-do-i-make-use-of-chatgpt-to-review-my-code-33efd8f42178
require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');

const reset = '\x1b[0m';
const green = '\x1b[32m';

const getReview = async (openai, code, shouldOverwrite) => {
  const promptReview = `
Review the code below and, without summarizing, provide feedback on how to improve it. Your task is:
  - provide relevant feedback no matter what kind of input 
  - focus only on negative parts.
  - Check for bugs and highlight them.
  - Ensure adherence to best practices and project guidelines:
  - Code readability, maintainability, and documentation.
  - Consistent naming conventions and coding style.
  - Modular and organized functions and classes.
  - Analyze performance and optimization:
  - Identify potential performance bottlenecks.
  - Suggest optimizations or efficient algorithms.
  - Evaluate code reusability:
  - Encourage use of existing libraries, frameworks, or code snippets.
  - Identify opportunities for reusable components or patterns.
  - Confirm cross-browser and cross-platform compatibility:
  - Provide security recommendations, if applicable.
  - Provide feedback as the numbered list.
  - Sort issues from major to minor.

Code follows:  

${code}
`;

  const promptImprove = `
Review the following code for significant improvements.

Instructions:
- Preserve all comments in the file, even if they are deemed unnecessary.
- Do not add any comments.
- Ignore comments when generating file improvement suggestions.

Format the response as follows:
  - Start a bulleted list with the header "Changes made to the file:"
  - List the changes made to the file and provide reasons for each change.
  - Follow the description with the updated file contents.
  - Use this identifier once at the start of the updated file contents: "**********"
  - Do not include anything after the contents of the updated file.
  - Do not include any metadata like "Updated file contents:" after the identifier.
  
${code}
  `;

  const messages = [
    {
      role: 'system',
      content: 'You are the best engineer and code reviewer at the company.',
    },
    {
      role: 'user',
      content: shouldOverwrite ? promptImprove : promptReview,
    },
  ];

  const request = {
    model: 'gpt-3.5-turbo',
    messages,
  };

  const completion = await openai.createChatCompletion(request);

  const review = completion.data?.choices[0]?.message?.content;
  return review;
};

const main = async () => {
  const shouldOverwrite = process.argv.includes('--overwrite');

  let filePaths = process.argv.slice(2);
  if (!filePaths.length) {
    console.error('Please provide at least one file path.');
    process.exit(1);
  }

  // Filter out the `--overwrite` flag from the file paths
  filePaths = filePaths.filter((path) => path !== '--overwrite');

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Please set the OPENAI_API_KEY environment variable.');
    process.exit(1);
  }

  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  for (const filePath of filePaths) {
    try {
      const code = fs.readFileSync(filePath, 'utf-8');

      if (!code) {
        console.error(`File ${filePath} is empty or invalid.`);
        continue;
      }

      const response = await getReview(openai, code, shouldOverwrite);
      console.log(`${green}Review ${filePath}:${reset}\n${response}${reset}\n`);

      if (shouldOverwrite) {
        fs.writeFileSync(filePath, response, 'utf-8');
        console.log(`File ${filePath} has been overwritten with the suggested rewrite.`);
      }
    } catch (error) {
      console.error(`An error occurred during code review of ${filePath}:`, error);
    }
  }
};

void main();
