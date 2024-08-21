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
    ctx.fillRect(mhw - cameraX, -cameraY, mhw, mhh)
    
    // 포탈
    ctx.fillStyle = portal.color
    ctx.beginPath()
    ctx.ellipse(portal.x - cameraX, portal.y - cameraY, portal.width / 2, portal.height / 2, 0, 0, Math.PI * 2)
    ctx.fill()
    
}

function dream () {
    ctx.textAlign = 'left'
    // 질문 구름
    let longestWidth = 0
    let longestLength = 0
    questions.forEach((question, i) => {
        const {q, a, posX, posY} = question
        const qs = q.split('\n')
        const as = a.split('\n')
        const merges = [...qs, ...as]
        merges.forEach(l => {
            const textWidth = ctx.measureText(l).width
            if(longestWidth < textWidth) longestWidth = textWidth
        })
        qs.length > as.length ? longestLength = qs.length : longestLength = as.length
        const width = longestWidth + 100
        const height = 100 * longestLength * 1.3

        let imagineX = posX - cameraX + width - wind
        if(imagineX < -width){
            imagineX += mapWidth
        }else{
            imagineX = posX - cameraX + width - wind
        }
        const imagineY = posY - cameraY - height

        ctx.drawImage(cloudImage, imagineX, imagineY, width, height);

        // 실제 x, y 값
        let cloudScreenX = posX + width - wind
        if(cloudScreenX < 0) cloudScreenX += mapWidth
        const cloudScreenY = posY - height

        const isWithinCloud =
        character.x > cloudScreenX &&
        character.x < cloudScreenX + width &&
        character.y > cloudScreenY &&
        character.y < cloudScreenY + height

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

    ctx.fillText('부스터', posX + 230 , posY + 45)
    ctx.fillStyle = '#00A6ED'
    ctx.fillRect(posX + 215 , posY + 100, 30, 30)
    ctx.fillStyle = 'white'
    ctx.fillText('Z', posX + 230 , posY + 126)

    ctx.fillText('상호작용', posX + 430 , posY + 45)
    ctx.fillStyle = '#00A6ED'
    ctx.fillRect(posX + 415 , posY + 100, 30, 30)
    ctx.fillStyle = 'white'
    ctx.fillText('A', posX + 430 , posY + 126)
    
    // 상호작용
    // A
    // ctx.fillText()
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

    if(wind <= mapWidth){
        wind += 2
    }else{
        wind = 0
    }
    dream()

    manual()
    // aboutMe()
    // projectVillage()
    // bugVillage()
    // skillVillage()
}