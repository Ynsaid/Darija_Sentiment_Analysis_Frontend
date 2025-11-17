import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function InputArea({ value, onChange, disabled }: InputAreaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2 text-slate-700">
        <MessageSquare className="w-5 h-5" />
        <label className="font-medium">Enter Your Text</label>
      </div>
      
      <motion.div
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Enter your text here... Try phrases like 'I love this product!' or 'This is disappointing.'"
          className="min-h-[150px] resize-none bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-2xl transition-all duration-300"
        />
      </motion.div>
      
      <div className="flex items-center justify-between text-slate-500">
        <span>{value.length} characters</span>
        {value.length > 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-blue-600"
          >
            {value.split(/\s+/).filter(w => w.length > 0).length} words
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
