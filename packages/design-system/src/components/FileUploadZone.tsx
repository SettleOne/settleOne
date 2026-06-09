import React, { useCallback, useState } from "react";
import { UploadCloud, X, File as FileIcon } from "lucide-react";

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  label?: string;
}

export function FileUploadZone({
  onFilesSelected,
  maxFiles = 5,
  maxSizeMB = 10,
  accept = "*/*",
  label = "Drag and drop files here or click to browse",
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const validateAndAddFiles = (newFiles: File[]) => {
    setError(null);
    const validFiles: File[] = [];

    for (const file of newFiles) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File ${file.name} exceeds ${maxSizeMB}MB limit`);
        continue;
      }
      validFiles.push(file);
    }

    const updatedFiles = [...files, ...validFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        validateAndAddFiles(Array.from(e.dataTransfer.files));
      }
    },
    [files, maxFiles, maxSizeMB],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesSelected(updated);
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-colors text-center ${
          isDragging
            ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/5"
            : "border-[var(--border)] hover:border-gray-400 bg-[var(--bg-subtle)]"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <UploadCloud size={24} className="text-[var(--accent-blue)]" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {label}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Max {maxFiles} files, up to {maxSizeMB}MB each
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-[var(--accent-red)]">{error}</p>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-white border border-[var(--border)] rounded-md shadow-sm"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <FileIcon
                  size={16}
                  className="flex-shrink-0 text-[var(--text-secondary)]"
                />
                <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                  {file.name}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="p-1 text-[var(--text-secondary)] hover:text-[var(--accent-red)] rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
