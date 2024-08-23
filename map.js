// 맵 배경
function bg(){
    const sky = ctx.createLinearGradient(mhw - cameraX, -cameraY, mhw - cameraX, mhh - cameraY)
    sky.addColorStop(0, 'black')
    sky.addColorStop(0.2, 'black')
    sky.addColorStop(0.6, 'blue')
    sky.addColorStop(1, 'white')
    const ground = ctx.createLinearGradient(mhw - cameraX, mhh - cameraY, mhw - cameraX, mhh) 
    ground.addColorStop(0, 'green')
    ground.addColorStop(1, 'orange')

    ctx.fillStyle = sky
    ctx.fillRect(- cameraX, - cameraY, mapWidth, mhh)

    ctx.fillStyle = ground
    ctx.fillRect(- cameraX, mapHeight / 2 - cameraY, mapWidth, mhh)
}
// 테리어몬
function guide () {
    ctx.drawImage(teriormon, mapWidth - 150 - cameraX, mapHeight / 2 - cameraY - 150, 150, 150)
}
// 우파루파
function wooparoopa() {
    const skinColor = '#ffb6c1'

    ctx.strokeStyle = skinColor
    ctx.fillStyle = 'white'
    ctx.lineWidth = 4
    let lookPukkok = mapWidth / 2 + 100 > character.x ? -1 : 1

    // 마주보고 있는가?
    const isfaceEachOther = -lookPukkok === directionCheck

    const posX = mapWidth / 2 - cameraX + 100
    const posY = mapHeight / 2 - cameraY

    ctx.save() // 이전 상태 저장

    const isWithinPukkok = isWithinRect(mapWidth / 2 - 200, mapHeight / 2 - 300, mapWidth / 2 + 200, mapHeight / 2 + 300)
    if(isWithinPukkok && isfaceEachOther){
        commentCloud(posX, posY - 110, ['❤️'])
    }
    // 얼굴
    ctx.beginPath()
    ctx.arc(posX, posY - 40, character.size, Math.PI * 2, 0)
    ctx.fill()
    ctx.stroke()
    ctx.clip() // overflow 만들때
    
    // 볼터치
    ctx.fillStyle = 'pink'
    ctx.beginPath()
    ctx.ellipse(posX + 24 * lookPukkok, posY - 36, 6, 3, 0, Math.PI * 2, 0)
    ctx.ellipse(posX - 1 * lookPukkok, posY - 36, 6, 3, 0, Math.PI * 2, 0)
    ctx.fill()
    ctx.restore() // 클립 종료

    ctx.beginPath()
    ctx.arc(posX, posY - 40, character.size, Math.PI * 2, 0)
    ctx.stroke()
    
    // 머리 뿔
    const symmeteries = [1, -1] // 대칭
    symmeteries.forEach(num => {
        // 더듬이
        ctx.fillStyle = '#4dd6d3'
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.moveTo(posX + character.size * num, posY - 40)
        ctx.lineTo(posX + (character.size + 20) * num , posY - 42)
        ctx.lineTo(posX + character.size * num, posY - 44)
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.moveTo(posX + (character.size + 2) * num, posY - 42)
        ctx.quadraticCurveTo(posX + (character.size + 12) * num, posY - 62, posX + (character.size + 6) * num, posY - 42)
        ctx.quadraticCurveTo(posX + (character.size + 12) * num, posY - 22, posX + (character.size + 2) * num, posY - 42)
        ctx.fill()
    
        ctx.beginPath()
        ctx.moveTo(posX + (character.size + 8) * num, posY - 42)
        ctx.quadraticCurveTo(posX + (character.size + 16) * num, posY - 52, posX + (character.size + 12) * num, posY - 42)
        ctx.quadraticCurveTo(posX + (character.size + 16) * num, posY - 32, posX + (character.size + 8) * num, posY - 42)
        ctx.fill()
    })

    // 입
    ctx.strokeStyle = '#111'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(posX + (lookPukkok * 18), posY - 30)
    ctx.quadraticCurveTo(posX + (lookPukkok * 12), posY - 28, posX + (lookPukkok * 6), posY - 30)
    ctx.stroke()

    // 눈
    ctx.fillStyle = '#111'
    ctx.beginPath()
    ctx.arc(posX + (lookPukkok * 6), posY - 44, 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.arc(posX + (lookPukkok * 18), posY - 44, 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = skinColor
    //손
    ctx.beginPath()
    ctx.arc(posX - 27, posY - 25, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(posX + 27, posY - 25, 6, 0, Math.PI * 2)
    ctx.fill()

    // 발
    ctx.beginPath()
    ctx.arc(posX - 8, posY - 5, 7, Math.PI * 2 / 360 * 30, Math.PI * 2 / 360 * 150, true)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(posX + 8, posY - 5, 7, Math.PI * 2 / 360 * 30, Math.PI * 2 / 360 * 150, true)
    ctx.fill()
}

function drawPortal(){
    const posX = mapWidth / 4 * 3 - cameraX
    const posY = mapHeight / 2 - cameraY
    ctx.fillStyle = 'violet'
    
    function circle () {
        const grd = ctx.createRadialGradient(posX, posY - 100, 20, posX, posY - 100 , 80)
        grd.addColorStop(0, 'white')
        grd.addColorStop(0.1, 'violet')
        grd.addColorStop(1, 'purple')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.ellipse(posX, posY - 100, 40 + portalIncrease, 80, 0, Math.PI * 2, 0)
        ctx.fill()
        ctx.closePath()
    }

    function moveLink () {
        ctx.textAlign = 'center'
        ctx.fillStyle = 'purple'
        ctx.fillText('유치원모으미', posX, posY - portalIncrease - 160)
        ctx.fillText('브라우저(A)', posX - 110 - portalIncrease, posY - 100)
        ctx.fillText('깃허브(D)', posX + 100 + portalIncrease, posY - 100)
    }

    const isWithinPortal = isWithinRect(mapWidth / 4 * 3 - 40 , mapHeight / 2 - 180, 120, 160)
    if(isWithinPortal){
        if(portalIncrease < 40) portalIncrease ++
        // 유치원모으미
        moveLink()
        if(keys.a){
            keys.a = false 
            window.open(urlBox.kinder.browser)
        }
        if(keys.d){
            keys.d = false
            window.open(urlBox.kinder.github) 
        }
    }else{
        if(portalIncrease > 1) portalIncrease --
    }
    circle()

    
    


    ctx.save()
    ctx.translate(posX, posY - 100)
    ctx.rotate(wind * 0.02)
    ctx.strokeStyle = 'purple'
    ctx.lineWidth = 3
    
    // 빙글빙글
    ctx.beginPath()
    Array(7).fill(0).forEach((_, idx) => {
        let deg = Math.PI / 2
        if(idx % 2) deg = -deg
        ctx.arc(0, (idx % 2) * 4, (idx+1) * 4 + portalIncrease, idx === 0 ? deg / 2 : deg, -deg) 
    })
    ctx.stroke()
    ctx.closePath()

    ctx.restore()

}


// 질문 구름
function dream () {
    ctx.textAlign = 'left'
    
    questions.forEach((question, i) => {
        let longestWidth = 0
        let longestLength = 0
        const {q, a, posX, posY} = question
        const qs = q.split('\n')
        const as = a.split('\n')
        const merges = [...qs, ...as]
        // 가장 긴 넓이 찾기
        merges.forEach(l => {
            const textWidth = ctx.measureText(l).width
            if(longestWidth < textWidth) longestWidth = textWidth
        })
        // 가장 긴 배열 길이 찾기
        qs.length > as.length ? longestLength = qs.length : longestLength = as.length
        if(longestLength === 1) longestLength = 2
        const width = longestWidth + 100
        const height = 100 * longestLength

        let imagineX = posX - cameraX + width - wind
        if(imagineX < -width){
            imagineX += mapWidth
        }else{
            imagineX = posX - cameraX + width - wind
        }
        const imagineY = posY - cameraY - height

        ctx.drawImage(cloudImage, imagineX, imagineY, width, height)

        // 실제 x, y 값
        let cloudScreenX = posX + width - wind
        if(cloudScreenX < 0) cloudScreenX += mapWidth
        const cloudScreenY = posY - height

        const isWithinCloud = isWithinRect(cloudScreenX, cloudScreenY, width, height)

        function selectArr (arr) {
            arr.forEach((l, idx) => {
                ctx.fillStyle = 'black'
                ctx.font = '24px noto-sans'
                let textheight = ctx.measureText(l).actualBoundingBoxAscent + 10
                ctx.fillText(l, imagineX + 50, imagineY + idx * textheight + height / 2 - 5)
            })
        }

        if(isWithinCloud && keys.a){
            selectArr(as) // 답 구름
        }else{
            selectArr(qs) // 질문 구름
        }
    })
}

function manual () {
    const posX = mhw - cameraX - screenWidth / 4
    const posY = mhh - cameraY + screenHeight / 10
    ctx.font = '32px noto-sans'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText('이동', posX+ 30, posY + 45)
    ctx.fillText('⬆️', posX + 31, posY + 100)
    ctx.fillText('⬅️⬇️➡️', posX + 30, posY + 140)

    ctx.fillStyle = 'white'
    ctx.fillText('부스터', posX + 230 , posY + 45)
    ctx.fillText('상호작용', posX + 430 , posY + 45)
    
    ctx.font = '24px noto-sans'
    ctx.fillStyle = '#00A6ED'
    // 부스터 키
    ctx.fillRect(posX + 215 , posY + 110, 30, 30)
    
    // 상호작용 키
    ctx.fillRect(posX + 415 , posY + 70, 30, 30)
    ctx.fillRect(posX + 375 , posY + 110, 30, 30)
    ctx.fillRect(posX + 415 , posY + 110, 30, 30)
    ctx.fillRect(posX + 455 , posY + 110, 30, 30)
    
    // 부스터 키
    ctx.fillStyle = 'white'
    ctx.fillText('Z', posX + 230 , posY + 135)
    
    ctx.fillStyle = 'white'
    ctx.fillText('W', posX + 430 , posY + 95)
    ctx.fillText('A', posX + 390 , posY + 135)
    ctx.fillText('S', posX + 430 , posY + 135)
    ctx.fillText('D', posX + 470 , posY + 135)
    
}

function skillVillage () {
    ctx.fillStyle = '#888'
    ctx.fillRect(- cameraX, mhh -cameraY, mhw, mhh)
}
function bugVillage(){
    ctx.fillStyle = '#111'
    ctx.fillRect(mhw - cameraX, mhh - cameraY, mhw, mhh)
}


function drawMap() {
    // 기본 배경
    bg()
    guide()
    
    wind <= mapWidth ? wind += 2 : wind = 0
    
    dream()
    wooparoopa()
    drawPortal()
    manual()
}

function aboutMe () {

    ctx.fillStyle = '#333'
    ctx.fillRect(-cameraX, -cameraY, mhw, mhh)
    
    function ment (text, fullText = text, alpha = 1) {
        ctx.fillStyle = 'white'
        ctx.font = '40px noto-sans'
        ctx.globalAlpha = alpha
        
        const matrics = ctx.measureText(fullText)
        const textX = matrics.width / 2
        const textY = matrics.actualBoundingBoxAscent
        ctx.fillText(text, mhw / 2 - textX - cameraX, 30 + textY - cameraY)
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
        ment('지금부터')
    } else if (currentTime < 16000) {
        ment('여행을 떠나요.')
    } else if (currentTime < 20000) {
        if (!fadingOut) {
            fadingOut = true
            fadeOutStartTime = Date.now()
        }

        let fadeOutDuration = 1500 // 사라지는 데 걸리는 시간 2초
        let fadeOutTime = Date.now() - fadeOutStartTime
        let alpha = 1 - fadeOutTime / fadeOutDuration

        if (alpha > 0) {
            ment('여행을 떠나요.','여행을 떠나요.' ,alpha)
        }
    } else {
        // 애니메이션 종료, 초기화
        fadingOut = false
        i = 0
        timer = Date.now() // 다시 시작할 경우 타이머 리셋
    }

    ctx.globalAlpha = 1 // 투명도 리셋
}