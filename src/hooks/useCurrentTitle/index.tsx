import { useTitles } from "../../context/titles";

export function useCurrentTitle() {
  const { getTitle } = useTitles();

  return getTitle();
}