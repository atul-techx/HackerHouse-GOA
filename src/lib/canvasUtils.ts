import QRCode from 'qrcode';

export interface PhotoTransform {
  zoom: number; // 0.5 to 3.0
  panX: number; // pixels offset
  panY: number; // pixels offset
  rotation: number; // degrees 0, 90, 180, 270
  filter: 'none' | 'vibrant' | 'sunset' | 'cyber' | 'bw' | 'warm';
}

export interface FormatBData {
  name: string;
  role: string;
  builderClass: string;
  builderId: string;
  skills: string;
  teamVibes: string;
  venue: string;
  date: string;
}

export interface Teammate {
  id: string;
  name: string;
  role: string;
  photoUrl: string | null;
  transform: PhotoTransform;
}

// Helper to draw rounded rectangle
export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * AUTO FONT SCALING HELPER
 * Scales down font size automatically so text never overflows maxWidth!
 */
export function drawTextAutoFit(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  maxFontSize: number,
  fontFamily: string,
  fontWeight: string = '800',
  color: string = '#044f37',
  align: CanvasTextAlign = 'left'
) {
  let fontSize = maxFontSize;
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

  while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
    fontSize -= 1;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  }

  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
  return fontSize;
}

// Helper to apply filters to canvas
export function applyFilterToContext(ctx: CanvasRenderingContext2D, filter: string) {
  switch (filter) {
    case 'vibrant':
      ctx.filter = 'saturate(135%) contrast(110%) brightness(105%)';
      break;
    case 'sunset':
      ctx.filter = 'sepia(30%) saturate(140%) hue-rotate(-15deg) contrast(105%)';
      break;
    case 'cyber':
      ctx.filter = 'saturate(160%) contrast(125%) hue-rotate(15deg)';
      break;
    case 'bw':
      ctx.filter = 'grayscale(100%) contrast(120%)';
      break;
    case 'warm':
      ctx.filter = 'sepia(20%) brightness(105%) saturate(120%)';
      break;
    default:
      ctx.filter = 'none';
      break;
  }
}

// Helper to load HTMLImageElement from URL or dataURL
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

// Draw user photo with crop/pan/zoom inside specified bounds
export function drawUserPhoto(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cx: number,
  cy: number,
  width: number,
  height: number,
  transform: PhotoTransform,
  isCircle: boolean = false
) {
  ctx.save();
  ctx.beginPath();

  if (isCircle) {
    const radius = Math.min(width, height) / 2;
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  } else {
    ctx.rect(cx - width / 2, cy - height / 2, width, height);
  }
  ctx.clip();

  applyFilterToContext(ctx, transform.filter);

  ctx.translate(cx + transform.panX, cy + transform.panY);
  ctx.rotate((transform.rotation * Math.PI) / 180);
  ctx.scale(transform.zoom, transform.zoom);

  const imgAspect = img.width / img.height;
  const targetAspect = width / height;
  let renderW = width;
  let renderH = height;

  if (imgAspect > targetAspect) {
    renderH = height;
    renderW = height * imgAspect;
  } else {
    renderW = width;
    renderH = width / imgAspect;
  }

  ctx.drawImage(img, -renderW / 2, -renderH / 2, renderW, renderH);

  ctx.restore();
}

/**
 * Robust PNG Download helper using Canvas Blob
 */
export function downloadCanvasAsPNG(canvas: HTMLCanvasElement, fileName: string) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, 'image/png', 1.0);
}

// ----------------------------------------------------
// FORMAT A: PFP FRAME CANVAS RENDERER
// ----------------------------------------------------
export async function renderFormatAPFP(
  canvas: HTMLCanvasElement,
  photoImg: HTMLImageElement | null,
  transform: PhotoTransform,
  frameStyle: 'tropical' | 'stamp' | 'gold' | 'neon',
  badgeText: string = 'BUILDER'
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const size = 1000;
  canvas.width = size;
  canvas.height = size;

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, size, size);
  bgGrad.addColorStop(0, '#011c14');
  bgGrad.addColorStop(0.5, '#044f37');
  bgGrad.addColorStop(1, '#012b1e');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2 - 20;
  const avatarRadius = 360;

  if (photoImg) {
    drawUserPhoto(ctx, photoImg, cx, cy, avatarRadius * 2, avatarRadius * 2, transform, true);
  } else {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, avatarRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#023827';
    ctx.fill();
    ctx.fillStyle = '#10b981';
    ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('UPLOAD YOUR PHOTO', cx, cy);
    ctx.restore();
  }

  ctx.save();

  if (frameStyle === 'stamp') {
    ctx.strokeStyle = '#fffbea';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(cx, cy, avatarRadius + 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ffc700';
    ctx.lineWidth = 6;
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.arc(cx, cy, avatarRadius + 24, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  } else if (frameStyle === 'gold') {
    const grad = ctx.createLinearGradient(cx - avatarRadius, cy - avatarRadius, cx + avatarRadius, cy + avatarRadius);
    grad.addColorStop(0, '#ffe066');
    grad.addColorStop(0.5, '#ffc700');
    grad.addColorStop(1, '#d49400');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.arc(cx, cy, avatarRadius + 12, 0, Math.PI * 2);
    ctx.stroke();
  } else if (frameStyle === 'neon') {
    ctx.strokeStyle = '#ff1e79';
    ctx.lineWidth = 16;
    ctx.shadowColor = '#ff1e79';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(cx, cy, avatarRadius + 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
  } else {
    ctx.strokeStyle = '#ffc700';
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(cx, cy, avatarRadius + 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ff1e79';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(cx, cy, avatarRadius + 24, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();

  // Top Stamp Badge
  ctx.save();
  ctx.translate(cx, 80);
  drawRoundedRect(ctx, -180, -30, 360, 60, 16);
  ctx.fillStyle = '#ff1e79';
  ctx.fill();
  ctx.strokeStyle = '#fffbea';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 24px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🌴 HH GOA 2026 🌴', 0, 0);
  ctx.restore();

  // Bottom Banner
  ctx.save();
  ctx.translate(cx, size - 100);

  drawRoundedRect(ctx, -340, -45, 680, 90, 24);
  const bannerGrad = ctx.createLinearGradient(-340, 0, 340, 0);
  bannerGrad.addColorStop(0, '#012b1e');
  bannerGrad.addColorStop(0.5, '#044f37');
  bannerGrad.addColorStop(1, '#012b1e');
  ctx.fillStyle = bannerGrad;
  ctx.fill();

  ctx.strokeStyle = '#ffc700';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#ffc700';
  ctx.font = '900 34px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('HACKER HOUSE GOA', 0, -10);

  ctx.fillStyle = '#fffbea';
  ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('BUILD IN GOA, SHIP FROM PARADISE • 28-31 OCT', 0, 24);
  ctx.restore();

  // Corner Hashtag Badge
  ctx.save();
  ctx.translate(size - 130, 130);
  ctx.rotate((12 * Math.PI) / 180);
  drawRoundedRect(ctx, -90, -25, 180, 50, 12);
  ctx.fillStyle = '#ffc700';
  ctx.fill();
  ctx.fillStyle = '#011c14';
  ctx.font = '800 18px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('#FrameInGoa', 0, 0);
  ctx.restore();

  if (badgeText) {
    ctx.save();
    ctx.translate(130, cy + avatarRadius - 40);
    ctx.rotate((-12 * Math.PI) / 180);
    drawRoundedRect(ctx, -80, -22, 160, 44, 10);
    ctx.fillStyle = '#e11d48';
    ctx.fill();
    ctx.strokeStyle = '#ffc700';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 16px "Syne", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText.toUpperCase(), 0, 0);
    ctx.restore();
  }
}

// ----------------------------------------------------
// FORMAT B: BUILDER ID BADGE CANVAS RENDERER (EXACT IMAGE 5 MATCH)
// ----------------------------------------------------
export async function renderFormatBBadge(
  canvas: HTMLCanvasElement,
  photoImg: HTMLImageElement | null,
  transform: PhotoTransform,
  data: FormatBData
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = 800;
  const height = 1200;
  canvas.width = width;
  canvas.height = height;

  // 1. Outer Dark Emerald Green Background Container
  ctx.fillStyle = '#023524';
  ctx.fillRect(0, 0, width, height);

  // Outer border lines
  ctx.strokeStyle = '#08694b';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, width - 12, height - 12);

  // 2. Main Cream Vintage Card Base Container
  const margin = 20;
  const cardW = width - margin * 2;
  const cardH = height - margin * 2;
  const cardX = margin;
  const cardY = margin;

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 8;
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 28);
  ctx.fillStyle = '#fcf8e3'; // Authentic warm cream card background
  ctx.fill();
  ctx.restore();

  // Card Outer Double Stitched Green Border
  ctx.save();
  drawRoundedRect(ctx, cardX + 10, cardY + 10, cardW - 20, cardH - 20, 22);
  ctx.strokeStyle = '#044f37';
  ctx.lineWidth = 4;
  ctx.stroke();

  drawRoundedRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 18);
  ctx.strokeStyle = 'rgba(4, 79, 55, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // Top Slot Lanyard Hole
  ctx.save();
  drawRoundedRect(ctx, width / 2 - 55, cardY + 16, 110, 22, 11);
  ctx.fillStyle = '#023524';
  ctx.fill();
  ctx.strokeStyle = '#044f37';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();

  // ----------------------------------------------------
  // TOP BAR: STAMP (LEFT), TAB (CENTER), SEAL (RIGHT)
  // ----------------------------------------------------
  
  // Center Top Hanging Tab Ribbon ("HH GOA 2026")
  ctx.save();
  drawRoundedRect(ctx, width / 2 - 70, cardY + 38, 140, 100, 16);
  ctx.fillStyle = '#e11d48';
  ctx.fill();

  ctx.fillStyle = '#ffc700';
  ctx.font = '800 26px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌴', width / 2, cardY + 68);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 17px "Syne", sans-serif';
  ctx.fillText('HH GOA', width / 2, cardY + 94);

  ctx.fillStyle = '#ffc700';
  ctx.font = '800 15px "Syne", sans-serif';
  ctx.fillText('2026', width / 2, cardY + 116);
  ctx.restore();

  // Left Top Postage Stamp ("GOA INDIA")
  ctx.save();
  const stampX = cardX + 30;
  const stampY = cardY + 50;
  const stampW = 105;
  const stampH = 125;

  drawRoundedRect(ctx, stampX, stampY, stampW, stampH, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#044f37';
  ctx.lineWidth = 3;
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Inner Stamp Content
  ctx.fillStyle = '#e11d48';
  ctx.font = '900 15px "Syne", sans-serif';
  ctx.fillText('GOA', stampX + 12, stampY + 22);

  ctx.fillStyle = '#044f37';
  ctx.font = '800 12px "Syne", sans-serif';
  ctx.fillText('INDIA', stampX + 12, stampY + 38);

  // Stamp Artwork (Sun + Ocean + Palm)
  ctx.fillStyle = '#ffc700';
  ctx.beginPath();
  ctx.arc(stampX + 70, stampY + 75, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#044f37';
  ctx.font = '22px sans-serif';
  ctx.fillText('🌴', stampX + 44, stampY + 92);

  // Red Wavy Cancellation Lines
  ctx.strokeStyle = '#e11d48';
  ctx.lineWidth = 2;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    const lineY = stampY + 45 + i * 8;
    ctx.moveTo(stampX + stampW + 4, lineY);
    ctx.quadraticCurveTo(stampX + stampW + 20, lineY - 6, stampX + stampW + 40, lineY);
    ctx.stroke();
  }
  ctx.restore();

  // Right Top Circular Postmark Seal ("BUILD IN GOA • SHIP FROM PARADISE")
  ctx.save();
  const sealX = cardX + cardW - 85;
  const sealY = cardY + 110;
  ctx.translate(sealX, sealY);

  ctx.beginPath();
  ctx.arc(0, 0, 48, 0, Math.PI * 2);
  ctx.strokeStyle = '#044f37';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 44, 0, Math.PI * 2);
  ctx.strokeStyle = '#044f37';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#044f37';
  ctx.font = '800 9px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('BUILD IN GOA', 0, -22);
  ctx.fillText('🌴', 0, 4);
  ctx.fillText('SHIP FROM PARADISE', 0, 26);
  ctx.restore();

  // Vertical Text on Left & Right Margins (Matching Image 5)
  ctx.save();
  // Left Vertical: 28 - 31 OCT 2026
  ctx.translate(cardX + 22, cardY + 360);
  ctx.rotate((-90 * Math.PI) / 180);
  ctx.fillStyle = '#e11d48';
  ctx.font = '800 15px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('28 - 31 OCT 2026', 0, 0);
  ctx.restore();

  ctx.save();
  // Right Vertical: ✦ GOA, INDIA ✦
  ctx.translate(cardX + cardW - 22, cardY + 360);
  ctx.rotate((90 * Math.PI) / 180);
  ctx.fillStyle = '#e11d48';
  ctx.font = '800 15px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ GOA, INDIA ✦', 0, 0);
  ctx.restore();

  // ----------------------------------------------------
  // LOGO HEADER: HACKER HOUSE + GOA (EXACT MATCH FOR IMAGE 3)
  // ----------------------------------------------------
  ctx.save();
  const headerY = cardY + 200;

  // Draw HACKER on left and HOUSE on right in tall gold serif
  ctx.fillStyle = '#ffc700';
  ctx.font = '900 60px "Cinzel", "Playfair Display", serif';
  ctx.textAlign = 'center';

  // HACKER (left of center) & HOUSE (right of center)
  const leftX = width / 2 - 165;
  const rightX = width / 2 + 165;
  ctx.fillText('HACKER', leftX, headerY);
  ctx.fillText('HOUSE', rightX, headerY);

  // Overlay "गोवा" in glowing bright pink in exact center over the gap
  const goaCenterX = width / 2;
  const goaCenterY = headerY - 12;

  // Background glow / outline for Devanagari "गोवा"
  ctx.font = '900 52px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.strokeStyle = '#ffc700';
  ctx.lineWidth = 10;
  ctx.strokeText('गोवा', goaCenterX, goaCenterY);

  ctx.fillStyle = '#ff1e79';
  ctx.fillText('गोवा', goaCenterX, goaCenterY);

  // Subtitle slogan line: ✦ BUILD IN GOA, SHIP FROM PARADISE ✦
  ctx.fillStyle = '#044f37';
  ctx.font = '800 15px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ BUILD IN GOA, SHIP FROM PARADISE ✦', width / 2, headerY + 32);
  ctx.restore();

  // ----------------------------------------------------
  // MIDDLE SECTION: PHOTO (LEFT) & USER DETAILS (RIGHT)
  // ----------------------------------------------------
  const photoCX = cardX + 195;
  const photoCY = cardY + 440;
  const photoRadius = 140;

  // Photo Frame Outer Stitched Ring
  ctx.save();
  ctx.beginPath();
  ctx.arc(photoCX, photoCY, photoRadius + 12, 0, Math.PI * 2);
  ctx.fillStyle = '#e11d48';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(photoCX, photoCY, photoRadius + 6, 0, Math.PI * 2);
  ctx.fillStyle = '#ffc700';
  ctx.fill();

  // Inner stitched pattern
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.arc(photoCX, photoCY, photoRadius + 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // User Photo Render
  if (photoImg) {
    drawUserPhoto(ctx, photoImg, photoCX, photoCY, photoRadius * 2, photoRadius * 2, transform, true);
  } else {
    ctx.save();
    ctx.beginPath();
    ctx.arc(photoCX, photoCY, photoRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#023827';
    ctx.fill();
    ctx.fillStyle = '#ffc700';
    ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('UPLOAD PHOTO', photoCX, photoCY);
    ctx.restore();
  }

  // Rotated "BUILDER" Badge on photo
  ctx.save();
  ctx.translate(photoCX - 85, photoCY + 75);
  ctx.rotate((-14 * Math.PI) / 180);
  drawRoundedRect(ctx, -55, -18, 110, 36, 10);
  ctx.fillStyle = '#e11d48';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 14px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BUILDER', 0, 0);
  ctx.restore();

  // ----------------------------------------------------
  // RIGHT SIDE: USER DETAILS (WITH AUTO-FIT FONT SCALING)
  // ----------------------------------------------------
  const infoX = cardX + 370;
  const maxInfoWidth = cardW - 395; // Keeps text STRICTLY inside the card bounds!

  // 1. Full Name (Auto-fitted)
  ctx.save();
  const nameUpper = (data.name || 'ATUL GANGWAR').toUpperCase();
  const nameLines = nameUpper.length > 13 ? [nameUpper.slice(0, 13), nameUpper.slice(13)] : [nameUpper];

  drawTextAutoFit(ctx, nameLines[0], infoX, photoCY - 80, maxInfoWidth, 42, '"Syne", sans-serif', '900', '#044f37');
  if (nameLines[1]) {
    drawTextAutoFit(ctx, nameLines[1], infoX, photoCY - 35, maxInfoWidth, 42, '"Syne", sans-serif', '900', '#044f37');
  }

  // 2. Primary Role / Title
  const roleY = nameLines[1] ? photoCY + 8 : photoCY - 35;
  drawTextAutoFit(ctx, `✦ ${(data.role || 'SOFTWARE DEVELOPER').toUpperCase()} ✦`, infoX, roleY, maxInfoWidth, 18, '"Plus Jakarta Sans", sans-serif', '800', '#e11d48');

  // Dashed separator line
  ctx.strokeStyle = 'rgba(4, 79, 55, 0.3)';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(infoX, roleY + 14);
  ctx.lineTo(cardX + cardW - 45, roleY + 14);
  ctx.stroke();
  ctx.setLineDash([]);

  // 3. STAT ITEMS WITH AUTO-FIT
  const statsStartY = roleY + 38;

  // Stat 1: BUILDER CLASS
  ctx.fillStyle = '#044f37';
  ctx.font = '800 12px "Syne", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('BUILDER CLASS', infoX + 42, statsStartY);

  drawTextAutoFit(ctx, (data.builderClass || 'TERMINAL WIZARD').toUpperCase(), infoX + 42, statsStartY + 20, maxInfoWidth - 45, 17, '"Syne", sans-serif', '900', '#e11d48');

  // Icon 1 (Palm)
  ctx.fillStyle = '#ffc700';
  ctx.beginPath();
  ctx.arc(infoX + 16, statsStartY + 10, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#044f37';
  ctx.font = '15px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌴', infoX + 16, statsStartY + 16);

  // Stat 2: SKILLS / STACK
  const stat2Y = statsStartY + 54;
  ctx.fillStyle = '#044f37';
  ctx.font = '800 12px "Syne", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('SKILLS / STACK', infoX + 42, stat2Y);

  drawTextAutoFit(ctx, (data.skills || 'PYTHON, JAVA, FRONTEND').toUpperCase(), infoX + 42, stat2Y + 20, maxInfoWidth - 45, 16, '"Syne", sans-serif', '900', '#e11d48');

  // Icon 2 (Code)
  ctx.fillStyle = '#ffc700';
  ctx.beginPath();
  ctx.arc(infoX + 16, stat2Y + 10, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#044f37';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('💻', infoX + 16, stat2Y + 16);

  // Stat 3: TEAM VIBES
  const stat3Y = stat2Y + 54;
  ctx.fillStyle = '#044f37';
  ctx.font = '800 12px "Syne", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('TEAM VIBES', infoX + 42, stat3Y);

  drawTextAutoFit(ctx, (data.teamVibes || 'BUILD • SHIP • REPEAT').toUpperCase(), infoX + 42, stat3Y + 20, maxInfoWidth - 45, 16, '"Syne", sans-serif', '900', '#044f37');

  // Icon 3 (Envelope/Flame)
  ctx.fillStyle = '#ffc700';
  ctx.beginPath();
  ctx.arc(infoX + 16, stat3Y + 10, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#044f37';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✉️', infoX + 16, stat3Y + 15);

  ctx.restore();

  // ----------------------------------------------------
  // LOWER SECTION: SIGNBOARD + BUILDER ID BOX + QR CODE
  // ----------------------------------------------------
  const lowerY = cardY + 665;

  // Left Signboard (Build / Ship / Repeat)
  ctx.save();
  const signX = cardX + 35;

  // Wooden Post
  ctx.fillStyle = '#a16207';
  ctx.fillRect(signX + 62, lowerY + 15, 16, 210);

  // Arrow 1: BUILD
  drawRoundedRect(ctx, signX + 12, lowerY + 25, 115, 40, 8);
  ctx.fillStyle = '#ffc700';
  ctx.fill();
  ctx.strokeStyle = '#044f37';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.fillStyle = '#044f37';
  ctx.font = '900 19px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('BUILD', signX + 70, lowerY + 51);

  // Arrow 2: SHIP
  drawRoundedRect(ctx, signX + 16, lowerY + 78, 115, 40, 8);
  ctx.fillStyle = '#e11d48';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 19px "Syne", sans-serif';
  ctx.fillText('SHIP', signX + 74, lowerY + 104);

  // Arrow 3: REPEAT
  drawRoundedRect(ctx, signX + 20, lowerY + 131, 115, 40, 8);
  ctx.fillStyle = '#044f37';
  ctx.fill();
  ctx.strokeStyle = '#ffc700';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.fillStyle = '#ffc700';
  ctx.font = '900 19px "Syne", sans-serif';
  ctx.fillText('REPEAT', signX + 78, lowerY + 157);
  ctx.restore();

  // Center Box: Builder ID, Venue, Date
  ctx.save();
  const boxX = cardX + 185;
  const boxY = lowerY + 30;
  drawRoundedRect(ctx, boxX, boxY, 225, 160, 16);
  ctx.fillStyle = 'rgba(4, 79, 55, 0.05)';
  ctx.fill();
  ctx.strokeStyle = '#044f37';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Header Pill
  drawRoundedRect(ctx, boxX + 15, boxY + 10, 195, 32, 10);
  ctx.fillStyle = '#044f37';
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 13px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER ID', boxX + 112, boxY + 31);

  // ID Code Number
  ctx.fillStyle = '#044f37';
  ctx.font = '900 27px "Space Grotesk", monospace';
  ctx.fillText(data.builderId || '#HH26-9827', boxX + 112, boxY + 80);

  // Venue & Date
  ctx.fillStyle = '#e11d48';
  ctx.font = '800 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`VENUE: ${data.venue || 'GOA, INDIA'}`, boxX + 112, boxY + 112);

  ctx.fillStyle = '#044f37';
  ctx.font = '800 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`DATE: ${data.date || '28 - 31 OCT 2026'}`, boxX + 112, boxY + 135);
  ctx.restore();

  // Right Box: QR Code
  ctx.save();
  const qrX = cardX + 435;
  const qrY = lowerY + 30;

  try {
    const qrDataUrl = await QRCode.toDataURL(`https://hhgoa2026.vercel.app/id/${data.builderId || 'HH26'}`, {
      margin: 1,
      width: 145,
      color: {
        dark: '#044f37',
        light: '#fcf8e3',
      },
    });
    const qrImg = await loadImage(qrDataUrl);
    ctx.drawImage(qrImg, qrX + 25, qrY + 10, 145, 145);

    // Center Palm Icon inside QR Code
    ctx.fillStyle = '#e11d48';
    drawRoundedRect(ctx, qrX + 82, qrY + 68, 30, 30, 6);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🌴', qrX + 97, qrY + 90);
  } catch (e) {
    console.error('QR generation error:', e);
  }

  ctx.fillStyle = '#e11d48';
  ctx.font = '800 12px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ SCAN TO EXPLORE ✦', qrX + 97, qrY + 175);
  ctx.restore();

  // ----------------------------------------------------
  // BOTTOM TROPICAL BEACH ART & #FRAMEINGOA BANNER
  // ----------------------------------------------------
  ctx.save();
  const botY = cardY + cardH - 125;

  // Ocean Water & Setting Sun Artwork at Bottom
  ctx.fillStyle = '#ffc700';
  ctx.beginPath();
  ctx.arc(width / 2 - 50, botY + 45, 38, Math.PI, 0);
  ctx.fill();

  ctx.font = '40px sans-serif';
  ctx.fillText('🏄‍♂️', cardX + 35, botY + 35);
  ctx.fillText('🛵', cardX + cardW - 75, botY + 35);
  ctx.fillText('🌴', cardX + 85, botY + 25);
  ctx.fillText('🌴', cardX + cardW - 130, botY + 25);
  ctx.restore();

  // Red/Pink #FRAMEINGOA Banner
  ctx.save();
  drawRoundedRect(ctx, cardX + 110, cardY + cardH - 70, cardW - 220, 50, 16);
  ctx.fillStyle = '#e11d48';
  ctx.fill();
  ctx.strokeStyle = '#ffc700';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 24px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ #FRAMEINGOA ✦', width / 2, cardY + cardH - 38);
  ctx.restore();
}

// ----------------------------------------------------
// FORMAT C: SQUAD / TEAMMATE FRAME CANVAS RENDERER
// ----------------------------------------------------
export async function renderFormatCSquad(
  canvas: HTMLCanvasElement,
  teammates: Teammate[],
  teamName: string = 'GOA HACKER SQUAD'
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = 1200;
  const height = 900;
  canvas.width = width;
  canvas.height = height;

  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#011c14');
  bgGrad.addColorStop(0.5, '#044f37');
  bgGrad.addColorStop(1, '#012b1e');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  drawRoundedRect(ctx, width / 2 - 350, 40, 700, 90, 20);
  ctx.fillStyle = '#e11d48';
  ctx.fill();
  ctx.strokeStyle = '#ffc700';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 36px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`🌴 ${teamName.toUpperCase()} 🌴`, width / 2, 85);
  ctx.fillStyle = '#ffc700';
  ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('HH GOA 2026 • OFFICIAL BUILDER SQUAD', width / 2, 115);
  ctx.restore();

  const count = Math.min(Math.max(teammates.length, 1), 4);
  const cardW = count <= 2 ? 460 : 250;
  const cardH = 500;
  const spacing = count <= 2 ? 80 : 30;
  const startX = (width - (count * cardW + (count - 1) * spacing)) / 2;
  const cardY = 170;

  for (let i = 0; i < count; i++) {
    const tm = teammates[i];
    const cx = startX + i * (cardW + spacing) + cardW / 2;
    const cy = cardY + 160;

    ctx.save();
    drawRoundedRect(ctx, cx - cardW / 2, cardY, cardW, cardH, 20);
    ctx.fillStyle = '#fcf8e3';
    ctx.fill();
    ctx.strokeStyle = '#044f37';
    ctx.lineWidth = 4;
    ctx.stroke();

    const avatarRadius = count <= 2 ? 120 : 90;
    ctx.beginPath();
    ctx.arc(cx, cy, avatarRadius + 6, 0, Math.PI * 2);
    ctx.fillStyle = '#e11d48';
    ctx.fill();

    if (tm && tm.photoUrl) {
      try {
        const photoImg = await loadImage(tm.photoUrl);
        drawUserPhoto(ctx, photoImg, cx, cy, avatarRadius * 2, avatarRadius * 2, tm.transform, true);
      } catch {
        ctx.fillStyle = '#023827';
        ctx.beginPath();
        ctx.arc(cx, cy, avatarRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = '#023827';
      ctx.beginPath();
      ctx.arc(cx, cy, avatarRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffc700';
      ctx.font = '700 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('NO PHOTO', cx, cy);
    }

    // Name & Role (Auto-fitted)
    drawTextAutoFit(ctx, (tm?.name || `MEMBER ${i + 1}`).toUpperCase(), cx, cardY + 340, cardW - 30, count <= 2 ? 28 : 22, '"Syne", sans-serif', '900', '#044f37', 'center');
    drawTextAutoFit(ctx, (tm?.role || 'BUILDER').toUpperCase(), cx, cardY + 375, cardW - 30, count <= 2 ? 18 : 14, '"Plus Jakarta Sans", sans-serif', '800', '#e11d48', 'center');

    drawRoundedRect(ctx, cx - 80, cardY + 410, 160, 36, 10);
    ctx.fillStyle = '#044f37';
    ctx.fill();
    ctx.fillStyle = '#ffc700';
    ctx.font = '800 14px "Syne", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`BUILDER #${i + 1}`, cx, cardY + 433);

    ctx.restore();
  }

  ctx.save();
  drawRoundedRect(ctx, width / 2 - 300, height - 100, 600, 60, 18);
  ctx.fillStyle = '#e11d48';
  ctx.fill();
  ctx.strokeStyle = '#ffc700';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 26px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ JOIN US AT #FRAMEINGOA • HH GOA 2026 ✦', width / 2, height - 60);
  ctx.restore();
}
