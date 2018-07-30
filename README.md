## KUKU盒子组件使用文档
## KUKU盒子组件功能介绍
1. 在游戏内部放置一个KUKU盒子图标，图标大小可自定义且可拖动；
3. KUKU盒子图标位置在游戏内可记忆，用户下次打开游戏，位置在最后一次拖动的位置；
4. 点击KUKU盒子图标，可进入KUKU盒子定制化更多游戏（根据appid来定制专属的游戏列表，前提是已经关联了KUKU盒子小程序，未关联请使用APPID：wxb7cc2a59211205c6关联，并通知我方接受关联）
5. 两行代码搞定接入

## 加入KUKU盒子组件工程示例介绍（微信官方辅助小游戏）
```
./images
├── kuku_icon.png                          // KUKU游戏盒子的ICON
./js
├── base                                   // 定义游戏开发基础类
│   ├── animatoin.js                       // 帧动画的简易实现
│   ├── pool.js                            // 对象池的简易实现
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── npc
│   └── enemy.js                           // 敌机类
├── player
│   ├── bullet.js                          // 子弹类
│   └── index.js                           // 玩家类
├── runtime
│   ├── background.js                      // 背景类
│   ├── gameinfo.js                        // 用于展示分数和结算界面
│   └── music.js                           // 全局音效管理器
|── kuku
│   ├── kuku.js                            // KUKU盒子更多游戏！！！
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

```
# 接入步骤
## 第一步 下载/kuku/kuku.js
请下载KUKU盒子组件JS到你的游戏工程js目录，并在使用的地方引入JS文件
> import KUKU from './kuku/kuku'

## 第二步 下载/images/kuku_icon.png
请下载KUKU盒子图标资源到你的游戏工程images目录

## 第三步 两行代码搞定KUKU盒子组件接入
### 第一行代码 this.KUKU = new KUKU(30, 'wxb7cc2a59211205c6')
> 在启动游戏的地方实例化KUKU盒子，以微信辅助小游戏示例为例，则在下面代码块实例化KUKU盒子对象

```
import KUKU from './kuku/kuku'
省略...
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0

    this.restart()
  }

  restart() {
        databus.reset()
    
        canvas.removeEventListener(
          'touchstart',
          this.touchHandler
        )
    
        this.bg = new BackGround(ctx)
        this.player = new Player(ctx)
        this.gameinfo = new GameInfo()
        this.music = new Music()
>         //在此处示例话KUKU盒子对象
>         //第一个参数：图片Size，宽高等同，单位PX
>         //第二个参数：你的游戏APPID，用以调起你的专属更多游戏列表以及统计使用
>         this.KUKU = new KUKU(30, 'wxb7cc2a59211205c6')

    省略...
```
### 第二行代码 this.KUKU.update(ctx)
> 在游戏画面更新render的地方调用KUKU盒子的更新方法，以微信辅助小游戏示例为例，则在render最后方法加上KUKU盒子的更新方法


```
    省略...
    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        this.bg.render(ctx)
    
        databus.bullets
          .concat(databus.enemys)
          .forEach((item) => {
            item.drawToCanvas(ctx)
          })
    
        this.player.drawToCanvas(ctx)
    
        databus.animations.forEach((ani) => {
          if (ani.isPlaying) {
            ani.aniRender(ctx)
          }
        })
    
        this.gameinfo.renderGameScore(ctx, databus.score)
    
        // 游戏结束停止帧循环
        if (databus.gameOver) {
          this.gameinfo.renderGameOver(ctx, databus.score)
    
          if (!this.hasEventBind) {
            this.hasEventBind = true
            this.touchHandler = this.touchEventHandler.bind(this)
            canvas.addEventListener('touchstart', this.touchHandler)
          }
        }
>         //此处调用KUKU盒子的更新方法，实现图标拖动
>         //ctx为你的游戏绘制画布对象
>         this.KUKU.update(ctx)
  }
  省略...
```

## 注意
此文档以微信官方辅助小游戏作为接入示例，如在实际接入过程中存在疑问，请联系（QQ：157085863 Email：wenxy@aiyinli.cn） 
