import React, { useState, useEffect } from "react";
import { Download as DownloadIcon, FileDown } from "lucide-react";
import { DownloadContent } from "../../types";

interface DownloadProps {
  content: DownloadContent;
}

const Download: React.FC<DownloadProps> = ({ content }) => {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isDownloading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsDownloading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isDownloading]);

  const handleDownload = () => {
    setIsDownloading(true);
    setProgress(0);

    // 実際のダウンロード処理
    const link = document.createElement("a");
    link.href = content.url;
    link.download = content.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatSize = (bytes: number) => {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center space-x-3 bg-gray-800/50 p-4 rounded-lg border border-green-400/20">
        <FileDown className="w-6 h-6 text-green-400" />
        <div>
          <h3 className="font-bold text-green-400">{content.filename}</h3>
        </div>
      </div>

      {isDownloading ? (
        <div className="space-y-2">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-gray-300">
            ダウンロード中... {progress}%
          </div>
        </div>
      ) : (
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-green-400/20 text-green-400"
        >
          <DownloadIcon className="w-4 h-4" />
          <span>ダウンロード開始</span>
        </button>
      )}
    </div>
  );
};

export default Download;
