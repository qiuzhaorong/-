//=============================================================================
// Yanfly Engine Plugins - Core Engine
// YEP_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CoreEngine = true;

var Yanfly = Yanfly || {};
Yanfly.Core = Yanfly.Core || {};
Yanfly.Core.version = 1.32;

//=============================================================================
/*:
 * @plugindesc YEP基础核心引擎[v1.32]
 * @author Yanfly Engine Plugins
 *
 * @param ---Screen---
 * @text --- 屏幕设置 ---
 * @default
 *
 * @param Screen Width
 * @text 屏幕宽度
 * @parent ---Screen---
 * @type number
 * @min 0
 * @desc 调整屏幕的宽度
 * Default: 816
 * @default 816
 *
 * @param Screen Height
 * @text 屏幕高度
 * @parent ---Screen---
 * @type number
 * @min 0
 * @desc 调整屏幕的高度
 * Default: 624
 * @default 624
 *
 * @param Scale Battlebacks
 * @text 缩放战斗背景
 * @parent ---Screen---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 你希望将战斗背景缩放到对应分辨率吗
 * @default true
 *
 * @param Scale Title
 * @text 缩放标题画面
 * @parent ---Screen---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 你希望将标题画面缩放到对应分辨率吗
 * @default true
 *
 * @param Scale Game Over
 * @text 缩放游戏结束画面
 * @parent ---Screen---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 你希望将游戏结束画面缩放到对应分辨率吗？
 * @default true
 *
 * @param Open Console
 * @text 打开控制台
 * @parent ---Screen---
 * @type boolean
 * @on 打开
 * @off 不打开
 * @desc 出于测试和调试目的，这会打开控制台
 * @default false
 *
 * @param Reposition Battlers
 * @text 重新定位战斗者
 * @parent ---Screen---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 允许插件根据分辨率重新定位战斗者
 * @default true
 *
 * @param GameFont Load Timer
 * @text 游戏字体加载延时
 * @parent ---Screen---
 * @type number
 * @min 0
 * @desc 这允许你设置加载游戏字体的计时器
 设置为 0 表示无限制时间。默认值: 20000
 * @default 0
 *
 * @param Update Real Scale
 * @text 更新实际缩放
 * @parent ---Screen---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 目前，最好保持默认，
 但它将允许对屏幕拉伸进行实际缩放
 * @default false
 *
 * @param Collection Clear
 * @text 集合清理
 * @parent ---Screen---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 在切换场景时清除主要场景中存储的对象以释放内存
 * @default true
 *
 * @param ---Gold---
 * @text --- 金钱设置 ---
 * @desc
 *
 * @param Gold Max
 * @text 最大金钱
 * @parent ---Gold---
 * @type number
 * @min 1
 * @desc 玩家可以拥有的最大金钱数量
 * Default: 99999999
 * @default 99999999
 *
 * @param Gold Font Size
 * @text 金钱字体大小
 * @parent ---Gold---
 * @type number
 * @min 1
 * @desc 用于显示金钱的字体大小
 * Default: 28
 * @default 20
 *
 * @param Gold Icon
 * @text 金钱图标
 * @parent ---Gold---
 * @type number
 * @min 0
 * @desc 这将是在金钱窗口中用于表示金钱的图标。
 如果设为 0，则不显示任何图标
 * @default 313
 *
 * @param Gold Overlap
 * @text 金钱溢出显示
 * @parent ---Gold---
 * @desc 当金钱数量超过分配区域的内容大小时，将显示此内容
 * @default 超出上限
 *
 * @param ---Items---
 * @text --- 物品设置 ---
 * @desc
 *
 * @param Default Max
 * @text 默认最大数量
 * @parent ---Items---
 * @type number
 * @min 1
 * @desc 这是玩家可以持有的每个物品的最大数量
 * Default: 99
 * @default 99
 *
 * @param Quantity Text Size
 * @text 数量文本大小
 * @parent ---Items---
 * @type number
 * @min 1
 * @desc 用于物品数量的文本字体大小
 * Default: 28
 * @default 20
 *
 * @param ---Parameters---
 * @text --- 参数设置 ---
 * @default
 *
 * @param Max Level
 * @text 最大等级
 * @parent ---Parameters---
 * @type number
 * @min 1
 * @desc 调整角色的最大等级限制
 * Default: 99
 * @default 99
 *
 * @param Actor MaxHP
 * @text 角色最大 HP
 * @parent ---Parameters---
 * @type number
 * @min 1
 * @desc 调整角色的最大 HP 限制
 * Default: 9999
 * @default 9999
 *
 * @param Actor MaxMP
 * @text 角色最大 MP
 * @parent ---Parameters---
 * @type number
 * @min 0
 * @desc 调整角色的最大 MP 限制
 * Default: 9999
 * @default 9999
 *
 * @param Actor Parameter
 * @text 角色属性上限
 * @parent ---Parameters---
 * @type number
 * @min 1
 * @desc 调整角色的参数上限
 * Default: 999
 * @default 999
 *
 * @param Enemy MaxHP
 * @text 敌人最大 HP
 * @parent ---Parameters---
 * @type number
 * @min 1
 * @desc 调整敌人的最大 HP 限制
 * Default: 999999
 * @default 999999
 *
 * @param Enemy MaxMP
 * @text 敌人最大 MP
 * @parent ---Parameters---
 * @type number
 * @min 0
 * @desc 调整敌人的最大 MP 限制
 * Default: 9999
 * @default 9999
 *
 * @param Enemy Parameter
 * @text 敌人属性上限
 * @parent ---Parameters---
 * @type number
 * @min 1
 * @desc 调整敌人的参数上限
 * Default: 999
 * @default 999
 *
 * @param ---Battle---
 * @text --- 战斗设置 ---
 * @desc
 *
 * @param Animation Rate
 * @text 动画速度
 * @parent ---Battle---
 * @type number
 * @min 1
 * @desc 调整战斗动画的速度。数值越小速度越快
 * Default: 4
 * @default 4
 *
 * @param Flash Target
 * @text 目标闪烁
 * @parent ---Battle---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 如果敌人被瞄准，它会闪烁还是变白
 * @default false
 *
 * @param Show Events Transition
 * @text 显示事件过渡
 * @parent ---Battle---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 在战斗过渡期间显示事件吗
 * @default true
 *
 * @param Show Events Snapshot
 * @text 显示事件快照
 * @parent ---Battle---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 为战斗背景快照显示事件吗？
 * @default true
 *
 * @param ---Map Optimization---
 * @text  --- 地图优化 ---
 * @desc
 *
 * @param Refresh Update HP
 * @text 刷新更新 HP
 * @parent ---Map Optimization---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 在地图上更新 HP 时进行完整的角色刷新吗？
 * @default true
 *
 * @param Refresh Update MP
 * @text 刷新更新 MP
 * @parent ---Map Optimization---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 在地图上更新 MP 时进行完整的角色刷新吗
 * @default true
 *
 * @param Refresh Update TP
 * @text 刷新更新 TP
 * @parent ---Map Optimization---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 在地图上更新 TP 时进行完整的角色刷新吗
 * @default false
 *
 * @param ---Font---
 * @text --- 字体设置 ---
 * @desc
 *
 * @param Chinese Font
 * @text 中文字体
 * @parent ---Font---
 * @desc 中文 RPG 游戏使用的默认字体
 * Default: SimHei, Heiti TC, sans-serif
 * @default SimHei, Heiti TC, sans-serif
 *
 * @param Korean Font
 * @text 韩文字体
 * @parent ---Font---
 * @desc 韩文 RPG 游戏使用的默认字体
 * Default: Dotum, AppleGothic, sans-serif
 * @default Dotum, AppleGothic, sans-serif
 *
 * @param Default Font
 * @text 默认字体
 * @parent ---Font---
 * @desc 用于其他所有内容的默认字体
 * Default: GameFont
 * @default GameFont, Verdana, Arial, Courier New
 *
 * @param Font Size
 * @text 字体大小
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc 窗口使用的默认字体大小
 * Default: 28
 * @default 28
 *
 * @param Text Align
 * @text 文本对齐方式
 * @parent ---Font---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 命令窗口的文本对齐方式
 * 左对齐 居中对齐 右对齐
 * @default left
 *
 * @param ---Windows---
 * @text --- 窗口设置 ---
 * @default
 *
 * @param Digit Grouping
 * @text 数字分组
 * @parent ---Windows---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 用逗号将数字分组
 * @default true
 *
 * @param Line Height
 * @text 行高
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 调整窗口中通用的行高
 * Default: 36
 * @default 36
 *
 * @param Icon Width
 * @text 图标宽度
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 调整图标的宽度
 * Default: 32
 * @default 32
 *
 * @param Icon Height
 * @text 图标高度
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 调整图标的高度
 * Default: 32
 * @default 32
 *
 * @param Face Width
 * @text 头像宽度
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 调整角色头像的宽度
 * Default: 144
 * @default 144
 *
 * @param Face Height
 * @text 头像高度
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 调整角色头像的高度
 * Default: 144
 * @default 144
 *
 * @param Window Padding
 * @text  窗口内边距
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 调整所有标准窗口的内边距
 * Default: 18
 * @default 18
 *
 * @param Text Padding
 * @text 文本内边距
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 调整窗口中文本的内边距
 * Default: 6
 * @default 6
 *
 * @param Window Opacity
 * @text 窗口不透明度
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 调整窗口背景的不透明度
 * @default 192
 *
 * @param Gauge Outline
 * @text 计量条轮廓
 * @parent ---Windows---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 启用计量条的轮廓
 * @default true
 *
 * @param Gauge Height
 * @text 计量条高度
 * @parent ---Windows---
 * @type number
 * @min 0
 * @desc 设置计量条的高度
 * Default: 6
 * @default 18
 *
 * @param Menu TP Bar
 * @text 菜单 TP 条
 * @parent ---Windows---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在菜单状态中为角色绘制 TP 条
 * @default true
 *
 * @param ---Window Colors---
 * @text --- 窗口颜色 ---
 * @default
 *
 * @param Color: Normal
 * @text 颜色：正常
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 0
 * @default 0
 *
 * @param Color: System
 * @text 颜色：系统
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 16
 * @default 16
 *
 * @param Color: Crisis
 * @text 颜色：危机
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 17
 * @default 17
 *
 * @param Color: Death
 * @text 颜色：死亡
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 18
 * @default 18
 *
 * @param Color: Gauge Back
 * @text 颜色：计量条背景
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 19
 * @default 19
 *
 * @param Color: HP Gauge 1
 * @text 颜色：HP 计量条 1
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 20
 * @default 20
 *
 * @param Color: HP Gauge 2
 * @text 颜色：HP 计量条 2
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 21
 * @default 21
 *
 * @param Color: MP Gauge 1
 * @text  颜色：MP 计量条 1
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 22
 * @default 22
 *
 * @param Color: MP Gauge 2
 * @text MP 计量条 2
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 23
 * @default 23
 *
 * @param Color: MP Cost
 * @text MP 消耗
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 23
 * @default 23
 *
 * @param Color: Power Up
 * @text 能力提升
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 24
 * @default 24
 *
 * @param Color: Power Down
 * @text 能力下降
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 25
 * @default 25
 *
 * @param Color: TP Gauge 1
 * @text TP 计量条 1
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 28
 * @default 28
 *
 * @param Color: TP Gauge 2
 * @text TP 计量条 2
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 29
 * @default 29
 *
 * @param Color: TP Cost Color
 * @text TP 消耗颜色
 * @parent ---Window Colors---
 * @type number
 * @min 0
 * @max 31
 * @desc 更改窗口的文本颜色
 * Default: 29
 * @default 29
 *
 * @help
 * ============================================================================
 * 介绍和说明
 * ============================================================================
 *
 * Yanfly Engine Plugins - Core Engine is made for RPG Maker MV. This plugin
 * functions primarily to fix bugs and to allow the user more control over RPG
 * Maker MV's various features, such as the screen resolution, font, window
 * colors, and more.
   Yanfly 引擎插件 - 核心引擎是为 RPG 制作大师 MV 制作的。
   这个插件主要用于修复错误，并允许用户更好地控制 RPG 制作大师 MV 的各种功能，
   如屏幕分辨率、字体、窗口颜色等
 *
 
 * Just place this on top of all the other Yanfly Engine Plugins.
 * Adjust any parameters as you see fit.
 * 只需将此插件放在所有其他 Yanfly 引擎插件的上方。根据需要调整任何参数
 * ============================================================================
 * 错误修复
 * ============================================================================
 *
 * 这个插件修复了 RPG 制作大师 MV 中存在的一些错误。其中包括：
 *
   动画叠加
   当一个技能 / 物品使用全屏动画同时瞄准多个敌人时，它会多次叠加，
   导致图像因一系列叠加效果而看起来失真。该插件通过只在敌人组上播
   放一次动画而不是每个敌人都播放来修复此问题。
   
   
   音频音量叠加
   有时，当多个音效在同一帧以完全相同的设置播放时（通常是由于动画）
   音量会相互叠加，导致它们无法以预期的音量播放效果。
   这个插件通过防止相同设置的音效在同一帧播放来修复此问题，
   只允许第一个音效播放而不会使音量叠加得更高。
   
   
   事件移动速度
   由于源代码中的一个小错误，事件的移动速度比应有的略慢。该插件修复了此问题，
   使它们以适当的速度移动。
   
   
   事件移动队列
   如果一个事件通过事件命令移动，改变一个条件会使事件切换到不同的页面，
   这会导致该事件的移动路线中途停止。该插件修复了此问题，事件的移动路线将完成
   
   
   事件碰撞
   事件不能在具有 “在玩家下方” 设置的其他事件上移动。这使得某些类型的谜题或事件
   难以存在。这个插件通过使碰撞检查只适用于 “与角色相同” 优先级的事件来修复此问题
   任何在角色上方或下方的事件将不再与其他事件碰撞。
   
   
   屏幕撕裂
   当缓慢移动时，屏幕上的 tiles 会撕裂。虽然并非在所有系统上都明显，但较慢的计算机
   肯定会显示出来。该插件将修复此问题，并使 tiles 与屏幕相机的移动速度同步
   
   
   精灵失真
   由于 JavaScript 奇怪的数学行为，有时带有小数位的值会导致精灵表看起来失真
   该插件将去除小数位，并通过仅使用整数值使精灵表正确取出帧
   
   
  ============================================================================
  金钱
  ============================================================================
   你可以使用插件命令添加或移除超过编辑器 9,999,999 限制的金钱。
   你也可以在物品、武器和防具中放置注释标签来超过 999,999 的成本限制

 *
  插件命令：
  GainGold 1234567890 # 队伍获得 1234567890 金钱
  LoseGold 9876543210 # 队伍失去 9876543210 金钱
 *

 *
物品、武器、防具注释标签
<Price: x>
将物品的价格更改为 x。此注释标签允许你绕过编辑器 999,999 金钱成本限制


敌人注释标签
<Gold: x>
将敌人的金钱掉落值更改为 x。此注释标签允许你绕过编辑器 9,999,999 金钱掉落限制

 *
 * ============================================================================
 * 物品
 * ============================================================================
 *
   更改参数以反映玩家可以持有的每个物品的最大数量。
   如果你希望使个别物品具有不同的最大值，请使用以下注释标签：
 *
物品、武器、防具注释标签：
<Max Item: x>
这将物品的最大数量更改为 x
 *
 * ============================================================================
 * 状态
 * ============================================================================
 *
   即使参数限制提高，编辑器仍然受限于 RPG 制作大师 MV 的默认限制
   要突破它们，请使用以下注释标签，以便更好地控制参数的各个方面
 *
   角色注释标签
<Initial Level: x>
    将角色的初始等级更改为 x。这允许你绕过编辑器的 99 级限制
	
<Max Level: x>
   将角色的最大等级更改为 x。这允许你绕过编辑器的 99 级限制
   
   职业技能学习注释标签
<Learn at Level: x>
   当放置在职业的 “要学习的技能” 注释标签中时，这将使该职业在 x 级学习该技能

   武器和防具注释标签
<stat: +x>
<stat: -x>
   允许武器或防具增加或减少 x 数量的属性。将 “stat” 替换为 “hp”、“mp”、“atk”、
   “def”、“mat”、“mdf”、“agi” 或 “luk” 来改变特定属性。只要最大值允许，
   这允许装备突破编辑器的默认限制。
   
   敌人注释标签
<stat: x>
   这将敌人的属性更改为 x 数量。将 “stat” 替换为 “hp”、“mp”、“atk”、“def”、“mat”、
   “mdf”、“agi” 或 “luk” 来改变特定属性。这允许装备突破编辑器的默认限制
<exp: x>
   这将敌人给予的经验值更改为 x 数量
   这允许敌人给予超过编辑器默认 9,999,999 限制的经验值


============================================================================
   脚本调用安全机制
============================================================================

   伤害公式、脚本调用、条件分支和变量事件中的不规则代码将不再使游戏崩溃
   相反，它们只会在测试播放期间强制打开控制台窗口以显示错误
   如果玩家不在测试播放中，游戏将正常继续，不会显示错误
   如果游戏在浏览器中播放，打开控制台窗口仍会显示错误
   
============================================================================
   更新日志
============================================================================
   版本 1.32：
   恢复了 1.24 版本中禁用的屏幕抖动修复。不知何时它又出现了，现在需要去掉
   
   版本 1.31：
   将 Fallen Angel Olivia 的完整错误消息显示添加到核心引擎（当然是经过她允许的）
   修复了关于混合模式和灌木丛深度导致游戏中精灵不能正确混合的错误
   Tab 键不再需要按两次才能触发与 Tab 键相关的输入
   
   版本 1.30：
   修复了音频音效叠加的错误
   优化更新
   
   版本 1.29：
   由于更新到 MV 1.6.1，当错误代码插入到脚本调用或自定义疯狂模式代码段时，
   绕过 isDevToolsOpen () 错误
   
   版本 1.28：
   按 F5 重新加载游戏时，如果开发工具调试控制台已打开，将在重新加载前关闭它。这是因为关闭它重新加载会使游戏加载更快。
   添加了新的插件参数：刷新更新 HP、MP 和 TP
   选择在更改 HP、MP 或 TP 时是否进行完整的角色刷新
   这是为了减少整体地图滞后
   
   版本 1.27：
   为 RPG 制作大师 MV 1.6.0 版本更新：
   修复了由于 ES6 对 === 的不同处理方式，条件分支下使用开关和自开关的脚本调用检查
   
   版本 1.26：
   为 RPG 制作大师 MV 1.6.0 版本更新：
   移除 Scene_Item.update 函数中的破坏性代码
   现在 “打开控制台” 参数在地图加载后或战斗开始后生效
   这是因为在 1.6.0 版本更改后，在其他任何内容加载之前打开控制台会锁定 
   RPG 制作大师的其他方面，使其无法正常加载
   
   版本 1.25：
   为 RPG 制作大师 MV 1.5.0 版本更新
   更新了 “缩放标题” 和 “缩放游戏结束” 以适配 1.5.0
   
   版本 1.24：
   对于 RPG 制作大师 MV 1.3.4 及以上版本，屏幕抖动防止功能现在被阻止
   因为 Pixi4 现在处理这个问题了
   
   版本 1.23：
   对于 RPG 制作大师 MV 1.3.2 及以上版本，“缩放战斗背景” 插件参数现在将以不同的
   格式重新创建战斗背景精灵这是因为使用平铺精灵的战斗背景缩放太不稳定
   战斗背景精灵现在只是普通精灵而不是平铺精灵
   这可能会或可能不会导致与其他更改战斗背景的插件不兼容
   对于 RPG 制作大师 MV 1.3.4 版本，Game_Actor.meetsUsableItemConditions 
   现在更新为返回对原始 Game_BattlerBase 版本的检查，以保持与其他插件的兼容性
   
   版本 1.22：
   添加了 “显示事件过渡” 插件参数。启用此功能将使地图上的事件在战斗过渡期间不再隐藏自己
   添加了 “显示事件快照” 插件参数。启用此功能将在进入战斗时保持事件显示为战斗快照的一部分
   伤害公式、脚本调用、条件分支和变量事件中的不规则代码将不再使游戏崩溃
   相反，它将在测试播放期间强制打开控制台窗口以显示错误
   
   版本 1.21：
   修复了正面视角下战斗背景缩放不能正常工作的错误
   优化更新以保持所有场景的垃圾回收
   
   版本 1.20：
   更改了提高分辨率的功能
   添加了 “更新实际缩放” 插件参数。目前最好保持默认，若后续更新与渲染缩放匹配，可使用此参数
   为 1.3.2 以下版本添加了内存清除功能，以在离开地图场景时释放更多内存
   添加了 “集合清理” 插件参数。如果保持开启，此选项将在切换到不同场景时
   清除 Scene_Map 和 Scene_Battle 的附加子项。这可能会从其他插件添加到这些场景的各种对象中释放
   内存（取决于它们的添加方式），并作为减少内存膨胀的一种手段
   
   版本 1.19：
   为 RPG 制作大师 MV 1.3.2 版本更新
   修复了如果一件装备临时添加了一个技能，角色的 “LearnSkill” 函数不会被绕过的问题
   
   版本 1.18：
   修复了正面视角下战斗背景缩放不能正常工作的错误
   
   版本 1.17：
   为 RPG 制作大师 MV 1.3.0 版本更新
   
   版本 1.16：
   修复了 RPG 制作大师 MV 固有的 “drawTextEx” 函数的错误
   默认情况下，它计算文本高度，然后在绘制文本之前重置字体设置，
   如果要匹配计算的高度设置，这会使文本高度不一致
   
   版本 1.15：
   窗口现在被设置为只有整数的宽度和高度
   它们不再可能有小数值
   这是为了减少由非整数引起的任何和所有裁剪问题
   
   版本 1.14：
   通过在常用函数中用更高效的循环替换更消耗内存的循环
   对 RPG 制作大师 MV 本身进行了优化
   
   版本 1.13：
   为 RPG 制作大师 MV 1.1.0 版本更新
   
   版本 1.12：
   修复了注释标签 <Learn at Level: x> 的错误
   现在，该注释标签同时适用于 <Learn at Level: x> 和 <Learn Level: x>
   
   版本 1.11：
   修复了 MV 源代码中 FaceWidth 使用硬编码的 144 值而不管 “头像宽度” 参数更改的问题
   修复了一个与敌人经验值相关的注释标签不起作用的问题
   更新了战斗者重新定位，使其在进入 - 退出带有行编队的场景时不再冲突
   
   版本 1.10：
   移除了通过 MV 的最新更新应用的 MV 错误修复
   
   版本 1.09：
   更改了状态绘制的最小显示宽度，以适应队伍编队默认值
   
   版本 1.08：
   修复了 MV 源代码中更改职业和保持等级的错误，尽管保持等级的功能已被移除
   
   版本 1.07：
   修复了当窗口不规则缩放时，计量条在奇数间隔绘制的轮廓比正常厚的问题
   
   版本 1.06：
   移除了事件频率错误修复，因为它现在已包含在源代码中
   
   版本 1.05：
   在插件设置中添加了 “缩放游戏结束” 参数
   
   版本 1.04：
   重新设计了计算缩放战斗背景位置的数学方法
   
   修复了如果队伍从战斗中逃跑失败，本应在战斗中移除的状态仍然被移除的错误。由 Emjenoeg 修复
   
   版本 1.03：
   修复了一个奇怪的错误，使缩放的战斗背景在一场战斗后发生偏移
   
   版本 1.02：
   修复了移动设备上屏幕淡入淡出工作不正确的错误
   添加了 “缩放战斗背景” 和 “缩放标题” 参数
   
   版本 1.01：
   修复了如果按钮精灵有不同的锚点，它们不能被正确点击的错误。由 Zalerinian 修复
   
   版本 1.00：
   插件完成！
*/
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_CoreEngine');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.ScreenWidth  = Number(Yanfly.Parameters['Screen Width'] || 816);
Yanfly.Param.ScreenHeight = Number(Yanfly.Parameters['Screen Height'] || 624);
Yanfly.Param.ScaleBattleback = String(Yanfly.Parameters['Scale Battlebacks']);
Yanfly.Param.ScaleBattleback = eval(Yanfly.Param.ScaleBattleback);
Yanfly.Param.ScaleTitle = eval(String(Yanfly.Parameters['Scale Title']));
Yanfly.Param.ScaleGameOver = eval(String(Yanfly.Parameters['Scale Game Over']));
Yanfly.Param.OpenConsole = String(Yanfly.Parameters['Open Console']);
Yanfly.Param.OpenConsole = eval(Yanfly.Param.OpenConsole);
Yanfly.Param.ReposBattlers = String(Yanfly.Parameters['Reposition Battlers']);
Yanfly.Param.ReposBattlers = eval(Yanfly.Param.ReposBattlers);
Yanfly.Param.GameFontTimer = Number(Yanfly.Parameters['GameFont Load Timer']);
Yanfly.Param.UpdateRealScale = String(Yanfly.Parameters['Update Real Scale']);
Yanfly.Param.UpdateRealScale = eval(Yanfly.Param.UpdateRealScale);
Yanfly.Param.CollectionClear = String(Yanfly.Parameters['Collection Clear']);
Yanfly.Param.CollectionClear = eval(Yanfly.Param.CollectionClear);

Yanfly.Param.MaxGold = String(Yanfly.Parameters['Gold Max']);
Yanfly.Param.GoldFontSize = Number(Yanfly.Parameters['Gold Font Size']);
Yanfly.Icon.Gold = Number(Yanfly.Parameters['Gold Icon']);
Yanfly.Param.GoldOverlap = String(Yanfly.Parameters['Gold Overlap']);

Yanfly.Param.MaxItem = Number(Yanfly.Parameters['Default Max']);
Yanfly.Param.ItemQuantitySize = Number(Yanfly.Parameters['Quantity Text Size']);

Yanfly.Param.MaxLevel = Number(Yanfly.Parameters['Max Level']);
Yanfly.Param.EnemyMaxHp = Number(Yanfly.Parameters['Enemy MaxHP']);
Yanfly.Param.EnemyMaxMp = Number(Yanfly.Parameters['Enemy MaxMP']);
Yanfly.Param.EnemyParam = Number(Yanfly.Parameters['Enemy Parameter']);
Yanfly.Param.ActorMaxHp = Number(Yanfly.Parameters['Actor MaxHP']);
Yanfly.Param.ActorMaxMp = Number(Yanfly.Parameters['Actor MaxMP']);
Yanfly.Param.ActorParam = Number(Yanfly.Parameters['Actor Parameter']);

Yanfly.Param.AnimationRate = Number(Yanfly.Parameters['Animation Rate']);
Yanfly.Param.FlashTarget = eval(String(Yanfly.Parameters['Flash Target']));
Yanfly.Param.ShowEvTrans = String(Yanfly.Parameters['Show Events Transition']);
Yanfly.Param.ShowEvTrans = eval(Yanfly.Param.ShowEvTrans);
Yanfly.Param.ShowEvSnap = String(Yanfly.Parameters['Show Events Snapshot']);
Yanfly.Param.ShowEvSnap = eval(Yanfly.Param.ShowEvSnap);

Yanfly.Param.RefreshUpdateHp = String(Yanfly.Parameters['Refresh Update HP']);
Yanfly.Param.RefreshUpdateHp = eval(Yanfly.Param.RefreshUpdateHp);
Yanfly.Param.RefreshUpdateMp = String(Yanfly.Parameters['Refresh Update MP']);
Yanfly.Param.RefreshUpdateMp = eval(Yanfly.Param.RefreshUpdateMp);
Yanfly.Param.RefreshUpdateTp = String(Yanfly.Parameters['Refresh Update TP']);
Yanfly.Param.RefreshUpdateTp = eval(Yanfly.Param.RefreshUpdateTp);

Yanfly.Param.ChineseFont = String(Yanfly.Parameters['Chinese Font']);
Yanfly.Param.KoreanFont = String(Yanfly.Parameters['Korean Font']);
Yanfly.Param.DefaultFont = String(Yanfly.Parameters['Default Font']);
Yanfly.Param.FontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.TextAlign = String(Yanfly.Parameters['Text Align']);

Yanfly.Param.DigitGroup = eval(String(Yanfly.Parameters['Digit Grouping']));
Yanfly.Param.LineHeight = Number(Yanfly.Parameters['Line Height']);
Yanfly.Param.IconWidth = Number(Yanfly.Parameters['Icon Width'] || 32);;
Yanfly.Param.IconHeight = Number(Yanfly.Parameters['Icon Height'] || 32);;
Yanfly.Param.FaceWidth = Number(Yanfly.Parameters['Face Width'] || 144);
Yanfly.Param.FaceHeight = Number(Yanfly.Parameters['Face Height'] || 144);
Yanfly.Param.WindowPadding = Number(Yanfly.Parameters['Window Padding']);
Yanfly.Param.TextPadding = Number(Yanfly.Parameters['Text Padding']);
Yanfly.Param.WindowOpacity = Number(Yanfly.Parameters['Window Opacity']);
Yanfly.Param.GaugeOutline = eval(String(Yanfly.Parameters['Gauge Outline']));
Yanfly.Param.GaugeHeight = Number(Yanfly.Parameters['Gauge Height']);
Yanfly.Param.MenuTpGauge = eval(String(Yanfly.Parameters['Menu TP Bar']));

Yanfly.Param.ColorNormal = Number(Yanfly.Parameters['Color: Normal']);
Yanfly.Param.ColorSystem = Number(Yanfly.Parameters['Color: System']);
Yanfly.Param.ColorCrisis = Number(Yanfly.Parameters['Color: Crisis']);
Yanfly.Param.ColorDeath = Number(Yanfly.Parameters['Color: Death']);
Yanfly.Param.ColorGaugeBack = Number(Yanfly.Parameters['Color: Gauge Back']);
Yanfly.Param.ColorHpGauge1 = Number(Yanfly.Parameters['Color: HP Gauge 1']);
Yanfly.Param.ColorHpGauge2 = Number(Yanfly.Parameters['Color: HP Gauge 2']);
Yanfly.Param.ColorMpGauge1 = Number(Yanfly.Parameters['Color: MP Gauge 1']);
Yanfly.Param.ColorMpGauge2 = Number(Yanfly.Parameters['Color: MP Gauge 2']);
Yanfly.Param.ColorMpCost = Number(Yanfly.Parameters['Color: MP Cost']);
Yanfly.Param.ColorPowerUp = Number(Yanfly.Parameters['Color: Power Up']);
Yanfly.Param.ColorPowerDown = Number(Yanfly.Parameters['Color: Power Down']);
Yanfly.Param.ColorTpGauge1 = Number(Yanfly.Parameters['Color: TP Gauge 1']);
Yanfly.Param.ColorTpGauge2 = Number(Yanfly.Parameters['Color: TP Gauge 2']);
Yanfly.Param.ColorTpCost = Number(Yanfly.Parameters['Color: TP Cost Color']);

//=============================================================================
// Bitmap
//=============================================================================

Yanfly.Core.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
  Yanfly.Core.Bitmap_initialize.call(this, width, height);
  this.fontFace = Yanfly.Param.DefaultFont;
};

Yanfly.Core.Bitmap_blt = Bitmap.prototype.blt;
Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    sx = Math.floor(sx);
    sy = Math.floor(sy);
    sw = Math.floor(sw);
    sh = Math.floor(sh);
    dx = Math.floor(dx);
    dy = Math.floor(dy);
    dw = Math.floor(dw);
    dh = Math.floor(dh);
    Yanfly.Core.Bitmap_blt.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
};

Yanfly.Core.Bitmap_fillRect = Bitmap.prototype.fillRect;
Bitmap.prototype.fillRect = function(x, y, w, h, c) {
    x = Math.floor(x);
    y = Math.floor(y);
    w = Math.floor(w);
    h = Math.floor(h);
    Yanfly.Core.Bitmap_fillRect.call(this, x, y, w, h, c);
};

Yanfly.Core.Bitmap_gradientFillRect = Bitmap.prototype.gradientFillRect;
Bitmap.prototype.gradientFillRect = function(x, y, w, h, c1, c2, ve) {
    Yanfly.Core.Bitmap_gradientFillRect.call(this, x, y, w, h, c1, c2, ve);
};

Yanfly.Core.Bitmap_drawCircle = Bitmap.prototype.drawCircle;
Bitmap.prototype.drawCircle = function(x, y, r, c) {
    x = Math.floor(x);
    y = Math.floor(y);
    Yanfly.Core.Bitmap_drawCircle.call(this, x, y, r, c);
};

Yanfly.Core.Bitmap_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function(text, x, y, mW, l, align) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (mW < 0) mW = 0;
    mW = Math.floor(mW);
    l = Math.floor(l);
    Yanfly.Core.Bitmap_drawText.call(this, text, x, y, mW, l, align);
};

//=============================================================================
// Graphics
//=============================================================================

if (Yanfly.Param.UpdateRealScale) {

Graphics._updateRealScale = function() {
  if (this._stretchEnabled) {
    var h = window.innerWidth / this._width;
    var v = window.innerHeight / this._height;
    this._realScale = Math.min(h, v);
    if (this._realScale >= 3) this._realScale = 3;
    else if (this._realScale >= 2) this._realScale = 2;
    else if (this._realScale >= 1.5) this._realScale = 1.5;
    else if (this._realScale >= 1) this._realScale = 1;
    else this._realScale = 0.5;
  } else {
    this._realScale = this._scale;
  }
};

}; // Yanfly.Param.UpdateRealScale

Graphics.printFullError = function(name, message, stack) {
  stack = this.processErrorStackMessage(stack);
  if (this._errorPrinter) {
    this._errorPrinter.innerHTML =
      this._makeFullErrorHtml(name, message, stack);
  }
  this._applyCanvasFilter();
  this._clearUpperCanvas();
};

Graphics._makeFullErrorHtml = function(name, message, stack) {
  var text = '';
  for (var i = 2; i < stack.length; ++i) {
    text += '<font color=white>' + stack[i] + '</font><br>';
  }
  return ('<font color="yellow"><b>' + stack[0] + '</b></font><br>' +
    '<font color="yellow"><b>' + stack[1] + '</b></font><br>' + text);
};

Graphics.processErrorStackMessage = function(stack)  {
  var data = stack.split(/(?:\r\n|\r|\n)/);
  data.unshift('Game has encountered a bug. Please report it.<br>');
  for (var i = 1; i < data.length; ++i) {
    data[i] = data[i].replace(/[\(](.*[\/])/, '(');
  }
  data.push('<br><font color="yellow"><b>Press F5 to restart the game.' +
    '</b></font><br>');
  return data;
};

Yanfly.Core.Graphics_updateErrorPrinter = Graphics._updateErrorPrinter;
Graphics._updateErrorPrinter = function() {
  Yanfly.Core.Graphics_updateErrorPrinter.call(this);
  this._errorPrinter.height = this._height * 0.5;
  this._errorPrinter.style.textAlign = 'left';
  this._centerElement(this._errorPrinter);
};

SceneManager.catchException = function(e) {
  if (e instanceof Error) {
    Graphics.printFullError(e.name, e.message, e.stack);
    console.error(e.stack);
  } else {
    Graphics.printError('UnknownError', e);
  }
  AudioManager.stopAll();
  this.stop();
};

//=============================================================================
// Input
//=============================================================================

Yanfly.Core.Input_shouldPreventDefault = Input._shouldPreventDefault;
Input._shouldPreventDefault = function(keyCode) {
  if (keyCode === 9) return true;
  return Yanfly.Core.Input_shouldPreventDefault.call(this, keyCode);
};

//=============================================================================
// Sprite
//=============================================================================

Yanfly.Core.Sprite_updateTransform = Sprite.prototype.updateTransform;
Sprite.prototype.updateTransform = function() {
  Yanfly.Core.Sprite_updateTransform.call(this);
  this.worldTransform.tx = Math.floor(this.worldTransform.tx);
  this.worldTransform.ty = Math.floor(this.worldTransform.ty);
};

//=============================================================================
// ScreenSprite
//=============================================================================

Yanfly.Core.ScreenSprite_initialize = ScreenSprite.prototype.initialize;
ScreenSprite.prototype.initialize = function() {
  Yanfly.Core.ScreenSprite_initialize.call(this);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.0') return;
  this.scale.x = Graphics.boxWidth * 10;
  this.scale.y = Graphics.boxHeight * 10;
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this.x = 0;
  this.y = 0;
};

//=============================================================================
// Window
//=============================================================================

Yanfly.Core.Window_refreshAllParts = Window.prototype._refreshAllParts;
Window.prototype._refreshAllParts = function() {
  this._roundWhUp();
  Yanfly.Core.Window_refreshAllParts.call(this);
};

Window.prototype._roundWhUp = function() {
  this._width = Math.ceil(this._width);
  this._height = Math.ceil(this._height);
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Core.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Core.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_CoreEngine) {
    this.processCORENotetags1($dataItems);
    this.processCORENotetags1($dataWeapons);
    this.processCORENotetags1($dataArmors);
    this.processCORENotetags2($dataEnemies);
    this.processCORENotetags3($dataActors);
    this.processCORENotetags4($dataClasses);
    Yanfly._loaded_YEP_CoreEngine = true;
  }
  return true;
};

DataManager.processCORENotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.maxItem = Yanfly.Param.MaxItem;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:PRICE):[ ](\d+)>/i)) {
        obj.price = parseInt(RegExp.$1);
      } else if (line.match(/<(?:MAX ITEM):[ ](\d+)>/i)) {
        obj.maxItem = Math.max(1, parseInt(RegExp.$1));
      } else if (line.match(/<(.*):[ ]([\+\-]\d+)>/i)) {
        var stat = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        switch (stat) {
          case 'HP':
          case 'MAXHP':
          case 'MAX HP':
            obj.params[0] = value;
            break;
          case 'MP':
          case 'MAXMP':
          case 'MAX MP':
          case 'SP':
          case 'MAXSP':
          case 'MAX SP':
            obj.params[1] = value;
            break;
          case 'ATK':
          case 'STR':
            obj.params[2] = value;
            break;
          case 'DEF':
            obj.params[3] = value;
            break;
          case 'MAT':
          case 'INT' || 'SPI':
            obj.params[4] = value;
            break;
          case 'MDF':
          case 'RES':
            obj.params[5] = value;
            break;
          case 'AGI':
          case 'SPD':
            obj.params[6] = value;
            break;
          case 'LUK':
            obj.params[7] = value;
            break;
          case 'EXP':
          case 'XP':
            obj.exp = value;
            break;
        }
      }
    }
  }
};

DataManager.processCORENotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:GOLD):[ ](\d+)>/i)) {
        obj.gold = parseInt(RegExp.$1);
      } else if (line.match(/<(.*):[ ](\d+)>/i)) {
        var stat = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        switch (stat) {
          case 'HP':
          case 'MAXHP':
          case 'MAX HP':
            obj.params[0] = value;
            break;
          case 'MP':
          case 'MAXMP':
          case 'MAX MP':
          case 'SP':
          case 'MAXSP':
          case 'MAX SP':
            obj.params[1] = value;
            break;
          case 'ATK':
          case 'STR':
            obj.params[2] = value;
            break;
          case 'DEF':
            obj.params[3] = value;
            break;
          case 'MAT':
          case 'INT':
          case 'SPI':
            obj.params[4] = value;
            break;
          case 'MDF':
          case 'RES':
            obj.params[5] = value;
            break;
          case 'AGI':
          case 'SPD':
            obj.params[6] = value;
            break;
          case 'LUK':
            obj.params[7] = value;
            break;
          case 'EXP':
          case 'XP':
            obj.exp = value;
            break;
        }
      }
    }
  }
};

DataManager.processCORENotetags3 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.maxLevel = Yanfly.Param.MaxLevel;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:MAX LEVEL):[ ](\d+)>/i)) {
        obj.maxLevel = parseInt(RegExp.$1);
        if (obj.maxLevel < 1) obj.maxLevel = 1;
      } else if (line.match(/<(?:INITIAL LEVEL):[ ](\d+)>/i)) {
        obj.initialLevel = parseInt(RegExp.$1);
        if (obj.initialLevel < 1) obj.initialLevel = 1;
      }
    }
  }
};

DataManager.processCORENotetags4 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.learnings.forEach(function(learning) {
      if (learning.note.match(/<(?:LEARN LEVEL|LEARN AT LEVEL):[ ](\d+)>/i)) {
        learning.level = parseInt(RegExp.$1);
        if (learning.level < 1) obj.maxLevel = 1;
      }
    }, this);
  }
};

//=============================================================================
// AudioManager Stacking Volume Bug Fix
//=============================================================================

Yanfly.Core.AudioManager_playSe = AudioManager.playSe;
AudioManager.playSe = function(se) {
    this._frameSe = this._frameSe || [];
    if (this.uniqueCheckSe(se)) {
      Yanfly.Core.AudioManager_playSe.call(this, se);
      this._frameSe.push(se);
    }
};

AudioManager.uniqueCheckSe = function(se1) {
    if (this._frameSe.contains(se1)) return false;
    return true;
};

AudioManager.clearUniqueCheckSe = function() {
    this._frameSe = [];
};

Yanfly.Core.SceneManager_updateInputData = SceneManager.updateInputData;
SceneManager.updateInputData = function() {
    Yanfly.Core.SceneManager_updateInputData.call(this);
    AudioManager.clearUniqueCheckSe();
};

//=============================================================================
// SceneManager
//=============================================================================

SceneManager._screenWidth  = Yanfly.Param.ScreenWidth;
SceneManager._screenHeight = Yanfly.Param.ScreenHeight;
SceneManager._boxWidth     = Yanfly.Param.ScreenWidth;
SceneManager._boxHeight    = Yanfly.Param.ScreenHeight

Yanfly.Core.SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass) {
  Yanfly.Core.SceneManager_run.call(this, sceneClass);
  Yanfly.updateResolution();
  if (!Utils.isNwjs()) return;
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Yanfly.Param.OpenConsole) Yanfly.openConsole();
};

Yanfly.updateResolution = function() {
  var resizeWidth = Yanfly.Param.ScreenWidth - window.innerWidth;
  var resizeHeight = Yanfly.Param.ScreenHeight - window.innerHeight;
  if (!Imported.ScreenResolution) {
    window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
    window.resizeBy(resizeWidth, resizeHeight);
  }
};

Yanfly.openConsole = function() {
  Yanfly._openedConsole = true;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    var _debugWindow = require('nw.gui').Window.get().showDevTools();
    if (_debugWindow) _debugWindow.moveTo(0, 0);
    window.focus();
  }
};

Yanfly.Core.SceneManager_onKeyDown = SceneManager.onKeyDown;
SceneManager.onKeyDown = function(event) {
  if (!event.ctrlKey && !event.altKey && event.keyCode === 116) {
    if (Utils.isNwjs() && Utils.isOptionValid('test')) {
      var win = require('nw.gui').Window.get();
      win.closeDevTools();
    }
  }
  Yanfly.Core.SceneManager_onKeyDown.call(this, event);
};

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") {

Yanfly.openConsole = function() {
  Yanfly._openedConsole = true;
  if (!Yanfly.Param.OpenConsole) return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    var win = require('nw.gui').Window.get();
    win.showDevTools();
    setTimeout(this.focusWindow.bind(this, win), 500);
  }
};

Yanfly.focusWindow = function(win) {
  win.focus();
};

Yanfly.Core.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
  Yanfly.Core.Scene_Map_update.call(this);
  if (!Yanfly._openedConsole) Yanfly.openConsole();
};

Yanfly.Core.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  Yanfly.Core.Scene_Battle_update.call(this);
  if (!Yanfly._openedConsole) Yanfly.openConsole();
};

}; // 1.6.0

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Core.BattleManager_displayStartMessages =
    BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
  Yanfly.Core.BattleManager_displayStartMessages.call(this);
  $gameTroop.members().forEach(function(enemy) {
      enemy.recoverAll();
  });
};

BattleManager.processEscape = function() {
  $gameParty.performEscape();
  SoundManager.playEscape();
  var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
  if (success) {
      $gameParty.removeBattleStates();
      this.displayEscapeSuccessMessage();
      this._escaped = true;
      this.processAbort();
  } else {
      this.displayEscapeFailureMessage();
      this._escapeRatio += 0.1;
      $gameParty.clearActions();
      this.startTurn();
  }
  return success;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.paramMax = function(paramId) {
    if (paramId === 0) {
        return Yanfly.Param.EnemyMaxHp;
    } else if (paramId === 1) {
        return Yanfly.Param.EnemyMaxMp;
    } else {
        return Yanfly.Param.EnemyParam;
    }
};

Yanfly.Core.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;

Game_BattlerBase.prototype.mapRegenUpdateCheck = function(type) {
  if ($gameParty.inBattle()) return true;
  if (type === 'hp') {
    return Yanfly.Param.RefreshUpdateHp;
  } else if (type === 'mp') {
    return Yanfly.Param.RefreshUpdateMp;
  } else if (type === 'tp') {
    return Yanfly.Param.RefreshUpdateTp;
  }
};

Game_BattlerBase.prototype.setHp = function(hp) {
  if (this._hp === hp) return;
  this._hp = hp;
  if (this.mapRegenUpdateCheck('hp')) {
    this.refresh();
  } else {
    Yanfly.Core.Game_BattlerBase_refresh.call(this);
  }
};

Game_BattlerBase.prototype.setMp = function(mp) {
  if (this._mp === mp) return;
  this._mp = mp;
  if (this.mapRegenUpdateCheck('mp')) {
    this.refresh();
  } else {
    Yanfly.Core.Game_BattlerBase_refresh.call(this);
  }
};

Game_BattlerBase.prototype.setTp = function(tp) {
  if (this._tp === tp) return;
  this._tp = tp;
  if (this.mapRegenUpdateCheck('tp')) {
    this.refresh();
  } else {
    Yanfly.Core.Game_BattlerBase_refresh.call(this);
  }
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.onTurnEnd = function() {
  this.clearResult();
  this.regenerateAll();
  this.updateStateTurns();
  this.updateBuffTurns();
  this.removeStatesAuto(2);
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.Core.Game_Actor_isMaxLevel = Game_Actor.prototype.isMaxLevel;
Game_Actor.prototype.isMaxLevel = function() {
    if (this.maxLevel() === 0) return false;
    return Yanfly.Core.Game_Actor_isMaxLevel.call(this);
};

Game_Actor.prototype.paramMax = function(paramId) {
  if (paramId === 0) {
      return Yanfly.Param.ActorMaxHp;
  } else if (paramId === 1) {
      return Yanfly.Param.ActorMaxMp;
  } else {
      return Yanfly.Param.ActorParam;
  }
};

Yanfly.Core.Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
    if (this.level > 99) {
      var i = this.currentClass().params[paramId][99];
      var j = this.currentClass().params[paramId][98];
      i += (i - j) * (this.level - 99);
      return i;
    }
    return Yanfly.Core.Game_Actor_paramBase.call(this, paramId);
};

Game_Actor.prototype.changeClass = function(classId, keepExp) {
    if (keepExp) {
        this._exp[classId] = this._exp[this._classId];
    }
    this._classId = classId;
    this.changeExp(this._exp[this._classId] || 0, false);
    this.refresh();
};

Game_Actor.prototype.learnSkill = function(skillId) {
    if (!this._skills.contains(skillId)) {
        this._skills.push(skillId);
        this._skills.sort(function(a, b) {
            return a - b;
        });
    }
};

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.4') {

Game_Actor.prototype.meetsUsableItemConditions = function(item) {
  if($gameParty.inBattle() && !BattleManager.canEscape() &&
  this.testEscape(item)){
    return false;
  }
  return Game_BattlerBase.prototype.meetsUsableItemConditions.call(this, item);
};

}; // Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.4'

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.maxGold = function() {
    return eval(Yanfly.Param.MaxGold);
};

Game_Party.prototype.maxItems = function(item) {
    if (!item) return 1;
    return item.maxItem;
};

Game_Party.prototype.onPlayerWalk = function() {
    var group = this.members();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var actor = group[i];
      if (actor) actor.onPlayerWalk();
    }
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.isPreventScreenJittering = function() {
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0') return true;
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.4') return false;
  return true;
};

if (Yanfly.isPreventScreenJittering()) {

Game_Map.prototype.displayX = function() {
    return parseFloat(Math.floor(this._displayX *
      this.tileWidth())) / this.tileWidth();
};

Game_Map.prototype.displayY = function() {
    return parseFloat(Math.floor(this._displayY *
      this.tileHeight())) / this.tileHeight();
};

}; // Yanfly.isPreventScreenJittering

Game_Map.prototype.adjustX = function(x) {
    if (this.isLoopHorizontal() && x < this.displayX() -
            (this.width() - this.screenTileX()) / 2) {
        return x - this.displayX() + $dataMap.width;
    } else {
        return x - this.displayX();
    }
};

Game_Map.prototype.adjustY = function(y) {
    if (this.isLoopVertical() && y < this.displayY() -
            (this.height() - this.screenTileY()) / 2) {
        return y - this.displayY() + $dataMap.height;
    } else {
        return y - this.displayY();
    }
};

Game_Map.prototype.updateEvents = function() {
    var group = this.events();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var ev = group[i];
      if (ev) ev.update();
    }
    var group = this._commonEvents;
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var ev = group[i];
      if (ev) ev.update();
    }
};

Game_Map.prototype.updateVehicles = function() {
    var group = this._vehicles;
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var vehicle = group[i];
      if (vehicle) vehicle.update();
    }
};

//=============================================================================
// Game_Character
//=============================================================================

Game_Character.prototype.queueMoveRoute = function(moveRoute) {
    this._originalMoveRoute = moveRoute;
    this._originalMoveRouteIndex = 0;
};

Yanfly.Core.Game_Event_setMoveRoute =
    Game_Event.prototype.setMoveRoute;
Game_Character.prototype.setMoveRoute = function(moveRoute) {
    if (!this._moveRouteForcing) {
        Yanfly.Core.Game_Event_setMoveRoute.call(this, moveRoute);
    } else {
        this.queueMoveRoute(moveRoute);
    }
};

Yanfly.Core.Game_Character_processMoveCommand =
  Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
  var gc = Game_Character;
  var params = command.parameters;
  switch (command.code) {
  case gc.ROUTE_SCRIPT:
    try {
      eval(params[0]);
    } catch (e) {
      Yanfly.Util.displayError(e, params[0], 'MOVE ROUTE SCRIPT ERROR');
    }
    return;
    break;
  }
  return Yanfly.Core.Game_Character_processMoveCommand.call(this, command);
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.isCollidedWithEvents = function(x, y) {
  var events = $gameMap.eventsXyNt(x, y).filter(function(ev) {
    return ev.isNormalPriority();
  });
  if (events.length <= 0) return false;
  return this.isNormalPriority();
};

//=============================================================================
// Game_Screen
//=============================================================================

Game_Screen.prototype.updatePictures = function() {
    var group = this._pictures;
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var picture = group[i];
      if (picture) picture.update();
    }
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.Core.Game_Action_testItemEffect = Game_Action.prototype.testItemEffect;
Game_Action.prototype.testItemEffect = function(target, effect) {
    switch (effect.code) {
    case Game_Action.EFFECT_LEARN_SKILL:
      return target.isActor() && !target._skills.contains(effect.dataId);
    default:
      return Yanfly.Core.Game_Action_testItemEffect.call(this, target, effect);
    }
};

Game_Action.prototype.evalDamageFormula = function(target) {
  var item = this.item();
  var a = this.subject();
  var b = target;
  var v = $gameVariables._data;
  var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
  try {
    var value = Math.max(eval(item.damage.formula), 0) * sign;
    if (isNaN(value)) value = 0;
    return value;
  } catch (e) {
    Yanfly.Util.displayError(e, item.damage.formula, 'DAMAGE FORMULA ERROR');
    return 0;
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// Conditional Branch
Yanfly.Core.Game_Interpreter_command111 =
  Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function() {
  var result = false;
  switch (this._params[0]) {
  case 0: // Switch
    if (this._params[2] === 0) {
      result = $gameSwitches.value(this._params[1]);
    } else {
      result = !$gameSwitches.value(this._params[1]);
    }
    this._branch[this._indent] = result;
    if (this._branch[this._indent] === false) this.skipBranch();
    return true
    break;
  case 2: // Self Switch
    if (this._eventId > 0) {
      var key = [this._mapId, this._eventId, this._params[1]];
      if (this._params[2] === 0) {
        result = $gameSelfSwitches.value(key);
      } else {
        result = !$gameSelfSwitches.value(key);
      }
    }
    this._branch[this._indent] = result;
    if (this._branch[this._indent] === false) this.skipBranch();
    return true
    break;
  case 12:  // Script
    var code = this._params[1];
    try {
      result = !!eval(code);
    } catch (e) {
      result = false;
      Yanfly.Util.displayError(e, code, 'CONDITIONAL BRANCH SCRIPT ERROR');
    }
    this._branch[this._indent] = result;
    if (this._branch[this._indent] === false) this.skipBranch();
    return true
    break;
  }
  return Yanfly.Core.Game_Interpreter_command111.call(this);
};

// Control Variables
Yanfly.Core.Game_Interpreter_command122 =
  Game_Interpreter.prototype.command122;
Game_Interpreter.prototype.command122 = function() {
  switch (this._params[3]) {
  case 4:  // Script
    var value = 0;
    var code = this._params[4];
    try {
      value = eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CONTROL VARIABLE SCRIPT ERROR');
    }
    for (var i = this._params[0]; i <= this._params[1]; i++) {
      this.operateVariable(i, this._params[2], value);
    }
    return true;
    break;
  }
  return Yanfly.Core.Game_Interpreter_command122.call(this);
};

// Script
Game_Interpreter.prototype.command355 = function() {
  var script = this.currentCommand().parameters[0] + '\n';
  while (this.nextEventCode() === 655) {
    this._index++;
    script += this.currentCommand().parameters[0] + '\n';
  }
  try {
    eval(script);
  } catch (e) {
    Yanfly.Util.displayError(e, script, 'SCRIPT CALL ERROR');
  }
  return true;
};

Yanfly.Core.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Core.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'GainGold') {
        $gameParty.gainGold(parseInt(args[0]));
    }
    if (command === 'LoseGold') {
        $gameParty.loseGold(parseInt(args[0]));
    }
};

//=============================================================================
// Scene_Base
//=============================================================================

Scene_Base.prototype.clearChildren = function() {
  while (this.children.length > 0) {
    this.removeChild(this.children[0]);
  }
};

if (Yanfly.Param.CollectionClear) {

Yanfly.Core.Scene_Base_terminate = Scene_Base.prototype.terminate;
Scene_Base.prototype.terminate = function() {
  Yanfly.Core.Scene_Base_terminate.call(this);
  if (this._bypassFirstClear) return;
  this.clearChildren();
};

Yanfly.Core.Scene_Title_terminate = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
  this._bypassFirstClear = true;
  Yanfly.Core.Scene_Title_terminate.call(this);
  this.clearChildren();
};

Yanfly.Core.Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
  this._bypassFirstClear = true;
  Yanfly.Core.Scene_Map_terminate.call(this);
  this.clearChildren();
};

Yanfly.Core.Scene_Battle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
  this._bypassFirstClear = true;
  Yanfly.Core.Scene_Battle_terminate.call(this);
  this.clearChildren();
};

Yanfly.Core.Scene_Options_terminate = Scene_Options.prototype.terminate;
Scene_Options.prototype.terminate = function() {
  this._bypassFirstClear = true;
  Yanfly.Core.Scene_Options_terminate.call(this);
  this.clearChildren();
};

Yanfly.Core.Scene_Load_terminate = Scene_Load.prototype.terminate;
Scene_Load.prototype.terminate = function() {
  this._bypassFirstClear = true;
  Yanfly.Core.Scene_Load_terminate.call(this);
  this.clearChildren();
};

Yanfly.Core.Scene_Gameover_terminate = Scene_Gameover.prototype.terminate;
Scene_Gameover.prototype.terminate = function() {
  this._bypassFirstClear = true;
  Yanfly.Core.Scene_Gameover_terminate.call(this);
  this.clearChildren();
};

}; // Yanfly.Param.CollectionClear

//=============================================================================
// Scene_Boot
//=============================================================================

Scene_Boot.prototype.isGameFontLoaded = function() {
  if (Graphics.isFontLoaded('GameFont')) {
    return true;
  } else if (Yanfly.Param.GameFontTimer <= 0) {
    return false;
  } else {
    var elapsed = Date.now() - this._startDate;
    if (elapsed >= Yanfly.Param.GameFontTimer) {
      throw new Error('Failed to load GameFont');
    } else {
      return false;
    }
  }
};

//=============================================================================
// Scene_Item
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") {

Scene_Item.prototype.update = function() {
  Scene_ItemBase.prototype.update.call(this);
};

}; // Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0"

//=============================================================================
// Scene_Title
//=============================================================================

Yanfly.Core.Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function() {
  Yanfly.Core.Scene_Title_start.call(this);
  if (Yanfly.Param.ScaleTitle) this.rescaleTitle();
};

Scene_Title.prototype.rescaleTitle = function() {
  this.rescaleTitleSprite(this._backSprite1);
  this.rescaleTitleSprite(this._backSprite2);
};

Scene_Title.prototype.rescaleTitleSprite = function(sprite) {
  if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) {
    return setTimeout(this.rescaleTitleSprite.bind(this, sprite), 5);
  }
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight;
  var ratioX = width / sprite.bitmap.width;
  var ratioY = height / sprite.bitmap.height;
  if (ratioX > 1.0) sprite.scale.x = ratioX;
  if (ratioY > 1.0) sprite.scale.y = ratioY;
  this.centerSprite(sprite);
};

//=============================================================================
// Scene_Map
//=============================================================================

if (Yanfly.Param.ShowEvTrans) {

Scene_Map.prototype.startEncounterEffect = function() {
  this._encounterEffectDuration = this.encounterEffectSpeed();
};

}; // Yanfly.Param.ShowEvTrans

Yanfly.Core.Scene_Map_snapForBattleBackground =
  Scene_Map.prototype.snapForBattleBackground;
Scene_Map.prototype.snapForBattleBackground = function() {
  if (!Yanfly.Param.ShowEvSnap) this._spriteset.hideCharacters();
  Yanfly.Core.Scene_Map_snapForBattleBackground.call(this);
  if (Yanfly.Param.ShowEvTrans) this._spriteset.showCharacters();
};

//=============================================================================
// Scene_Gameover
//=============================================================================

Yanfly.Core.Scene_Gameover_start = Scene_Gameover.prototype.start;
Scene_Gameover.prototype.start = function() {
    Yanfly.Core.Scene_Gameover_start.call(this);
    if (Yanfly.Param.ScaleGameOver) this.rescaleBackground();
};

Scene_Gameover.prototype.rescaleBackground = function() {
    this.rescaleImageSprite(this._backSprite);
};

Scene_Gameover.prototype.rescaleImageSprite = function(sprite) {
    if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) {
      return setTimeout(this.rescaleImageSprite.bind(this, sprite), 5);
    }
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var ratioX = width / sprite.bitmap.width;
    var ratioY = height / sprite.bitmap.height;
    if (ratioX > 1.0) sprite.scale.x = ratioX;
    if (ratioY > 1.0) sprite.scale.y = ratioY;
    this.centerSprite(sprite);
};

Scene_Gameover.prototype.centerSprite = function(sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

//=============================================================================
// Sprite_Animation
//=============================================================================

Sprite_Animation.prototype.setupRate = function() {
  this._rate = Yanfly.Param.AnimationRate;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

if (!Yanfly.Param.FlashTarget) {

Yanfly.Core.Sprite_Battler_updateSelectionEffect =
    Sprite_Battler.prototype.updateSelectionEffect;
Sprite_Battler.prototype.updateSelectionEffect = function() {
    if (this._battler.isActor()) {
      Yanfly.Core.Sprite_Battler_updateSelectionEffect.call(this);
    } else {
      if (this._battler.isSelected()) this.startEffect('whiten');
    }
};

}; // Yanfly.Param.FlashTarget

//=============================================================================
// Sprite_Actor
//=============================================================================

if (Yanfly.Param.ReposBattlers) {
  Yanfly.Core.Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
  Sprite_Actor.prototype.setActorHome = function(index) {
      Yanfly.Core.Sprite_Actor_setActorHome.call(this, index);
      this._homeX += Graphics.boxWidth - 816;
      this._homeY += Graphics.boxHeight - 624;
  };
};

Sprite_Actor.prototype.retreat = function() {
    this.startMove(1200, 0, 120);
};

//=============================================================================
// Sprite_Enemy
//=============================================================================

if (Yanfly.Param.ReposBattlers) {

Yanfly.Core.Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    Yanfly.Core.Sprite_Enemy_setBattler.call(this, battler);
    if (!this._enemy._alteredScreenY) {
      this._homeY += Math.floor((Graphics.boxHeight - 624) / 2);
      this._enemy._screenY = this._homeY;
      this._enemy._alteredScreenY = true;
    }
    if ($gameSystem.isSideView()) return;
    if (!this._enemy._alteredScreenX) {
      this._homeX += (Graphics.boxWidth - 816) / 2;
      this._enemy._screenX = this._homeX;
      this._enemy._alteredScreenX = true;
    }
};

}; // Yanfly.Param.ReposBattlers

//=============================================================================
// Sprite_StateIcon
//=============================================================================

Sprite_StateIcon._iconWidth  = Yanfly.Param.IconWidth;
Sprite_StateIcon._iconHeight = Yanfly.Param.IconHeight;

//=============================================================================
// Sprite_Button
//=============================================================================

Sprite_Button.prototype.isButtonTouched = function() {
    var x = this.canvasToLocalX(TouchInput.x) + (this.anchor.x * this.width);
    var y = this.canvasToLocalY(TouchInput.y) + (this.anchor.y * this.height);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

//=============================================================================
// Sprite_Battleback
//=============================================================================

function Sprite_Battleback() {
    this.initialize.apply(this, arguments);
}

Sprite_Battleback.prototype = Object.create(Sprite.prototype);
Sprite_Battleback.prototype.constructor = Sprite_Battleback;

Sprite_Battleback.prototype.initialize = function(bitmapName, type) {
  Sprite.prototype.initialize.call(this);
  this._bitmapName = bitmapName;
  this._battlebackType = type;
  this.createBitmap();
};

Sprite_Battleback.prototype.createBitmap = function() {
  if (this._bitmapName === '') {
    this.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
  } else {
    if (this._battlebackType === 1) {
      this.bitmap = ImageManager.loadBattleback1(this._bitmapName);
    } else {
      this.bitmap = ImageManager.loadBattleback2(this._bitmapName);
    }
    this.scaleSprite();
  }
};

Sprite_Battleback.prototype.scaleSprite = function() {
  if (this.bitmap.width <= 0) return setTimeout(this.scaleSprite.bind(this), 5);
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight;
  if (this.bitmap.width < width) {
    this.scale.x = width / this.bitmap.width;
  }
  if (this.bitmap.height < height) {
    this.scale.y = height / this.bitmap.height;
  }
  this.anchor.x = 0.5;
  this.x = Graphics.boxWidth / 2;
  if ($gameSystem.isSideView()) {
    this.anchor.y = 1;
    this.y = Graphics.boxHeight;
  } else {
    this.anchor.y = 0.5;
    this.y = Graphics.boxHeight / 2;
  }
};

//=============================================================================
// Sprite_Character
//=============================================================================

Yanfly.Core.Sprite_Character_updateHalfBodySprites =
  Sprite_Character.prototype.updateHalfBodySprites;
Sprite_Character.prototype.updateHalfBodySprites = function() {
  Yanfly.Core.Sprite_Character_updateHalfBodySprites.call(this);
  if (this._bushDepth > 0) {
    this._upperBody.blendMode = this.blendMode;
    this._lowerBody.blendMode = this.blendMode;
  }
};

//=============================================================================
// Spriteset_Map
//=============================================================================

Spriteset_Map.prototype.hideCharacters = function() {
  for (var i = 0; i < this._characterSprites.length; i++) {
    var sprite = this._characterSprites[i];
    if (!sprite.isTile()) sprite.hide();
  }
};

Spriteset_Map.prototype.showCharacters = function() {
  for (var i = 0; i < this._characterSprites.length; i++) {
    var sprite = this._characterSprites[i];
    if (!sprite.isTile()) sprite.show();
  }
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

if (Yanfly.Param.ScaleBattleback) {

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.2') {

// Rewriting the battlebacks
Spriteset_Battle.prototype.createBattleback = function() {
  this._back1Sprite = new Sprite_Battleback(this.battleback1Name(), 1);
  this._back2Sprite = new Sprite_Battleback(this.battleback2Name(), 2);
  this._battleField.addChild(this._back1Sprite);
  this._battleField.addChild(this._back2Sprite);
};

// No more updateBattleback
Spriteset_Battle.prototype.updateBattleback = function() {
};

} else { // Version 1.3.0 and below
  
Yanfly.Core.Spriteset_Battle_locateBattleback =
    Spriteset_Battle.prototype.locateBattleback;
Spriteset_Battle.prototype.locateBattleback = function() {
  var sprite1 = this._back1Sprite;
  var sprite2 = this._back2Sprite;
  if (sprite1.bitmap.width <= 0) return;
  if (sprite2.bitmap.width <= 0) return;
  if (this._rescaledBattlebackSprite) return;
  this._rescaledBattlebackSprite = true;
  Yanfly.Core.Spriteset_Battle_locateBattleback.call(this);
  var height = this._battleField.height;
  sprite1.origin.y = sprite1.x + sprite1.bitmap.height - height;
  sprite2.origin.y = sprite1.y + sprite2.bitmap.height - height;
  this.rescaleBattlebacks();
};

Spriteset_Battle.prototype.rescaleBattlebacks = function() {
  this.rescaleBattlebackSprite(this._back1Sprite);
  this.rescaleBattlebackSprite(this._back2Sprite);
};

Spriteset_Battle.prototype.rescaleBattlebackSprite = function(sprite) {
  if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) return;
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight;
  var ratioX = width / sprite.bitmap.width;
  var ratioY = height / sprite.bitmap.height;
  if (ratioX > 1.0) {
    sprite.scale.x = ratioX;
    sprite.anchor.x = 0.5;
    sprite.x = width / 2;
  }
  if (ratioY > 1.0) {
    sprite.scale.y = ratioY;
    sprite.origin.y = 0;
    sprite.y = 0;
  }
};

} // Version 1.3.0 and below

} // Yanfly.Param.ScaleBattleback

//=============================================================================
// Window_Base
//=============================================================================

Window_Base._iconWidth   = Yanfly.Param.IconWidth;
Window_Base._iconHeight  = Yanfly.Param.IconHeight;
Window_Base._faceWidth   = Yanfly.Param.FaceWidth;
Window_Base._faceHeight  = Yanfly.Param.FaceHeight;

Window_Base.prototype.lineHeight = function() {
  return Yanfly.Param.LineHeight;
};

Window_Base.prototype.drawTextEx = function(text, x, y) {
  if (text) {
    this.resetFontSettings();
    var textState = { index: 0, x: x, y: y, left: x };
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    while (textState.index < textState.text.length) {
      this.processCharacter(textState);
    }
    return textState.x - x;
  } else {
    return 0;
  }
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height + this.lineHeight());
};

Window_Base.prototype.standardFontFace = function() {
    if ($gameSystem.isChinese()) {
    return Yanfly.Param.ChineseFont;
    } else if ($gameSystem.isKorean()) {
    return Yanfly.Param.KoreanFont;
    } else {
    return Yanfly.Param.DefaultFont;
    }
};

Window_Base.prototype.standardFontSize = function() {
    return Yanfly.Param.FontSize;
};

Window_Base.prototype.standardPadding = function() {
    return Yanfly.Param.WindowPadding;
};

Window_Base.prototype.textPadding = function() {
    return Yanfly.Param.TextPadding;
};

Window_Base.prototype.standardBackOpacity = function() {
    return Yanfly.Param.WindowOpacity;
};

Window_Base.prototype.normalColor = function() {
  return this.textColor(Yanfly.Param.ColorNormal);
};
Window_Base.prototype.systemColor = function() {
    return this.textColor(Yanfly.Param.ColorSystem);
};

Window_Base.prototype.crisisColor = function() {
    return this.textColor(Yanfly.Param.ColorCrisis);
};

Window_Base.prototype.deathColor = function() {
    return this.textColor(Yanfly.Param.ColorDeath);
};

Window_Base.prototype.gaugeBackColor = function() {
    return this.textColor(Yanfly.Param.ColorGaugeBack);
};

Window_Base.prototype.hpGaugeColor1 = function() {
    return this.textColor(Yanfly.Param.ColorHpGauge1);
};

Window_Base.prototype.hpGaugeColor2 = function() {
    return this.textColor(Yanfly.Param.ColorHpGauge2);
};

Window_Base.prototype.mpGaugeColor1 = function() {
    return this.textColor(Yanfly.Param.ColorMpGauge1);
};

Window_Base.prototype.mpGaugeColor2 = function() {
    return this.textColor(Yanfly.Param.ColorMpGauge2);
};

Window_Base.prototype.mpCostColor = function() {
    return this.textColor(Yanfly.Param.ColorMpCost);
};

Window_Base.prototype.powerUpColor = function() {
    return this.textColor(Yanfly.Param.ColorPowerUp);
};

Window_Base.prototype.powerDownColor = function() {
    return this.textColor(Yanfly.Param.ColorPowerDown);
};

Window_Base.prototype.tpGaugeColor1 = function() {
    return this.textColor(Yanfly.Param.ColorTpGauge1);
};

Window_Base.prototype.tpGaugeColor2 = function() {
    return this.textColor(Yanfly.Param.ColorTpGauge2);
};

Window_Base.prototype.tpCostColor = function() {
    return this.textColor(Yanfly.Param.ColorTpCost);
};

Window_Base.prototype.drawGauge = function(dx, dy, dw, rate, color1, color2) {
  var color3 = this.gaugeBackColor();
  var fillW = Math.floor(dw * rate).clamp(0, dw);
  var gaugeH = this.gaugeHeight();
  var gaugeY = dy + this.lineHeight() - gaugeH - 2;
  if (Yanfly.Param.GaugeOutline) {
    color3.paintOpacity = this.translucentOpacity();
    this.contents.fillRect(dx, gaugeY - 1, dw, gaugeH, color3);
    fillW = Math.max(fillW - 2, 0);
    gaugeH -= 2;
    dx += 1;
  } else {
    var fillW = Math.floor(dw * rate);
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;
    this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
  }
  this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);
};

Window_Base.prototype.gaugeHeight = function() {
    return Yanfly.Param.GaugeHeight;
};

Window_Base.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    var dw1 = this.textWidth(TextManager.levelA);
    this.drawText(TextManager.levelA, x, y, dw1);
    this.resetTextColor();
    var level = Yanfly.Util.toGroup(actor.level);
    var dw2 = this.textWidth(Yanfly.Util.toGroup(actor.maxLevel()));
    this.drawText(level, x + dw1, y, dw2, 'right');
};

Window_Base.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth(Yanfly.Util.toGroup(max));
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
    if (x3 >= x + labelWidth) {
        this.changeTextColor(color1);
        this.drawText(Yanfly.Util.toGroup(current), x3, y, valueWidth,
          'right');
        this.changeTextColor(color2);
        this.drawText('/', x2, y, slashWidth, 'right');
        this.drawText(Yanfly.Util.toGroup(max), x1, y, valueWidth, 'right');
    } else {
        this.changeTextColor(color1);
        this.drawText(Yanfly.Util.toGroup(current), x1, y, valueWidth,
          'right');
    }
};

Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.tpA, x, y, 44);
    this.changeTextColor(this.tpColor(actor));
    this.drawText(Yanfly.Util.toGroup(actor.tp), x + width - 64, y, 64,
      'right');
};

Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
    var x2 = x + xpad;
    var width2 = Math.max(180, width - xpad - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y, width2);
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
    if (Yanfly.Param.MenuTpGauge) {
      this.drawActorTp(actor, x2, y + lineHeight * 3, width2);
    }
};

Window_Base.prototype.drawCurrencyValue = function(value, unit, wx, wy, ww) {
    this.resetTextColor();
    this.contents.fontSize = Yanfly.Param.GoldFontSize;
    if (this.usingGoldIcon(unit)) {
      var cx = Window_Base._iconWidth;
    } else {
      var cx = this.textWidth(unit);
    }
    var text = Yanfly.Util.toGroup(value);
    if (this.textWidth(text) > ww - cx) {
      text = Yanfly.Param.GoldOverlap;
    }
    this.drawText(text, wx, wy, ww - cx - 4, 'right');
    if (this.usingGoldIcon(unit)) {
      this.drawIcon(Yanfly.Icon.Gold, wx + ww - Window_Base._iconWidth, wy + 2);
    } else {
      this.changeTextColor(this.systemColor());
      this.drawText(unit, wx, wy, ww, 'right');
    }
    this.resetFontSettings();
};

Window_Base.prototype.usingGoldIcon = function(unit) {
    if (unit !== TextManager.currencyUnit) return false;
    return Yanfly.Icon.Gold > 0;
};

//=============================================================================
// Window_Command
//=============================================================================

Window_Command.prototype.itemTextAlign = function() {
    return Yanfly.Param.TextAlign;
};

//=============================================================================
// Window_MenuStatus
//=============================================================================

Window_MenuStatus.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    var fw = Window_Base._faceWidth;
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, fw, rect.height - 2);
    this.changePaintOpacity(true);
};

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var xpad = Yanfly.Param.WindowPadding + Window_Base._faceWidth;
    var x = rect.x + xpad;
    if (!Yanfly.Param.MenuTpGauge) {
      var y = Math.floor(rect.y + rect.height / 2 - this.lineHeight() * 1.5);
    } else {
      var y = Math.floor(rect.y);
    }
    var width = rect.width - x - this.textPadding();
    this.drawActorSimpleStatus(actor, x, y, width);
};

//=============================================================================
// Window_ItemList
//=============================================================================

Window_ItemList.prototype.numberWidth = function() {
    return this.textWidth('\u00d70,000');
};

Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    if (!this.needsNumber()) return;
    var numItems = Yanfly.Util.toGroup($gameParty.numItems(item));
    this.contents.fontSize = Yanfly.Param.ItemQuantitySize;
    this.drawText('\u00d7' + numItems, x, y, width, 'right');
    this.resetFontSettings();
};

//=============================================================================
// Window_SkillStatus
//=============================================================================

Window_SkillStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var w = this.width - this.padding * 2;
        var h = this.height - this.padding * 2;
        if (!Yanfly.Param.MenuTpGauge) {
          var y = h / 2 - this.lineHeight() * 1.5;
        } else {
          var y = 0;
        }
        var xpad = Yanfly.Param.WindowPadding + Window_Base._faceWidth;
        var width = w - xpad - this.textPadding();
        this.drawActorFace(this._actor, 0, 0, Window_Base._faceWidth, h);
        this.drawActorSimpleStatus(this._actor, xpad, y, width);
    }
};

Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillTpCost(skill) > 0) {
        this.changeTextColor(this.tpCostColor());
        var skillcost = Yanfly.Util.toGroup(this._actor.skillTpCost(skill));
        this.drawText(skillcost, x, y, width, 'right');
    } else if (this._actor.skillMpCost(skill) > 0) {
        this.changeTextColor(this.mpCostColor());
        var skillcost = Yanfly.Util.toGroup(this._actor.skillMpCost(skill));
        this.drawText(skillcost, x, y, width, 'right');
    }
};

//=============================================================================
// Window_EquipStatus
//=============================================================================

Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
    this.resetTextColor();
    var actorparam = Yanfly.Util.toGroup(this._actor.param(paramId));
    this.drawText(actorparam, x, y, 48, 'right');
};

Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, 48, 'right');
};

//=============================================================================
// Window_SkillType
//=============================================================================

Window_SkillType.prototype.makeCommandList = function() {
    if (this._actor) {
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function(a, b){return a-b});
        skillTypes.forEach(function(stypeId) {
            var name = $dataSystem.skillTypes[stypeId];
            this.addCommand(name, 'skill', true, stypeId);
        }, this);
    }
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.addSkillCommands = function() {
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function(a, b){return a-b});
    skillTypes.forEach(function(stypeId) {
        var name = $dataSystem.skillTypes[stypeId];
        this.addCommand(name, 'skill', true, stypeId);
    }, this);
};

//=============================================================================
// Window_Status
//=============================================================================

Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 6; i++) {
      var paramId = i + 2;
      var y2 = y + lineHeight * i;
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(paramId), x, y2, 160);
      this.resetTextColor();
      var actorParam = Yanfly.Util.toGroup(this._actor.param(paramId));
      var dw = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(i + 2)));
      this.drawText(actorParam, x + 160, y2, dw, 'right');
    }
};

Window_Status.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    } else {
      value1 = Yanfly.Util.toGroup(value1);
      value2 = Yanfly.Util.toGroup(value2);
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, 270);
    this.drawText(expNext, x, y + lineHeight * 2, 270);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
    this.drawText(value2, x, y + lineHeight * 3, 270, 'right');
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

Window_ShopBuy.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width);
    this.contents.fontSize = Yanfly.Param.GoldFontSize;
    var itemPrice = Yanfly.Util.toGroup(this.price(item));
    this.drawText(itemPrice, rect.x, rect.y, rect.width, 'right');
    this.changePaintOpacity(true);
    this.resetFontSettings();
};

//=============================================================================
// Window_ShopNumber
//=============================================================================

Window_ShopNumber.prototype.drawNumber = function() {
    var x = this.cursorX();
    var y = this.itemY();
    var width = this.cursorWidth() - this.textPadding();
    this.resetTextColor();
    var itemNumber = Yanfly.Util.toGroup(this._number);
    this.drawText(itemNumber, x, y, width, 'right');
};

//=============================================================================
// Window_NameEdit
//=============================================================================

Window_NameEdit.prototype.faceWidth = function() {
    return Window_Base._faceWidth;
};

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.gaugeAreaWidth = function() {
    return this.width / 2 + this.standardPadding();
};

Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    var minIconArea = Window_Base._iconWidth * 2;
    var nameLength = this.textWidth('0') * 16 + 6;
    var iconWidth = Math.max(rect.width - nameLength, minIconArea);
    var nameWidth = rect.width - iconWidth;
    this.drawActorName(actor, rect.x + 0, rect.y, nameWidth);
    this.drawActorIcons(actor, rect.x + nameWidth, rect.y, iconWidth);
};

Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
    var totalArea = this.gaugeAreaWidth() - 30;
    var hpW = Math.floor(parseInt(totalArea * 108 / 300));
    var otW = Math.floor(parseInt(totalArea * 96 / 300));
    this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
    this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
    this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
};

Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
    var totalArea = this.gaugeAreaWidth() - 15;
    var hpW = Math.floor(parseInt(totalArea * 201 / 315));
    var otW = Math.floor(parseInt(totalArea * 114 / 315));
    this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
    this.drawActorMp(actor, rect.x + hpW + 15,  rect.y, otW);
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Window_BattleLog.prototype.showNormalAnimation = function(targets,
animationId, mirror) {
    var animation = $dataAnimations[animationId];
    if (animation) {
      if (animation.position === 3) {
        targets.forEach(function(target) {
            target.startAnimation(animationId, mirror, 0);
        });
      } else {
          var delay = this.animationBaseDelay();
          var nextDelay = this.animationNextDelay();
          targets.forEach(function(target) {
              target.startAnimation(animationId, mirror, delay);
              delay += nextDelay;
          });
      }
    }
};

//=============================================================================
// New Function
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0') {

Yanfly.Util.toGroup = function(inVal) {
  if (typeof inVal === 'string') return inVal;
  if (!Yanfly.Param.DigitGroup) return inVal;
  return inVal.toLocaleString('en');
  return inVal.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
    return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
  });
};

} else {

Yanfly.Util.toGroup = function(inVal) {
  if (typeof inVal !== 'string') { inVal = String(inVal); }
  if (!Yanfly.Param.DigitGroup) return inVal;
  return inVal.toLocaleString('en');
  return inVal.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
    return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
  });
};

} // Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0'



Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
