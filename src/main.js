import { GUI } from 'dat.gui';
const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');
const radius = canvas.width / 2;
const numLines = 60;
const lineLength = radius * 0.8;
const lineWidth = 2;
let hue = 0;



function drawClock() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clock face
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Draw hour markers
    for (let i = 0; i < 12; i++) {
        const angle = (i - 3) * (Math.PI * 2) / 12;
        const x = radius + Math.cos(angle) * (radius - 30);
        const y = radius + Math.sin(angle) * (radius - 30);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#000';
        ctx.fill();
    }

    const now = new Date();

    // Draw hour hand
    const hourAngle = ((now.getHours() % 12) - 3) * (Math.PI * 2) / 12 + ((Math.PI * 2) / 12) * (now.getMinutes() / 60);
    drawHand(hourAngle, radius * 0.5, 10, '#000');

    // Draw minute hand
    const minuteAngle = (now.getMinutes() - 15) * (Math.PI * 2) / 60 + ((Math.PI * 2) / 60) * (now.getSeconds() / 60);
    drawHand(minuteAngle, radius * 0.8, 6, '#000');

    // Draw second hand
    const secondAngle = (now.getSeconds() - 15) * (Math.PI * 2) / 60 + ((Math.PI * 2) / 60) * (now.getMilliseconds() / 1000);
    drawHand(secondAngle, radius * 0.9, 2, 'red');

    // Draw rotating lines
    hue = (hue + 1) % 360;
    // ctx.lineWidth = params.lineWidth;
    ctx.lineWidth = lineWidth;
    for (let i = 0; i < numLines; i++) {
        const angle = (now.getSeconds() + now.getMilliseconds() / 1000 + i / numLines) * 6 * (Math.PI / 180);
        const x1 = radius + Math.cos(angle) * params.lineLength;
        const y1 = radius + Math.sin(angle) * params.lineLength;
        const x2 = radius + Math.cos(angle) * (params.lineLength - 2);
        const y2 = radius + Math.sin(angle) * (params.lineLength - 2);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `hsl(${params.lineColor[0]}, ${params.lineColor[1]}%, ${params.lineColor[2]}%)`;
        ctx.stroke();
    }

    // Display current time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clockDisplay').textContent = timeString;
}

function drawHand(angle, length, width, color) {
    const x = radius + Math.cos(angle) * length;
    const y = radius + Math.sin(angle) * length;

    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

setInterval(drawClock, 1000 / 60); 



// Debug window setup
// const debug = new GUI();
// const params = {
//     lineLength: lineLength,
//     lineWidth: lineWidth,
//     clockSize: 400,
//     clockColor: '#ffffff',
//     hourAngle: 0,
//     minuteAngle: 0,
//     secondAngle: 0,
//     lineColor: [0, 100, 50],
//     randomizeColor: function() {
//         params.lineColor = [Math.random() * 360, 100, 50];
//         drawClock();
//     }
// };
// const debugFolder = debug.addFolder("Debug Settings");

// debugFolder.add(params, "clockSize", 100, 800).onChange(() => {
//   canvas.width = params.clockSize;
//   canvas.height = params.clockSize;
//   radius = params.clockSize / 2;
//   drawClock();
// });

// debugFolder.addColor(params, "clockColor").onChange(() => {
//   document.body.style.backgroundColor = params.clockColor;
//   drawClock(); 
// });
// debugFolder.add(params, "lineLength", 0, radius * 0.8 * 2).onChange(() => drawClock()); 
// debugFolder.add(params, "lineWidth", 1, 10).onChange(() => drawClock()); 
// debugFolder.addColor(params, "lineColor").onChange(() => drawClock()); 
// debugFolder.add(params, "randomizeColor");
// debugFolder.add(params, "hourAngle", 0, Math.PI * 2).onChange(() => drawClock()); 
// debugFolder.add(params, "minuteAngle", 0, Math.PI * 2).onChange(() => drawClock()); 
// debugFolder.add(params, "secondAngle", 0, Math.PI * 2).onChange(() => drawClock()); 

