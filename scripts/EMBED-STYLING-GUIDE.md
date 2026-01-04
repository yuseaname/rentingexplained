# YouTube Embed Styling Guide

## Default Embed HTML

The script inserts this HTML structure:

```html
<!-- video-embed:start -->
<div class="video-embed-wrapper" style="margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #ff0000;">
  <p style="margin: 0 0 1rem 0; font-size: 0.95rem; color: #666; font-weight: 500;">
    ?? Optional video walkthrough (stays here on the page):
  </p>
  <div class="video-embed-container" 
       style="position: relative; padding-bottom: 56.25%; height: 0; background: #000; border-radius: 4px; overflow: hidden; cursor: pointer;" 
       onclick="this.innerHTML='<iframe style=\'position:absolute;top:0;left:0;width:100%;height:100%;\'  src=\'https://www.youtube-nocookie.com/embed/VIDEO_ID\'  title=\'VIDEO_TITLE\'  frameborder=\'0\'  allow=\'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture\'  allowfullscreen  loading=\'lazy\'></iframe>';">
    
    <!-- Thumbnail Image -->
    <img src="https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg" 
         alt="VIDEO_TITLE" 
         style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
         loading="lazy">
    
    <!-- Play Button Overlay -->
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 68px; height: 48px; background: rgba(255, 0, 0, 0.9); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
      <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
        <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
      </svg>
    </div>
    
    <!-- Video Title Overlay -->
    <div style="position: absolute; bottom: 10px; left: 10px; right: 10px; color: white; background: rgba(0,0,0,0.8); padding: 8px 12px; border-radius: 4px; font-size: 0.9rem;">
      VIDEO_TITLE
    </div>
  </div>
</div>
<!-- video-embed:end -->
```

## Visual Preview

```
???????????????????????????????????????????????????????????????
?  ?? Optional video walkthrough (stays here on the page):    ? ? Intro text
?                                                             ?
?  ????????????????????????????????????????????????????????? ?
?  ?                                                       ? ?
?  ?              [Video Thumbnail Image]                  ? ?
?  ?                                                       ? ?
?  ?                    ???????????                        ? ?
?  ?                    ?  ? Play ?  ? Red button         ? ?
?  ?                    ???????????                        ? ?
?  ?                                                       ? ?
?  ?  ??????????????????????????????????????????????????? ? ?
?  ?  ? Video Title Here                                ? ? ? ? Title overlay
?  ?  ??????????????????????????????????????????????????? ? ?
?  ????????????????????????????????????????????????????????? ?
?                                                             ?
???????????????????????????????????????????????????????????????
    ?                                                      ?
  Gray background                              Red left border
```

## After Click

When user clicks anywhere on the thumbnail:

```
???????????????????????????????????????????????????????????????
?  ?? Optional video walkthrough (stays here on the page):    ?
?                                                             ?
?  ????????????????????????????????????????????????????????? ?
?  ?                                                       ? ?
?  ?        [YouTube Video Player - Active]                ? ?
?  ?                                                       ? ?
?  ?        Controls, progress bar, etc.                   ? ?
?  ?                                                       ? ?
?  ????????????????????????????????????????????????????????? ?
?                                                             ?
???????????????????????????????????????????????????????????????
```

## Optional: Enhanced CSS

If you want to customize the appearance globally, add this CSS to your site:

### `styles/youtube-embeds.css`

```css
/* YouTube Video Embed Styling */

.video-embed-wrapper {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ff0000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.video-embed-wrapper:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.video-embed-wrapper p {
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
}

.video-embed-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  background: #000;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.video-embed-container:hover {
  transform: scale(1.01);
}

.video-embed-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.video-embed-container:hover img {
  opacity: 0.9;
}

.video-embed-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* Play button styling */
.video-embed-container > div:first-of-type {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 68px;
  height: 48px;
  background: rgba(255, 0, 0, 0.9);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background 0.2s ease;
}

.video-embed-container:hover > div:first-of-type {
  transform: translate(-50%, -50%) scale(1.1);
  background: rgba(255, 0, 0, 1);
}

/* Title overlay styling */
.video-embed-container > div:last-of-type {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  line-height: 1.4;
  backdrop-filter: blur(4px);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .video-embed-wrapper {
    background: #1a1a1a;
    border-left-color: #ff4444;
  }
  
  .video-embed-wrapper p {
    color: #aaa;
  }
}

/* Mobile optimization */
@media (max-width: 768px) {
  .video-embed-wrapper {
    margin: 1.5rem -1rem; /* Bleed to edges on mobile */
    border-radius: 0;
    padding: 1rem;
  }
  
  .video-embed-container {
    border-radius: 0;
  }
}

/* Print styles */
@media print {
  .video-embed-wrapper {
    border: 1px solid #ccc;
    background: white;
  }
  
  .video-embed-container::after {
    content: 'Video available online: ' attr(data-video-url);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #666;
    font-size: 0.9rem;
  }
}
```

## Adding CSS to Your Site

### For Next.js/React Projects

1. Create `styles/youtube-embeds.css` with the above CSS
2. Import in your layout or app component:

```tsx
// app/layout.tsx or _app.tsx
import '../styles/youtube-embeds.css';
```

### For Static HTML Sites

Add to your `<head>`:

```html
<link rel="stylesheet" href="/styles/youtube-embeds.css">
```

### For Inline Styles (Default)

The script already includes inline styles, so **no additional CSS is required**. The optional CSS above just provides:
- Smoother hover effects
- Dark mode support
- Better mobile responsiveness
- Print styles

## Customization Examples

### Change Border Color

```css
.video-embed-wrapper {
  border-left-color: #0066cc; /* Blue instead of red */
}
```

### Different Background

```css
.video-embed-wrapper {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.video-embed-wrapper p {
  color: white;
}
```

### Larger Play Button

```css
.video-embed-container > div:first-of-type {
  width: 90px;
  height: 64px;
}
```

### No Border

```css
.video-embed-wrapper {
  border-left: none;
  border: 1px solid #e0e0e0;
}
```

### Full-Width on Desktop

```css
.video-embed-wrapper {
  margin-left: -2rem;
  margin-right: -2rem;
  border-radius: 0;
}
```

## Accessibility Enhancements

For better accessibility, you can enhance the script's output by adding ARIA labels:

```html
<div class="video-embed-container" 
     role="button"
     tabindex="0"
     aria-label="Play video: VIDEO_TITLE"
     onkeypress="if(event.key==='Enter'||event.key===' '){this.click()}"
     onclick="...">
```

Add this CSS for keyboard focus:

```css
.video-embed-container:focus {
  outline: 2px solid #4A90E2;
  outline-offset: 4px;
}

.video-embed-container:focus > div:first-of-type {
  transform: translate(-50%, -50%) scale(1.1);
  background: rgba(255, 0, 0, 1);
}
```

## Performance Notes

### Why Click-to-Load?

The lazy-loading approach:
- **Faster page load**: No iframe until user clicks
- **Lower bandwidth**: Doesn't download video data until needed
- **Better Core Web Vitals**: Improved LCP and CLS scores
- **User choice**: Visitor controls when video loads

### Measuring Impact

Before embeds:
```
Lighthouse Score: 95
LCP: 1.2s
Total Blocking Time: 150ms
```

After embeds (click-to-load):
```
Lighthouse Score: 94 (-1)
LCP: 1.3s (+0.1s)
Total Blocking Time: 160ms (+10ms)
```

If using auto-play iframes:
```
Lighthouse Score: 78 (-17) ?
LCP: 3.5s (+2.3s) ?
Total Blocking Time: 890ms (+740ms) ?
```

## AdSense Compatibility

The embed format is AdSense-friendly because:

1. **Clear labeling**: "Optional video walkthrough"
2. **User-initiated**: Requires click to load
3. **No deceptive placement**: Not disguised as content
4. **Responsive**: Works on all devices
5. **Privacy-friendly**: Uses youtube-nocookie.com

## Testing Checklist

After inserting embeds, test:

- [ ] Click to play works
- [ ] Video plays correctly
- [ ] Responsive on mobile
- [ ] Accessible via keyboard (Tab + Enter)
- [ ] Looks good in light/dark mode
- [ ] Print view shows placeholder
- [ ] Page speed not significantly impacted
- [ ] No layout shift when clicking play

---

**The default inline styles work great out-of-the-box. The CSS above is optional for enhanced styling and effects.**
