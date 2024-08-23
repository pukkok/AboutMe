/** 사각형 왼쪽 위 꼭지점(x, y)부터 width, height 까지  */
function isWithinRect (x, y, width, height) {
    return character.x > x &&
        character.x < x + width &&
        character.y > y &&
        character.y < y + height
}

/** 캐릭터 말풍선 */
function commentCloud(x, y, mentArr = []) {
    ctx.save()
    // ctx.lineCap = 'round'
    
    let width = 20
    ctx.textAlign = 'left'
    ctx.font = '18px noto-sans'
    mentArr.forEach(ment => {
        if(width < ctx.measureText(ment).width) width = ctx.measureText(ment).width
    })
    let height = mentArr.length * 18
    const posX = x - width / 3
    const posY = y - height
    const radius = 20 // 둥근 모서리 겸, 패딩
    const cornWidth = width / 10 > 10 ? 10 : width / 10

    ctx.beginPath()
    ctx.moveTo(posX, posY - radius)
    ctx.lineTo(posX + width, posY - radius)
    ctx.quadraticCurveTo(posX + width + radius, posY - radius, posX + width + radius, posY)
    ctx.lineTo(posX + width + radius, posY + height)
    ctx.quadraticCurveTo(posX + width + radius , posY + height + radius, posX + width, posY + radius + height)
    
    ctx.lineTo(x + cornWidth * 3, posY + height + radius)
    ctx.lineTo(x + cornWidth * 1, posY + height + radius + 12)
    ctx.lineTo(x , posY + height + radius)
    ctx.lineTo(posX, posY + height + radius)
    
    ctx.quadraticCurveTo(posX - radius, posY + height + radius, posX - radius, posY + height)
    ctx.lineTo(posX - radius, posY)
    ctx.quadraticCurveTo(posX - radius, posY - radius, posX, posY - radius)
    ctx.fill()
    ctx.stroke()

    
    
    // ctx.beginPath()
    // ctx.moveTo(x , posY + height + radius - 2)
    // ctx.lineTo(x + cornWidth * 1, posY + height + radius + 12 - 2)
    // ctx.lineTo(x + cornWidth * 3, posY + height + radius - 2)
    // ctx.fill()
    // ctx.stroke()
    // ctx.closePath()

    ctx.fillStyle = '#111'
    mentArr.forEach((ment, i)=> {
        ctx.fillText(ment, posX, posY + 16 + 20 * i)
    })

    ctx.restore()
}

// 키보드 이벤트
window.addEventListener('keydown', (e) => {
    let dkey = e.key // direction key
    if(!dkey.includes('Arrow')) dkey = dkey.toLowerCase()
    if (keys[dkey] !== undefined) keys[dkey] = true
})
window.addEventListener('keyup', (e) => {
    let dkey = e.key // direction key
    if(!dkey.includes('Arrow')) dkey = dkey.toLowerCase()
    if (keys[dkey] !== undefined) keys[dkey] = false
})

function starter() {
    ctx.clearRect(0, 0, screenWidth, screenHeight)
    // 현재 화면에서의 캐릭터 위치
    const drawX = character.x - cameraX
    const drawY = character.y - cameraY

    drawMap()
    drawPukkok(drawX, drawY)
    updatePukkok()
    requestAnimationFrame(starter)
}
starter()