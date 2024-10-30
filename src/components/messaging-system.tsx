'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Send, Phone, Video, MoreVertical, Search } from 'lucide-react'

type Message = {
  id: number
  senderId: number
  receiverId: number
  content: string
  timestamp: Date
}

type Contact = {
  id: number
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
}

export default function MessagingSystem() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Thanks for considering my application!", lastMessageTime: new Date(2024, 10, 15, 14, 30), unreadCount: 2 },
    { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "When is a good time for an interview?", lastMessageTime: new Date(2024, 10, 15, 10, 15), unreadCount: 0 },
    { id: 3, name: "Charlie Davis", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "I'm excited about the opportunity!", lastMessageTime: new Date(2024, 10, 14, 16, 45), unreadCount: 1 },
  ])

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, senderId: 1, receiverId: 0, content: "Hello! I'm interested in the Frontend Developer position.", timestamp: new Date(2024, 10, 15, 9, 0) },
    { id: 2, senderId: 0, receiverId: 1, content: "Hi Alice! Thanks for your interest. Your profile looks great. When would you be available for an interview?", timestamp: new Date(2024, 10, 15, 9, 30) },
    { id: 3, senderId: 1, receiverId: 0, content: "I'm available any day next week in the afternoon. What works best for you?", timestamp: new Date(2024, 10, 15, 10, 0) },
    { id: 4, senderId: 0, receiverId: 1, content: "How about next Tuesday at 2 PM?", timestamp: new Date(2024, 10, 15, 10, 30) },
    { id: 5, senderId: 1, receiverId: 0, content: "That works perfectly for me. Looking forward to it!", timestamp: new Date(2024, 10, 15, 11, 0) },
    { id: 6, senderId: 0, receiverId: 1, content: "Great! I'll send you a calendar invite with the details. See you then!", timestamp: new Date(2024, 10, 15, 11, 30) },
    { id: 7, senderId: 1, receiverId: 0, content: "Thanks for considering my application!", timestamp: new Date(2024, 10, 15, 14, 30) },
  ])

  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const newMsg: Message = {
        id: messages.length + 1,
        senderId: 0, // Assuming 0 is the current user
        receiverId: selectedContact.id,
        content: newMessage,
        timestamp: new Date()
      }
      setMessages([...messages, newMsg])
      setNewMessage('')

      // Update last message for the contact
      setContacts(contacts.map(contact => 
        contact.id === selectedContact.id 
          ? { ...contact, lastMessage: newMessage, lastMessageTime: new Date(), unreadCount: 0 }
          : contact
      ))
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Messaging</h1>
        
        <Card className="h-[600px]">
          <CardContent className="p-0 flex h-full">
            <div className="w-1/3 border-r">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search contacts" className="pl-8" />
                </div>
              </div>
              <ScrollArea className="h-[520px]">
                {contacts.map(contact => (
                  <div
                    key={contact.id}
                    className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedContact?.id === contact.id ? 'bg-gray-100' : ''}`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                        <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-xs text-gray-500">{formatTime(contact.lastMessageTime)}</p>
                        {contact.unreadCount > 0 && (
                          <Badge variant="destructive" className="mt-1">{contact.unreadCount}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
            <div className="w-2/3 flex flex-col">
              {selectedContact ? (
                <>
                  <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                        <AvatarFallback>{selectedContact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedContact.name}</p>
                        <p className="text-xs text-gray-500">Online</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="flex-1 p-4">
                    {messages
                      .filter(msg => (msg.senderId === selectedContact.id && msg.receiverId === 0) || (msg.senderId === 0 && msg.receiverId === selectedContact.id))
                      .map(message => (
                        <div key={message.id} className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'} mb-4`}>
                          <div className={`max-w-[70%] p-3 rounded-lg ${message.senderId === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs text-right mt-1 opacity-70">{formatTime(message.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                    <div ref={messagesEndRef} />
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Select a contact to start messaging</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}