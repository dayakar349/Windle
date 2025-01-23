import { motion } from "framer-motion";

interface InfoWidgetProps {
  icon: string;
  title: string;
  value: string;
  subValue?: string;
  trend?: "up" | "down";
}

export function InfoWidget({
  icon,
  title,
  value,
  subValue,
  trend,
}: InfoWidgetProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-4 p-4 rounded-xl border bg-accent/50 hover:bg-accent transition-colors"
    >
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{value}</span>
          {subValue && (
            <span
              className={`text-sm ${
                trend === "down" ? "text-red-500" : "text-green-500"
              }`}
            >
              {subValue}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
