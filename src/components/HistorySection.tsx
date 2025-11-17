import { motion } from "motion/react";
import { History, TrendingUp, Smile, Meh, Frown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import type { PredictionResult, SentimentType } from "./PredictionAPIConnector";

interface HistorySectionProps {
  history: PredictionResult[];
}

const sentimentIcons = {
  positive: Smile,
  neutral: Meh,
  negative: Frown
};

const sentimentColors = {
  positive: "text-green-600 bg-green-50",
  neutral: "text-blue-600 bg-blue-50",
  negative: "text-red-600 bg-red-50"
};

export function HistorySection({ history }: HistorySectionProps) {
  // Calculate statistics
  const stats = {
    positive: history.filter(h => h.sentiment === "positive").length,
    neutral: history.filter(h => h.sentiment === "neutral").length,
    negative: history.filter(h => h.sentiment === "negative").length
  };

  const total = history.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="backdrop-blur-lg bg-white/70 border-white/20 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-6 h-6 text-purple-600" />
            Prediction History
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Statistics Summary */}
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(stats).map(([sentiment, count]) => {
              const Icon = sentimentIcons[sentiment as SentimentType];
              const percentage = total > 0 ? (count / total * 100).toFixed(0) : 0;
              
              return (
                <motion.div
                  key={sentiment}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className={`${sentimentColors[sentiment as SentimentType]} rounded-2xl p-4 text-center`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-bold">{count}</div>
                  <div className="text-slate-600 capitalize">{sentiment}</div>
                  <div className="text-slate-500 mt-1">{percentage}%</div>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-700 mb-4">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-medium">Recent Analyses</h3>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {history.map((item, index) => {
                const Icon = sentimentIcons[item.sentiment];
                const timeAgo = getTimeAgo(item.timestamp);
                
                return (
                  <motion.div
                    key={item.timestamp}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/50 rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`${sentimentColors[item.sentiment]} p-2 rounded-lg mt-1`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={`capitalize ${
                              item.sentiment === "positive"
                                ? "border-green-300 text-green-700"
                                : item.sentiment === "neutral"
                                ? "border-blue-300 text-blue-700"
                                : "border-red-300 text-red-700"
                            }`}
                          >
                            {item.sentiment}
                          </Badge>
                          <span className="text-slate-500">{timeAgo}</span>
                        </div>
                        
                        <p className="text-slate-700 truncate group-hover:whitespace-normal group-hover:truncate-none transition-all">
                          {item.text}
                        </p>
                        
                        <div className="mt-2 flex gap-2 text-slate-500">
                          <span className="px-2 py-1 bg-slate-100 rounded text-xs">
                            {(item.confidence[item.sentiment] * 100).toFixed(1)}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </motion.div>
  );
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
