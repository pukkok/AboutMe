function drawPukkok(x, y) {
    
    let isBoost = false
    let isMove = false
    let slope = Math.PI / 9

    const dummys = ['구름에 다가가서 A키를 누르면', '질문에 대한 답을 볼수 있어요.']
    const isSky = isWithinRect(0, mapHeight / 4 * 1, mapWidth, skyHeight / 2)
    if (isSky) {
        if (!showMent) {
            showMent = true
            // 3초간 타이머 작동
            mentTimer = setTimeout(() => {
                mentTimer = null
            }, 3000)
        }
    } else {
        if (mentTimer) {
            clearTimeout(mentTimer)
            mentTimer = null
        }
        showMent = false
    }

    if (mentTimer) {
        commentCloud(x, y - 80, dummys)
    }

    ctx.save()

    for(let key in keys){
        if(keys[key]){
            if(key.includes('Arrow')){
                isMove = true
            }
            if(key === 'z'){
                isBoost = true
            }
        }
    }

    if(isMove){
        ctx.translate(x, y)
        x = y = 0
        ctx.rotate(slope * directionCheck)
    }

    pukkok(x, y)
    isMove && booster(x, y, isBoost)
    ctx.restore()
}

function updatePukkok() {
    if(character.x < character.size){ // 왼쪽 벽 충돌
        character.x = character.size
    }else if (character.x > mapWidth - character.size) { // 오른쪽 벽 충돌
        character.x = mapWidth - character.size
    }
    if(character.y < character.size){
        character.y = character.size
    }else if (character.y > mapHeight - character.size) {
        character.y = mapHeight - character.size
    }

    // z키 클릭시
    let speed = character.speed
    if(keys.z){
        speed = 3 * speed
    }
    
    if (keys.ArrowUp) character.y -= speed
    if (keys.ArrowDown) character.y += speed 
    if (keys.ArrowLeft){
        character.x -= speed
        directionCheck = -1
    }
    if (keys.ArrowRight){
        character.x += speed
        directionCheck = 1
    }

    updateCamera()
}

function updateCamera() {
    // X축 카메라 조정
    if (character.x < screenWidth / 2) {
        cameraX = 0
    } else if (character.x > mapWidth - screenWidth / 2) {
        cameraX = mapWidth - screenWidth
    } else {
        cameraX = character.x - screenWidth / 2
    }

    // Y축 카메라 조정
    if (character.y < screenHeight / 2) {
        cameraY = 0
    } else if (character.y > mapHeight - screenHeight / 2) {
        cameraY = mapHeight - screenHeight
    } else {
        cameraY = character.y - screenHeight / 2
    }
}

function pukkok(x, y) {
    // 눈높이 머리
    ctx.fillStyle = '#f1f3f5'
    ctx.beginPath()
    ctx.arc(x, y, 25, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(x, y, 25, 0, Math.PI * 2)
    ctx.stroke()

    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(x - 25, y - 25)
    ctx.quadraticCurveTo(x, y - 45, x + 25 , y - 25)
    ctx.quadraticCurveTo(x, y - 50, x - 25 , y - 35)
    ctx.quadraticCurveTo(x - 30, y - 25, x - 25 , y - 25)
    ctx.fill()

    ctx.fillStyle = 'red'
    // 손
    ctx.beginPath()
    ctx.arc(x + 27, y + 15, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x - 27, y + 15, 6, 0, Math.PI * 2)
    ctx.fill()

    // 발
    ctx.beginPath()
    ctx.arc(x + 8, y + 35, 7, Math.PI * 2 / 360 * 30, Math.PI * 2 / 360 * 150, true)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x - 8, y + 35, 7, Math.PI * 2 / 360 * 30, Math.PI * 2 / 360 * 150, true)
    ctx.fill()

    // 눈
    ctx.fillStyle = '#111'
    ctx.beginPath()
    ctx.ellipse(x - 2 * directionCheck, y, 6, 10, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(x + 16 * directionCheck, y, 6, 10, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.fillStyle = '#f8f9fa'
    ctx.arc(x + 2 * directionCheck, y - 2, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.arc(x + 19 * directionCheck, y - 2, 4, 0, Math.PI * 2)
    ctx.fill()

    // 입
    ctx.fillStyle = '#d1180b'
    ctx.beginPath()
    ctx.ellipse(x+8 * directionCheck, y + 10, 4, 8, 0, 0, Math.PI)
    ctx.fill()
}
function booster (x, y, on = false) {
    let pointX = x + 35 * - directionCheck
    let pointY = y + character.size / 2

    if(on){
        ctx.scale(1.5, 1.2)
        pointX += 10 * directionCheck
    } 
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(pointX, pointY)
    ctx.lineTo(pointX + 28 * -directionCheck, pointY - 4)
    ctx.lineTo(pointX + 12 * -directionCheck, pointY + 8)
    ctx.lineTo(pointX + 24 * -directionCheck, pointY + 12)
    ctx.lineTo(pointX + 12 * -directionCheck, pointY + 16)
    ctx.lineTo(pointX + 28 * -directionCheck, pointY + 28)
    ctx.lineTo(pointX, pointY + 24)
    ctx.fill()

    ctx.fillStyle = 'yellow'
    ctx.beginPath()
    ctx.moveTo(pointX, pointY + 4)
    ctx.lineTo(pointX + 18 * -directionCheck, pointY - 0)
    ctx.lineTo(pointX + 2 * -directionCheck, pointY + 8)
    ctx.lineTo(pointX + 14 * -directionCheck, pointY + 12)
    ctx.lineTo(pointX + 2 * -directionCheck, pointY + 16)
    ctx.lineTo(pointX + 18 * -directionCheck, pointY + 24)
    ctx.lineTo(pointX, pointY + 20)
    ctx.fill()
}








