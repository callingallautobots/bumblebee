"use client"

import * as React from "react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, X } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  maxSize?: number
  accept?: string[]
}

export function FileUpload({
  onFilesSelected,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = [".json", ".csv"],
  ...props
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    onFilesSelected(acceptedFiles)
  }, [onFilesSelected])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
  })

  const removeFile = (file: File) => {
    const newFiles = files.filter((f) => f !== file)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer",
          isDragActive ? "border-primary" : "border-border",
          "hover:border-primary transition-colors duration-200"
        )}
      >
        <input {...getInputProps()} {...props} />
        <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
        <p className="mb-2 text-sm text-center text-muted-foreground">
          <span className="font-semibold">点击上传</span> 或拖放文件到这里
        </p>
        <p className="text-xs text-center text-muted-foreground">
          支持的文件格式: {accept.join(", ")}
        </p>
        <p className="text-xs text-center text-muted-foreground">
          最大文件大小: {maxSize / 1024 / 1024}MB
        </p>
      </div>
      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file) => (
            <li key={file.name} className="flex items-center justify-between p-2 bg-muted rounded-md">
              <div className="flex items-center">
                <File className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(file)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
                <span className="sr-only">删除文件</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}