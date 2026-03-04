//=============================================================================
// Yanfly Engine Plugins - Item Core
// YEP_ItemCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ItemCore = true;

var Yanfly = Yanfly || {};
Yanfly.Item = Yanfly.Item || {};
Yanfly.Item.version = 1.29;

//=============================================================================
 /*:
 * @plugindesc YEP物品核心[v1.29]
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Max Items
 * @text 最大物品数
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 最大物品数 0为无限制 设置数字则会堆叠
 * @default 0
 *
 * @param Max Weapons
 * @text 最大武器数
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 0为无限制 设置数值则会让武器独立化
 不是买的装备会有随机属性
 * @default 100
 *
 * @param Max Armors
 * @text 最大护甲数
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 0为无限制
 * @default 100
 *
 * @param Starting ID
 * @text 起始ID
 * @parent ---General---
 * @type number
 * @min 1
 * @desc 这将是独立物品的起始ID号
 * 以便它们不会干扰默认物品。
 * @default 3000
 *
 * @param Random Variance
 * @text 随机方差
 * @parent ---General---
 * @type number
 * @desc 按此值随机化为非商店项目找到的统计数据0表示无随机
 * @default 0
 *
 * @param Negative Variance
 * @text 负差异
 * @parent ---General---
 * @type boolean
 * @on 允许
 * @off 不允许
 * @desc 如果使用随机方差，则允许随机方差设备
 * 统计数据低于0？ NO - false     YES - true
 * @default false
 *
 * @param Name Format
 * @text 名称格式
 * @parent ---General---
 * @desc 物品名称的排序和结构。
 * %1 - 前缀, %2 - 基本名称, %3 - 后缀, %4 帮助
 * @default %1%2%3%4
 *
 * @param Name Spacing
 * @text  名称间距
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在名称前缀和后缀之间留一个空格？
 * NO - false     YES - true
 * @default true
 *
 * @param Boost Format
 * @text Boost格式
 * @parent ---General---
 * @desc 这是增强的独立项的文本格式。
 * %1 - Boost Amount
 * @default (+%1)
 *
 * @param ---Item Scene---
 * @default
 *
 * @param Updated Scene Item
 * @text 更新的场景项目
 * @parent ---Item Scene---
 * @type boolean
 * @on 更新（推荐）
 * @off 正常
 * @desc 启用此选项将更改场景项的视觉外观。
 * NO - false     YES - true (recommended)
 * @default true
 *
 * @param List Equipped Items
 * @text 列出装备项目
 * @parent ---Item Scene---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show equipped independent items in the item lists?
 * NO - false     YES - true
 * @default true
 *
 * @param Show Icon
 * @text 显示图标
 * @parent ---Item Scene---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否在状态窗口中显示图标？
 * NO - false     YES - true
 * @default true
 *
 * @param Icon Size
 * @text 图标大小
 * @parent ---Item Scene---
 * @type number
 * @min 0
 * @desc This will be the width and height of the icon to be drawn.
 * This is normally 4x the default Icon Width and Icon Height.
 * @default 128
 *
 * @param Font Size
 * @text 字体大小
 * @parent ---Item Scene---
 * @type number
 * @min 1
 * @desc This changes the font size for description items.
 * Default: 28
 * @default 20
 *
 * @param Command Alignment
 * @text 命令对齐方式
 * @parent ---Item Scene---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc This is the text alignment for the command windows.
 * left     center     right
 * @default center
 *
 * @param Recovery Format
 * @text 恢复格式
 * @parent ---Item Scene---
 * @desc 这是HP/MP恢复的文本格式。
 * @default %1 恢复
 *
 * @param Add State
 * @text 添加状态
 * @parent ---Item Scene---
 * @desc 这是用于添加状态的文本。
 * @default +状态
 *
 * @param Add Buff
 * @text 添加Buff
 * @parent ---Item Scene---
 * @desc 这是添加buff的文本。
 * @default +Buff
 *
 * @param Remove State
 * @text 删除状态
 * @parent ---Item Scene---
 * @desc This is the text for remove states.
 * @default -状态
 *
 * @param Remove Buff
 * @text 移除Buff
 * @parent ---Item Scene---
 * @desc This is the text for remove buffs.
 * @default -Buff
 *
 * @param Maximum Icons
 * @text 最大图标数
 * @parent ---Item Scene---
 * @type number
 * @min 0
 * @desc Maximum number of icons drawn for states and buffs.
 * @default 4
 *
 * @param Use Command
 * @text 使用命令
 * @parent ---Item Scene---
 * @desc 用于使用所选项目的命令文本
 * %1 - Item Icon and Name
 * @default 使用 %1
 *
 * @param Carry Format
 * @text 进位格式
 * @parent ---Item Scene---
 * @desc 这是独立物品ID的视觉文本格式。
 * %1 - Item Index     %2 - Maximum
 * @default %1/%2
 *
 * @param --Independent Items--
 * @default
 *
 * @param Midgame Note Parsing
 * @text 游戏中期笔记分析
 * @parent ---Independent Items---
 * @type boolean
 * @on YES
 * @off NO (Recommended)
 * @desc 允许中间名注释解析还是在开始时进行？
 * NO - false     YES - true    Recommended: false
 * @default false
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 这个插件对你的游戏和物品的方式进行了一些更改
 * 允许为未来的插件提供基础核心
 *
 
 
 快速设置：
【备注标签】


一般用于武器和护甲使用：
<Random Variance: x>  
设置随机属性幅度



给物品添加一些描述：
<Info Text Top>
顶部信息
text
</Info Text Top>


<Info Text Bottom>
底部信息
6666666666
</Info Text Bottom>
 
 
1.独立项目
*如果你选择对你的物品、武器和/或盔甲有最大限制，
*这些项目将变得独立，并拥有自己的个人统计数据和
*什么。独立项目能够升级、更改、修改、，
*等等，并独立于
*相同类型。没有最大限制的项目（也称为0）将继续作为
*他们通常在RPG Maker MV中这样做。
 *
2.新建场景_项目
*物品场景经过了修改，看起来有点不同。与
*在新布局中，项目列表不再是两列，而是一列。添加了一些
*更多窗口，如项目状态窗口（显示基本项目
*信息），项目信息窗口（显示应用于
*项目通过升级等），以及项目操作窗口，当
*您选择一个项目，它会询问您是否要使用该项目或任何
*通过插件添加的操作（例如升级项目）。如果你不想
*使用此改造，您可以从参数中禁用它。
 *
3.随机方差
*新购买的非商店商品可以随机统计到
*独立项目的小学位。物品可以高于库存
*值或低于股票值乘以方差值。如果您希望
*项目没有差异值，可以使用notetag设置差异
*值设置为0。如果您希望所有项目都没有差异值，
*您可以将参数设置为0。
*
*注意：在战斗测试期间，独立项目将被禁用。
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
*如果您使用的是独立项目，则不是通过
*商店可以对其统计数据应用随机方差。
 *
 * Item, Weapon, Armor Notetag
 *   <Random Variance: x>
*如果此物品是通过非商店方式获得的，则它将具有随机性
*统计数据以正值或负值偏移x量。
 *
 *   <Not Independent Item>
*将默认情况下独立的项设置为非依赖项项，允许其堆叠并使其不受影响
*独立项修饰符。
 *
 *   <Priority Name>
*这会将物品、武器或盔甲的优先级名称设置为其数据库以使名称方案不会影响项目。
 *
 *   <Text Color: x>
*这将此物品、武器或盔甲的文本颜色设置为使用文本颜色
*x来自窗户蒙皮。
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
*如果您希望能够在没有的情况下将物品添加到玩家的库存中
*如果应用随机方差，您可以使用以下插件
*命令来调整其设置。
 *
 * Plugin Command:
 *   EnableVarianceStock  - 使从此点获取的所有项目向前使其方差给出非随机值。
 *   DisableVarianceStock - Causes all items acquired from this point forward
 *                          to have its variance give random values.
 *
*需要注意的是，如果您启用了差异值，如果玩家
*通过浏览标题屏幕或只是转动来重新启动游戏
*退出程序并重新启动，随机方差将在
*再次产生效果。此插件命令旨在作为短期禁用存在。
 *
 * ============================================================================
 * 正在发生的更改
 * ============================================================================
 *
*为了适应独立项目。它们如下：
 *
 * Event Page Conditions and Conditional Branches:
 *   Checking to see if an item exists in the party's inventory will differ if
 * the item can be independent. Instead, the condition can be fulfilled if
 * there is an item, even when upgraded, that has the selected item as the base
 * item. This means your Long Sword (+1) will fulfill the condition of having
 * the target Long Sword item in the event editor.
 *
 * Actor Has X Equip:
 *   Just like the previous condition, this condition will be fulfilled if the
 * actor has a weapon whose base item matches the event editor's target item.
 * The Long Sword (+1) will fulfill the condition of needing the actor to have
 * a Long Sword item equipped.
 *
 * Change Equipment:
 *   If the target equipment is independent, the game will first check to see
 * if the actor has an item equipped with the matching base item. If not, the
 * game will then check to see if the party has a matching base item in the
 * inventory first and use that. If not, then the game will create a new stock
 * version of the item and equip that to the actor.
 *
 * ============================================================================
 * 项目名称系统
 * ============================================================================
 *
*对于独立项目，它们具有唯一的名称处理系统。独立的项目由四个部分组成：
 *
 *      Prefix     Base Name     Suffix     Boost Count
 *
 * The prefix, base name, suffix, and boost count are adjusted by plugins.
 * Depending on the effects applied, they can be altered or changed. Using the
 * name system, an item with a prefix of 'Fiery', base name of 'Sword', suffix
 * being 'of Might', and a boost count of 5 will end up looking like:
 *
 *      Fiery Sword of Might (+5)
 *
 * This item would appear that way only if its various name parts have been
 * altered some way or another. However, there is a fifth name convention, and
 * that is the priority name. If an item has a priority name, it will completely
 * overwrite the current name scheme with just the priority name itself. So even
 * if the item's name is 'Fiery Sword of Might (+5)', if the item's priority
 * name is 'Legendary Blade', then 'Legendary Blade' will take priority.
 *
 * ============================================================================
 * Lunatic Mode - On Independent Item Creation
 * ============================================================================
 *
*对于那些有JavaScript经验的人，你可以使用以下Lunatic模式
*以在创建项目时运行JavaScript代码。这仅适用于
*新制作的独立项目。
 *
 * Item, Weapon, Armor
 *
 *   <On Creation Eval>
 *    item.price = baseItem.price;
 *    item.price += Math.floor(Random() * 100);
 *   </On Creation Eval>
 *   The 'item' variable refers to the independent item being made. 'baseItem'
 *   refers to the item's base item. Any alterations made to the 'item' will be
 *   applied to the independent item.
 *
 * ============================================================================
 * Lunatic Mode - Custom Info Window Display
 * ============================================================================
 *
*如果您想在上的信息窗口中显示独特和自定义的内容
*侧面，可以使用以下注释标签：
 *
 *   <Info Text Top>
 *    text
 *    text
 *   </Info Text Top>
*键入要在项目信息窗口中键入的额外信息
*这里，无论是传说还是其他信息。可以使用文本代码。
*此处的信息显示在信息窗口的顶部。
 *
 *   <Info Text Bottom>
 *    text
 *    text
 *   </Info Text Bottom>
*键入要在项目信息窗口中键入的额外信息
*这里，无论是传说还是其他信息。可以使用文本代码。
*此处的信息显示在信息窗口的底部。
 *
 *   <Info Eval>
 *    var variableId = 1;
 *    var value = 500;
 *    $gameVariables.setValue(variableId, value);
 *   </Info Eval>
*如果你知道JavaScript，你可以使用这些notetag来运行一些代码
*显示任何新信息。这样，如果您计划使用
*显示变量值，可以在显示变量值之前运行一些代码
*以同步项目信息窗口中显示的内容。
 *
 * ============================================================================
 * 独立项与游戏中期注释解析
 * ============================================================================
*
*插件参数中的“游戏中期注释解析”选项适用于任何
*只能在midgame中解析notetags的插件，而不是在加载时解析
*游戏。这是一个您应该自担风险启用的选项。
*
*为什么风险自负？因为启用此选项意味着独立
*项目将保留其笔记数据，从而增加保存的文件大小
*文件大了好几倍，这也会导致游戏中期的滞后。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.29:
 * - Updated for RPG Maker MV version 1.6.0:
 *   Removal of the destructive code in Scene_Item.update function.
 *
 * Version 1.28:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.27:
 * - Compatibility update for future plugins.
 *
 * Version 1.26:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.25:
 * - Optimization Update
 *
 * Version 1.24a:
 * - Fixed a typo within the code. Please update Item Core, Item Disassemble,
 * Attachable Augments, and More Currencies if you are using those plugins.
 * - Random variance is now disabled from fresh plugin installation by default.
 *
 * Version 1.23:
 * - Fixed an issue custom info text when using different font sizes.
 *
 * Version 1.22:
 * - Fixed a removal bug that caused weapon and armor ID's to clash.
 *
 * Version 1.21:
 * - Fixed an error with sorting algorithm when items have the same base ID.
 *
 * Version 1.20:
 * - Added <On Creation Eval> Lunatic Mode notetag. Read the help file for more
 * information about it.
 *
 * Version 1.19:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.18a:
 * - Added 'Midgame Note Parsing' plugin parameter.
 * - Fixed a visual error with MP recovery displaying a 0 instead of ---.
 *
 * Version 1.17:
 * - Added <Text Color: x> notetag for items, weapons, and armors.
 *
 * Version 1.16:
 * - Fixed a bug that made mid-game actor initialization not display items
 * correctly in the item menu.
 *
 * Version 1.15:
 * - Fixed a bug with independent items getting values that crash the game.
 *
 * Version 1.14:
 * - Fixed an unintended function of the game not granting a piece of equipment
 * through events.
 *
 * Version 1.13:
 * - Fixed a bug that didn't unequip items properly.
 *
 * Version 1.12:
 * - Added 'Negative Variance' parameter.
 *
 * Version 1.11:
 * - Fixed a bug that caused random variance to not calculate correctly.
 * - Fixed a bug that didn't return the correct conditional branch results.
 * - Fixed the display in the shop window to show number of independent items
 * owned by the player rather than just 0.
 *
 * Version 1.10:
 * - Added Lunatic Mode - Custom Info Window Display.
 *
 * Version 1.09:
 * - Fixed a bug with evented item removal that didn't remove equipped items if
 * the 'Include Equipment' checkbox was checked.
 *
 * Version 1.08:
 * - Fixed a bug with the Control Variable event that would not gather the
 * right amount of independent items.
 *
 * Version 1.07:
 * - Fixed a bug with the Change Equipment event where armors wouldn't equip.
 *
 * Version 1.06:
 * - Fixed a bug and rewrote the initializing equipment process.
 *
 * Version 1.05:
 * - Compatibility update with ItemBook.
 *
 * Version 1.04:
 * - Added 'List Equipped Items' parameter to allow for equipment restricted
 * actors to be able to alt their equipment.
 *
 * Version 1.03:
 * - Fixed a bug where using events to remove independent items weren't working
 * properly and instead added more items.
 * - Fixed a bug where a Random Variance of 0 still gave random stats.
 *
 * Version 1.02:
 * - Fixed a bug where initializing equipment slots didn't work properly and/or
 * added incorrect equips from the wrong actors into the inventory.
 *
 * Version 1.01:
 * - Fixed bug where if you are using no independent pieces of equipment,
 * actors would fail to start with initial equipment.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ItemCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ItemMaxItems = Number(Yanfly.Parameters['Max Items']);
Yanfly.Param.ItemMaxWeapons = Number(Yanfly.Parameters['Max Weapons']);
Yanfly.Param.ItemMaxArmors = Number(Yanfly.Parameters['Max Armors']);
Yanfly.Param.ItemStartingId = Number(Yanfly.Parameters['Starting ID']);
Yanfly.Param.ItemRandomVariance = Number(Yanfly.Parameters['Random Variance']);
Yanfly.Param.ItemNegVar = eval(String(Yanfly.Parameters['Negative Variance']));
Yanfly.Param.ItemNameFmt = String(Yanfly.Parameters['Name Format']);
Yanfly.Param.ItemNameSpacing = String(Yanfly.Parameters['Name Spacing']);
Yanfly.Param.ItemBoostFmt = String(Yanfly.Parameters['Boost Format']);

Yanfly.Param.ItemSceneItem = String(Yanfly.Parameters['Updated Scene Item']);
Yanfly.Param.ItemSceneItem = eval(Yanfly.Param.ItemSceneItem);
Yanfly.Param.ItemShEquipped = String(Yanfly.Parameters['List Equipped Items']);
Yanfly.Param.ItemShEquipped = eval(Yanfly.Param.ItemShEquipped);
Yanfly.Param.ItemShowIcon = String(Yanfly.Parameters['Show Icon']);
Yanfly.Param.ItemShowIcon = eval(Yanfly.Param.ItemShowIcon);
Yanfly.Param.ItemIconSize = Number(Yanfly.Parameters['Icon Size']);
Yanfly.Param.ItemFontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.ItemCmdAlign = String(Yanfly.Parameters['Command Alignment']);
Yanfly.Param.ItemRecoverFmt = String(Yanfly.Parameters['Recovery Format']);
Yanfly.Param.ItemAddState = String(Yanfly.Parameters['Add State']);
Yanfly.Param.ItemAddBuff = String(Yanfly.Parameters['Add Buff']);
Yanfly.Param.ItemRemoveState = String(Yanfly.Parameters['Remove State']);
Yanfly.Param.ItemRemoveBuff = String(Yanfly.Parameters['Remove Buff']);
Yanfly.Param.ItemMaxIcons = Number(Yanfly.Parameters['Maximum Icons']);
Yanfly.Param.ItemUseCmd = String(Yanfly.Parameters['Use Command']);
Yanfly.Param.ItemCarryFmt = String(Yanfly.Parameters['Carry Format']);

Yanfly.Param.ItemNoteParse = String(Yanfly.Parameters['Midgame Note Parsing']);
Yanfly.Param.ItemNoteParse = eval(Yanfly.Param.ItemNoteParse);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Item.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Item.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_ItemCore) {
    this.setDatabaseLengths();
    this.processItemCoreNotetags($dataItems);
    this.processItemCoreNotetags($dataWeapons);
    this.processItemCoreNotetags($dataArmors);
    Yanfly._loaded_YEP_ItemCore = true;
  }
  return true;
};

DataManager.processItemCoreNotetags = function(group) {
  var note1 = /<(?:RANDOM VARIANCE):[ ](\d+)>/i;
  var note2 = /<(?:NONINDEPENDENT ITEM|not independent item)>/i;
  var note3 = /<(?:PRIORITY NAME)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.randomVariance = Yanfly.Param.ItemRandomVariance;
    obj.textColor = 0;
    if (Imported.YEP_CoreEngine) obj.textColor = Yanfly.Param.ColorNormal;
    obj.nonIndependent = false;
    obj.setPriorityName = false;
    obj.infoEval = '';
    obj.infoTextTop = '';
    obj.infoTextBottom = '';
    obj.onCreationEval = '';
    var evalMode = 'none';

   for (var i = 0; i < notedata.length; i++) {
     var line = notedata[i];
     if (line.match(note1)) {
       obj.randomVariance = parseInt(RegExp.$1);
      } else if (line.match(note2)) {
        obj.nonIndependent = true;
      } else if (line.match(note3)) {
        obj.setPriorityName = true;
      } else if (line.match(/<(?:INFO EVAL)>/i)) {
        evalMode = 'info eval';
      } else if (line.match(/<\/(?:INFO EVAL)>/i)) {
        evalMode = 'none';
      } else if (line.match(/<(?:INFO TEXT TOP)>/i)) {
        evalMode = 'info text top';
      } else if (line.match(/<\/(?:INFO TEXT TOP)>/i)) {
        evalMode = 'none';
      } else if (line.match(/<(?:INFO TEXT BOTTOM)>/i)) {
        evalMode = 'info text bottom';
      } else if (line.match(/<\/(?:INFO TEXT BOTTOM)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'info eval') {
        obj.infoEval = obj.infoEval + line + '\n';
      } else if (evalMode === 'info text top') {
        if (obj.infoTextTop !== '') obj.infoTextTop += '\n';
        obj.infoTextTop = obj.infoTextTop + line;
      } else if (evalMode === 'info text bottom') {
        if (obj.infoTextBottom !== '') obj.infoTextBottom += '\n';
        obj.infoTextBottom = obj.infoTextBottom + line;
      } else if (line.match(/<(?:TEXT COLOR):[ ](\d+)>/i)) {
        obj.textColor = parseInt(RegExp.$1);
      } else if (line.match(/<(?:ON CREATE EVAL|ON CREATION EVAL)>/i)) {
        evalMode = 'on create eval';
      } else if (line.match(/<\/(?:ON CREATE EVAL|ON CREATION EVAL)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'on create eval') {
        obj.onCreationEval = obj.onCreationEval + line + '\n';
      }
    }
  }
};

DataManager.setDatabaseLengths = function() {
    this._baseItemsLength   = $dataItems.length
    this._baseWeaponsLength = $dataWeapons.length
    this._baseArmorsLength  = $dataArmors.length
};

Yanfly.Item.DataManager_createGameObjects =
    DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    Yanfly.Item.DataManager_createGameObjects.call(this);
    this.createIndependentObjects();
};

DataManager.createIndependentObjects = function() {
    DataManager.createIndependentGroups();
    this.loadIndependentItems();
};

DataManager.loadIndependentItems = function() {
    if (Yanfly.Param.ItemMaxItems > 0) {
      var difItems = $dataItems.length - DataManager._baseItemsLength;
      $dataItems.splice(DataManager._baseItemsLength, difItems);
      this.setIndependentLength($dataItems);
      $dataItems = $dataItems.concat(this._independentItems);
    }
    if (Yanfly.Param.ItemMaxWeapons > 0) {
      var difWeapons = $dataWeapons.length - DataManager._baseWeaponsLength;
      $dataWeapons.splice(DataManager._baseWeaponsLength, difWeapons);
      this.setIndependentLength($dataWeapons);
      $dataWeapons = $dataWeapons.concat(this._independentWeapons);
    }
    if (Yanfly.Param.ItemMaxArmors > 0) {
      var difArmors = $dataArmors.length - DataManager._baseArmorsLength;
      $dataArmors.splice(DataManager._baseArmorsLength, difArmors);
      this.setIndependentLength($dataArmors);
      $dataArmors = $dataArmors.concat(this._independentArmors);
    }
};

DataManager.setIndependentLength = function(group) {
    for (;;) {
      if (group.length > Yanfly.Param.ItemStartingId) break;
      group.push(null);
    }
};

DataManager.saveGameWithoutRescue = function(savefileId) {
    var json = JsonEx.stringify(this.makeSaveContents());
    StorageManager.save(savefileId, json);
    this._lastAccessedId = savefileId;
    var globalInfo = this.loadGlobalInfo() || [];
    globalInfo[savefileId] = this.makeSavefileInfo();
    this.saveGlobalInfo(globalInfo);
    return true;
};

Yanfly.Item.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = Yanfly.Item.DataManager_makeSaveContents.call(this);
    contents.items = this._independentItems;
    contents.weapons = this._independentWeapons;
    contents.armors = this._independentArmors;
    return contents;
};

Yanfly.Item.DataManager_extractSaveContents =
    DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    Yanfly.Item.DataManager_extractSaveContents.call(this, contents);
    this._independentItems = contents.items || [];
    this._independentWeapons = contents.weapons || [];
    this._independentArmors = contents.armors || [];
    this.loadIndependentItems();
};

DataManager.createIndependentGroups = function() {
    this._independentItems = [];
    this._independentWeapons = [];
    this._independentArmors = [];
};

DataManager.isIndependent = function(item) {
    if (!item) return false;
    if (DataManager.isBattleTest()) return false;
    if (item.nonIndependent) return false;
    if (DataManager.isItem(item)) return Yanfly.Param.ItemMaxItems > 0;
    if (DataManager.isWeapon(item)) return Yanfly.Param.ItemMaxWeapons > 0;
    if (DataManager.isArmor(item)) return Yanfly.Param.ItemMaxArmors > 0;
    return false;
};

DataManager.registerNewItem = function(item) {
    if (!this.isNewItemValid(item)) return item;
    var newItem = JsonEx.makeDeepCopy(item);
    this.addNewIndependentItem(item, newItem);
    return newItem;
};

DataManager.isNewItemValid = function(item) {
    if (!item) return false;
    if (item.baseItemId) return false;
    return item.id === this.getDatabase(item).indexOf(item);
};

DataManager.addNewIndependentItem = function(baseItem, newItem) {
    newItem.id = this.getDatabase(baseItem).length;
    ItemManager.setNewIndependentItem(baseItem, newItem);
    ItemManager.customizeNewIndependentItem(baseItem, newItem);
    ItemManager.onCreationEval(baseItem, newItem);
    this.getDatabase(baseItem).push(newItem);
    this.getContainer(baseItem).push(newItem);
};

DataManager.removeIndependentItem = function(item) {
    if (!item) return;
    if (this.independentItemIsUsed(item)) return;
    var container = this.getContainer(item);
    var database = this.getDatabase(item);
    var index = container.indexOf(item);
    container[index] = null;
    var index = database.indexOf(item);
    database[index] = null;
};

DataManager.independentItemIsUsed = function(item) {
    if ($gameParty.numItems(item) > 0) return false;
    for (var i = 0; i < $dataActors.length; ++i) {
      var actor = $gameActors.actor(i);
      if (!actor) continue;
      if (actor.equips().contains(item)) return true;
    }
    return false;
};

DataManager.getDatabase = function(item) {
    if (!item) return [];
    if (DataManager.isItem(item)) return $dataItems;
    if (DataManager.isWeapon(item)) return $dataWeapons;
    if (DataManager.isArmor(item)) return $dataArmors;
    return [];
};

DataManager.getContainer = function(item) {
    if (!item) return [];
    if (DataManager.isItem(item)) return this._independentItems;
    if (DataManager.isWeapon(item)) return this._independentWeapons;
    if (DataManager.isArmor(item)) return this._independentArmors;
    return [];
};

DataManager.getBaseItem = function(item) {
    if (!this.isIndependent(item)) return item;
    if (!item.baseItemId) return item;
    var baseItemId = item.baseItemId;
    var baseItem = this.getDatabase(item)[baseItemId];
    return baseItem;
};

//=============================================================================
// ItemManager
//=============================================================================

function ItemManager() {
    throw new Error('This is a static class');
};

ItemManager.setNewIndependentItem = function(baseItem, newItem) {
    newItem.baseItemId = baseItem.id;
    newItem.baseItemName = baseItem.name;
    newItem.baseItemPrice = baseItem.price;
    newItem.baseItemIconIndex = baseItem.iconIndex;
    newItem.namePrefix = '';
    newItem.nameSuffix = '';
    if (baseItem.setPriorityName) {
      newItem.priorityName = baseItem.name;
    } else {
      newItem.priorityName = '';
    }
    newItem.boostCount = 0;
    if (!Yanfly.Param.ItemNoteParse) newItem.note = '';
};

ItemManager.customizeNewIndependentItem = function(baseItem, newItem) {
    this.randomizeInitialItem(baseItem, newItem);
    this.updateItemName(newItem);
};

ItemManager.randomizeInitialItem = function(baseItem, newItem) {
    if ($gameTemp.varianceStock()) return;
    if (DataManager.isItem(baseItem)) {
      this.randomizeInitialEffects(baseItem, newItem);
    } else {
      this.randomizeInitialStats(baseItem, newItem);
    }
};

ItemManager.randomizeInitialEffects = function(baseItem, newItem) {
    if (baseItem.randomVariance <= 0) return;
    var randomValue = baseItem.randomVariance * 2 + 1;
    var offset = baseItem.randomVariance;
    newItem.effects.forEach(function(effect) {
      if (effect.code === Game_Action.EFFECT_RECOVER_HP) {
        if (effect.value1 !== 0) {
          var boost = Math.floor(Math.random() * randomValue - offset);
          effect.value1 += boost * 0.01;
          effect.value1 = parseFloat(effect.value1.toFixed(2));
          effect.value1 = effect.value1.clamp(0, 1);
        }
        if (effect.value2 !== 0) {
          effect.value2 += Math.floor(Math.random() * randomValue - offset);
        }
      }
      if (effect.code === Game_Action.EFFECT_RECOVER_MP) {
        if (effect.value1 !== 0) {
          var boost = Math.floor(Math.random() * randomValue - offset);
          effect.value1 += boost * 0.01;
          effect.value1 = parseFloat(effect.value1.toFixed(2));
          effect.value1 = effect.value1.clamp(0, 1);
        }
        if (effect.value2 !== 0) {
          effect.value2 += Math.floor(Math.random() * randomValue - offset);
        }
      }
    }, this);
};

ItemManager.randomizeInitialStats = function(baseItem, newItem) {
    if (baseItem.randomVariance <= 0) return;
    var randomValue = baseItem.randomVariance * 2 + 1;
    var offset = baseItem.randomVariance;
    for (var i = 0; i < 8; ++i) {
      if (newItem.params[i] === 0) continue;
      newItem.params[i] += Math.floor(Math.random() * randomValue - offset);
      if (!Yanfly.Param.ItemNegVar && baseItem.params[i] >= 0) {
        newItem.params[i] = Math.max(newItem.params[i], 0);
      }
    }
};

ItemManager.setBaseName = function(item, value) {
    item.baseItemName = value;
};

ItemManager.setNamePrefix = function(item, value) {
    item.namePrefix = value;
    if (eval(Yanfly.Param.ItemNameSpacing) && item.namePrefix.length > 0) {
      item.namePrefix = item.namePrefix + ' ';
    }
};

ItemManager.setNameSuffix = function(item, value) {
    item.nameSuffix = value;
    if (eval(Yanfly.Param.ItemNameSpacing) && item.nameSuffix.length > 0) {
      item.nameSuffix = ' ' + item.nameSuffix;
    }
};

ItemManager.setPriorityName = function(item, value) {
    item.priorityName = value;
};

ItemManager.updateItemName = function(item) {
    if (item.priorityName && item.priorityName.length > 0) {
      item.name = item.priorityName;
      return;
    }
    var prefix = item.namePrefix || '';
    var baseName = item.baseItemName || '';
    var suffix = item.nameSuffix || '';
    var boostCount = item.boostCount || 0;
    var fmt = Yanfly.Param.ItemBoostFmt;
    var boostText = fmt.format(Yanfly.Util.toGroup(boostCount))
    if (boostText === fmt.format(0)) {
      boostText = '';
    } else if (eval(Yanfly.Param.ItemNameSpacing)) {
      boostText = ' ' + boostText;
    }
    fmt = Yanfly.Param.ItemNameFmt;
    item.name = fmt.format(prefix, baseName, suffix, boostText);
};

ItemManager.increaseItemBoostCount = function(item, value) {
    value = value || 1;
    if (!item.boostCount) item.boostCount = 0;
    item.boostCount += value;
    this.updateItemName(item);
};

ItemManager.onCreationEval = function(baseItem, newItem) {
    var item = newItem;
    if (item.onCreationEval === '') return;
    var weapon = item;
    var armor = item;
    var baseWeapon = baseItem;
    var baseArmor = baseItem;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.onCreationEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'ITEM CREATION CUSTOM CODE ERROR');
    }
    item.onCreationEval = '';
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.enableVarianceStock = function() {
    this._independentStock = true;
};

Game_Temp.prototype.disableVarianceStock = function() {
    this._independentStock = false;
};

Game_Temp.prototype.varianceStock = function() {
    return this._independentStock;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.Item.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.Item.Game_Actor_setup.call(this, actorId);
    if ($gameTemp._initializeStartingMemberEquipment) return;
    this.initIndependentEquips($dataActors[actorId].equips);
};

Game_Actor.prototype.initIndependentEquips = function(equips) {
    var equips = this.convertInitEquips(equips);
    this.equipInitIndependentEquips(equips);
    this.releaseUnequippableItems(true);
    this.recoverAll();
    this.refresh();
};

Game_Actor.prototype.convertInitEquips = function(equips) {
    var items = [];
    for (var i = 0; i < equips.length; ++i) {
      var equipId = equips[i];
      if (equipId <= 0) continue;
      var equipType = $dataSystem.equipTypes[i + 1];
      if (equipType === $dataSystem.equipTypes[1] ||
      (i === 1 && this.isDualWield())) {
        var equip = $dataWeapons[equipId];
      } else {
        var equip = $dataArmors[equipId];
      }
      items.push(equip);
    }
    return items;
};

Game_Actor.prototype.equipInitIndependentEquips = function(equips) {
    var slots = this.equipSlots();
    var maxSlots = slots.length;
    this._equips = [];
    for (var i = 0; i < maxSlots; ++i) {
      this._equips[i] = new Game_Item();
    }
    for (var i = 0; i < maxSlots; ++i) {
      var slotType = slots[i];
      var equip = this.grabInitEquips(equips, slotType);
      if (DataManager.isIndependent(equip) && this.canEquip(equip)) {
        var array = $gameParty.gainIndependentItem(equip, 1)
        if (array instanceof Array) {
          newItem = array[0];
          this.changeEquip(i, newItem);
        }
      } else if (this.canEquip(equip)) {
        this._equips[i].setObject(equip);
      }
    }
};

Game_Actor.prototype.grabInitEquips = function(equips, slotType) {
    var item = null;
    for (var i = 0; i < equips.length; ++i) {
      var equip = equips[i];
      if (!equip) continue;
      if (slotType === 1 && DataManager.isWeapon(equip)) {
        item = equip;
        break;
      } else if (equip.etypeId === slotType) {
        item = equip;
        break;
      }
    }
    if (item) equips[i] = null;
    return item;
};

Yanfly.Item.Game_Actor_hasWeapon = Game_Actor.prototype.hasWeapon;
Game_Actor.prototype.hasWeapon = function(weapon) {
    if (this.hasBaseItem(weapon)) return true;
    return Yanfly.Item.Game_Actor_hasWeapon.call(this, weapon);
};

Yanfly.Item.Game_Actor_hasArmor = Game_Actor.prototype.hasArmor;
Game_Actor.prototype.hasArmor = function(armor) {
    if (this.hasBaseItem(armor)) return true;
    return Yanfly.Item.Game_Actor_hasArmor.call(this, armor);
};

Game_Actor.prototype.hasBaseItem = function(baseItem) {
    if (!DataManager.isIndependent(baseItem)) return false;
    var type = (DataManager.isWeapon(baseItem)) ? 'weapon' : 'armor';
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (!equip.baseItemId) continue;
      if (DataManager.isWeapon(equip) && type === 'weapon') {
        if (equip.baseItemId === baseItem.id) return true;
      } else if (DataManager.isArmor(equip) && type === 'armor') {
        if (equip.baseItemId === baseItem.id) return true;
      }
    }
    return false;
};

Yanfly.Item.Game_Actor_changeEquipById = Game_Actor.prototype.changeEquipById;
Game_Actor.prototype.changeEquipById = function(etypeId, itemId) {
    if (itemId > 0) {
      var slotId = etypeId - 1;
      if (this.equipSlots()[slotId] === 1) {
        var baseItem = $dataWeapons[itemId];
      } else {
        var baseItem = $dataArmors[itemId];
      }
      if (!$gameParty.hasItem(baseItem)) {
        $gameParty.gainItem(baseItem, 1);
      }
      if (DataManager.isIndependent(baseItem)) {
        if (this.hasBaseItem(baseItem)) return;
        var item = $gameParty.getMatchingBaseItem(baseItem, false);
        if (item === null) {
          $gameTemp.enableVarianceStock();
          $gameParty.gainItem(baseItem, 1);
          $gameTemp.disableVarianceStock();
          item = $gameParty.getMatchingBaseItem(baseItem, false);
        }
        this.changeEquip(slotId, item);
        return;
      }
    }
    Yanfly.Item.Game_Actor_changeEquipById.call(this, etypeId, itemId)
};

Game_Actor.prototype.unequipItem = function(item) {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip !== item) continue;
      this.changeEquip(i, null);
    }
};

//=============================================================================
// Game_Party
//=============================================================================

Yanfly.Item.Game_Party_setupStartingMembers =
    Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function() {
    Yanfly.Item.Game_Party_setupStartingMembers.call(this);
    $gameTemp.enableVarianceStock();
    this.initActorEquips();
    $gameTemp.disableVarianceStock();
};

Game_Party.prototype.initActorEquips = function() {
    $gameTemp._initializeStartingMemberEquipment = true;
    for (var i = 0; i < $dataActors.length; ++i) {
      var actor = $gameActors.actor(i);
      if (actor) {
        var baseActor = $dataActors[i];
        actor.initIndependentEquips(baseActor.equips);
      }
    }
    $gameTemp._initializeStartingMemberEquipment = undefined;
};

Yanfly.Item.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    if (DataManager.isIndependent(item)) {
      this.gainIndependentItem(item, amount, includeEquip);
    } else {
      Yanfly.Item.Game_Party_gainItem.call(this, item, amount, includeEquip);
    }
};

Game_Party.prototype.gainIndependentItem = function(item, amount, includeEquip) {
    var arr = [];
    if (amount > 0) {
      for (var i = 0; i < amount; ++i) {
        var newItem = DataManager.registerNewItem(item);
        this.registerNewItem(item, newItem);
        arr.push(newItem);
      }
    } else if (amount < 0) {
      amount = Math.abs(amount);
      for (var i = 0; i < amount; ++i) {
        if (item.baseItemId) {
          this.removeIndependentItem(item, includeEquip);
        } else if (DataManager.isIndependent(item)) {
          var target = $gameParty.getMatchingBaseItem(item, includeEquip);
          if (target !== null) this.removeIndependentItem(target, includeEquip);
        } else {
          this.removeBaseItem(item, includeEquip);
        }
      }
    }
    return arr;
};

Game_Party.prototype.getIndependentItemTypeMax = function(item) {
    if (!item) return 0;
    if (DataManager.isItem(item)) return Yanfly.Param.ItemMaxItems;
    if (DataManager.isWeapon(item)) return Yanfly.Param.ItemMaxWeapons;
    if (DataManager.isArmor(item)) return Yanfly.Param.ItemMaxArmors;
};

Game_Party.prototype.getIndependentItemTypeCur = function(item) {
    if (!item) return 0;
    if (DataManager.isItem(item)) return this.items().length;
    if (DataManager.isWeapon(item)) return this.weapons().length;
    if (DataManager.isArmor(item)) return this.armors().length;
};

Game_Party.prototype.registerNewItem = function(baseItem, newItem) {
    var container = this.itemContainer(baseItem);
    if (container) {
      var lastNumber = this.numItems(newItem);
      container[newItem.id] = 1;
    }
};

Game_Party.prototype.removeIndependentItem = function(item, includeEquip) {
    if (includeEquip && this.checkItemIsEquipped(item)) {
      for (var i = 1; i < $gameActors._data.length; ++i) {
        var actor = $gameActors.actor(i);
        if (!actor) continue;
        if (!actor.equips().contains(item)) continue;
        actor.unequipItem(item);
      }
    }
    var container = this.itemContainer(item);
    container[item.id] = 0;
    if (container[item.id] <= 0) delete container[item.id];

};

Game_Party.prototype.removeBaseItem = function(item, includeEquip) {
    var container = this.itemContainer(item);
    container[item.id]--;
    if (container[item.id] <= 0) delete container[item.id];
    if (includeEquip) this.discardMembersEquip(item, -1);
};

Game_Party.prototype.getMatchingBaseItem = function(baseItem, equipped) {
    if (!baseItem) return null;
    if (DataManager.isItem(baseItem)) var group = this.items();
    if (DataManager.isWeapon(baseItem)) var group = this.weapons();
    if (DataManager.isArmor(baseItem)) var group = this.armors();
    if (equipped) {
      for (var a = 0; a < this.members().length; ++a) {
        var actor = this.members()[a];
        if (!actor) continue;
        if (DataManager.isWeapon(baseItem)) {
          group = group.concat(actor.weapons());
        } else if (DataManager.isArmor(baseItem)) {
          group = group.concat(actor.armors());
        }
      }
    }
    var baseItemId = baseItem.id;
    for (var i = 0; i < group.length; ++i) {
      var item = group[i];
      if (!item) continue;
      if (!item.baseItemId) continue;
      if (item.baseItemId !== baseItemId) continue;
      return item;
    }
    return null;
};

Game_Party.prototype.checkItemIsEquipped = function(item) {
    for (var i = 1; i < $gameActors._data.length; ++i) {
      var actor = $gameActors.actor(i);
      if (!actor) continue;
      if (actor.equips().contains(item)) return true;
    }
    return false;
};

Yanfly.Item.Game_Party_items = Game_Party.prototype.items;
Game_Party.prototype.items = function() {
    var results = Yanfly.Item.Game_Party_items.call(this);
    results.sort(this.independentItemSort);
    return results;
};

Yanfly.Item.Game_Party_weapons = Game_Party.prototype.weapons;
Game_Party.prototype.weapons = function() {
    var results = Yanfly.Item.Game_Party_weapons.call(this);
    results.sort(this.independentItemSort);
    return results;
};

Yanfly.Item.Game_Party_armors = Game_Party.prototype.armors;
Game_Party.prototype.armors = function() {
    var results = Yanfly.Item.Game_Party_armors.call(this);
    results.sort(this.independentItemSort);
    return results;
};

Game_Party.prototype.independentItemSort = function(a, b) {
    var aa = (a.baseItemId) ? a.baseItemId : a.id;
    var bb = (b.baseItemId) ? b.baseItemId : b.id;
    if (aa < bb) return -1;
    if (aa >= bb) return 1;
    return 0;
};

Yanfly.Item.Game_Party_maxItems = Game_Party.prototype.maxItems;
Game_Party.prototype.maxItems = function(item) {
    if (DataManager.isIndependent(item)) return 1;
    return Yanfly.Item.Game_Party_maxItems.call(this, item);
};

Yanfly.Item.Game_Party_hasItem = Game_Party.prototype.hasItem;
Game_Party.prototype.hasItem = function(item, includeEquip) {
    if (DataManager.isIndependent(item)) {
      if (this.numIndependentItems(item) > 0) return true;
    }
    return Yanfly.Item.Game_Party_hasItem.call(this, item, includeEquip);
};

Yanfly.Item.Game_Party_isAnyMemberEquipped =
    Game_Party.prototype.isAnyMemberEquipped;
Game_Party.prototype.isAnyMemberEquipped = function(item) {
    if (DataManager.isIndependent(item)) {
      for (var i = 0; i < this.members().length; ++i) {
        var actor = this.members()[i];
        if (!actor) continue;
        if (actor.hasBaseItem(item)) return true;
      }
    }
    return Yanfly.Item.Game_Party_isAnyMemberEquipped.call(this, item);
};

Game_Party.prototype.numIndependentItems = function(baseItem) {
    var value = 0;
    if (!DataManager.isIndependent(baseItem)) return this.numItems(baseItem);
    var id = baseItem.id;
    if (DataManager.isItem(baseItem)) var group = this.items();
    if (DataManager.isWeapon(baseItem)) var group = this.weapons();
    if (DataManager.isArmor(baseItem)) var group = this.armors();
    for (var i = 0; i < group.length; ++i) {
      var item = group[i];
      if (!item) continue;
      if (item.baseItemId && item.baseItemId === id) value += 1;
    }
    return value;
};

Game_Party.prototype.clearAllMatchingBaseItems = function(baseItem, equipped) {
  if (!Imported.YEP_ItemCore) return;
  for (;;) {
    var item = this.getMatchingBaseItem(baseItem, equipped);
    if (item) {
      this.removeIndependentItem(item, equipped);
      DataManager.removeIndependentItem(item);
    } else {
      break;
    }
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Item.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Item.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'EnableVarianceStock') $gameTemp.enableVarianceStock();
    if (command === 'DisableVarianceStock') $gameTemp.disableVarianceStock();
};

Yanfly.Item.Game_Interpreter_gDO = Game_Interpreter.prototype.gameDataOperand;
Game_Interpreter.prototype.gameDataOperand = function(type, param1, param2) {
  switch (type) {
  case 0:
    return $gameParty.numIndependentItems($dataItems[param1]);
    break;
  case 1:
    return $gameParty.numIndependentItems($dataWeapons[param1]);
    break;
  case 2:
    return $gameParty.numIndependentItems($dataArmors[param1]);
    break;
  default:
    return Yanfly.Item.Game_Interpreter_gDO.call(this, type, param1, param2);
    break;
  }
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Item.Window_Base_drawItemName = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, wx, wy, ww) {
    ww = ww || 312;
    this.setItemTextColor(item);
    Yanfly.Item.Window_Base_drawItemName.call(this, item, wx, wy, ww);
    this._resetTextColor = undefined;
    this.resetTextColor();
};

Window_Base.prototype.setItemTextColor = function(item) {
    if (!item) return;
    if (item.textColor === undefined) return;
    this._resetTextColor = item.textColor;
};

Yanfly.Item.Window_Base_normalColor = Window_Base.prototype.normalColor;
Window_Base.prototype.normalColor = function() {
    if (this._resetTextColor !== undefined) {
      return this.textColor(this._resetTextColor);
    }
    return Yanfly.Item.Window_Base_normalColor.call(this);
};

//=============================================================================
// Window_ItemList
//=============================================================================

Yanfly.Item.Window_ItemList_makeItemList =
    Window_ItemList.prototype.makeItemList;
Window_ItemList.prototype.makeItemList = function() {
    Yanfly.Item.Window_ItemList_makeItemList.call(this);
    if (SceneManager._scene instanceof Scene_Item) this.listEquippedItems();
};

Window_ItemList.prototype.listEquippedItems = function() {
    if (!Yanfly.Param.ItemShEquipped) return;
    var results = [];
    for (var a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      for (var i = 0; i < actor.equips().length; ++i) {
        var equip = actor.equips()[i];
        if (!equip) continue;
        if (!equip.baseItemId) continue;
        if (this.includes(equip)) results.push(equip);
      }
    }
    this._data = results.concat(this._data);
};

Yanfly.Item.Window_ItemList_drawItemNumber =
    Window_ItemList.prototype.drawItemNumber;
Window_ItemList.prototype.drawItemNumber = function(item, dx, dy, dw) {
    if (DataManager.isIndependent(item)) {
      this.drawItemCarryNumber(item, dx, dy, dw);
      return;
    }
    Yanfly.Item.Window_ItemList_drawItemNumber.call(this, item, dx, dy, dw);
};

Window_ItemList.prototype.drawItemCarryNumber = function(item, dx, dy, dw) {
    if (DataManager.isItem(item)) {
      var index = $gameParty.items().indexOf(item);
    } else if (DataManager.isWeapon(item)) {
      var index = $gameParty.weapons().indexOf(item);
    } else if (DataManager.isArmor(item)) {
      var index = $gameParty.armors().indexOf(item);
    }
    if (index < 0) return this.drawEquippedActor(item, dx, dy, dw);
    index += 1;
    var max = $gameParty.getIndependentItemTypeMax(item);
    var fmt = Yanfly.Param.ItemCarryFmt;
    var text = fmt.format(Yanfly.Util.toGroup(index), Yanfly.Util.toGroup(max));
    if (Yanfly.Param.ItemQuantitySize) {
      this.contents.fontSize = Yanfly.Param.ItemQuantitySize;
    }
    if (index > max) {
      this.changeTextColor(this.powerDownColor());
    } else if (index === max) {
      this.changeTextColor(this.crisisColor());
    } else {
      this.changeTextColor(this.normalColor());
    }
    this.drawText(text, dx, dy, dw, 'right');
    this.resetFontSettings();
};

Window_ItemList.prototype.drawEquippedActor = function(item, dx, dy, dw) {
    var carrier = null;
    for (var a = 0; a < $gameParty.members().length; ++a) {
      var actor = $gameParty.members()[a];
      if (!actor) continue;
      if (actor.equips().contains(item)) carrier = actor;
    };
    if (Yanfly.Param.ItemQuantitySize) {
      this.contents.fontSize = Yanfly.Param.ItemQuantitySize;
    }
    var text = carrier.name();
    this.drawText(text, dx, dy, dw, 'right');
    this.resetFontSettings();
};

//=============================================================================
// Window_EquipItem
//=============================================================================

Yanfly.Item.Window_EquipItem_includes = Window_EquipItem.prototype.includes;
Window_EquipItem.prototype.includes = function(item) {
    if (this._actor && item !== null) {
      if (!item) return false;
    }
    return Yanfly.Item.Window_EquipItem_includes.call(this, item);
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

Yanfly.Item.Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
Window_ShopBuy.prototype.isEnabled = function(item) {
    if (DataManager.isIndependent(item)) {
      var typeMax = $gameParty.getIndependentItemTypeMax(item);
      var typeCur = $gameParty.getIndependentItemTypeCur(item);
      if (typeCur >= typeMax) return false;
    }
    return Yanfly.Item.Window_ShopBuy_isEnabled.call(this, item);
};

//=============================================================================
// Window_ShopStatus
//=============================================================================

Yanfly.Item.Window_ShopStatus_drawPossession =
    Window_ShopStatus.prototype.drawPossession;
Window_ShopStatus.prototype.drawPossession = function(x, y) {
    if (DataManager.isIndependent(this._item)) {
      return this.drawIndependentPossession(x, y);
    }
    Yanfly.Item.Window_ShopStatus_drawPossession.call(this, x, y);
};

Window_ShopStatus.prototype.drawIndependentPossession = function(x, y) {
    var width = this.contents.width - this.textPadding() - x;
    var baseItem = DataManager.getBaseItem(this._item);
    var value = $gameParty.numIndependentItems(baseItem);
    value = Yanfly.Util.toGroup(value);
    var possessionWidth = this.textWidth(value);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.possession, x, y, width - possessionWidth);
    this.resetTextColor();
    this.drawText(value, x, y, width, 'right');
};

//=============================================================================
// Scene_Equip
//=============================================================================

Yanfly.Item.Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function() {
    this.actor().releaseUnequippableItems();
    Yanfly.Item.Scene_Equip_refreshActor.call(this);
};

//=============================================================================
// Scene_Shop
//=============================================================================

Yanfly.Item.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
    $gameTemp.enableVarianceStock();
    Yanfly.Item.Scene_Shop_doBuy.call(this, number);
    $gameTemp.disableVarianceStock();
};

Yanfly.Item.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
    Yanfly.Item.Scene_Shop_doSell.call(this, number);
    if (!DataManager.isIndependent(this._item)) return;
    DataManager.removeIndependentItem(this._item);
};

//=============================================================================
// Scene_Item 1.6.0 Code Suppress
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") {

Scene_Item.prototype.update = function() {
  Scene_ItemBase.prototype.update.call(this);
};

}; // Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0"

//=============================================================================
// Scene_Item Update
//=============================================================================

if (Yanfly.Param.ItemSceneItem) {

//=============================================================================
// Window_ItemCategory
//=============================================================================

Yanfly.Item.Window_ItemCategory_windowWidth =
    Window_ItemCategory.prototype.windowWidth;
Window_ItemCategory.prototype.windowWidth = function() {
    if (SceneManager._scene instanceof Scene_Item) return 240;
    return Yanfly.Item.Window_ItemCategory_windowWidth.call(this);
};

Yanfly.Item.Window_ItemCategory_numVisibleRows =
    Window_ItemCategory.prototype.numVisibleRows;
Window_ItemCategory.prototype.numVisibleRows = function() {
    if (SceneManager._scene instanceof Scene_Item) return 4;
    return Yanfly.Item.Window_ItemCategory_numVisibleRows.call(this);
};

Yanfly.Item.Window_ItemCategory_maxCols = Window_ItemCategory.prototype.maxCols;
Window_ItemCategory.prototype.maxCols = function() {
    if (SceneManager._scene instanceof Scene_Item) return 1;
    return Yanfly.Item.Window_ItemCategory_maxCols.call(this);
};

Yanfly.Item.Window_ItemCategory_itemTextAlign =
    Window_ItemCategory.prototype.itemTextAlign;
Window_ItemCategory.prototype.itemTextAlign = function() {
    if (SceneManager._scene instanceof Scene_Item) {
      return Yanfly.Param.ItemCmdAlign;
    }
    return Yanfly.Item.Window_ItemCategory_itemTextAlign.call(this);
};

//=============================================================================
// Window_ItemList
//=============================================================================

Yanfly.Item.Window_ItemList_initialize = Window_ItemList.prototype.initialize;
Window_ItemList.prototype.initialize = function(x, y, width, height) {
    if (SceneManager._scene instanceof Scene_Item) {
      width = Graphics.boxWidth / 2;
    }
    Yanfly.Item.Window_ItemList_initialize.call(this, x, y, width, height);
};

Yanfly.Item.Window_ItemList_maxCols = Window_ItemList.prototype.maxCols;
Window_ItemList.prototype.maxCols = function() {
    if (SceneManager._scene instanceof Scene_Item) return 1;
    return Yanfly.Item.Window_ItemList_maxCols.call(this);
};

Yanfly.Item.Window_ItemList_isEnabled = Window_ItemList.prototype.isEnabled;
Window_ItemList.prototype.isEnabled = function(item) {
    if (!item) return false;
    if (SceneManager._scene instanceof Scene_Item) return true;
    return Yanfly.Item.Window_ItemList_isEnabled.call(this, item);
};

Window_ItemList.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.update();
};

Window_ItemList.prototype.setInfoWindow = function(infoWindow) {
    this._infoWindow = infoWindow;
    this.update();
};

Yanfly.Item.Window_ItemList_updateHelp = Window_ItemList.prototype.updateHelp;
Window_ItemList.prototype.updateHelp = function() {
    Yanfly.Item.Window_ItemList_updateHelp.call(this);
    if (SceneManager._scene instanceof Scene_Item && this._statusWindow) {
      this._statusWindow.setItem(this.item());
    }
    if (SceneManager._scene instanceof Scene_Item && this._infoWindow) {
      this._infoWindow.setItem(this.item());
    }
};

//=============================================================================
// Window_ItemStatus
//=============================================================================

function Window_ItemStatus() {
    this.initialize.apply(this, arguments);
}

Window_ItemStatus.prototype = Object.create(Window_Base.prototype);
Window_ItemStatus.prototype.constructor = Window_ItemStatus;

Window_ItemStatus.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this.deactivate();
    this.refresh();
};

Window_ItemStatus.prototype.setItem = function(item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
};

Window_ItemStatus.prototype.refresh = function() {
    this.contents.clear();
    this.drawDarkRectEntries();
    if (!this._item) return;
    this.contents.fontSize = Yanfly.Param.ItemFontSize;
    this.drawItemEntry();
};

Window_ItemStatus.prototype.drawDarkRectEntries = function() {
    var rect = new Rectangle();
    if (Yanfly.Param.ItemShowIcon) {
      rect.width = Window_Base._faceWidth;
      rect.height = Window_Base._faceHeight;
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
      rect.width = (this.contents.width - Window_Base._faceWidth) / 2;
    } else {
      rect.width = this.contents.width / 2;
    }
    rect.height = this.lineHeight();
    for (var i = 0; i < 8; ++i) {
      rect = this.getRectPosition(rect, i);
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    }
};

Window_ItemStatus.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_ItemStatus.prototype.getRectPosition = function(rect, i) {
    if (i % 2 === 0) {
      if (Yanfly.Param.ItemShowIcon) {
        rect.x = Window_Base._faceWidth;
      } else {
        rect.x = 0;
      }
      rect.y = i / 2 * this.lineHeight();
    } else {
      if (Yanfly.Param.ItemShowIcon) {
        rect.x = Window_Base._faceWidth + rect.width;
      } else {
        rect.x = rect.width;
      }
    }
    return rect;
};

Window_ItemStatus.prototype.drawItemEntry = function() {
    var item = this._item;
    if (Yanfly.Param.ItemShowIcon) this.drawItemIcon(item);
    if (DataManager.isItem(item)) this.drawItemInfo(item);
    if (DataManager.isWeapon(item)) this.drawEquipInfo(item);
    if (DataManager.isArmor(item)) this.drawEquipInfo(item);
};

Window_ItemStatus.prototype.drawItemIcon = function() {
    this.drawLargeIcon();
};

Window_ItemStatus.prototype.drawLargeIcon = function() {
    var iconIndex = this._item.iconIndex;
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var dw = Yanfly.Param.ItemIconSize;
    var dh = Yanfly.Param.ItemIconSize;
    var dx = (Window_Base._faceWidth - dw) / 2;
    var dy = (Window_Base._faceHeight - dh) / 2;
    this.contents._context.imageSmoothingEnabled = false;
    this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);
    this.contents._context.imageSmoothingEnabled = true;
};

Window_ItemStatus.prototype.drawEquipInfo = function(item) {
    var rect = new Rectangle();
    if (eval(Yanfly.Param.ItemShowIcon)) {
      rect.width = (this.contents.width - Window_Base._faceWidth) / 2;
    } else {
      rect.width = this.contents.width / 2;
    }
    for (var i = 0; i < 8; ++i) {
      rect = this.getRectPosition(rect, i);
      var dx = rect.x + this.textPadding();
      var dw = rect.width - this.textPadding() * 2;
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(i), dx, rect.y, dw);
      this.changeTextColor(this.paramchangeTextColor(item.params[i]));
      var text = Yanfly.Util.toGroup(item.params[i]);
      if (item.params[i] >= 0) text = '+' + text;
      if (text === '+0') this.changePaintOpacity(false);
      this.drawText(text, dx, rect.y, dw, 'right');
      this.changePaintOpacity(true);
    }
};

Window_ItemStatus.prototype.drawItemInfo = function(item) {
    var rect = new Rectangle();
    if (eval(Yanfly.Param.ItemShowIcon)) {
      rect.width = (this.contents.width - Window_Base._faceWidth) / 2;
    } else {
      rect.width = this.contents.width / 2;
    }
    for (var i = 0; i < 8; ++i) {
      rect = this.getRectPosition(rect, i);
      var dx = rect.x + this.textPadding();
      var dw = rect.width - this.textPadding() * 2;
      this.changeTextColor(this.systemColor());
      var text = this.getItemInfoCategory(i);
      this.drawText(text, dx, rect.y, dw);
      this.drawItemData(i, dx, rect.y, dw);
    }
};

Window_ItemStatus.prototype.getItemInfoCategory = function(i) {
    var fmt = Yanfly.Param.ItemRecoverFmt;
    if (i === 0) return fmt.format(TextManager.param(0));
    if (i === 1) return fmt.format(TextManager.hp);
    if (i === 2) return fmt.format(TextManager.param(1));
    if (i === 3) return fmt.format(TextManager.mp);
    if (i === 4) return Yanfly.Param.ItemAddState;
    if (i === 5) return Yanfly.Param.ItemRemoveState;
    if (i === 6) return Yanfly.Param.ItemAddBuff;
    if (i === 7) return Yanfly.Param.ItemRemoveBuff;
    return '';
};

Window_ItemStatus.prototype.drawItemData = function(i, dx, dy, dw) {
    if (!this._item) return;
    var effect;
    var value = '---';
    var pre = '';
    var text = '';
    var icons = [];
    if (i === 0) {
      effect = this.getEffect(Game_Action.EFFECT_RECOVER_HP);
      value = (effect) ? effect.value1 : '---';
      if (value === 0) value = '---';
      if (value !== '---' && value !== 0) value *= 100;
    }
    if (i === 1) {
      effect = this.getEffect(Game_Action.EFFECT_RECOVER_HP);
      value = (effect) ? effect.value2 : '---';
      if (value === 0) value = '---';
    }
    if (i === 2) {
      effect = this.getEffect(Game_Action.EFFECT_RECOVER_MP);
      value = (effect) ? effect.value1 : '---';
      if (value === 0) value = '---';
      if (value !== '---' && value !== 0) value *= 100;
    }
    if (i === 3) {
      effect = this.getEffect(Game_Action.EFFECT_RECOVER_MP);
      value = (effect) ? effect.value2 : '---';
      if (value === 0) value = '---';
    }
    if (i >= 4) {
      icons = this.getItemIcons(i, icons);
    }
    this.changeTextColor(this.normalColor());
    if (value === '---') {
      this.changePaintOpacity(false);
    } else if (i < 4) {
      if (value > 0) pre = '+';
      value = Yanfly.Util.toGroup(parseInt(value));
      if ([0, 2].contains(i)) text = '%';
    }
    if (icons.length > 0) {
      this.changePaintOpacity(true);
      dx = dx + dw - icons.length * Window_Base._iconWidth;
      dx += this.textPadding() - 2;
      for (var j = 0; j < icons.length; ++j) {
        var icon = icons[j];
        this.drawIcon(icon, dx, dy + 2);
        dx += Window_Base._iconWidth;
      }
    } else {
      text = pre + value + text;
      this.drawText(text, dx, dy, dw, 'right');
      this.changePaintOpacity(true);
    }
};

Window_ItemStatus.prototype.getEffect = function(code) {
    var targetEffect;
    this._item.effects.forEach(function(effect) {
      if (effect.code === code) targetEffect = effect;
    }, this);
    return targetEffect;
};

Window_ItemStatus.prototype.getItemIcons = function(i, array) {
    this._item.effects.forEach(function(effect) {
      if (i === 4 && effect.code === Game_Action.EFFECT_ADD_STATE) {
        var state = $dataStates[effect.dataId];
        if (state && state.iconIndex !== 0) array.push(state.iconIndex);
      }
      if (i === 5 && effect.code === Game_Action.EFFECT_REMOVE_STATE) {
        var state = $dataStates[effect.dataId];
        if (state && state.iconIndex !== 0) array.push(state.iconIndex);
      }
      if (i === 6 && effect.code === Game_Action.EFFECT_ADD_BUFF) {
        var icon = Game_BattlerBase.ICON_BUFF_START + effect.dataId;
        array.push(icon);
      }
      if (i === 6 && effect.code === Game_Action.EFFECT_ADD_DEBUFF) {
        var icon = Game_BattlerBase.ICON_DEBUFF_START + effect.dataId;
        array.push(icon);
      }
      if (i === 7 && effect.code === Game_Action.EFFECT_REMOVE_BUFF) {
        var icon = Game_BattlerBase.ICON_BUFF_START + effect.dataId;
        array.push(icon);
      }
      if (i === 7 && effect.code === Game_Action.EFFECT_REMOVE_DEBUFF) {
        var icon = Game_BattlerBase.ICON_DEBUFF_START + effect.dataId;
        array.push(icon);
      }
    }, this);
    array = array.slice(0, Yanfly.Param.ItemMaxIcons);
    return array;
};

//=============================================================================
// Window_ItemInfo
//=============================================================================

function Window_ItemInfo() {
    this.initialize.apply(this, arguments);
}

Window_ItemInfo.prototype = Object.create(Window_Base.prototype);
Window_ItemInfo.prototype.constructor = Window_ItemInfo;

Window_ItemInfo.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this.deactivate();
    this.refresh();
};

Window_ItemInfo.prototype.setItem = function(item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
};

Window_ItemInfo.prototype.refresh = function() {
    this.contents.clear();
    var dy = 0;
    if (!this._item) return dy;
    this.preInfoEval();
    dy = this.drawPreItemInfo(dy);
    dy = this.drawItemInfo(dy);
    dy = this.drawItemInfoA(dy);
    dy = this.drawItemInfoB(dy);
    dy = this.drawItemInfoC(dy);
    dy = this.drawItemInfoD(dy);
    dy = this.drawItemInfoE(dy);
    return this.drawItemInfoF(dy);
};

Window_ItemInfo.prototype.preInfoEval = function() {
    var item = this._item;
    if (item.infoEval === undefined) {
      item.infoEval = DataManager.getBaseItem(item).infoEval;
    }
    if (item.infoEval === '') return;
    var weapon = this._item;
    var armor = this._item;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.infoEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'ITEM WINDOW PRE INFO EVAL ERROR');
    }
};

Window_ItemInfo.prototype.drawPreItemInfo = function(dy) {
    return dy;
};

Window_ItemInfo.prototype.drawItemInfo = function(dy) {
    var dx = this.textPadding();
    var dw = this.contents.width - this.textPadding() * 2;
    this.resetFontSettings();
    this.drawItemName(this._item, dx, dy, dw);
    return dy + this.lineHeight();
};

Window_ItemInfo.prototype.drawItemInfoA = function(dy) {
    dy = this.drawInfoTextTop(dy);
    return dy;
};

Window_ItemInfo.prototype.drawItemInfoB = function(dy) {
    return dy;
};

Window_ItemInfo.prototype.drawItemInfoC = function(dy) {
    return dy;
};

Window_ItemInfo.prototype.drawItemInfoD = function(dy) {
    return dy;
};

Window_ItemInfo.prototype.drawItemInfoE = function(dy) {
    return dy;
};

Window_ItemInfo.prototype.drawItemInfoF = function(dy) {
    dy = this.drawInfoTextBottom(dy);
    return dy;
};

Window_ItemInfo.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_ItemInfo.prototype.drawInfoTextTop = function(dy) {
    var item = this._item;
    if (item.infoTextTop === undefined) {
      item.infoTextTop = DataManager.getBaseItem(item).infoTextTop;
    }
    if (item.infoTextTop === '') return dy;
    var info = item.infoTextTop.split(/[\r\n]+/);
    for (var i = 0; i < info.length; ++i) {
      var line = info[i];
      this.resetFontSettings();
      this.drawTextEx(line, this.textPadding(), dy);
      dy += this.contents.fontSize + 8;
    }
    return dy;
};

Window_ItemInfo.prototype.drawInfoTextBottom = function(dy) {
    var item = this._item;
    if (item.infoTextBottom === undefined) {
      item.infoTextBottom = DataManager.getBaseItem(item).infoTextBottom;
    }
    if (item.infoTextBottom === '') return dy;
    var info = item.infoTextBottom.split(/[\r\n]+/);
    for (var i = 0; i < info.length; ++i) {
      var line = info[i];
      this.resetFontSettings();
      this.drawTextEx(line, this.textPadding(), dy);
      dy += this.contents.fontSize + 8;
    }
    return dy;
};

//=============================================================================
// Window_ItemActionCommand
//=============================================================================

function Window_ItemActionCommand() {
    this.initialize.apply(this, arguments);
}

Window_ItemActionCommand.prototype = Object.create(Window_Command.prototype);
Window_ItemActionCommand.prototype.constructor = Window_ItemActionCommand;

Window_ItemActionCommand.prototype.initialize = function(x, y) {
    this._windowHeight = Graphics.boxHeight - y;
    Window_Command.prototype.initialize.call(this, x, y);
    this._item = null;
    this.hide();
    this.deactivate();
};

Window_ItemActionCommand.prototype.windowWidth = function() {
    return Graphics.boxWidth / 2;
};

Window_ItemActionCommand.prototype.update = function() {
  Window_Command.prototype.update.call(this);
};

Window_ItemActionCommand.prototype.setItem = function(item) {
    this._item = item;
    this.refresh();
    this.show();
    this.activate();
    this.select(0);
};

Window_ItemActionCommand.prototype.windowHeight = function() {
    return this._windowHeight;
};

Window_ItemActionCommand.prototype.makeCommandList = function() {
    if (!this._item) return;
    this.addUseCommand();
    this.addCustomCommandsA();
    this.addCustomCommandsB();
    this.addCustomCommandsC();
    this.addCustomCommandsD();
    this.addCustomCommandsE();
    this.addCustomCommandsF();
    this.addCancelCommand();
};

Window_ItemActionCommand.prototype.addUseCommand = function() {
    var enabled = this.isEnabled(this._item);
    var fmt = Yanfly.Param.ItemUseCmd;
    text = '\\i[' + this._item.iconIndex + ']';
    if (this._item.textColor !== undefined) {
      text += '\\c[' + this._item.textColor + ']';
    }
    text += this._item.name;
    text = fmt.format(text);
    this.addCommand(text, 'use', enabled);
};

Window_ItemActionCommand.prototype.isEnabled = function(item) {
    if (!item) return false;
    return $gameParty.canUse(item);
};

Window_ItemActionCommand.prototype.addCustomCommandsA = function() {
};

Window_ItemActionCommand.prototype.addCustomCommandsB = function() {
};

Window_ItemActionCommand.prototype.addCustomCommandsC = function() {
};

Window_ItemActionCommand.prototype.addCustomCommandsD = function() {
};

Window_ItemActionCommand.prototype.addCustomCommandsE = function() {
};

Window_ItemActionCommand.prototype.addCustomCommandsF = function() {
};

Window_ItemActionCommand.prototype.addCancelCommand = function() {
    this.addCommand(TextManager.cancel, 'cancel');
};

Window_ItemActionCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawTextEx(this.commandName(index), rect.x, rect.y);
};

//=============================================================================
// Scene_Item
//=============================================================================

Yanfly.Item.Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
Scene_Item.prototype.createItemWindow = function() {
    Yanfly.Item.Scene_Item_createItemWindow.call(this);
    this.createStatusWindow();
    this.createInfoWindow();
    this.createActionWindow();
    this._categoryWindow.setHandler('cancel', this.exitScene.bind(this));
};

Scene_Item.prototype.createStatusWindow = function() {
    var wx = this._categoryWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = this._categoryWindow.height;
    this._statusWindow = new Window_ItemStatus(wx, wy, ww, wh);
    this._itemWindow.setStatusWindow(this._statusWindow);
    this.addWindow(this._statusWindow);
};

Scene_Item.prototype.createInfoWindow = function() {
    var wx = this._itemWindow.width;
    var wy = this._itemWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._itemWindow.height;
    this._infoWindow = new Window_ItemInfo(wx, wy, ww, wh);
    this._itemWindow.setInfoWindow(this._infoWindow);
    this.addWindow(this._infoWindow);
};

Scene_Item.prototype.createActionWindow = function() {
    var wy = this._itemWindow.y;
    this._itemActionWindow = new Window_ItemActionCommand(0, wy);
    this._itemActionWindow.setHandler('use', this.onActionUse.bind(this));
    this._itemActionWindow.setHandler('cancel', this.onActionCancel.bind(this));
    this.addWindow(this._itemActionWindow);
};

Scene_Item.prototype.isCursorLeft = function() {
    return true;
};

Scene_Item.prototype.onItemOk = function() {
    var item = this.item();
    this._itemActionWindow.setItem(item);
};

Yanfly.Item.Scene_Item_onItemCancel = Scene_Item.prototype.onItemCancel;
Scene_Item.prototype.onItemCancel = function() {
    Yanfly.Item.Scene_Item_onItemCancel.call(this);
    this._statusWindow.setItem(null);
    this._infoWindow.setItem(null);
};

Scene_Item.prototype.onActionUse = function() {
    this._itemActionWindow.hide();
    this._itemActionWindow.deactivate();
    $gameParty.setLastItem(this.item());
    this.determineItem();
};

Scene_Item.prototype.onActionCancel = function() {
    this._itemActionWindow.hide();
    this._itemActionWindow.deactivate();
    this._itemWindow.activate();
};

Yanfly.Item.Scene_Item_applyItem = Scene_Item.prototype.applyItem;
Scene_Item.prototype.applyItem = function() {
    Yanfly.Item.Scene_Item_applyItem.call(this);
    if (DataManager.isIndependent(this.item())) this.onActorCancel();
};

Scene_Item.prototype.exitScene = function() {
    var length = $gameParty.members().length;
    for (var i = 0; i < length; ++i) {
      var member = $gameParty.members()[i];
      if (member) member.refresh();
    }
    this.popScene();
};

//=============================================================================
// Scene_Item Update
//=============================================================================

}; // End Scene_Item

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
   Yanfly.Util.toGroup = function(inVal) {
       return inVal;
   }
};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
