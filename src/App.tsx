import { PredictionAPIConnector } from "./components/PredictionAPIConnector";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 text-6xl">
            Darija Sentiment Analysis
          </h1>
          <p className="text-slate-600">
            Analyze the emotional tone of your text with AI-powered sentiment prediction
          </p>
        </div>

        {/* Main App Component - Centralized API Connector */}
        <PredictionAPIConnector />
      </div>
    </div>
  );
}