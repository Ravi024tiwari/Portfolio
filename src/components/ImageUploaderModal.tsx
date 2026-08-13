'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Image as ImageIcon,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  Maximize2,
  Trash2,
  CheckCircle2,
  ZoomIn,
  Sliders,
  Eye
} from 'lucide-react';

interface PreviewItem {
  id: string;
  name: string;
  url: string;
  size?: string;
  timestamp: string;
}

const PRESET_DEMO_IMAGES: PreviewItem[] = [
  {
    id: 'demo-1',
    name: 'Local Service Dashboard Preview',
    url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop',
    size: '1.2 MB',
    timestamp: 'Just now'
  },
  {
    id: 'demo-2',
    name: 'AURA Real-Time WebSocket Interface',
    url: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1200&auto=format&fit=crop',
    size: '950 KB',
    timestamp: 'Just now'
  },
  {
    id: 'demo-3',
    name: 'Library Governance Serverless Panel',
    url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop',
    size: '1.8 MB',
    timestamp: 'Just now'
  }
];

export default function ImageUploaderModal() {
  const [images, setImages] = useState<PreviewItem[]>(PRESET_DEMO_IMAGES);
  const [activeImage, setActiveImage] = useState<PreviewItem>(PRESET_DEMO_IMAGES[0]);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [aspectRatio, setAspectRatio] = useState<'16/9' | '4/3' | '9/16' | '1/1'>('16/9');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadSuccessToast, setUploadSuccessToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newItem: PreviewItem = {
            id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            name: file.name,
            url: event.target.result as string,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setImages(prev => [newItem, ...prev]);
          setActiveImage(newItem);
          triggerSuccessNotification();
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const triggerSuccessNotification = () => {
    setUploadSuccessToast(true);
    setTimeout(() => setUploadSuccessToast(false), 3000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDeleteImage = (id: string) => {
    const updated = images.filter(img => img.id !== id);
    setImages(updated);
    if (activeImage.id === id && updated.length > 0) {
      setActiveImage(updated[0]);
    }
  };

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'desktop': return 'max-w-full';
      case 'tablet': return 'max-w-md';
      case 'mobile': return 'max-w-xs';
    }
  };

  return (
    <section id="interactive-uploader" className="py-20 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-medium"
            style={{ background: 'var(--accent-tertiary-soft)', border: '1px solid rgba(167,139,250,0.25)', color: 'var(--accent-tertiary)' }}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Image Playground</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Responsive <span className="gradient-text">Image Inspector</span>
          </h2>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Upload project media or screenshots to test responsiveness across Desktop, Tablet, and Mobile viewports.
          </p>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Controls Panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">

            {/* Upload Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-2xl p-5 border-dashed border-2 cursor-pointer text-center transition-all flex flex-col items-center justify-center gap-3 group"
              style={{
                background: isDragOver ? 'var(--accent-primary-soft)' : 'var(--bg-card)',
                borderColor: isDragOver ? 'var(--accent-primary)' : 'var(--border-primary)',
              }}
            >
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: 'var(--accent-primary-soft)', border: '1px solid var(--accent-primary-border)', color: 'var(--accent-primary)' }}
              >
                <Upload className="w-6 h-6" />
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold" style={{ color: 'var(--text-heading)' }}>Drop Images Here</span>
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>PNG, JPG, WEBP, SVG</span>
              </div>

              <button
                type="button"
                className="glass-button text-xs font-medium text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>Browse Files</span>
              </button>
            </div>

            {/* Viewport Controls */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-4"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5" style={{ color: 'var(--text-heading)' }}>
                  <Sliders className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} /> Viewport
                </span>
                <span className="text-[10px] font-mono" style={{ color: 'var(--accent-primary)' }}>{viewportMode.toUpperCase()}</span>
              </div>

              {/* Device Selector */}
              <div
                className="grid grid-cols-3 gap-1.5 p-1 rounded-xl"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}
              >
                {[
                  { mode: 'desktop' as const, icon: Monitor, label: 'Desktop' },
                  { mode: 'tablet' as const, icon: Tablet, label: 'Tablet' },
                  { mode: 'mobile' as const, icon: Smartphone, label: 'Mobile' },
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setViewportMode(mode)}
                    className="py-1.5 px-2 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer"
                    style={{
                      background: viewportMode === mode ? 'var(--accent-primary)' : 'transparent',
                      color: viewportMode === mode ? '#fff' : 'var(--text-tertiary)',
                    }}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Aspect Ratio */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-mono" style={{ color: 'var(--text-tertiary)' }}>Aspect Ratio:</span>
                <div className="grid grid-cols-4 gap-1">
                  {(['16/9', '4/3', '9/16', '1/1'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className="py-1 px-1.5 rounded-md text-[11px] font-mono transition-all cursor-pointer"
                      style={{
                        background: aspectRatio === ratio ? 'var(--accent-tertiary-soft)' : 'var(--bg-elevated)',
                        border: `1px solid ${aspectRatio === ratio ? 'var(--accent-tertiary)' : 'var(--border-primary)'}`,
                        color: aspectRatio === ratio ? 'var(--accent-tertiary)' : 'var(--text-tertiary)',
                        fontWeight: aspectRatio === ratio ? 700 : 400,
                      }}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zoom */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-mono flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                    <ZoomIn className="w-3 h-3" style={{ color: 'var(--accent-primary)' }} /> Zoom:
                  </span>
                  <span className="font-bold" style={{ color: 'var(--accent-primary)' }}>{zoomLevel}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="w-full h-1 rounded-lg cursor-pointer"
                  style={{ accentColor: 'var(--accent-primary)' }}
                />
              </div>
            </div>

            {/* Gallery Queue */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider font-mono" style={{ color: 'var(--text-heading)' }}>
                  Gallery ({images.length})
                </span>
                <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Select to View</span>
              </div>

              <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
                {images.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setActiveImage(img)}
                    className="p-2 rounded-lg flex items-center justify-between cursor-pointer transition-all"
                    style={{
                      background: activeImage.id === img.id ? 'var(--accent-primary-soft)' : 'var(--bg-elevated)',
                      border: `1px solid ${activeImage.id === img.id ? 'var(--accent-primary-border)' : 'var(--border-primary)'}`,
                    }}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img src={img.url} alt={img.name} className="w-9 h-9 rounded-md object-cover" style={{ border: '1px solid var(--border-primary)' }} />
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-[11px] font-medium truncate" style={{ color: 'var(--text-primary)' }}>{img.name}</span>
                        <span className="text-[9px] font-mono" style={{ color: 'var(--text-tertiary)' }}>{img.size || 'Preview'}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteImage(img.id); }}
                      className="p-1 rounded-md transition-colors cursor-pointer"
                      style={{ color: 'var(--text-tertiary)' }}
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Area (8 cols) */}
          <div
            className="lg:col-span-8 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center min-h-125 relative overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-card)' }}
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between pb-3 mb-4" style={{ borderBottom: '1px solid var(--border-primary)' }}>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ef4444' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#f59e0b' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#22c55e' }} />
                <span className="text-[11px] font-mono ml-2" style={{ color: 'var(--text-tertiary)' }}>Canvas</span>
              </div>
              <div
                className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-md"
                style={{ background: 'var(--accent-primary-soft)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary-border)' }}
              >
                <Eye className="w-3 h-3" />
                <span className="truncate max-w-50">{activeImage.name}</span>
              </div>
            </div>

            {/* Device Frame */}
            <div className={`w-full transition-all duration-500 flex justify-center items-center ${getViewportWidth()}`}>
              <motion.div
                layout
                className="w-full p-2.5 sm:p-3 rounded-2xl relative overflow-hidden group"
                style={{ background: 'var(--bg-elevated)', border: '2px solid var(--border-hover)' }}
              >
                {viewportMode === 'mobile' && (
                  <div className="w-20 h-3 rounded-b-lg mx-auto mb-2" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-primary)' }} />
                )}

                <div
                  className="w-full overflow-hidden rounded-xl relative flex items-center justify-center"
                  style={{ aspectRatio: aspectRatio.replace('/', ' / '), background: 'var(--bg-primary)' }}
                >
                  <img
                    src={activeImage.url}
                    alt={activeImage.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  />

                  <div
                    className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-mono flex items-center gap-1"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--accent-primary)', border: '1px solid var(--border-primary)' }}
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>{aspectRatio} • {zoomLevel}%</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Info */}
            <div className="w-full flex items-center justify-between pt-4 mt-4 text-[11px] font-mono" style={{ borderTop: '1px solid var(--border-primary)', color: 'var(--text-tertiary)' }}>
              <span>Responsive Engine</span>
              <span>Fluid CSS Aspect-Ratio</span>
            </div>
          </div>

        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {uploadSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 rounded-xl p-3.5 flex items-center gap-2.5 shadow-xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(34,197,94,0.3)', color: 'var(--text-primary)' }}
          >
            <div className="p-1.5 rounded-lg" style={{ background: 'var(--accent-success-soft)', color: 'var(--accent-success)' }}>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold" style={{ color: 'var(--accent-success)' }}>Image Loaded!</span>
              <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Preview updated.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
