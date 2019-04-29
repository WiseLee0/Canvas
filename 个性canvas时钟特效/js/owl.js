let canvas = document.getElementById('canvas'),
    width = canvas.width,
    height = canvas.height,
    context = canvas.getContext('2d'),
    img = new Image(),
    r = width / 2,
    rem = width / 400,
    secShadow = 0
context.translate(r, r)
img.src = "img/owl.jpg"

//画出背景
function drawBackGround() {
    context.lineWidth = 4 * rem
    let cirR = r - context.lineWidth 
    context.beginPath()
    context.arc(0, 0, cirR, 0, 2 * Math.PI);
    context.clip()
    context.save()
    context.globalAlpha = .4
    context.drawImage(img, -cirR, -cirR, width, height)
    context.restore()
    context.stroke()
    context.closePath()
    drawNumber()
    drawDot()
}

function drawNumber() {
    let hourNumbers = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']
    for (let i = 0; i < hourNumbers.length; i++) {
        context.font = 20 * rem + 'px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'center';
        let rad = 2 * Math.PI * (i) / 12,
            x = Math.sin(rad) * (r - 30 * rem),
            y = Math.cos(rad) * -(r - 30 * rem)
        context.fillText(hourNumbers[i], x, y)
    }
}

function drawDot() {
    for (let i = 0; i < 60; i++) {
        let rad = 2 * Math.PI / 60 * (i + 1),
            x = Math.sin(rad) * (r - 30 * rem),
            y = Math.cos(rad) * -(r - 30 * rem)
        context.beginPath();
        context.save();

        if ((i + 1) % 5 != 0) context.arc(x, y, 2.5 * rem, 0, 2 * Math.PI);

        if (i + 1 == secShadow) {
            context.save()
            context.fillStyle = "red"
            context.shadowColor = "black"
            context.shadowBlur = 8
            context.fill()
            context.restore()
        } else {
            context.save()
            context.fillStyle = "#B7B7B7"
            context.fill()
            context.restore()
        }
    }
}
//画出时针
function drawHour(hour, minute) {
    context.save();
    context.beginPath();
    context.lineWidth = 12 * rem;
    context.strokeStyle = "#222222";
    context.lineCap = "round";
    let rad = hourRad = 2 * Math.PI * (hour / 12),
        rad_min = 2 * Math.PI * (minute / 60 / 12)
    context.rotate(rad + rad_min);
    context.moveTo(0, 10 * rem);
    context.lineTo(0, -r * 0.4);
    context.stroke();
    context.restore();
    context.closePath();
}

//画出分针
function drawMinutes(minute, second) {
    context.save()
    context.beginPath()
    context.lineWidth = 10 * rem
    context.fillStyle = "green"
    let rad = 2 * Math.PI / 60 * minute,
        rad_min = 2 * Math.PI / 60 / 60 * second
    context.rotate(rad + rad_min)
    context.moveTo(0, -r * 0.6)
    context.lineTo(-5 * rem, 15 * rem)
    context.lineTo(5 * rem, 15 * rem)
    context.fill()
    context.restore()
    context.closePath()
}

//画出秒针
function drawSecond(second) {
    context.save()
    drawEyes(second)
    context.beginPath()
    context.fillStyle = "#FF5809"
    context.lineCap = "round"
    let rad = 2 * Math.PI / 60 * second
    context.rotate(rad)
    context.moveTo(0, -r * 0.8)
    context.lineTo(-5 * rem, 15 * rem)
    context.lineTo(5 * rem, 15 * rem)
    context.fill()
    context.restore()
    context.closePath()
}
//画出猫头鹰的眼睛
function drawEyes(second) {
    context.save();
    context.beginPath();

    let rad = 2 * Math.PI / 60 * second
    context.globalAlpha = .4
    context.fillStyle = "red"

    let x1 = -31 * rem,
        x2 = 32 * rem,
        r1 = 10 * rem,
        y1 = -44 * rem,
        y2 = -44 * rem,
        r2 = 12 * rem

    context.arc(x1 + 8 * rem * Math.sin(rad), y1 - 10 * rem * Math.cos(rad), r1, 0, 2 * Math.PI)
    context.arc(x2 + 10 * rem * Math.sin(rad), y2 - 11 * rem * Math.cos(rad), r2, 0, 2 * Math.PI)

    context.fill()

    context.restore()
    context.closePath()
}

function draw() {
    context.clearRect(-r, -r, width, height)
    let now = new Date()
    let hour = now.getHours()
    let minute = now.getMinutes()
    if (minute < 10) minute = "0" + minute
    let second = now.getSeconds()
    if (second < 10) second = "0" + second
    secShadow = second
    drawBackGround()
    drawSecond(second)
    drawHour(hour, minute)
    drawMinutes(minute, second)
    context.save()
    context.beginPath()
    context.fillStyle = 'gold'
    context.arc(0, 0, 5 * rem, Math.PI / 180 * 0, Math.PI / 180 * 360)
    context.fill()
    context.closePath()
    context.restore()
}
setInterval(draw, 1000)