import { motion } from "motion/react";
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import type { PredictionResult } from "./PredictionAPIConnector";

interface ResultCardProps {
  result: PredictionResult;
}

const sentimentConfig = {
  positive: { color: "#10b981", label: "positive", bgColor: "bg-green-100", textColor: "text-green-700", borderColor: "border-green-300" },
  neutral: { color: "#3b82f6", label: "neutral", bgColor: "bg-blue-100", textColor: "text-blue-700", borderColor: "border-blue-300" },
  negative: { color: "#ef4444", label: "negative", bgColor: "bg-red-100", textColor: "text-red-700", borderColor: "border-red-300" }
};

export function ResultCard({ result }: ResultCardProps) {
  const config = sentimentConfig[result.sentiment];

  const barChartData = [
    { name: "positive", value: result.confidence.positive * 100, fill: sentimentConfig.positive.color },
    { name: "neutral", value: result.confidence.neutral * 100, fill: sentimentConfig.neutral.color },
    { name: "negative", value: result.confidence.negative * 100, fill: sentimentConfig.negative.color }
  ];

  const pieChartData = [
    { name: "positive", value: result.confidence.positive * 100 },
    { name: "neutral", value: result.confidence.neutral * 100 },
    { name: "negative", value: result.confidence.negative * 100 }
  ];

  const COLORS = [sentimentConfig.positive.color, sentimentConfig.neutral.color, sentimentConfig.negative.color];

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring" }}>
      <Card className="backdrop-blur-lg bg-white/70 border-white/20 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Prediction Results
            </CardTitle>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
              <Badge className={`${config.bgColor} ${config.textColor} ${config.borderColor} border px-4 py-1.5 rounded-full`}>{config.label}</Badge>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <p className="text-slate-600 italic">"{result.text}"</p>
          </div>

          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center py-4">
            <div className="text-slate-600 mb-2">Confidence Score</div>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {(result.confidence[result.sentiment] * 100).toFixed(1)}%
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white/50 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-4 text-slate-700">
                <BarChart3 className="w-5 h-5" />
                <h3 className="font-medium">Confidence Breakdown</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.9)", border: "1px solid #e2e8f0", borderRadius: "12px" }} formatter={(value: number) => `${value.toFixed(1)}%`} />
                  <Bar dataKey="value" radius={[8,8,0,0]}>{barChartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="bg-white/50 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-4 text-slate-700">
                <PieChartIcon className="w-5 h-5" />
                <h3 className="font-medium">Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} label={({name,value})=>`${name}: ${value.toFixed(1)}%`} outerRadius={70} fill="#8884d8" dataKey="value">
                    {pieChartData.map((entry,index)=> <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.9)", border: "1px solid #e2e8f0", borderRadius: "12px" }} formatter={(value:number)=>`${value.toFixed(1)}%`} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
