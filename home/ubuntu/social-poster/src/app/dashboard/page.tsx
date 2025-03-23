'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef } from "react";
import { useOAuth } from "@/hooks/useOAuth";

export default function DashboardPage() {
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [socialNetworks, setSocialNetworks] = useState({
    instagram: true,
    youtube: true,
    tiktok: true
  });
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const { checkAuthStatus } = useOAuth();
  
  useEffect(() => {
    setIsClient(true);
    
    // Проверяем статус авторизации для каждой социальной сети
    const checkAuth = async () => {
      const instagramAuth = await checkAuthStatus('instagram');
      const youtubeAuth = await checkAuthStatus('youtube');
      const tiktokAuth = await checkAuthStatus('tiktok');
      
      setSocialNetworks({
        instagram: instagramAuth,
        youtube: youtubeAuth,
        tiktok: tiktokAuth
      });
    };
    
    checkAuth();
  }, []);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Создаем превью изображения
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedVideo(e.target.files[0]);
    }
  };
  
  const handlePost = async () => {
    // В реальном приложении здесь будет логика отправки поста в социальные сети
    console.log('Posting content:', {
      text: postText,
      image: selectedImage,
      video: selectedVideo,
      socialNetworks,
      isScheduled,
      scheduledTime: isScheduled ? scheduledTime : null
    });
    
    // Очищаем форму после отправки
    setPostText('');
    setSelectedImage(null);
    setSelectedVideo(null);
    setImagePreview(null);
    setIsScheduled(false);
    setScheduledTime('');
    
    alert('Пост успешно отправлен!');
  };
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Создание нового поста</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex space-x-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={imageInputRef}
              onChange={handleImageUpload}
            />
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => imageInputRef.current?.click()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
              Добавить изображение
            </Button>
            
            <input
              type="file"
              accept="video/*"
              className="hidden"
              ref={videoInputRef}
              onChange={handleVideoUpload}
            />
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => videoInputRef.current?.click()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 8-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path>
                <path d="M14 2v6h6"></path>
                <circle cx="10" cy="13" r="2"></circle>
                <path d="m20 20-3.86-3.86a2 2 0 0 0-2.82 0L10 19"></path>
              </svg>
              Добавить видео
            </Button>
          </div>
          <div>
            <Button 
              className="bg-blue-500 hover:bg-blue-600"
              onClick={handlePost}
            >
              Опубликовать
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <Textarea 
                  placeholder="Введите текст вашего поста..." 
                  className="min-h-[200px] resize-none"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                />
              </CardContent>
            </Card>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h3 className="font-medium mb-2">Предпросмотр</h3>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                ) : (
                  <p className="text-gray-400">Здесь будет отображаться предпросмотр вашего поста</p>
                )}
              </div>
            </div>
          </div>
          
          {isClient && (
            <div>
              <Tabs defaultValue="instagram" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="instagram" className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                    Instagram
                  </TabsTrigger>
                  <TabsTrigger value="youtube" className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                      <path d="m10 15 5-3-5-3z"></path>
                    </svg>
                    YouTube
                  </TabsTrigger>
                  <TabsTrigger value="tiktok" className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                      <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                      <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                      <line x1="15" x2="15" y1="4" y2="12"></line>
                    </svg>
                    TikTok
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="instagram" className="mt-4">
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="instagram-active">Активировать</Label>
                        <Switch 
                          id="instagram-active" 
                          checked={socialNetworks.instagram}
                          onCheckedChange={(checked) => setSocialNetworks({...socialNetworks, instagram: checked})}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        {/* Статус подключения */}
                        <div className={`flex items-center ${socialNetworks.instagram ? 'text-green-500' : 'text-red-500'} mb-2`}>
                          {socialNetworks.instagram ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                <path d="m9 12 2 2 4-4"></path>
                              </svg>
                              Подключено
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                <path d="m15 9-6 6"></path>
                                <path d="m9 9 6 6"></path>
                              </svg>
                              Не подключено
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="youtube" className="mt-4">
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="youtube-active">Активировать</Label>
                        <Switch 
                          id="youtube-active" 
                          checked={socialNetworks.youtube}
                          onCheckedChange={(checked) => setSocialNetworks({...socialNetworks, youtube: checked})}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        {/* Статус подключения */}
                        <div className={`flex items-center ${socialNetworks.youtube ? 'text-green-500' : 'text-red-500'} mb-2`}>
                          {socialNetworks.youtube ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                <path d="m9 12 2 2 4-4"></path>
                              </svg>
                              Подключено
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                <path d="m15 9-6 6"></path>
                                <path d="m9 9 6 6"></path>
                              </svg>
                              Не подключено
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tiktok" className="mt-4">
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tiktok-active">Активировать</Label>
                        <Switch 
                          id="tiktok-active" 
                          checked={socialNetworks.tiktok}
                          onCheckedChange={(checked) => setSocialNetworks({...socialNetworks, tiktok: checked})}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        {/* Статус подключения */}
                        <div className={`flex items-center ${socialNetworks.tiktok ? 'text-green-500' : 'text-red-500'} mb-2`}>
                          {socialNetworks.tiktok ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                <path d="m9 12 2 2 4-4"></path>
                              </svg>
                              Подключено
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                <path d="m15 9-6 6"></path>
                                <path d="m9 9 6 6"></path>
                              </svg>
                              Не подключено
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Планирование публикации</h3>
                  <div className="flex items-center justify-between mb-4">
                    <Label htmlFor="schedule-post">Запланировать публикацию</Label>
                    <Switch 
                      id="schedule-pos<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>