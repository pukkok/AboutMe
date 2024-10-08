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
    x: mapWidth / 2, // 초기 위치
    y: mapHeight / 2 - 40,
    size: 25,
    speed: 5,
}
let directionCheck = 1
let isKeyPress = false

let showMent = false
let mentTimer = null

let woopaShowMent = false
let woopaMentTimer = null

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
    d : false,
}

let wind = 0

let questions = [
    {
        q: '푹곡이란 \n무엇인가요?', 
        a: '눈높이를 \n뒤집어 만들었습니다!'
    },
    {
        q: '왜 개발자가 \n되고 싶었나요?', 
        a: '코딩이 재밌어요'
    },
    {
        q: '왜 푹곡이란 닉네임을 \n사용하나요?', 
        a: `앞에 있다면 눈높이를 맞춰 \n함께 가겠다는 마음가짐을, \n뒤에 있다면 눈높이를 맞추기 위해 \n좀 더 나아가겠다는 뜻입니다.` 
    },
    // {
    //     q: '최근 관심을 가지고 있는건 \n무엇인가요?', 
    //     a: '눈높이를 \n뒤집어보세요!' 
    // },
    // {
    //     q: '최근 관심을 가지고 있는건 \n무엇인가요?', 
    //     a: '눈높이를 \n뒤집어보세요!' 
    // },
    {
        q: '여자친구를 뭐라고 \n부르나요?', 
        a: '우파루파!' 
    },
    {
        q: '여자친구 있나요?', 
        a: '네. 있습니다' 
    },
    {
        q: '최근 관심을 가지고 있는건 \n무엇인가요?', 
        a: '캔버스라는 HTML 태그를 사용하여 \n개발하는 것에 푹 빠져있어요' 
    },
]
questions = questions.map((question, idx) => {
    const sign = Math.random() > 0.5 ? 1 : -1
    const modI = idx % 4
    posX = idx * 300 + Math.random() * 100 * sign
    posY = skyHeight + modI * 250 + Math.random() * 100
    
    return question = {...question, posX, posY}
})

let portalIncrease = 0

const urlBox = {
    kinder : {
        browser : 'https://kindermoumi-browser.vercel.app/',
        github : 'https://github.com/pukkok/kindermoumi'
    }
}

// 이미지 관리
const cloudImage = new Image()
cloudImage.src = './public/text-cloud2.png'

const teriormon = new Image()
teriormon.src = './public/teriormon.png'

const sleepRabbit = new Image()
sleepRabbit.src = './public/sleep-rabbit.png'

const thoughtCloud = new Image()
thoughtCloud.src = './public/thought-cloud.png'

cloudImage.onload = function() {
    // drawMap 함수에서 이미지 사용
}

window.addEventListener('click', () => {
    console.log(cameraX, cameraY)
})