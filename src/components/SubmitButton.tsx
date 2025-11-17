import { motion } from "motion/react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function SubmitButton({ onClick, isLoading, disabled }: SubmitButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <Button
        onClick={onClick}
        disabled={disabled}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl h-12 shadow-lg shadow-blue-500/30 transition-all duration-300 relative overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
        
        <span className="relative flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Sentiment...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Sentiment
            </>
          )}
        </span>
      </Button>
    </motion.div>
  );
}
