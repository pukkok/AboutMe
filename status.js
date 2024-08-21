const canvas = document.getElementById('canvas')
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

const mhw = mapWidth / 2 // map half width
const mhh = mapHeight / 2 // map half height

const skyWidth = mapWidth
const skyHeight = mapHeight / 4

let isBoost = false

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    z : false,
    a : false,
}

let wind = 0

let questions = [
    {
        q: '푹곡이란 \n무엇인가요?', 
        a: '눈높이를 \n뒤집어 만들었습니다!'
    },
    {
        q: '왜 개발자가 \n되고 싶었나요?', 
        a: '눈높이를 \n뒤집어보세요!'
    },
    {
        q: '왜 푹곡이란 닉네임을 \n사용하나요?', 
        a: '모두와의 눈높이를 \n맞추겠다는 마음가짐을 \n가지고 있습니다.' 
    },
    {
        q: '최근 관심을 가지고 있는건 \n무엇인가요?', 
        a: '눈높이를 \n뒤집어보세요!' 
    },
    {
        q: '최근 관심을 가지고 있는건 \n무엇인가요?', 
        a: '눈높이를 \n뒤집어보세요!' 
    },
    {
        q: '최근 관심을 가지고 있는건 \n무엇인가요?', 
        a: '눈높이를 \n뒤집어보세요!' 
    },
    {
        q: '최근 관심을 가지고 있는건 \n무엇인가요?', 
        a: '눈높이를 \n뒤집어보세요!' 
    },
    {
        q: '최근 관심을 가지고 있는건 \n무엇인가요?', 
        a: '캔버스라는 태그에 \n푹 빠져있어요' 
    },
]
questions = questions.map((question, idx) => {
    let modI = idx % 4
    posX = idx * 200 + Math.random() * 100
    posY = skyHeight + modI * 250 + Math.random() * 100
    
    return question = {...question, posX, posY}
})

const portal = {
    x: mapWidth - 100, // 맵의 끝에 포탈 배치
    y: screenHeight / 2,
    width: 60,
    height: 100,
    color: 'purple'
}

const cloudImage = new Image();
cloudImage.src = './public/text-cloud.png';

cloudImage.onload = function() {
    // drawMap 함수에서 이미지 사용
}

window.addEventListener('click', () => {
    console.log(cameraX, cameraY)
})