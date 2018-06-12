# Arena-rn 项目，归属于Arena体系/平台.

## 对外: rn 的微应用如何开发

#0、 开发微应用 快速设置：
# 0.1、 工程根目录 运行 npm install
# 0.2、 工程根目录 运行 npm start -- --reset-cache
# 0.3、 打开本地 android/ios 模拟器，启动成功后 
# 0.4、 工程根目录 运行 react-native run-android/run-ios，成功启动本地App应用；
# 0.5、 按照如下的(一 中的 2开发某个微应用)开发完成后，工程根目录 运行 npm publish-dev/prod (开发测试/生产) 可打包推送到 Arena 管理平台，升级对应的微应用刚打包的版本即可；


一、 功能简介：
1、 概要：
Arena-rn 本工程为开发 App 的 rn 工程；
首先，科普几个专业名词:  微应用，门牌号，子页面，子路由；
微应用： 按照业务需要，把以前的模块拆分成/组合成一个比较 独立的 应用；
门牌号： 微应用 的名字／微应用的路由；
子页面： 某个微应用内部的某个页面；
子路由： 子页面的路由；

2、 功能块儿说明：
2.1、 微应用开发：

2.1.1、新建工程： Arena 管理平台 -- 设置 -- 工程新增，新建一个工程（例如 C端App）；
2.1.2、新建模块： Arena 管理平台 -- 设置 -- 模块新增，在上述的工程中新建 一个模块（例如 订单）；
2.1.3、新建路由： Arena 管理平台 -- 路由管理 -- 选一个 -- 新建路由至本模块， 需要需求开发者 填写： 这个微应用的名称，详情描述，门牌号(微应用路由名称)；
               提交后，鼠标悬浮在更多按钮上(点更多进去是查看该微应用的所有版本)，会出现 "删除，编辑，获取配置" 的三选一 菜单，点击获取配置，在弹出的选择
               实现方式有h5、rn两种方式，点击确定会得到 该微应用的 打包配置，如下：
               
               "name":"My",
               "entry":"",
               "rid":102,
               "scheme":"H5",
               "title":"我的主页",
               "versionDescription":"我的主页"
               
               以标准 JSON 状态，粘贴到 工程 根目录的 routes.json(存放的是json数组) 文件中；

2.1.4、在本地IDE工具中新建一个工程，例如 arena-rn 工程： 具体要开发的页面，在arena-rn/apps/src/views/新建自己的微应用(模块)；


2.2、 打包操作：
打生产、开发 包 两类：
生产：npm run publish-prod
开发：npm run publish-dev

2.2.1、 打包思路：
把 所有的微应用 分别 打包到 android，iOS 的bundle文件中，只把本地的js文件打入包中，其他的资源如图片文件等不会被打入(图片文件的处理如下的 四、图标库的应用 中有详细描述)；
然后把打好的 android，ios bundle包 上传到 阿里云 bm-oss/arena/arenaprod/arenadev/arenarn/ xxx你的工程名/ 目录下

2.2.2、 打包步骤：

    // 0.获取环境信息： dev|prod 同时要在工程根目录的 package.json 文件中 修改version；

    // 1.获取版本号： 本次打包的版本号，生产环境的包必须要加上 -RELEASE 的后缀；

    // 2.生成 bundles，build-js 文件夹 

    // 3.获取 routes： 获取工程根目录下 routes.json 文件中所有路由；

    // 4.组装路由 map： 遍历 上面的routes，形成 {"Home": "Home" ...} 这种json 数据；
    
    // 5.生成 ios.js 文件 ： 生成 xxx.iOS.js 文件

    // 6.生成 android.js 文件

    // 7.生成 bundle 文件 ： 生成android，iOS bundle 文件；

    // 8.publish ： 通知Arena管理平台，入库最新的版本信息；

    // 9.删除 bundles，build-js 文件夹 ： 打包、发布完 之后，删除本地缓存的文件夹信息；

2.2.3、 打包后升级：
    打好包之后，就可以在Arena 管理平台上，对某些微应用进行版本升级；

2.3、 对接 宿主：
2.3.1、 对接 android 宿主；
Arena平台部署好之后，直接启动 android 宿主项目；

2.3.1、 对接 iOS 宿主；
Arena平台部署好之后，直接启动 iOS 宿主项目；

二、 开发流程： ****
1、 日常需求开发；

三、 联调实测：
1、 rn - android 宿主
2、 rn - ios 宿主

测试案例：
1.1、 rn A 微应用 -->> B 应用；
1.2、 rn A 微应用 -->> B 应用的下级页面；
1.3、 rn A 微应用 -->> H5 A 应用；
1.4、 调用 宿主 提供的接口(获取当前位置，导航，支付，二维码扫描。。。)；

任意场景都可以尝试测试等等。。。


四、 图标库的应用(http://www.iconfont.cn) ：
1、 what 阿里对外部开放的，用于存放各种图标的库，可以直接运用公网上其他小伙伴贡献上传的；(了解参看 http://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.12&helptype=about)
2、 why 方便，易用，维护简单，只要会登录淘宝购物的新青年都能玩儿的溜；不只是图标库，多种优秀资源、想法 的汇集地 和 PK平台，可以直接改掉不好的公共资源；
3、 how 
3.1、 先注册一个 iconfont 官网的用户，有gitHub 的直接授权，跳过。。。
3.2、 新建自己的项目(AreanTest)： 图标管理-我的项目-新建项目；
3.3、 图标库 里有各种 开发者贡献的图标，可以直接收藏，添加到自己的项目里面；
3.5、 具体使用： 比如页面展示一个 微信图标(/opt/idea2017_projects_1/arena-rn/apps/src/views/components/bm-icon 中封装一个组件)： 

<BMIcon color={MainStyle.color.assit2} name={'weixin'} size={MainStyle.font.size.size24} style={''}/>

五、 字体库新玩法， 上面的 四 可以废除掉：
直接 封装 BMIcon 组件(包装下 react-native 的 Text 组件，扩展一个style的属性： style.fontFamily = "iconfont"，而后直接展示 String.fromCharCode )；


### 友盟统计
**高能预警：**凡是需要统计的按钮，只能使用modules/button组件，且需要传入**eventId**和**eventData**属性。

eventId和eventData的内容 由产品经理提供，不能自己定义。切记!
	