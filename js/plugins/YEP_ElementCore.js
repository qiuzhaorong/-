//=============================================================================
// Yanfly Engine Plugins - Element Core
// YEP_ElementCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ElementCore = true;

var Yanfly = Yanfly || {};
Yanfly.Ele = Yanfly.Ele || {};
Yanfly.Ele.version = 1.03;

//=============================================================================
 /*:
 * @plugindesc YEP元素核心[v1.02]
 * @author Yanfly Engine Plugins
 *
 * @param Multi-Element Rulings
 * @text 多元素规则
 * @type select
 * @option 最低
 * @value 0
 * @option 相加[元素倍率相加]
 * @value 1
 * @option 相乘[元素倍率相乘]
 * @value 2
 * @option 最高[元素倍率最大值]
 * @value 3
 * @option 平均[元素倍率平均值]
 * @value 4
 * @desc 当技能 / 物品拥有多个元素时，使用以下规则计算伤害倍率
 * @default 2
 *
 * @help
 * ============================================================================
 * 插件描述
 * ============================================================================
 *
   用于管理游戏中元素的作用方式，包括元素吸收、元素反射等更多功能
 *
 * ============================================================================
 * 标签
 * ============================================================================
 *
 * 使用这些注释标签可以修改数据库对象的元素相关属性
 *
 * 技能与物品注释标签
 *
<Bypass Element Reflect>
忽略元素反射
 
 
<Multiple Elements: x>                // 添加元素ID为x的元素
<Multiple Elements: x to y>           // 添加元素ID从x到y的范围
<Multiple Elements: 名称1, 名称2>     // 添加指定名称的元素（如"fire, ice"）
添加多元素 在原有元素基础上额外添加元素（可多次添加）

<Multi-Element Rule: Lowest>    // 最低
<Multi-Element Rule: Add>       // 相加
<Multi-Element Rule: Multiply>  // 相乘
<Multi-Element Rule: Highest>   // 最高
<Multi-Element Rule: Average>   // 平均
单独设置多元素规则
 
-------------------------------------------------------------------------------
战斗者标签（角色 / 敌人 / 装备 / 状态等）

在角色、职业、敌人、武器、防具或状态的注释栏中添加以下标签，调整元素相关属性：

元素吸收
<Element Absorb: x>                // 吸收元素ID为x的伤害
<Element Absorb: 名称1, 名称2>     // 吸收指定名称的元素（如"thunder, water"）
吸收该元素的伤害（元素倍率降低 200%，最低为 0.01%）

元素反射率调整
<Element Reflect x: +y%>    // 元素x的反射率增加y%
<Element Reflect 名称: -y%> // 元素（名称）的反射率减少y%
多元素技能会累加每个元素的反射率

元素伤害倍率调整（乘法）
<Element Magnify x: +y%>    // 释放元素x的技能时，伤害增加y%（乘法计算）
<Element Magnify 名称: -y%> // 释放元素（名称）的技能时，伤害减少y%
多元素时累加后与基础倍率相乘（最低 0%）

元素伤害倍率调整（加法）
<Element Amplify x: +y%>    // 释放元素x的技能时，伤害增加y%（加法计算）
<Element Amplify 名称: -y%> // 释放元素（名称）的技能时，伤害减少y%
多元素时累加后与基础倍率相加

元素无效化
<Element Null>
使战斗者使用的技能 / 物品不附带任何元素（强制元素除外）

强制元素倍率
<Force Element x Rate: y%>   // 强制元素x的倍率为y%（y为负数则吸收）
<Force Element 名称 Rate: y%> // 强制元素（名称）的倍率为y%
优先级：状态 > 装备 > 职业 > 角色 / 敌人
================================================================================
战斗引擎扩展（需配合 YEP_BattleEngineCore）
若已安装 YEP_BattleEngineCore 并将本插件放在其下方
可在动作序列中使用以下命令：

添加元素
ADD ELEMENT: x                // 添加元素ID为x
ADD ELEMENT: 名称1, 名称2     // 添加指定名称的元素
为当前技能 / 物品临时添加元素

清除元素设置
CLEAR ELEMENT
恢复默认元素计算，清除临时添加 / 强制的元素

强制元素
FORCE ELEMENT: x              // 强制使用元素x（忽略其他元素）
FORCE ELEMENT: 名称1, 名称2   // 强制使用指定名称的元素

元素无效化
NULL ELEMENT
元素伤害倍率恒为 100%，清除强制元素效果
-----------------------------------------------------------------------
示例
给一个技能添加 “火” 和 “雷” 元素，并设置倍率相乘：
在技能注释中添加：
<Multiple Elements: fire, thunder>
<Multi-Element Rule: Multiply>

让敌人吸收 “水” 元素，反射 50% 火焰伤害：
在敌人注释中添加：
<Element Absorb: water>
<Element Reflect fire: +50%>

通过以上标签和命令，可以灵活配置元素系统的交互逻辑，丰富战斗策略

 *
 * ============================================================================
 * 更新
 * ============================================================================
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.02:
 * - Added <Element x Magnify: +y%>, <Element x Magnify: -y%> notetags. These
 * notetags different from the Amplify counterparts in a way where the Amplify
 * notetags will shift the element rate additively. These will alter the rate
 * multiplicatively.
 *
 * Version 1.01:
 * - Optimized element rate calculation where if no elements are present, then
 * damage rate will default to 100%.
 *
  * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ElementCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EleMultiRule = Number(Yanfly.Parameters['Multi-Element Rulings']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Ele.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Ele.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_ElementCore) {
    this.processElementNotetagsSys($dataSystem);
    this.processElementNotetags1($dataSkills);
    this.processElementNotetags1($dataItems);
    this.processElementNotetags2($dataActors);
    this.processElementNotetags2($dataClasses);
    this.processElementNotetags2($dataEnemies);
    this.processElementNotetags2($dataWeapons);
    this.processElementNotetags2($dataArmors);
    this.processElementNotetags2($dataStates);
    Yanfly._loaded_YEP_ElementCore = true;
  }
  
  return true;
};

DataManager.processElementNotetagsSys = function(group) {
  Yanfly.ElementIdRef = {};
  for (var i = 1; i < group.elements.length; ++i) {
    var name = group.elements[i].toUpperCase();
    name = name.replace(/\\I\[(\d+)\]/gi, '');
    Yanfly.ElementIdRef[name] = i;
  }
};

DataManager.processElementNotetags1 = function(group) {
  var noteA1 = /<MULTIPLE ELEMENTS:[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var noteA2 = /<MULTIPLE ELEMENTS:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var noteA3 = /<MULTIPLE ELEMENTS:[ ](.*)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.elementMultiRule = Yanfly.Param.EleMultiRule;
    obj.multipleElements = [];
    obj.bypassElementReflect = false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<MULTI-ELEMENT RULE:[ ]LOWEST>/i)) {
        obj.elementMultiRule = 0;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ]ADD>/i)) {
        obj.elementMultiRule = 1;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ]MULTIPLY>/i)) {
        obj.elementMultiRule = 2;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ]HIGHEST>/i)) {
        obj.elementMultiRule = 3;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ]AVERAGE>/i)) {
        obj.elementMultiRule = 4;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ](.*)>/i)) {
        obj.elementMultiRule = String(RegExp.$1);
      } else if (line.match(noteA1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.multipleElements = obj.multipleElements.concat(array);
      } else if (line.match(noteA2)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.multipleElements = obj.multipleElements.concat(range);
      } else if (line.match(noteA3)) {
        var text = String(RegExp.$1);
        var array = text.split(',');
        var length = array.length;
        for (var j = 0; j < length; ++j) {
          var name = array[j].toUpperCase().trim();
          if (Yanfly.ElementIdRef[name]) {
            var id = Yanfly.ElementIdRef[name];
            obj.multipleElements.push(id);
          }
        }
      } else if (line.match(/<(?:BYPASS ELEMENT REFLECT)>/i)) {
        obj.bypassElementReflect = true;
      }
    }
  }
};

DataManager.processElementNotetags2 = function(group) {
  var noteA1 = /<(?:ELEMENT ABSORB):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var noteB1 = /<(?:ELEMENT REFLECT)[ ](\d+):[ ]([\+\-]\d+)([%％])>/i;
  var noteB2 = /<(?:ELEMENT REFLECT)[ ](.*):[ ]([\+\-]\d+)([%％])>/i;
  var noteC1 = /<(?:ELEMENT AMPLIFY)[ ](\d+):[ ]([\+\-]\d+)([%％])>/i;
  var noteC2 = /<(?:ELEMENT AMPLIFY)[ ](.*):[ ]([\+\-]\d+)([%％])>/i;
  var noteC3 = /<(?:ELEMENT MAGNIFY)[ ](\d+):[ ]([\+\-]\d+)([%％])>/i;
  var noteC4 = /<(?:ELEMENT MAGNIFY)[ ](.*):[ ]([\+\-]\d+)([%％])>/i;
  var noteD1 = /<FORCE ELEMENT[ ](\d+)[ ]RATE:[ ](\d+)([%％])>/i;
  var noteD2 = /<FORCE ELEMENT[ ](\d+)[ ]RATE:[ ]-(\d+)([%％])>/i;
  var noteD3 = /<FORCE ELEMENT[ ](.*)[ ]RATE:[ ](\d+)([%％])>/i;
  var noteD4 = /<FORCE ELEMENT[ ](.*)[ ]RATE:[ ]-(\d+)([%％])>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.elementAbsorb = [];
    obj.elementReflect = {};
    obj.elementAmplify = {};
    obj.elementMagnify = {};
    obj.elementNull = false;
    obj.elementForcedRate = {};

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:ELEMENT ABSORB):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.elementAbsorb = obj.elementAbsorb.concat(array);
      } else if (line.match(noteA1)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.elementAbsorb = obj.elementAbsorb.concat(range);
      } else if (line.match(/<(?:ELEMENT ABSORB):[ ](.*)>/i)) {
        var text = String(RegExp.$1);
        var array = text.split(',');
        var length = array.length;
        for (var j = 0; j < length; ++j) {
          var name = array[j].toUpperCase().trim();
          if (Yanfly.ElementIdRef[name]) {
            var id = Yanfly.ElementIdRef[name];
            obj.elementAbsorb.push(id);
          }
        }
      } else if (line.match(noteB1)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementReflect[elementId] = rate;
      } else if (line.match(noteB2)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementReflect[id] = rate;
        }
      } else if (line.match(noteC1)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementAmplify[elementId] = rate;
      } else if (line.match(noteC2)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementAmplify[id] = rate;
        }
      } else if (line.match(noteC3)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementMagnify[elementId] = rate;
      } else if (line.match(noteC4)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementMagnify[id] = rate;
        }
      } else if (line.match(/<(?:ELEMENT NULL)>/i)) {
        obj.elementNull = true;
      } else if (line.match(noteD1)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementForcedRate[elementId] = rate;
      } else if (line.match(noteD2)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementForcedRate[elementId] = rate * -1;
      } else if (line.match(noteD3)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementForcedRate[id] = rate;
        }
      } else if (line.match(noteD4)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementForcedRate[id] = rate * -1;
        }
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

Yanfly.Ele.BattleManager_processActionSequence =
    BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // ADD ELEMENT: X
  if (actionName === 'ADD ELEMENT') {
    return this.actionAddElement(actionArgs);
  }
  // CLEAR ELEMENT
  if (actionName === 'CLEAR ELEMENT') {
    return this.actionClearElement();
  }
  // FORCE ELEMENT: X
  if (actionName === 'FORCE ELEMENT') {
    return this.actionForceElement(actionArgs);
  }
  // FORCE ELEMENT
  if (actionName === 'NULL ELEMENT') {
    return this.actionNullElement();
  }
  return Yanfly.Ele.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

BattleManager.actionAddElement = function(actionArgs) {
    if (!actionArgs) return;
    var array = [];
    var length = actionArgs.length;
    for (var i = 0; i < length; ++i) {
      var ele = actionArgs[i].toUpperCase().trim();
      if (ele.match(/(\d+)/i)) {
        array.push(parseInt(RegExp.$1));
      } else if (Yanfly.ElementIdRef[ele]) {
        array.push(Yanfly.ElementIdRef[ele]);
      }
    }
    $gameTemp._addedElements = array;
    return true;
};

BattleManager.actionClearElement = function() {
    $gameTemp._addedElements = undefined;
    $gameTemp._forcedElements = undefined;
    return true;
};

BattleManager.actionForceElement = function(actionArgs) {
    if (!actionArgs) return;
    var array = [];
    var length = actionArgs.length;
    for (var i = 0; i < length; ++i) {
      var ele = actionArgs[i].toUpperCase().trim();
      if (ele.match(/(\d+)/i)) {
        array.push(parseInt(RegExp.$1));
      } else if (Yanfly.ElementIdRef[ele]) {
        array.push(Yanfly.ElementIdRef[ele]);
      }
    }
    $gameTemp._forcedElements = array;
    return true;
};

BattleManager.actionNullElement = function() {
    $gameTemp._forcedElements = [];
    return true;
};

}; // Imported.YEP_BattleEngineCore

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.Ele.Game_BtlrBase_elementRate =
    Game_BattlerBase.prototype.elementRate;
Game_BattlerBase.prototype.elementRate = function(elementId) {
  var rate = this.forcedElementRate(elementId);
  if (rate !== undefined) return rate;
  var result = Yanfly.Ele.Game_BtlrBase_elementRate.call(this, elementId);
  if (this.isAbsorbElement(elementId) && result > 0) {
    result = Math.min(result - 2.0, -0.01);
  }
  return result;
};

Game_BattlerBase.prototype.getObjElementReflectRate = function(obj, elementId) {
  if (!obj) return 0;
  if (!obj.elementReflect) return 0;
  return obj.elementReflect[elementId] || 0;
};

Game_BattlerBase.prototype.getObjElementAmplifyRate = function(obj, elementId) {
  if (!obj) return 0;
  if (!obj.elementAmplify) return 0;
  return obj.elementAmplify[elementId] || 0;
};

Game_BattlerBase.prototype.getObjElementMagnifyRate = function(obj, elementId) {
  if (!obj) return 0;
  if (!obj.elementMagnify) return 0;
  return obj.elementMagnify[elementId] || 0;
};

Game_BattlerBase.prototype.getObjElementForcedRate = function(obj, elementId) {
  if (!obj) return undefined;
  if (!obj.elementForcedRate) return undefined;
  return obj.elementForcedRate[elementId] || undefined;
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.isAbsorbElement = function(elementId) {
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var state = this.states()[i];
    if (!state) continue;
    if (!state.elementAbsorb) continue;
    if (state.elementAbsorb.contains(elementId)) return true;
  }
  return false;
};

Game_Battler.prototype.elementReflectRate = function(elementId) {
  var rate = 0;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    rate += this.getObjElementReflectRate(obj, elementId);
  }
  return rate;
};

Game_Battler.prototype.elementAmplifyRate = function(elementId) {
  var rate = 0;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    rate += this.getObjElementAmplifyRate(obj, elementId);
  }
  return rate;
};

Game_Battler.prototype.elementMagnifyRate = function(elementId) {
  var rate = 1;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    rate += this.getObjElementMagnifyRate(obj, elementId);
  }
  return rate;
};

Game_Battler.prototype.isNullElement = function() {
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var state = this.states()[i];
    if (state && state.elementNull) return true;
  }
  return false;
};

Game_Battler.prototype.forcedElementRate = function(elementId) {
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var state = this.states()[i];
    var rate = this.getObjElementForcedRate(state, elementId);
    if (rate !== undefined) return rate;
  }
  return undefined;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.isAbsorbElement = function(elementId) {
  if (this.actor().elementAbsorb.contains(elementId)) return true;
  if (this.currentClass().elementAbsorb.contains(elementId)) return true;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var equip = this.equips()[i];
    if (!equip) continue;
    if (!equip.elementAbsorb) continue;
    if (equip.elementAbsorb.contains(elementId)) return true;
  }
  return Game_Battler.prototype.isAbsorbElement.call(this, elementId);
};

Game_Actor.prototype.elementReflectRate = function(elementId) {
  var rate = Game_Battler.prototype.elementReflectRate.call(this, elementId);
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    rate += this.getObjElementReflectRate(obj, elementId);
  }
  rate += this.getObjElementReflectRate(this.actor(), elementId);
  rate += this.getObjElementReflectRate(this.currentClass(), elementId);
  return rate;
};

Game_Actor.prototype.elementAmplifyRate = function(elementId) {
  var rate = Game_Battler.prototype.elementAmplifyRate.call(this, elementId);
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    rate += this.getObjElementAmplifyRate(obj, elementId);
  }
  rate += this.getObjElementAmplifyRate(this.actor(), elementId);
  rate += this.getObjElementAmplifyRate(this.currentClass(), elementId);
  return rate;
};

Game_Actor.prototype.elementMagnifyRate = function(elementId) {
  var rate = Game_Battler.prototype.elementMagnifyRate.call(this, elementId);
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    rate += this.getObjElementMagnifyRate(obj, elementId);
  }
  rate += this.getObjElementMagnifyRate(this.actor(), elementId);
  rate += this.getObjElementMagnifyRate(this.currentClass(), elementId);
  return rate;
};

Game_Actor.prototype.isNullElement = function() {
  if (this.actor().elementNull) return true;
  if (this.currentClass().elementNull) return true;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var equip = this.equips()[i];
    if (equip && equip.elementNull) return true;
  }
  return Game_Battler.prototype.isNullElement.call(this);
};

Game_Actor.prototype.forcedElementRate = function(elementId) {
  var rate = Game_Battler.prototype.forcedElementRate.call(this, elementId);
  if (rate !== undefined) return rate;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var equip = this.equips()[i];
    rate = this.getObjElementForcedRate(equip, elementId);
    if (rate !== undefined) return rate;
  }
  rate = this.getObjElementForcedRate(this.currentClass(), elementId);
  if (rate !== undefined) return rate;
  rate = this.getObjElementForcedRate(this.actor(), elementId);
  if (rate !== undefined) return rate;
  return undefined;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.isAbsorbElement = function(elementId) {
  if (this.enemy().elementAbsorb.contains(elementId)) return true;
  return Game_Battler.prototype.isAbsorbElement.call(this, elementId);
};

Game_Enemy.prototype.elementReflectRate = function(elementId) {
  var rate = Game_Battler.prototype.elementReflectRate.call(this, elementId);
  rate += this.getObjElementReflectRate(this.enemy(), elementId);
  return rate;
};

Game_Enemy.prototype.elementAmplifyRate = function(elementId) {
  var rate = Game_Battler.prototype.elementAmplifyRate.call(this, elementId);
  rate += this.getObjElementAmplifyRate(this.enemy(), elementId);
  return rate;
};

Game_Enemy.prototype.elementMagnifyRate = function(elementId) {
  var rate = Game_Battler.prototype.elementMagnifyRate.call(this, elementId);
  rate += this.getObjElementMagnifyRate(this.enemy(), elementId);
  return rate;
};

Game_Enemy.prototype.isNullElement = function() {
  if (this.enemy().elementNull) return true;
  return Game_Battler.prototype.isNullElement.call(this);
};

Game_Enemy.prototype.forcedElementRate = function(elementId) {
  var rate = Game_Battler.prototype.forcedElementRate.call(this, elementId);
  if (rate !== undefined) return rate;
  rate = this.getObjElementForcedRate(this.enemy(), elementId);
  if (rate !== undefined) return rate;
  return undefined;
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.getItemElements = function() {
  if ($gameTemp._forcedElements !== undefined) {
    return $gameTemp._forcedElements.filter(Yanfly.Util.onlyUnique);
  }
  if (this.subject().isNullElement()) return [];
  var elements = [];
  if (this.item().damage.elementId < 0) {
    Yanfly.Util.extend(elements, this.subject().attackElements());
  } else if (this.item().damage.elementId > 0) {
    elements.push(this.item().damage.elementId);
  }
  Yanfly.Util.extend(elements, this.item().multipleElements);
  if ($gameTemp._addedElements !== undefined) {
    Yanfly.Util.extend(elements, $gameTemp._addedElements);
  }
  return elements.filter(Yanfly.Util.onlyUnique);
};

Game_Action.prototype.calcElementRate = function(target) {
  if (!this.item()) return 1;
  var finalRate;
  var elements = this.getItemElements();
  if (elements.length < 1) return 1.00;
  var rule = this.item().elementMultiRule;
  var average = 0;
  while (elements.length > 0) {
    var elementId = elements.shift();
    var eleRate = target.elementRate(elementId);
    eleRate *= Math.max(0, this.subject().elementMagnifyRate(elementId));
    var absorbed = eleRate < 0;

    eleRate += this.subject().elementAmplifyRate(elementId);
    if (rule === 0) { // Lowest Rate
      finalRate = finalRate || eleRate;
      finalRate = Math.min(finalRate, eleRate);
    } else if (rule === 1) { // Additive
      finalRate = finalRate || 1.00;
      eleRate -= 1.00;
      finalRate += eleRate;
    } else if (rule === 2) { // Multiplicative
      finalRate = finalRate || 1.00;
      finalRate *= Math.abs(eleRate);
      if (eleRate < 0) finalRate = Math.abs(finalRate) * -1;
    } else if (rule === 3) { // Highest
      finalRate = finalRate || eleRate;
      finalRate = Math.max(finalRate, eleRate);
    } else if (rule === 4) { // Average
      finalRate = finalRate || 0;
      finalRate += eleRate;
      average += 1;
    } else {
      finalRate = this.calcElementRateRule(target, elementId, finalRate,
        eleRate, rule);
    }
  }
  if (rule === 4) finalRate /= Math.max(1, average);
  if (finalRate === undefined) finalRate = 1.00;
  return finalRate;
};

Game_Action.prototype.calcElementRateRule = function(target, elementId,
finalRate, eleRate, rule) {
  return finalRate;
};

Yanfly.Ele.Game_Action_itemMrf = Game_Action.prototype.itemMrf;
Game_Action.prototype.itemMrf = function(target) {
  var rate = Yanfly.Ele.Game_Action_itemMrf.call(this, target);
  if (this.item().bypassElementReflect) return rate;
  var elements = this.getItemElements();
  while (elements.length > 0) {
    var elementId = elements.shift();
    rate += target.elementReflectRate(elementId);
  }
  return rate;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

Yanfly.Util.extend = function (mainArray, otherArray) {
    otherArray.forEach(function(i) {
      mainArray.push(i)
    }, this);
}

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================