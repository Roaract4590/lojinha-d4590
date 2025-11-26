"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react"

export interface ToastMessage {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  duration?: number
}

interface ToastProps {
  message: ToastMessage
  onRemove: (id: string) => void
}

const Toast = ({ message, onRemove }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(message.id)
    }, message.duration || 1000)

    return () => clearTimeout(timer)
  }, [message.id, message.duration, onRemove])

  const getIcon = () => {
    switch (message.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getBorderColor = () => {
    switch (message.type) {
      case "success":
        return "border-l-green-500"
      case "warning":
        return "border-l-yellow-500"
      case "error":
        return "border-l-red-500"
      default:
        return "border-l-blue-500"
    }
  }

  return (
    <div
      className={`bg-white border-l-4 ${getBorderColor()} shadow-lg rounded-r-lg p-4 mb-3 animate-in slide-in-from-right duration-300`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{message.title}</p>
          <p className="text-sm text-gray-600 mt-1">{message.message}</p>
        </div>
        <button
          onClick={() => onRemove(message.id)}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

interface ToastContainerProps {
  messages: ToastMessage[]
  onRemove: (id: string) => void
}

export const ToastContainer = ({ messages, onRemove }: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-[60] max-w-sm w-full">
      {messages.map((message) => (
        <Toast key={message.id} message={message} onRemove={onRemove} />
      ))}
    </div>
  )
}

export const useToast = () => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const showToast = (toast: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newMessage = { ...toast, id }
    setMessages((prev) => [...prev, newMessage])
  }

  const removeToast = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id))
  }

  return {
    messages,
    showToast,
    removeToast,
  }
}
