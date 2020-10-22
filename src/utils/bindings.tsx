import { Setter } from "./TypeUtils";

export function radioValueBinding<T extends { id: any }>(
  current: T,
  selected: T | null,
): boolean {
  return (selected && (selected.id === current.id)) || false;
}

export function radioChangeBinding<T>(
  item: T,
  setSelected: Setter<T>
) {
  return (_: any, next: boolean) => {
    if (next && item) {
      setSelected(item)
    }
  }
}
