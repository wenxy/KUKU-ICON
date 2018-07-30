const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const KUKU_ICON = 'images/kuku_icon_2x.png'
const PATH = '/pages/kuku2/gameList'
export default class KUKU {
  constructor(size, appid) {
    this.img = new Image()
    this.img.src = KUKU_ICON

    this.width = size
    this.height = size

    var hisLocation = wx.getStorageSync('kuku-location') || { x: 10, y: screenHeight - this.height - 10}
    console.log('hisLocation', hisLocation)
    this.x = hisLocation.x
    this.y = hisLocation.y

    this.visible = true
    this.touched = false
    if (!appid) {
      console.log('KUKU参数错误，请填写正确的appid')
      return
    }
    this.appid = appid
    this.initEvent()
  }
  update(ctx) {
    if (!this.visible)
      return
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      this.oldx = x
      this.oldy = y
      //console.log('kuku touch start.', x, y)
      if (x > this.x && x < this.x + this.width
        && y > this.y && y < this.y + this.height
      ) {
        this.touched = true
      }
    }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if (this.touched) {
        this.x = x
        this.y = y
        if (x < screenWidth / 2) {
          this.x = 10
        }
        if (x > screenWidth / 2) {
          this.x = screenWidth - this.width - 10
        }

        if (y < 10) {
          this.y = 10
        }
        if (y > screenHeight - this.height - 10) {
          this.y = screenHeight - this.height - 10
        }

      }
    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
      //console.log('oldx',this.oldx,'oldy',this.oldy,'x',this.x,'y',this.y)
      if (this.touched
        && Math.abs(this.x - this.oldx) < this.width
        && Math.abs(this.y - this.oldy) < this.height
      ) {
        //执行跳转到更多游戏小程序
        console.log('执行跳转到更多游戏小程序...')
        wx.navigateToMiniProgram({
          appId: this.appid,
          path: PATH + '?appid=' + this.appid
        })
      }else{//存储上一次的位置
          wx.setStorageSync('kuku-location', {x:this.x,y:this.y})
      }
      this.touched = false
    }).bind(this))
  }
}