import { head } from "lodash";
import { useState, type DragEvent } from "react";

export const useFileDrop = (onText: (text: string) => void, onError: () => void) => {
  const [isDragging, setIsDragging] = useState(false);

  const readFile = (file: File | undefined) => void file?.text().then(onText, onError);

  const dragProps = {
    onDragOver: (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(true);
    },
    onDragLeave: () => setIsDragging(false),
    onDrop: (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
      readFile(head(Array.from(event.dataTransfer.files)));
    },
  };

  return { isDragging, dragProps, readFile };
};
