import { useStore } from "@/store/store";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const ToggleMode = () => {
  const { mode, setMode, reset } = useStore();

  const handleMode = (value: "send" | "receive") => {
    reset();
    setMode(value);
  };

  return (
    <ToggleGroup
      defaultValue={mode}
      onValueChange={(value: "send" | "receive") => handleMode(value)}
      type="single"
    >
      <ToggleGroupItem value="send" aria-label="Toggle bold">
        Want To Send
      </ToggleGroupItem>
      <ToggleGroupItem value="receive" aria-label="Toggle italic">
        Want To Receive
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ToggleMode;
