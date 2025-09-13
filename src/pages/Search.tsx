
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Search({ value, onChange, placeholder, className }: SearchBoxProps) {

    console.log(value, "this is from search component");
  return (
    <div className={cn("w-full sm:max-w-sm", className)}>
      <Input
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
