//=============================================================================
// Yanfly Engine Plugins - Enemy Levels
// YEP_EnemyLevels.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EnemyLevels = true;

var Yanfly = Yanfly || {};
Yanfly.ELV = Yanfly.ELV || {};
Yanfly.ELV.version = 1.09;

//=============================================================================
 /*:
 * @plugindesc YEP敌人等级系统[v1.09]
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @text --- 通用设置 ---
 * @default
 *
 * @param Show Level
 * @text 显示等级
 * @parent ---General---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 默认是否显示敌人等级
 * @default true
 *
 * @param Level Format
 * @text 等级格式格式
 * @parent ---General---
 * @desc 敌人名称与等级的格式化方式
 %1 - 等级，%2 - 名称
 * @default Lv%1 %2
 *
 * @param Minimum Level
 * @text 最低等级
 * @parent ---General---
 * @type number
 * @min 1
 * @desc 敌人可有的默认最低等级
 * @default 1
 *
 * @param Maximum Level
 * @text 最高等级
 * @parent ---General---
 * @type number
 * @min 1
 * @desc 敌人可有的默认最高等级
 * @default 9999
 *
 * @param Maximum Cap
 * @text 最大上限
 * @parent ---General---
 * @type number
 * @min 1
 * @desc 敌人可能达到的最高等级
 * @default 9999
 *
 * @param Preserve Rate
 * @text 保留比例
 * @parent ---General---
 * @type boolean
 * @on 是
 * @off 否 
 * @desc 等级变化时，保留敌人的 HP/MP 比例
 * @default true
 *
 * @param ---Level Setup---
 * @text --- 等级设置 ---
 * @default
 *
 * @param Default Type
 * @text 默认类型
 * @parent ---Level Setup---
 * @type select
 * @option 所有加入玩家队伍的角色中的最低等级
 * @value 0
 * @option 所有在战斗队伍中的角色中的最低等级
 * @value 1
 * @option 所有加入玩家队伍的角色的平均等级
 * @value 2
 * @option 所有在战斗队伍中的角色的平均等级
 * @value 3
 * @option 所有加入玩家队伍的角色中的最高等级
 * @value 4
 * @option 所有在战斗队伍中的角色中的最高等级
 * @value 5
 * @desc 基于玩家队伍计算的默认等级类型
 * @default 5
 *
 * @param Positive Fluctuation
 * @text 正向波动
 * @parent ---Level Setup---
 * @type number
 * @min 0
 * @desc 所有敌人的默认正向等级波动值
 * @default 2
 *
 * @param Negative Fluctuation
 * @text 负向波动
 * @parent ---Level Setup---
 * @type number
 * @min 0
 * @desc 所有敌人的默认负向等级波动值
 * @default 2
 *
 * @param ---MaxHP Growth---
 * @text --- 最大 HP 成长 ---
 * @default
 *
 * @param MaxHP Formula
 * @text 最大 HP 公式
 * @parent ---MaxHP Growth---
 * @desc 用于该参数计算的公式
 * @default base * (1 + (level - 1) * rate) + (flat * (level - 1))
 *
 * @param MaxHP Rate Growth
 * @text 最大 HP 成长率
 * @parent ---MaxHP Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc 该参数每级的成长率
 * @default 0.15
 *
 * @param MaxHP Flat Growth
 * @text 最大 HP 固定成长
 * @parent ---MaxHP Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc 该参数每级的固定成长值
 * @default 50.0
 *
 * @param ---MaxMP Growth---
 * @text --- 最大 MP 成长 ---
 * @default
 *
 * @param MaxMP Formula
 * @text 最大 MP 公式
 * @parent ---MaxMP Growth---
 * @desc The formula used for this parameter's calculations.
 * @default base * (1 + (level - 1) * rate) + (flat * (level - 1))
 *
 * @param MaxMP Rate Growth
 * @text 最大 MP 成长率
 * @parent ---MaxMP Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The growth rate for this parameter per level.
 * @default 0.10
 *
 * @param MaxMP Flat Growth
 * @text 最大 MP 固定成长
 * @parent ---MaxMP Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The flat growth value for this parameter per level.
 * @default 10.0
 *
 * @param ---ATK Growth---
 * @text --- ATK 成长 ---
 * @default
 *
 * @param ATK Formula
 * @text 攻击力 公式
 * @parent ---ATK Growth---
 * @desc The formula used for this parameter's calculations.
 * @default base * (1 + (level - 1) * rate) + (flat * (level - 1))
 *
 * @param ATK Rate Growth
 * @text 攻击力 成长率
 * @parent ---ATK Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The growth rate for this parameter per level.
 * @default 0.05
 *
 * @param ATK Flat Growth
 * @text 攻击力 固定成长
 * @parent ---ATK Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The flat growth value for this parameter per level.
 * @default 2.5
 *
 * @param ---DEF Growth---
 * @text --- DEF 成长 ---
 * @default
 *
 * @param DEF Formula
 * @text 防御力 公式
 * @parent ---DEF Growth---
 * @desc The formula used for this parameter's calculations.
 * @default base * (1 + (level - 1) * rate) + (flat * (level - 1))
 *
 * @param DEF Rate Growth
 * @text 防御力 成长率
 * @parent ---DEF Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The growth rate for this parameter per level.
 * @default 0.05
 *
 * @param DEF Flat Growth
 * @text 防御力 固定成长
 * @parent ---DEF Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The flat growth value for this parameter per level.
 * @default 2.5
 *
 * @param ---MAT Growth---
 * @text --- MAT 成长 ---
 * @default
 *
 * @param MAT Formula
 * @text 魔法攻击力 公式
 * @parent ---MAT Growth---
 * @desc The formula used for this parameter's calculations.
 * @default base * (1 + (level - 1) * rate) + (flat * (level - 1))
 *
 * @param MAT Rate Growth
 * @text 魔法攻击力 成长率
 * @parent ---MAT Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The growth rate for this parameter per level.
 * @default 0.05
 *
 * @param MAT Flat Growth
 * @text 魔法攻击力 固定成长
 * @parent ---MAT Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The flat growth value for this parameter per level.
 * @default 2.5
 *
 * @param ---MDF Growth---
 * @text --- MDF 成长 ---
 * @default
 *
 * @param MDF Formula
 * @text 魔法防御力 公式
 * @parent ---MDF Growth---
 * @desc The formula used for this parameter's calculations.
 * @default base * (1 + (level - 1) * rate) + (flat * (level - 1))
 *
 * @param MDF Rate Growth
 * @text 魔法防御力 成长率
 * @parent ---MDF Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The growth rate for this parameter per level.
 * @default 0.05
 *
 * @param MDF Flat Growth
 * @text 魔法防御力 固定成长
 * @parent ---MDF Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The flat growth value for this parameter per level.
 * @default 2.5
 *
 * @param ---AGI Growth---
 * @text --- AGI 成长 ---
 * @default
 *
 * @param AGI Formula
 * @text 敏捷度 公式
 * @parent ---AGI Growth---
 * @desc The formula used for this parameter's calculations.
 * @default base * (1 + (level - 1) * rate) + (flat * (level - 1))
 *
 * @param AGI Rate Growth
 * @text 敏捷度 成长率
 * @parent ---AGI Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The growth rate for this parameter per level.
 * @default 0.05
 *
 * @param AGI Flat Growth
 * @text 敏捷度 固定成长
 * @parent ---AGI Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The flat growth value for this parameter per level.
 * @default 2.5
 *
 * @param ---LUK Growth---
 * @text --- LUK 成长 ---
 * @default
 *
 * @param LUK Formula
 * @text 幸运值 公式
 * @parent ---LUK Growth---
 * @desc The formula used for this parameter's calculations.
 * @default base * (1 + (level - 1) * rate) + (flat * (level - 1))
 *
 * @param LUK Rate Growth
 * @text 幸运值 成长率
 * @parent ---LUK Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The growth rate for this parameter per level.
 * @default 0.05
 *
 * @param LUK Flat Growth
 * @text 幸运值 固定成长
 * @parent ---LUK Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The flat growth value for this parameter per level.
 * @default 2.5
 *
 * @param ---EXP Growth---
 * @text --- EXP 成长 ---
 * @default
 *
 * @param EXP Formula
 * @text 经验值 公式
 * @parent ---EXP Growth---
 * @desc The formula used for this parameter's calculations.
 * @default base * (1 + (level - 1) * rate) + (flat * (level - 1))
 *
 * @param EXP Rate Growth
 * @text 经验值 成长率
 * @parent ---EXP Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The growth rate for this parameter per level.
 * @default 0.15
 *
 * @param EXP Flat Growth
 * @text 经验值 固定成长
 * @parent ---EXP Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The flat growth value for this parameter per level.
 * @default 10.0
 *
 * @param ---Gold Growth---
 * @text --- Gold 成长 ---
 * @default
 *
 * @param Gold Formula
 * @text 金币 公式
 * @parent ---Gold Growth---
 * @desc The formula used for this parameter's calculations.
 * @default base * (1 + (level - 1) * rate) + (flat * (level - 1))
 *
 * @param Gold Rate Growth
 * @text 金币 成长率
 * @parent ---Gold Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The growth rate for this parameter per level.
 * @default 0.15
 *
 * @param Gold Flat Growth
 * @text 金币 固定成长
 * @parent ---Gold Growth---
 * @type number
 * @min 0
 * @decimals 2
 * @desc The flat growth value for this parameter per level.
 * @default 10.0
 *
 * @help
 * ============================================================================
 * 术语含义
 * ============================================================================
 *
MaxMP：最大魔法值
ATK：攻击力
DEF：防御力
MAT：魔法攻击力
MDF：魔法防御力
AGI：敏捷度
LUK：幸运值
EXP：经验值
Gold：金币
 *

正向波动和负向波动是用于敌人初始等级基准值
上下浮动范围的参数：

正向波动：默认值为 2，代表敌人的初始等级在
计算出的基准等级基础上最多可以向上浮动的数值
例如，若基准等级为 10，正向波动为 2
则敌人等级可能在 10 的基础上增加 0-2 级（即最高到 12 级）

负向波动：默认值为 2，代表敌人的初始等级在
计算出的基准等级基础上最多可以向下浮动的数值
例如，若基准等级为 10，负向波动为 2
则敌人等级可能在 10 的基础上减少 0-2 级（即最低到 8 级）


这两个参数的作用是让同一种敌人在不同战斗中出现时
等级有一定随机性，避免完全固定波动计算在战斗开始
时进行，且会受到敌人自身设置的最低等级和最高等级限制
 
-----------------------------------------------------------------------------
base * (1 + (level - 1) * rate) + (flat * (level - 1))

base：该属性的基础值（来自敌人数据库中的初始设定）
level：敌人当前的等级
rate：每级的成长率（对应插件参数中的 “XX Rate Growth”，如 MaxHP 的成长率）
flat：每级的固定成长值（对应插件参数中的 “XX Flat Growth”，如 MaxHP 的固定成长值）
 
 
 ============================================================================
 * 敌人备注标签
 * ============================================================================
 *
<Show Level>   显示
<Hide Level>   隐藏
设置敌人在目标选择时显示或隐藏等级
 *
<Minimum Level: x>
<Maximum Level: x>
分别设置敌人的最低和最高等级
战斗开始时敌人等级在此范围内调整
 *
<Static Level: x>
设置敌人的起始等级为 x
 *
<Starting Level Type: x>
设置敌人的起始等级类型为 x（0-5，参考默认等级类型）
 *
<Positive Level Fluctuation: x>
<Negative Level Fluctuation: x>
设置敌人的正向 / 负向等级波动值
 *
<Level Fluctuation: x>
同时设置正向和负向等级波动值为 x
 *
<stat Rate: +x% per level>
<stat Rate: -x% per level>
<stat Rate: +x.y per level>
<stat Rate: -x.y per level>
设置对应属性（stat 替换为 maxhp、maxmp 等）每级的成长率变化
 *
<stat Flat: +x per level>
<stat Flat: -x per level>
<stat Flat: +x.y per level>
<stat Flat: -x.y per level>
设置对应属性每级的固定成长值变化
 *
<Resist Level Change>
使敌人免疫通过技能和物品改变等级的效果（脚本调用除外）
 *
<Skill x Require Level: y>
<Skill name Require Level: y>
敌人使用技能 x（或指定名称的技能）需至少达到等级 y，否则技能被封印
 *
<Ignore Level Bonus>
敌人忽略等级带来的所有属性变化，使用基础属性，等级变化不影响属性

<Custom Starting Level>
 ...
</Custom Starting Level>  
自定义敌人的起始等级（需 JavaScript 经验）

<Custom Parameter stat Formula>
 ... 
</Custom Parameter stat Formula>
自定义属性计算公式（需 JavaScript 经验）



技能和物品备注标签：

<Reset Enemy Level>
将目标敌人的等级重置为战斗开始时的等级
 *
<Change Enemy Level: +x>
<Change Enemy Level: -x>
对敌人使用时，改变其等级 ±x（若同时有重置和等级变化，先重置）

<Custom Change Enemy Level>
 ... 
</Custom Change Enemy Level>
自定义改变敌人等级的方式（需 JavaScript 经验）


 * ============================================================================
 * 新增 JavaScript 函数
 * ============================================================================
 *
 *
 * enemy.level
 * - 返回敌人当前等级
 *
 * enemy.originalLevel()
 * - 返回敌人战斗开始时的原始等级
 *
 * enemy.changeLevel(x)
 * - 将敌人等级改为 x
 *
 * enemy.gainLevel(x)
 * - 敌人提升 x 级
 *
 * enemy.loseLevel(x)
 * - 敌人降低 x 级
 *
 * enemy.resetLevel()
 * - 将敌人等级重置为战斗开始时的等级
 *
 * $gameParty.lowestLevelAllMembers()
 * - This will return the lowest level of all party members.
 *
 * $gameParty.lowestLevelBattleMembers()
 * - This will return the lowest level of all battle members.
 *
 * $gameParty.averageLevelAllMembers()
 * - This will return the average level of all party members.
 *
 * $gameParty.averageLevelBattleMembers()
 * - This will return the average level of all battle members.
 *
 * $gameParty.highestLevelAllMembers()
 * - This will return the highest level of all party members.
 *
 * $gameParty.highestLevelBattleMembers()
 * - This will return the highest level of all battle members.
 *
 * $gameTroop.changeLevel(x)
 * - Changes the levels of all enemies to x.
 *
 * $gameTroop.gainLevel(x)
 * - Raises the levels of all enemies by x.
 *
 * $gameTroop.loseLevel(x)
 * - Lowers the levels of all enemies by x.
 *
 * $gameTroop.resetLevel()
 * - Resets the levels of all enemies to their original levels at battle start.
 *
 * $gameTroop.lowestLevel()
 * - This will return the lowest level of the enemy party.
 *
 * $gameTroop.averageLevel()
 * - This will return the lowest level of the enemy party.
 *
 * $gameTroop.highestLevel()
 * - This will return the lowest level of the enemy party.
 *
 * ============================================================================
 * 插件命令（仅在战斗中使用）
 * ============================================================================
 *
 *
 *   EnemyLevelChange 2 to 50
 *   - 将位置 2 的敌人等级改为 50
 *
 *   EnemyLevelChangeAll 50
 *   - 将所有敌人等级改为 50
 *
 *   EnemyGainLevel 3 by 20
 *   - 位置 3 的敌人提升 20 级
 *
 *   EnemyGainLevelAll 20
 *   - 所有敌人提升 20 级
 *
 *   EnemyLoseLevel 4 by 10
 *   - 位置 4 的敌人降低 10 级
 *
 *   EnemyLoseLevelAll 10
 *   - 所有敌人降低 10 级
 *
 *   EnemyLevelReset 5
 *   - 重置位置 5 的敌人等级为战斗开始时的等级
 *
 *   EnemyLevelResetAll
 *   - 重置所有敌人等级为原始等级
 *
 * ============================================================================
 * 更新
 * ============================================================================
 *
版本 1.09：
解决了因更新至 MV 1.6.1 后，当脚本调用或自定义疯狂模式代码段中插入错误代码时出现的 isDevToolsOpen () 错误。
版本 1.08：
适配 RPG Maker MV 1.5.0 版本。
版本 1.07：
敌人变身事件现在在变身为不同敌人时会调整属性值。
版本 1.06：
新增疯狂模式（Lunatic Mode）的安全机制。
版本 1.05：
更新了自定义等级公式，支持使用 'b'、'r' 和 'f' 这几个变量，以便兼容 FlyingDream 的计算器公式。
版本 1.04：
适配 RPG Maker MV 1.1.0 版本。
版本 1.03：
修复了敌人平均等级计算类型的一个 bug。
版本 1.02：
修复了一行代码未正确添加的 bug。
版本 1.01：
新增 <Ignore Level Bonus> 备注标签。该标签使敌人保持当前等级，但忽略因等级差异带来的所有属性加成。即使敌人等级改变，其属性也保持不变。
版本 1.00：
插件完成发布！
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EnemyLevels');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ELVShow = eval(String(Yanfly.Parameters['Show Level']));
Yanfly.Param.ELVFmt = String(Yanfly.Parameters['Level Format']);
Yanfly.Param.ELVMinLv = Number(Yanfly.Parameters['Minimum Level']);
Yanfly.Param.ELVMaxLv = Number(Yanfly.Parameters['Maximum Level']);
Yanfly.Param.ELVMaxCap = Number(Yanfly.Parameters['Maximum Cap']);
Yanfly.Param.ELVPreserveRate = eval(String(Yanfly.Parameters['Preserve Rate']));

Yanfly.Param.ELVDefaultType = Number(Yanfly.Parameters['Default Type']);
Yanfly.Param.ELVPosFluc = Number(Yanfly.Parameters['Positive Fluctuation']);
Yanfly.Param.ELVNegFluc = Number(Yanfly.Parameters['Negative Fluctuation']);
Yanfly.Param.ELVFormula = [
  String(Yanfly.Parameters['MaxHP Formula']),
  String(Yanfly.Parameters['MaxMP Formula']),
  String(Yanfly.Parameters['ATK Formula']),
  String(Yanfly.Parameters['DEF Formula']),
  String(Yanfly.Parameters['MAT Formula']),
  String(Yanfly.Parameters['MDF Formula']),
  String(Yanfly.Parameters['AGI Formula']),
  String(Yanfly.Parameters['LUK Formula']),
  String(Yanfly.Parameters['EXP Formula']),
  String(Yanfly.Parameters['Gold Formula'])
];
Yanfly.Param.ELVRate = [
  Number(Yanfly.Parameters['MaxHP Rate Growth']),
  Number(Yanfly.Parameters['MaxMP Rate Growth']),
  Number(Yanfly.Parameters['ATK Rate Growth']),
  Number(Yanfly.Parameters['DEF Rate Growth']),
  Number(Yanfly.Parameters['MAT Rate Growth']),
  Number(Yanfly.Parameters['MDF Rate Growth']),
  Number(Yanfly.Parameters['AGI Rate Growth']),
  Number(Yanfly.Parameters['LUK Rate Growth']),
  Number(Yanfly.Parameters['EXP Rate Growth']),
  Number(Yanfly.Parameters['Gold Rate Growth'])
];
Yanfly.Param.ELVFlat = [
  Number(Yanfly.Parameters['MaxHP Flat Growth']),
  Number(Yanfly.Parameters['MaxMP Flat Growth']),
  Number(Yanfly.Parameters['ATK Flat Growth']),
  Number(Yanfly.Parameters['DEF Flat Growth']),
  Number(Yanfly.Parameters['MAT Flat Growth']),
  Number(Yanfly.Parameters['MDF Flat Growth']),
  Number(Yanfly.Parameters['AGI Flat Growth']),
  Number(Yanfly.Parameters['LUK Flat Growth']),
  Number(Yanfly.Parameters['EXP Flat Growth']),
  Number(Yanfly.Parameters['Gold Flat Growth'])
];

//=============================================================================
// DataManager
//=============================================================================

Yanfly.ELV.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.ELV.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_EnemyLevels) {
    this.processELVNotetagsS($dataSkills);
    this.processELVNotetags1($dataEnemies);
    this.processELVNotetags2($dataSkills);
    this.processELVNotetags2($dataItems);
    Yanfly._loaded_YEP_EnemyLevels = true;
  }
  return true;
};

DataManager.processELVNotetagsS = function(group) {
  if (Yanfly.SkillIdRef) return;
  Yanfly.SkillIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.SkillIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processELVNotetags1 = function(group) {
  var note1a = /<(.*)[ ]RATE:[ ]([\+\-]\d+)([%％])[ ]PER LEVEL>/i;
  var note1b = /<(.*)[ ]RATE:[ ]([\+\-]\d+).(\d+)[ ]PER LEVEL>/i;
  var note2a = /<(.*)[ ]FLAT:[ ]([\+\-]\d+)[ ]PER LEVEL>/i;
  var note2b = /<(.*)[ ]FLAT:[ ]([\+\-]\d+).(\d+)[ ]PER LEVEL>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.showLevel = Yanfly.Param.ELVShow;
    obj.ignoreLevelBonuses = false;
    obj.minLevel = Yanfly.Param.ELVMinLv;
    obj.maxLevel = Yanfly.Param.ELVMaxLv;
    obj.levelType = Yanfly.Param.ELVDefaultType;
    obj.positiveLevelFluctuation = Yanfly.Param.ELVPosFluc;
    obj.negativeLevelFluctuation = Yanfly.Param.ELVPosFluc;
    obj.baseParamFormula = Yanfly.Param.ELVFormula.slice();
    obj.baseParamRate = Yanfly.Param.ELVRate.slice();
    obj.baseParamFlat = Yanfly.Param.ELVFlat.slice();
    obj.resistLevelChange = false;
    obj.skillLevelRequirements = {};
    var evalMode = 'none';
    var evalParam = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:SHOW LEVEL)>/i)) {
        obj.showLevel = true;
      } else if (line.match(/<(?:HIDE LEVEL)>/i)) {
        obj.showLevel = false;
      } else if (line.match(/<(?:IGNORE LEVEL BONUS|IGNORE LEVEL BONUSES)>/i)) {
        obj.ignoreLevelBonuses = true;
      } else if (line.match(/<(?:MIN LEVEL|MINIMUM LEVEL):[ ](\d+)>/i)) {
        obj.minLevel = parseInt(RegExp.$1);
      } else if (line.match(/<(?:MAX LEVEL|MAXIMUM LEVEL):[ ](\d+)>/i)) {
        obj.maxLevel = parseInt(RegExp.$1);
      } else if (line.match(/<(?:SET LEVEL|STATIC LEVEL):[ ](\d+)>/i)) {
        obj.minLevel = parseInt(RegExp.$1);
        obj.maxLevel = parseInt(RegExp.$1);
      } else if (line.match(/<(?:LEVEL TYPE|STARTING LEVEL TYPE):[ ](\d+)>/i)) {
        obj.levelType = parseInt(RegExp.$1).clamp(0, 5);
      } else if (line.match(/<POSITIVE LEVEL FLUCTUATION:[ ](\d+)>/i)) {
        obj.positiveLevelFluctuation = parseInt(RegExp.$1);
      } else if (line.match(/<NEGATIVE LEVEL FLUCTUATION:[ ](\d+)>/i)) {
        obj.negativeLevelFluctuation = parseInt(RegExp.$1);
      } else if (line.match(/<LEVEL FLUCTUATION:[ ](\d+)>/i)) {
        obj.positiveLevelFluctuation = parseInt(RegExp.$1);
        obj.negativeLevelFluctuation = parseInt(RegExp.$1);
      } else if (line.match(note1a)) {
        var param = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(RegExp.$2)  * 0.01;
        if (['MAXHP', 'MAX HP', 'MHP', 'HP'].contains(param)) {
          param = 0;
        } else if (['MAXMP', 'MAX MP', 'MMP', 'MP', 'MAXSP', 'MAX SP', 'MSP',
        'SP'].contains(param)) {
          param = 1;
        } else if (['ATK', 'STR'].contains(param)) {
          param = 2;
        } else if (['DEF'].contains(param)) {
          param = 3;
        } else if (['MAT', 'INT', 'SPI'].contains(param)) {
          param = 4;
        } else if (['MDF', 'RES'].contains(param)) {
          param = 5;
        } else if (['AGI', 'SPD'].contains(param)) {
          param = 6;
        } else if (['LUK'].contains(param)) {
          param = 7;
        } else if (['EXP', 'XP'].contains(param)) {
          param = 8;
        } else if (['GOLD'].contains(param)) {
          param = 9;
        } else {
          continue;
        }
        obj.baseParamRate[param] = rate;
      } else if (line.match(note1b)) {
        var param = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(String(RegExp.$2) + '.' + String(RegExp.$3));
        if (['MAXHP', 'MAX HP', 'MHP', 'HP'].contains(param)) {
          param = 0;
        } else if (['MAXMP', 'MAX MP', 'MMP', 'MP', 'MAXSP', 'MAX SP', 'MSP',
        'SP'].contains(param)) {
          param = 1;
        } else if (['ATK', 'STR'].contains(param)) {
          param = 2;
        } else if (['DEF'].contains(param)) {
          param = 3;
        } else if (['MAT', 'INT', 'SPI'].contains(param)) {
          param = 4;
        } else if (['MDF', 'RES'].contains(param)) {
          param = 5;
        } else if (['AGI', 'SPD'].contains(param)) {
          param = 6;
        } else if (['LUK'].contains(param)) {
          param = 7;
        } else if (['EXP', 'XP'].contains(param)) {
          param = 8;
        } else if (['GOLD'].contains(param)) {
          param = 9;
        } else {
          continue;
        }
        obj.baseParamRate[param] = rate;
      } else if (line.match(note2a)) {
        var param = String(RegExp.$1).toUpperCase();
        var flat = parseFloat(RegExp.$2);
        if (['MAXHP', 'MAX HP', 'MHP', 'HP'].contains(param)) {
          param = 0;
        } else if (['MAXMP', 'MAX MP', 'MMP', 'MP', 'MAXSP', 'MAX SP', 'MSP',
        'SP'].contains(param)) {
          param = 1;
        } else if (['ATK', 'STR'].contains(param)) {
          param = 2;
        } else if (['DEF'].contains(param)) {
          param = 3;
        } else if (['MAT', 'INT', 'SPI'].contains(param)) {
          param = 4;
        } else if (['MDF', 'RES'].contains(param)) {
          param = 5;
        } else if (['AGI', 'SPD'].contains(param)) {
          param = 6;
        } else if (['LUK'].contains(param)) {
          param = 7;
        } else if (['EXP', 'XP'].contains(param)) {
          param = 8;
        } else if (['GOLD'].contains(param)) {
          param = 9;
        } else {
          continue;
        }
        obj.baseParamFlat[param] = flat;
      } else if (line.match(note2b)) {
        var param = String(RegExp.$1).toUpperCase();
        var flat = parseFloat(String(RegExp.$2) + '.' + String(RegExp.$3));
        if (['MAXHP', 'MAX HP', 'MHP', 'HP'].contains(param)) {
          param = 0;
        } else if (['MAXMP', 'MAX MP', 'MMP', 'MP', 'MAXSP', 'MAX SP', 'MSP',
        'SP'].contains(param)) {
          param = 1;
        } else if (['ATK', 'STR'].contains(param)) {
          param = 2;
        } else if (['DEF'].contains(param)) {
          param = 3;
        } else if (['MAT', 'INT', 'SPI'].contains(param)) {
          param = 4;
        } else if (['MDF', 'RES'].contains(param)) {
          param = 5;
        } else if (['AGI', 'SPD'].contains(param)) {
          param = 6;
        } else if (['LUK'].contains(param)) {
          param = 7;
        } else if (['EXP', 'XP'].contains(param)) {
          param = 8;
        } else if (['GOLD'].contains(param)) {
          param = 9;
        } else {
          continue;
        }
        obj.baseParamFlat[param] = flat;
      } else if (line.match(/<\/CUSTOM PARAMETER[ ](.*)[ ]FORMULA>/i)) {
        evalMode = 'none';
        evalParam = 0;
      } else if (line.match(/<CUSTOM PARAMETER[ ](.*)[ ]FORMULA>/i)) {
        var param = String(RegExp.$1).toUpperCase();
        if (['MAXHP', 'MAX HP', 'MHP', 'HP'].contains(param)) {
          param = 0;
        } else if (['MAXMP', 'MAX MP', 'MMP', 'MP', 'MAXSP', 'MAX SP', 'MSP',
        'SP'].contains(param)) {
          evalParam = 1;
        } else if (['ATK', 'STR'].contains(param)) {
          evalParam = 2;
        } else if (['DEF'].contains(param)) {
          evalParam = 3;
        } else if (['MAT', 'INT', 'SPI'].contains(param)) {
          evalParam = 4;
        } else if (['MDF', 'RES'].contains(param)) {
          evalParam = 5;
        } else if (['AGI', 'SPD'].contains(param)) {
          evalParam = 6;
        } else if (['LUK'].contains(param)) {
          evalParam = 7;
        } else if (['EXP', 'XP'].contains(param)) {
          evalParam = 8;
        } else if (['GOLD'].contains(param)) {
          evalParam = 9
        } else {
          continue;
        }
        obj.baseParamFormula[evalParam] = '';
        evalMode = 'custom param level formula';
      } else if (evalMode === 'custom param level formula') {
        var pId = evalParam;
        obj.baseParamFormula[pId] = obj.baseParamFormula[pId] + line + '\n';
      } else if (line.match(/<(?:RESIST LEVEL CHANGE)>/i)) {
        obj.resistLevelChange = true;
      } else if (line.match(/<SKILL[ ](\d+)[ ]REQUIRE LEVEL:[ ](\d+)>/i)) {
        var skillId = parseInt(RegExp.$1);
        var level = parseInt(RegExp.$2);
        obj.skillLevelRequirements[skillId] = level;
      } else if (line.match(/<SKILL[ ](.*)[ ]REQUIRE LEVEL:[ ](\d+)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var level = parseInt(RegExp.$2);
        if (Yanfly.SkillIdRef[name]) {
          var skillId = Yanfly.SkillIdRef[name];
        } else {
          continue;
        }
        obj.skillLevelRequirements[skillId] = level;
      }
    }

    evalMode = 'none';

    if (obj.levelType === 0) {
      obj.startingLevel = 'level = $gameParty.lowestLevelAllMembers()';
    } else if (obj.levelType === 1) {
      obj.startingLevel = 'level = $gameParty.lowestLevelBattleMembers()';
    } else if (obj.levelType === 2) {
      obj.startingLevel = 'level = $gameParty.averageLevelAllMembers()';
    } else if (obj.levelType === 3) {
      obj.startingLevel = 'level = $gameParty.averageLevelBattleMembers()';
    } else if (obj.levelType === 4) {
      obj.startingLevel = 'level = $gameParty.highestLevelAllMembers()';
    } else if (obj.levelType === 5) {
      obj.startingLevel = 'level = $gameParty.highestLevelBattleMembers()';
    }
    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:CUSTOM STARTING LEVEL)>/i)) {
        obj.startingLevel = '';
        evalMode = 'custom starting level';
      } else if (line.match(/<\/(?:CUSTOM STARTING LEVEL)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom starting level') {
        obj.startingLevel = obj.startingLevel + line + '\n';
      }
    }
  }
};

DataManager.processELVNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.resetEnemyLevel = false;
    obj.changeEnemyLevel = 0;
    obj.enemyLevelEval = '';
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:CHANGE ENEMY LEVEL):[ ]([\+\-]\d+)>/i)) {
        obj.changeEnemyLevel = parseInt(RegExp.$1);
      } else if (line.match(/<(?:RESET ENEMY LEVEL)>/i)) {
        obj.resetEnemyLevel = true;
      } else if (line.match(/<(?:CUSTOM CHANGE ENEMY LEVEL)>/i)) {
        var evalMode = 'custom change enemy level';
      } else if (line.match(/<\/(?:CUSTOM CHANGE ENEMY LEVEL)>/i)) {
        var evalMode = 'none';
      } else if (evalMode === 'custom change enemy level') {
        obj.enemyLevelEval = obj.enemyLevelEval + line + '\n';
      }
    }
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.ELV.Game_BattlerBase_isSkillSealed =
    Game_BattlerBase.prototype.isSkillSealed;
Game_BattlerBase.prototype.isSkillSealed = function(skillId) {
    if (this.isEnemySkillLevelSealed(skillId)) return true;
    return Yanfly.ELV.Game_BattlerBase_isSkillSealed.call(this, skillId);
};

Game_BattlerBase.prototype.isEnemySkillLevelSealed = function(skillId) {
    if (!this.isEnemy()) return false;
    if (!this.enemy().skillLevelRequirements[skillId]) return false;
    var reqLevel = this.enemy().skillLevelRequirements[skillId];
    return this.level < reqLevel;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Object.defineProperty(Game_Enemy.prototype, 'level', {
    get: function() {
        return this._level;
    },
    configurable: true
});

Yanfly.ELV.Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
    Yanfly.ELV.Game_Enemy_initMembers.call(this);
    this._level = 0;
};

Yanfly.ELV.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    this._enemyId = enemyId;
    this.setupEnemyLevel();
    Yanfly.ELV.Game_Enemy_setup.call(this, enemyId, x, y);
};

Game_Enemy.prototype.setupEnemyLevel = function() {
    var min = this.setupMinimumLevel();
    var max = this.setupMaximumLevel();
    this._level = this.getSetupLevel().clamp(min, max);
    this.applySetupLevelFluctuation();
    this._level = this._level.clamp(1, Yanfly.Param.ELVMaxCap);
    this._originalLevel = this._level;
};

Game_Enemy.prototype.setupMinimumLevel = function() {
    return this.enemy().minLevel;
};

Game_Enemy.prototype.setupMaximumLevel = function() {
    return this.enemy().maxLevel;
};

Game_Enemy.prototype.originalLevel = function() {
    return this._originalLevel;
};

Game_Enemy.prototype.getSetupLevel = function() {
    var level = 0;
    var code = this.enemy().startingLevel;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'ENEMY STARTING LEVEL ERROR');
    }
    return Math.floor(level);
};

Game_Enemy.prototype.applySetupLevelFluctuation = function() {
    var min = this._level - this.negativeLevelFluctuation();
    var max = this._level + this.positiveLevelFluctuation();
    this._level = Math.floor(Math.random() * (max - min + 1) + min);
};

Game_Enemy.prototype.negativeLevelFluctuation = function() {
    return this.enemy().negativeLevelFluctuation;
};

Game_Enemy.prototype.positiveLevelFluctuation = function() {
    return this.enemy().positiveLevelFluctuation;
};

Yanfly.ELV.Game_Enemy_name = Game_Enemy.prototype.name;
Game_Enemy.prototype.name = function() {
    var name = Yanfly.ELV.Game_Enemy_name.call(this);
    if (this.enemy().showLevel) {
      var fmt = Yanfly.Param.ELVFmt;
      name = fmt.format(this.level, name);
    }
    return name;
};

Yanfly.ELV.Game_Enemy_paramBase = Game_Enemy.prototype.paramBase;
Game_Enemy.prototype.paramBase = function(paramId) {
    this._cacheBaseParam = this._cacheBaseParam || {};
    if (this._cacheBaseParam[paramId]) return this._cacheBaseParam[paramId];
    var base = Yanfly.ELV.Game_Enemy_paramBase.call(this, paramId);
    if (this.enemy().ignoreLevelBonuses) {
      this._cacheBaseParam[paramId] = base;
      return this._cacheBaseParam[paramId];
    }
    var level = this.level;
    var formula = this.enemy().baseParamFormula[paramId];
    var rate = this.enemy().baseParamRate[paramId];
    var flat = this.enemy().baseParamFlat[paramId];
    var user = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      this._cacheBaseParam[paramId] = eval(formula);
    } catch (e) {
      this._cacheBaseParam[paramId] = 0;
      Yanfly.Util.displayError(e, formula, 'ENEMY PARAM BASE FORMULA ERROR');
    }
    return this._cacheBaseParam[paramId];
};

Yanfly.ELV.Game_Enemy_exp = Game_Enemy.prototype.exp;
Game_Enemy.prototype.exp = function() {
    var paramId = 8;
    this._cacheBaseParam = this._cacheBaseParam || {};
    if (this._cacheBaseParam[paramId]) return this._cacheBaseParam[paramId];
    var base = Yanfly.ELV.Game_Enemy_exp.call(this);
    if (this.enemy().ignoreLevelBonuses) {
      this._cacheBaseParam[paramId] = base;
      return this._cacheBaseParam[paramId];
    }
    var level = this.level;
    var formula = this.enemy().baseParamFormula[paramId];
    var rate = this.enemy().baseParamRate[paramId];
    var flat = this.enemy().baseParamFlat[paramId];
    var user = this;
    var b = base;
    var l = level;
    var f = flat;
    var r = rate;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      this._cacheBaseParam[paramId] = Math.floor(eval(formula));
    } catch (e) {
      this._cacheBaseParam[paramId] = 0;
      Yanfly.Util.displayError(e, formula, 'ENEMY EXP FORMULA ERROR');
    }
    return this._cacheBaseParam[paramId];
};

Yanfly.ELV.Game_Enemy_gold = Game_Enemy.prototype.gold;
Game_Enemy.prototype.gold = function() {
    var paramId = 9;
    this._cacheBaseParam = this._cacheBaseParam || {};
    if (this._cacheBaseParam[paramId]) return this._cacheBaseParam[paramId];
    var base = Yanfly.ELV.Game_Enemy_gold.call(this);
    if (this.enemy().ignoreLevelBonuses) {
      this._cacheBaseParam[paramId] = base;
      return this._cacheBaseParam[paramId];
    }
    var level = this.level;
    var formula = this.enemy().baseParamFormula[paramId];
    var rate = this.enemy().baseParamRate[paramId];
    var flat = this.enemy().baseParamFlat[paramId];
    var user = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      this._cacheBaseParam[paramId] = Math.floor(eval(formula));
    } catch (e) {
      this._cacheBaseParam[paramId] = 0;
      Yanfly.Util.displayError(e, formula, 'ENEMY GOLD FORMULA ERROR');
    }
    return this._cacheBaseParam[paramId];
};

Game_Enemy.prototype.changeLevel = function(level) {
    if (level === this._level) return;
    if (Yanfly.Param.ELVPreserveRate) {
      var hpRate = this.hp / Math.max(1, this.mhp);
      var mpRate = this.mp / Math.max(1, this.mmp);
      var prevHp = Math.min(this.hp, 1);
    }
    this._level = level.clamp(1, Yanfly.Param.ELVMaxCap);
    this._cacheBaseParam = {};
    this.refresh();
    if (Yanfly.Param.ELVPreserveRate) {
      var max = this.isDead() ? 0 : prevHp;
      var hpAmount = Math.max(max, parseInt(this.mhp * hpRate));
      this.setHp(hpAmount);
      this.setMp(parseInt(this.mmp * mpRate));
    }
};

Game_Enemy.prototype.gainLevel = function(value) {
    this.changeLevel(this.level + value)
};

Game_Enemy.prototype.loseLevel = function(value) {
    this.changeLevel(this.level - value)
};

Game_Enemy.prototype.isResistLevelChange = function() {
    return this.enemy().resistLevelChange;
};

Game_Enemy.prototype.resetLevel = function() {
    this.changeLevel(this.originalLevel());
};

Yanfly.ELV.Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
  Yanfly.ELV.Game_Enemy_transform.call(this, enemyId);
  this._cacheBaseParam = {};
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.lowestLevelAllMembers = function() {
    var length = this.allMembers().length;
    var value = Yanfly.Param.ELVMaxCap;
    for (var i = 0; i < length; ++i) {
      var member = this.allMembers()[i];
      value = Math.min(value, member.level);
    }
    return value;
};

Game_Party.prototype.lowestLevelBattleMembers = function() {
    var length = this.battleMembers().length;
    var value = Yanfly.Param.ELVMaxCap;
    for (var i = 0; i < length; ++i) {
      var member = this.battleMembers()[i];
      value = Math.min(value, member.level);
    }
    return value;
};

Game_Party.prototype.averageLevelAllMembers = function() {
    var length = this.allMembers().length;
    var value = 0;
    for (var i = 0; i < length; ++i) {
      var member = this.allMembers()[i];
      value += member.level;
    }
    return Math.ceil(value / length);
};

Game_Party.prototype.averageLevelBattleMembers = function() {
    var length = this.battleMembers().length;
    var value = 0;
    for (var i = 0; i < length; ++i) {
      var member = this.battleMembers()[i];
      value += member.level;
    }
    return Math.ceil(value / length);
};

Game_Party.prototype.highestLevelAllMembers = function() {
    var length = this.allMembers().length;
    var value = 0;
    for (var i = 0; i < length; ++i) {
      var member = this.allMembers()[i];
      value = Math.max(value, member.level);
    }
    return value;
};

Game_Party.prototype.highestLevelBattleMembers = function() {
    var length = this.battleMembers().length;
    var value = 0;
    for (var i = 0; i < length; ++i) {
      var member = this.battleMembers()[i];
      value = Math.max(value, member.level);
    }
    return value;
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.changeLevel = function(value) {
    var length = this.members().length;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      if (member) member.changeLevel(value);
    }
};

Game_Troop.prototype.gainLevel = function(value) {
    var length = this.members().length;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      if (member) member.gainLevel(value);
    }
};

Game_Troop.prototype.loseLevel = function(value) {
    var length = this.members().length;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      if (member) member.loseLevel(value);
    }
};

Game_Troop.prototype.resetLevel = function() {
    var length = this.members().length;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      if (member) member.resetLevel();
    }
};

Game_Troop.prototype.lowestLevel = function() {
    var length = this.members().length;
    var value = Yanfly.Param.ELVMaxCap;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      value = Math.min(value, member.level);
    }
    return value;
};

Game_Troop.prototype.averageLevel = function() {
    var length = this.members().length;
    var value = 0;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      value = member.level;
    }
    return Math.ceil(value / length);
};

Game_Troop.prototype.highestLevel = function() {
    var length = this.members().length;
    var value = 0;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      value = Math.max(value, member.level);
    }
    return value;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.ELV.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.ELV.Game_Action_applyItemUserEffect.call(this, target);
    if (target && target.isEnemy()) this.applyItemEnemyLevelEffects(target);
};

Game_Action.prototype.applyItemEnemyLevelEffects = function(target) {
    if (!this.item()) return;
    if (target.isResistLevelChange()) return;
    if (this.item().resetEnemyLevel) target.resetLevel();
    var level = target.level + this.item().changeEnemyLevel;
    if (this.item().enemyLevelEval !== '') {
      level = this.itemEnemyLevelEval(target, level);
    }
    target.changeLevel(level);
};

Game_Action.prototype.itemEnemyLevelEval = function(target, level) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = this.item().enemyLevelEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'ENEMY LEVEL ITEM ALTER CODE ERROR');
    }
    return level;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.ELV.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.ELV.Game_Interpreter_pluginCommand.call(this, command, args);
  if (!$gameParty.inBattle()) return;
  if (command === 'EnemyLevelReset') this.resetEnemyLevel(args);
  if (command === 'EnemyLevelResetAll') $gameTroop.resetLevel();
  if (command === 'EnemyLevelChange') this.changeEnemyLevel(args);
  if (command === 'EnemyLevelChangeAll') this.changeEnemyLevelAll(args);
  if (command === 'EnemyGainLevel') this.gainEnemyLevel(args);
  if (command === 'EnemyGainLevelAll') this.gainEnemyLevelAll(args);
  if (command === 'EnemyLoseLevel') this.loseEnemyLevel(args);
  if (command === 'EnemyLoseLevelAll') this.loseEnemyLevelAll(args);
};

Game_Interpreter.prototype.resetEnemyLevel = function(args) {
  if (!args) return;
  var index = parseInt(args[0]) - 1;
  var enemy = $gameTroop.members()[index];
  if (enemy) enemy.resetLevel();
};

Game_Interpreter.prototype.changeEnemyLevel = function(args) {
  if (!args) return;
  var index = parseInt(args[0]) - 1;
  var level = parseInt(args[2]);
  var enemy = $gameTroop.members()[index];
  if (enemy) enemy.changeLevel(level);
};

Game_Interpreter.prototype.changeEnemyLevelAll = function(args) {
  if (!args) return;
  var level = parseInt(args[0]);
  $gameTroop.changeLevel(level);
};

Game_Interpreter.prototype.gainEnemyLevel = function(args) {
  if (!args) return;
  var index = parseInt(args[0]) - 1;
  var level = parseInt(args[2]);
  var enemy = $gameTroop.members()[index];
  if (enemy) enemy.gainLevel(level);
};

Game_Interpreter.prototype.gainEnemyLevelAll = function(args) {
  if (!args) return;
  var level = parseInt(args[0]);
  $gameTroop.gainLevel(level)
};

Game_Interpreter.prototype.loseEnemyLevel = function(args) {
  if (!args) return;
  var index = parseInt(args[0]) - 1;
  var level = parseInt(args[2]);
  var enemy = $gameTroop.members()[index];
  if (enemy) enemy.loseLevel(level);
};

Game_Interpreter.prototype.loseEnemyLevelAll = function(args) {
  if (!args) return;
  var level = parseInt(args[0]);
  $gameTroop.loseLevel(level)
};

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
