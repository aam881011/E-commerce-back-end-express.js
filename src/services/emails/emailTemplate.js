// import "./../../public/emailTemplate.css";

// export const emailTemplate = (token) => {
//   return `

//   `;
// };

import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const emailTemplatePath = path.resolve(__dirname, './../../public/email.html');

export const emailTemplate = async (token) => {
  try {
    let htmlContent = await fs.readFile(emailTemplatePath, 'utf8');
    htmlContent = htmlContent.replace('${token}', token);
    return htmlContent;
  } catch (error) {
    console.error('Error reading HTML file:', error);
    throw error;
  }
};
