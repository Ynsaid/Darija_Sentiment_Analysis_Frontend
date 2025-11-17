import { useState } from "react";
import { InputArea } from "./InputArea";
import { SubmitButton } from "./SubmitButton";
import { ResultCard } from "./ResultCard";
import { HistorySection } from "./HistorySection";

// Types
export type SentimentType = "negative" | "neutral" | "positive";

export interface PredictionResult {
  sentiment: SentimentType;
  confidence: {
    negative: number;
    neutral: number;
    positive: number;
  };
  text: string;
  timestamp: number;
}

export function PredictionAPIConnector() {
  // ====================================
  // API CONFIGURATION
  // Change this URL to point to your backend server
  // ====================================
 const API_ENDPOINT = "https://serverofdarijasentimentanalysis-production.up.railway.app/predict";

  // State management
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<PredictionResult[]>([]);

  /**
   * Main API call function
   */
  const predictSentiment = async (text: string): Promise<PredictionResult> => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Prediction failed");
      }

      // Map server response to PredictionResult
      return {
        sentiment: data.predicted_label as SentimentType,
        confidence: {
          negative: data.confidence.negative ?? 0,
          neutral: data.confidence.neutral ?? 0,
          positive: data.confidence.positive ?? 0,
        },
        text: data.text,
        timestamp: Date.now(),
      };
    } catch (err) {
      console.error("Error fetching prediction:", err);
      throw err;
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const result = await predictSentiment(inputText);
      setCurrentResult(result);
      setHistory(prev => [result, ...prev].slice(0, 10)); // Keep last 10 results
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="backdrop-blur-lg bg-white/70 rounded-3xl shadow-xl border border-white/20 p-8">
        <div className="space-y-4">
          <InputArea
            value={inputText}
            onChange={setInputText}
            disabled={isLoading}
          />
          <SubmitButton
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={!inputText.trim() || isLoading}
          />
        </div>
      </div>

      {/* Results Section */}
      {currentResult && (
        <ResultCard result={currentResult} />
      )}

      {/* History Section */}
      {history.length > 0 && (
        <HistorySection history={history} />
      )}
    </div>
  );
}
