# Text Sentiment Prediction Tool (Darija Sentiment UI)

This is the frontend for a text sentiment prediction tool — designed to work with dialectal Arabic (e.g. Darija / Algerian dialect).  
A live deployed version is available at: https://darija-sentiment-analysis-frontend-1.onrender.com/  

## Demo / Live Site

You can try the live version at the link above.  
Enter text (e.g. in Darija / Arabic) and get sentiment feedback.  

## Project Structure

- `src/` — frontend source code (likely using TypeScript / JS + Vite)  
- `index.html` — main HTML file / entrypoint  
- `vite.config.ts` — configuration for build/development  
- `package.json`, `package-lock.json` — dependencies & scripts  
- `.gitignore` — ignored files  

## Running Locally

1. Clone this repository  
2. Run `npm install` to install dependencies  
3. Run `npm run dev` to start the development server  
4. Open your browser (usually `http://localhost:3000/` or as configured) to view the UI  

## What it does — and what it doesn’t

- ✅ Provides a **web UI** where users can input text, likely in Darija / Arabic, and submit for sentiment prediction.  
- ✅ The interface is simple and minimal, with input field(s) and result display.  
- ⚠️ **Important**: This repo only contains the **frontend** — it does **not** include any model, dataset, or backend logic. So **on its own**, it **cannot** analyze sentiment. It must be connected to a separate backend (API / server) that handles the sentiment classification.  

## Deploy / Live Version

The live version is already deployed (see link above). This shows that there is (or was) a backend somewhere connected to this frontend — or the frontend has been configured to interface with an external API (not included in this repo).  

## To Make It Work / Extend It

If you want a working sentiment-analysis application:  
- You need a backend: e.g. a server (in Python/Node/… ) that loads a sentiment-analysis model trained on Darija/Arabic.  
- Connect the frontend to that backend via REST API (POST input text, return predicted sentiment).  
- Optionally, host the backend (e.g. on the same platform as the frontend, or separately).  

## Disclaimer & Limitations

- Input dialect: While the tool name suggests “Darija / dialectal Arabic,” there is no guarantee on accuracy unless the backend model supports the dialect properly.  
- No model or training code included in this repo.  
- If using a backend model from somewhere else, watch out for licensing / language-support / bias issues.  
