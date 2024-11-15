'use client'

import * as React from 'react'
import { Search, MessageSquare, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCallback, useRef, useState } from 'react'

// Mock data for demonstration
const mockKeys = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  key: `translation_key_${i + 1}`,
  text: `This is the original text for key ${i + 1}`,
}))

const mockSuggestions = [
  { id: 1, text: '这是建议翻译 1' },
  { id: 2, text: '这是建议翻译 2' },
  { id: 3, text: '这是建议翻译 3' },
]

const mockComments = [
  { id: 1, author: '审阅者 1', text: '请检查这个翻译的准确性' },
  { id: 2, author: '审阅者 2', text: '这个翻译可能需要更多上下文' },
]

export default function EditorPage() {
  const [selectedKey, setSelectedKey] = useState(mockKeys[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [translation, setTranslation] = useState('')
  const [leftWidth, setLeftWidth] = useState(25)
  const [middleWidth, setMiddleWidth] = useState(50)
  const [middleTopHeight, setMiddleTopHeight] = useState(70)
  const [rightTopHeight, setRightTopHeight] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredKeys = mockKeys.filter(
    (key) =>
      key.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      key.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleLeftDrag = React.useCallback(
    (e: React.MouseEvent) => {
      disableSelection()
      const startX = e.clientX
      const startWidth = leftWidth

      const handleMouseMove = (e: MouseEvent) => {
        disableSelection()
        const newWidth =
          startWidth + ((e.clientX - startX) / window.innerWidth) * 100
        setLeftWidth(Math.min(Math.max(newWidth, 20), 40))
      }

      const handleMouseUp = () => {
        enableSelection()
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [leftWidth]
  )

  const handleMiddleDrag = React.useCallback(
    (e: React.MouseEvent) => {
      disableSelection()
      const startX = e.clientX
      const startWidth = middleWidth

      const handleMouseMove = (e: MouseEvent) => {
        disableSelection()
        const newWidth =
          startWidth + ((e.clientX - startX) / window.innerWidth) * 100
        setMiddleWidth(Math.min(Math.max(newWidth, 30), 60))
      }

      const handleMouseUp = () => {
        enableSelection()
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [middleWidth]
  )

  const handleMiddleVerticalDrag = React.useCallback(
    (e: React.MouseEvent) => {
      disableSelection()
      const startY = e.clientY
      const startHeight = middleTopHeight

      const handleMouseMove = (e: MouseEvent) => {
        disableSelection()
        const newHeight =
          startHeight + ((e.clientY - startY) / window.innerHeight) * 100
        setMiddleTopHeight(Math.min(Math.max(newHeight, 30), 80))
      }

      const handleMouseUp = () => {
        enableSelection()
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [middleTopHeight]
  )

  const handleRightVerticalDrag = React.useCallback(
    (e: React.MouseEvent) => {
      disableSelection()
      const startY = e.clientY
      const startHeight = rightTopHeight

      const handleMouseMove = (e: MouseEvent) => {
        disableSelection()
        const newHeight =
          startHeight + ((e.clientY - startY) / window.innerHeight) * 100
        setRightTopHeight(Math.min(Math.max(newHeight, 30), 70))
      }

      const handleMouseUp = () => {
        enableSelection()
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [rightTopHeight]
  )

  // 禁用文本选择
  const disableSelection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.userSelect = 'none'
    }
    document.body.style.userSelect = 'none'
  }, [])

  // 启用文本选择
  const enableSelection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.userSelect = ''
    }
    document.body.style.userSelect = ''
  }, [])

  return (
    <div className="flex h-screen overflow-hidden" ref={containerRef}>
      {/* Left column: Key list */}
      <div style={{ width: `${leftWidth}%` }} className="border-r relative">
        <div className="p-4">
          <Input
            type="search"
            placeholder="搜索翻译键..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {filteredKeys.map((key) => (
              <Button
                key={key.id}
                variant="ghost"
                className="w-full justify-start mb-2 overflow-hidden"
                onClick={() => setSelectedKey(key)}
              >
                <div className="truncate">
                  <div className="font-medium">{key.key}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {key.text}
                  </div>
                </div>
              </Button>
            ))}
          </ScrollArea>
        </div>
        <div
          className="absolute right-0 top-0 bottom-0 w-1 bg-gray-300 cursor-col-resize"
          onMouseDown={handleLeftDrag}
        />
      </div>

      {/* Middle column: Translation input and suggestions */}
      <div
        style={{ width: `${middleWidth}%` }}
        className="border-r relative flex flex-col"
      >
        <div
          style={{ height: `${middleTopHeight}%` }}
          className="flex-1 p-4 overflow-auto relative"
        >
          <h2 className="text-lg font-semibold mb-2">翻译</h2>
          <div className="mb-4">
            <div className="font-medium mb-2">{selectedKey.key}</div>
            <div className="text-sm text-muted-foreground mb-2">
              {selectedKey.text}
            </div>
          </div>
          <Textarea
            placeholder="输入翻译..."
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            className="min-h-[200px]"
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 cursor-row-resize"
            onMouseDown={handleMiddleVerticalDrag}
          />
        </div>
        <div
          style={{ height: `${100 - middleTopHeight}%` }}
          className="p-4 overflow-hidden"
        >
          <h3 className="text-lg font-semibold mb-2">翻译记忆</h3>
          <ScrollArea className="h-[calc(100%-2rem)]">
            {mockSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="mb-2">
                <CardContent className="p-2">
                  <p className="text-sm">{suggestion.text}</p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </div>
        <div
          className="absolute right-0 top-0 bottom-0 w-1 bg-gray-300 cursor-col-resize"
          onMouseDown={handleMiddleDrag}
        />
      </div>

      {/* Right column: Context and comments */}
      <div
        style={{ width: `${100 - leftWidth - middleWidth}%` }}
        className="flex flex-col"
      >
        <div
          style={{ height: `${rightTopHeight}%` }}
          className="flex-1 p-4 overflow-auto relative"
        >
          <h2 className="text-lg font-semibold mb-2">上下文</h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm">
                这里是选定翻译键的上下文信息。它可能包括使用位置、相关说明等。
              </p>
            </CardContent>
          </Card>
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 cursor-row-resize"
            onMouseDown={handleRightVerticalDrag}
          />
        </div>
        <div
          style={{ height: `${100 - rightTopHeight}%` }}
          className="p-4 overflow-hidden"
        >
          <h3 className="text-lg font-semibold mb-2">审阅者评论</h3>
          <ScrollArea className="h-[calc(100%-2rem)]">
            {mockComments.map((comment) => (
              <Card key={comment.id} className="mb-2">
                <CardHeader className="p-2">
                  <CardTitle className="text-sm font-medium">
                    {comment.author}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <p className="text-sm">{comment.text}</p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
