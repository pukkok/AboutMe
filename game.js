const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

const levelElement = document.getElementById('level')
const expElement = document.getElementById('exp')
const expToNextLevelElement = document.getElementById('expToNextLevel')
const healthElement = document.getElementById('health')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const screenWidth = canvas.width
const screenHeight = canvas.height
const mapWidth = screenWidth * 2
const mapHeight = screenHeight * 6

const character = {
    x: mapWidth / 2,
    y: mapHeight / 2,
    size: 25,
    color: 'blue',
    speed: 5,
}
let directionCheck = 1
let isKeyPress = false

let timer = Date.now()
let i = 0
let fadingOut = false
let fadeOutStartTime = 0

let cameraX = 0
let cameraY = 0

const mw = mapWidth / 2
const mh = mapHeight / 2

let isBoost = false

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    z : false,
}

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



const portal = {
    x: mapWidth - 100, // 맵의 끝에 포탈 배치
    y: screenHeight / 2,
    width: 60,
    height: 100,
    color: 'purple'
}

// 바위와 나무 데이터
const rocks = []
const trees = []
const numberOfObstacles = 100;
function getRandomPosition(max) {
    return Math.floor(Math.random() * max)
}

// 랜덤하게 바위와 나무 위치 생성
for (let i = 0; i < numberOfObstacles; i++) {
    rocks.push({ x: getRandomPosition(mapWidth), y: getRandomPosition(mapHeight) });
    trees.push({ x: getRandomPosition(mapWidth), y: getRandomPosition(mapHeight) });
}

function aboutMe () {

    ctx.fillStyle = '#333'
    ctx.fillRect(-cameraX, -cameraY, mw, mh)
    
    function ment (text, fullText = text, alpha = 1) {
        ctx.fillStyle = 'white'
        ctx.font = '40px noto-sans'
        ctx.globalAlpha = alpha
        
        const matrix = ctx.measureText(fullText)
        const textX = matrix.width / 2
        const textY = matrix.actualBoundingBoxAscent
        ctx.fillText(text, mw / 2 - textX - cameraX, 30 + textY - cameraY)
    }

    let currentTime = Date.now() - timer
    let interval = 300 // 글자가 추가되는 간격 (ms)
    if (currentTime < 1000) {
        // 첫 1초 대기
    } else if (currentTime < 4000) {
        let text = '안녕하세요'
        if (Math.floor(currentTime / interval) > i && i < text.length) i++  // i를 증가시켜 한 글자씩 추가
        let textMaker = text.slice(0, i)
        ment(textMaker, text)
    } else if (currentTime < 8000) {
        let text = '푹곡입니다.'
        if (Math.floor(currentTime / interval) > i && i < text.length) i++ 
        let textMaker = text.slice(0, i)
        ment(textMaker, text)
    } else if (currentTime < 12000) {
        ment('지금부터 저와 함께')
    } else if (currentTime < 16000) {
        ment('여행을 떠나 보겠습니다.')
    } else if (currentTime < 20000) {
        if (!fadingOut) {
            fadingOut = true
            fadeOutStartTime = Date.now()
        }

        let fadeOutDuration = 1500 // 사라지는 데 걸리는 시간 2초
        let fadeOutTime = Date.now() - fadeOutStartTime
        let alpha = 1 - fadeOutTime / fadeOutDuration

        if (alpha > 0) {
            ment('여행을 떠나 보겠습니다.','여행을 떠나 보겠습니다.' ,alpha)
        }
    } else {
        // 애니메이션 종료, 초기화
        fadingOut = false
        i = 0
        timer = Date.now() // 다시 시작할 경우 타이머 리셋
    }

    ctx.globalAlpha = 1 // 투명도 리셋
}

function projectVillage () {
    ctx.fillStyle = '#111'
    ctx.fillRect(mw - cameraX, -cameraY, mw, mh)
    
    // 포탈
    ctx.fillStyle = portal.color
    ctx.beginPath()
    ctx.ellipse(portal.x - cameraX, portal.y - cameraY, portal.width / 2, portal.height / 2, 0, 0, Math.PI * 2)
    ctx.fill()
    
}

function dreamSky () {
    const grd = ctx.createLinearGradient(mw - cameraX, -cameraY, mw - cameraX, mh - cameraY)
    grd.addColorStop(0, 'black')
    grd.addColorStop(1, 'blue')

    ctx.fillStyle = grd
    ctx.fillRect(- cameraX, 0 - cameraY, mapWidth, mh)

    // 질문 구름
    const img = new Image()
    img.src = './public/text-cloud.png'
    ctx.drawImage(img, mw / 2 - cameraX, 1000 - cameraY, canvas.width / 5, canvas.height / 4)
    ctx.drawImage(img, mw / 2 - cameraX, 4000 - cameraY, canvas.width / 5, canvas.height / 4)
}

function skillVillage () {
    ctx.fillStyle = '#888'
    ctx.fillRect(- cameraX, mh -cameraY, mw, mh)
}
function bugVillage(){
    ctx.fillStyle = '#111'
    ctx.fillRect(mw - cameraX, mh - cameraY, mw, mh)
}

function drawMap() {
    dreamSky()
    // aboutMe()
    // projectVillage()
    // bugVillage()
    // skillVillage()
}

function drawGame() {
    ctx.clearRect(0, 0, screenWidth, screenHeight)

    // 현재 화면에서의 캐릭터 위치
    const drawX = character.x - cameraX
    const drawY = character.y - cameraY

    ctx.fillStyle = '#7d7d7d'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    drawMap()

    
    drawCharacter(drawX, drawY)
}



function updateCharacter() {
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


function drawCharacter(x, y) {
    ctx.save()
    let isBoost = false
    let isMove = false

    for(let key in keys){
        if(keys[key]){
            if(key !== 'z'){
                isMove = true
            }else{
                isBoost = true
            }
        }
    }
    let slope = Math.PI / 9
    if(isMove){
        ctx.translate(x, y)
        x = y = 0
        ctx.rotate(slope * directionCheck)
    }
    pukkok()
    isMove && booster(isBoost)
    function booster (on = false) {
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
    
    function pukkok() {
        // 눈높이 머리
        ctx.fillStyle = '#f1f3f5'
        ctx.beginPath()
        ctx.arc(x, y, character.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(x, y, character.size, 0, Math.PI * 2)
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
        ctx.arc(x + (character.size + 2) * directionCheck, y + 15, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x + (character.size + 2) * -directionCheck, y + 15, 6, 0, Math.PI * 2)
        ctx.fill()
    
        // 왼 발
        ctx.beginPath()
        ctx.arc(x + (8) * - directionCheck, y + character.size + 10, 7, Math.PI * 2 / 360 * 30, Math.PI * 2 / 360 * 150, true)
        ctx.fill()
    
        // 오른 발
        ctx.beginPath()
        ctx.arc(x + (8) * directionCheck, y + character.size + 10, 7, Math.PI * 2 / 360 * 30, Math.PI * 2 / 360 * 150, true)
        ctx.fill()

        // 눈
        ctx.fillStyle = '#111'
        ctx.beginPath()
        ctx.ellipse(x - 2 * directionCheck, y, 6, 10, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.ellipse(x + 15 * directionCheck, y, 6, 10, 0, 0, Math.PI * 2)
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
    

    ctx.restore()
}

function gameLoop() {
    updateCharacter()
    drawGame()
    requestAnimationFrame(gameLoop)
}

gameLoop()
