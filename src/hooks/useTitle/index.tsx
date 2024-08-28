import { useTitles } from "../../context/titles";

export function useUpdateTitle() {
  const { setTitle } = useTitles();

  return (newTitle: string) => {
    setTitle(newTitle);
  };
}