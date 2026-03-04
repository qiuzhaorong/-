//=============================================================================
// Yanfly Engine Plugins - In-Battle Status
// YEP_X_InBattleStatus.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_InBattleStatus = true;

var Yanfly = Yanfly || {};
Yanfly.IBS = Yanfly.IBS || {};
Yanfly.IBS.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc YEP战斗状态查看[战斗核心扩展][v1.01]
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @text ---通用设置---
 * @default
 *
 * @param Command Text
 * @text 命令文本
 * @parent ---General---
 * @desc 队伍窗口中“状态”命令所使用的文本
 * @default 状态
 *
 * @param Show Command
 * @text 显示命令
 * @parent ---General---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 默认是否显示战斗中的“状态”命令？
 * @default true
 *
 * @param Window X
 * @text 窗口X坐标
 * @parent ---General---
 * @desc 战斗状态窗口的默认X坐标位置
 * 可使用公式
 * @default 0
 *
 * @param Window Y
 * @text 窗口Y坐标
 * @parent ---General---
 * @desc 战斗状态窗口的默认Y坐标位置
 * 可使用公式
 * @default this.fittingHeight(2)
 *
 * @param Window Width
 * @text 窗口宽度
 * @parent ---General---
 * @desc 战斗状态窗口的默认宽度
 * 可使用公式
 * @default Graphics.boxWidth
 *
 * @param Window Height
 * @text 窗口高度
 * @parent ---General---
 * @desc 战斗状态窗口的默认高度
 * 可使用公式
 * @default Graphics.boxHeight - this.fittingHeight(2) - this.fittingHeight(4)
 *
 * @param ---Status List---
 * @text ---状态列表设置---
 * @default
 *
 * @param Status Width
 * @text 状态列表宽度
 * @parent ---Status List---
 * @desc 状态列表的宽度
 * 可使用公式
 * @default Math.max(312, Graphics.boxWidth / 4);
 *
 * @param State Help Front
 * @text 状态帮助前缀
 * @parent ---Status List---
 * @desc 每个状态帮助描述前的文本
 * %1 - 状态图标     %2 - 状态名称
 * @default \i[%1]%2
 *
 * @param State Help End
 * @text 状态帮助后缀
 * @parent ---Status List---
 * @desc 每个状态帮助描述后的文本
 * %1 - 状态图标     %2 - 状态名称
 * @default
 *
 * @param Healthy Icon
 * @text 健康图标
 * @parent ---Status List---
 * @type number
 * @desc 用于表示战斗者健康（无状态）的图标ID
 * @default 127
 *
 * @param Healthy Text
 * @text 健康文本
 * @parent ---Status List---
 * @desc 健康状态的标签文本
 * @default 健康
 *
 * @param Healthy Help
 * @text 健康状态帮助文本
 * @parent ---Status List---
 * @desc 选中时在帮助窗口显示的文本
 * @default 角色当前未受任何状态效果影响
 *
 * @param ---Buffs List---
 * @text ---增益列表设置---
 * @default
 *
 * @param MaxHP Buff Text
 * @text 最大HP增益文本
 * @parent ---Buffs List---
 * @desc 用于显示最大HP增益名称的文本
 * @default 最大HP提升
 *
 * @param MaxHP Buff Help
 * @text 最大HP增益帮助文本
 * @parent ---Buffs List---
 * @desc 最大HP的帮助描述文本
 *  %1 - 比例     %2 - 堆叠数     %3 - 回合数
 * @default 将最大生命值提升至%1%
 *
 * @param MaxMP Buff Text
 * @text 最大MP增益文本
 * @parent ---Buffs List---
 * @desc 用于显示最大MP增益名称的文本
 * @default 最大MP提升
 *
 * @param MaxMP Buff Help
 * @text 最大MP增益帮助文本
 * @parent ---Buffs List---
 * @desc 最大MP的帮助描述文本
 * %1 - 比例     %2 - 堆叠数     %3 - 回合数
 * @default 将最大魔法值提升至%1%
 *
 * @param ATK Buff Text
 * @text 攻击力增益文本
 * @parent ---Buffs List---
 * @desc 用于显示攻击力增益名称的文本
 * @default 攻击力提升
 *
 * @param ATK Buff Help
 * @text 攻击力增益帮助文本
 * @parent ---Buffs List---
 * @desc 攻击力的帮助描述文本
 * %1 - 比例     %2 - 堆叠数     %3 - 回合数
 * @default 将攻击力提升至%1%
 *
 * @param DEF Buff Text
 * @text 防御力增益文本
 * @parent ---Buffs List---
 * @desc 用于显示防御力增益名称的文本
 * @default 防御力提升
 *
 * @param DEF Buff Help
 * @text 防御力增益帮助文本
 * @parent ---Buffs List---
 * @desc 防御力的帮助描述文本
 * %1 - 比例     %2 - 堆叠数     %3 - 回合数
 * @default 将防御力提升至%1%
 *
 * @param MAT Buff Text
 * @text 魔法攻击力增益文本
 * @parent ---Buffs List---
 * @desc 用于显示魔法攻击力增益名称的文本
 * @default 魔法攻击力提升
 *
 * @param MAT Buff Help
 * @text 魔法攻击力增益帮助文本
 * @parent ---Buffs List---
 * @desc 魔法攻击力的帮助描述文本
 * %1 - 比例     %2 - 堆叠数     %3 - 回合数
 * @default 将魔法攻击力提升至%1%
 *
 * @param MDF Buff Text
 * @text 魔法防御力增益文本
 * @parent ---Buffs List---
 * @desc 用于显示魔法防御力增益名称的文本
 * @default 魔法防御力提升
 *
 * @param MDF Buff Help
 * @text 魔法防御力增益帮助文本
 * @parent ---Buffs List---
 * @desc 魔法防御力的帮助描述文本
 * %1 - 比例     %2 - 堆叠数     %3 - 回合数
 * @default 将魔法防御力提升至%1%
 *
 * @param AGI Buff Text
 * @text 敏捷度增益文本
 * @parent ---Buffs List---
 * @desc 用于显示敏捷度增益名称的文本
 * @default 敏捷度提升
 *
 * @param AGI Buff Help
 * @text 敏捷度增益帮助文本
 * @parent ---Buffs List---
 * @desc 敏捷度的帮助描述文本
 * %1 - 比例     %2 - 堆叠数     %3 - 回合数
 * @default 将敏捷度提升至%1%
 *
 * @param LUK Buff Text
 * @text 幸运值增益文本
 * @parent ---Buffs List---
 * @desc 用于显示幸运值增益名称的文本
 * @default 幸运值提升
 *
 * @param LUK Buff Help
 * @text 幸运值增益帮助文本
 * @parent ---Buffs List---
 * @desc 幸运值的帮助描述文本
 * %1 - 比例     %2 - 堆叠数     %3 - 回合数
 * @default 将幸运值提升至%1%
 *
 * @param ---Debuffs List---
 * @text ---减益列表设置---
 * @default
 *
 * @param MaxHP Debuff Text
 * @text 最大HP减益文本
 * @parent ---Debuffs List---
 * @desc The text used to display the MaxHP Debuff Name.
 * @default 最大HP降低
 *
 * @param MaxHP Debuff Help
 * @text 最大HP减益帮助文本
 * @parent ---Debuffs List---
 * @desc The text used for the MaxHP help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default 将最大生命值降低至%1%
 *
 * @param MaxMP Debuff Text
 * @text 最大MP减益文本
 * @parent ---Debuffs List---
 * @desc The text used to display the MaxMP Debuff Name.
 * @default 最大MP降低
 *
 * @param MaxMP Debuff Help
 * @text 最大MP减益帮助文本
 * @parent ---Debuffs List---
 * @desc The text used for the MaxMP help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default 将最大魔法值降低至%1%
 *
 * @param ATK Debuff Text
 * @text 攻击力减益文本
 * @parent ---Debuffs List---
 * @desc The text used to display the ATK Debuff Name.
 * @default 攻击力降低
 *
 * @param ATK Debuff Help
 * @text 攻击力减益帮助文本
 * @parent ---Debuffs List---
 * @desc The text used for the ATK help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default 将攻击力降低至%1%
 *
 * @param DEF Debuff Text
 * @text 防御力减益文本
 * @parent ---Debuffs List---
 * @desc 用于显示防御力减益名称的文本
 * @default 防御力降低
 *
 * @param DEF Debuff Help
 * @text 防御力减益帮助文本
 * @parent ---Debuffs List---
 * @desc The text used for the DEF help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default 将防御力降低至%1%
 *
 * @param MAT Debuff Text
 * @text 魔法攻击力减益文本
 * @parent ---Debuffs List---
 * @desc The text used to display the MAT Debuff Name.
 * @default 魔法攻击力降低
 *
 * @param MAT Debuff Help
 * @text 魔法攻击力减益帮助文本
 * @parent ---Debuffs List---
 * @desc The text used for the MAT help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default 将魔法攻击力降低至%1%
 *
 * @param MDF Debuff Text
 * @text 魔法防御力减益文本
 * @parent ---Debuffs List---
 * @desc The text used to display the MDF Debuff Name.
 * @default 魔法防御力降低
 *
 * @param MDF Debuff Help
 * @text 魔法防御力减益帮助文本
 * @parent ---Debuffs List---
 * @desc The text used for the MDF help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default 将魔法防御力降低至%1%
 *
 * @param AGI Debuff Text
 * @text 敏捷度减益文本
 * @parent ---Debuffs List---
 * @desc The text used to display the AGI Debuff Name.
 * @default 敏捷度降低
 *
 * @param AGI Debuff Help
 * @text 敏捷度减益帮助文本
 * @parent ---Debuffs List---
 * @desc The text used for the AGI help description.
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default 将敏捷度降低至%1%
 *
 * @param LUK Debuff Text
 * @text 幸运值减益文本
 * @parent ---Debuffs List---
 * @desc The text used to display the LUK Debuff Name.
 * @default 幸运值降低
 *
 * @param LUK Debuff Help
 * @text 幸运值减益帮助文本
 * @parent ---Debuffs List---
 * @desc 幸运值的帮助描述文本
 * %1 - Rate     %2 - Stacks     %3 - Turns
 * @default 将幸运值降低至%1%
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 本插件需要 YEP_BattleEngineCore 插件支持。
   请确保本插件在插件列表中位于 YEP_BattleEngineCore 下方
 *
 * 默认情况下，战斗中无法查看队伍状态。
   本插件将在队伍指令窗口（包含 “战斗” 和 “逃跑”）中添加一个新的 “状态” 指令，
   允许玩家查看队员信息。在这里，玩家可以查看每个队员的当前参数，获取所有状态、
   增益和减益效果的列表。玩家可以滚动列表，并在帮助窗口中查看新增的状态、增益和减益效果的帮助描述
 * 注意：如果使用 YEP_X_BattleSysCTB.js 插件，请将本插件放在该插件下方以获得最佳兼容性
 *
 * ============================================================================
 * 注释标签
 * ============================================================================
 *
 * 对于想要为状态添加帮助描述的用户，请使用以下注释标签：
 *
状态注释标签：
 *
<Help Description>
text
text
</Help Description>

- 这将把状态的帮助描述设置为标签中使用的文本。可以使用文本代码
 *
 * ============================================================================
 * 文本代码
 * ============================================================================
 *
 * 通过在消息中使用特定的文本代码，可以让游戏将其替换为以下内容：
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  状态帮助        功能   
 *   \th[x]       - 替换为 x 号状态的帮助描述文本
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 对于希望在游戏中途更改 “状态” 选项显示或隐藏的用户，可以使用以下插件命令：
 *
 * 插件命令：
 *
ShowInBattleStatus
- 这将使 “状态” 指令显示
 *
HideInBattleStatus
- 这将使 “状态” 指令不显示
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_InBattleStatus');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.IBSCmdName = String(Yanfly.Parameters['Command Text']);
Yanfly.Param.IBSCmdShow = eval(String(Yanfly.Parameters['Show Command']));
Yanfly.Param.IBSWinX = String(Yanfly.Parameters['Window X']);
Yanfly.Param.IBSWinY = String(Yanfly.Parameters['Window Y']);
Yanfly.Param.IBSWinWidth = String(Yanfly.Parameters['Window Width']);
Yanfly.Param.IBSWinHeight = String(Yanfly.Parameters['Window Height']);

Yanfly.Param.IBSStatusListWidth = String(Yanfly.Parameters['Status Width']);
Yanfly.Param.IBSStateHelp1 = String(Yanfly.Parameters['State Help Front']);
Yanfly.Param.IBSStateHelp2 = String(Yanfly.Parameters['State Help End']);
Yanfly.Param.IBSHealthyIcon = Number(Yanfly.Parameters['Healthy Icon']);
Yanfly.Param.IBSHealthyText = String(Yanfly.Parameters['Healthy Text']);
Yanfly.Param.IBSHealthyHelp = String(Yanfly.Parameters['Healthy Help']);

Yanfly.Param.IBSBuffText = [];
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['MaxHP Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['MaxMP Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['ATK Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['DEF Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['MAT Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['MDF Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['AGI Buff Text']));
Yanfly.Param.IBSBuffText.push(String(Yanfly.Parameters['LUK Buff Text']));
Yanfly.Param.IBSBuffHelp = [];
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['MaxHP Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['MaxMP Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['ATK Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['DEF Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['MAT Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['MDF Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['AGI Buff Help']));
Yanfly.Param.IBSBuffHelp.push(String(Yanfly.Parameters['LUK Buff Help']));

Yanfly.Param.IBSDebuffText = [];
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['MaxHP Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['MaxMP Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['ATK Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['DEF Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['MAT Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['MDF Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['AGI Debuff Text']));
Yanfly.Param.IBSDebuffText.push(String(Yanfly.Parameters['LUK Debuff Text']));
Yanfly.Param.IBSDebuffHelp = [];
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['MaxHP Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['MaxMP Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['ATK Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['DEF Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['MAT Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['MDF Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['AGI Debuff Help']));
Yanfly.Param.IBSDebuffHelp.push(String(Yanfly.Parameters['LUK Debuff Help']));

//=============================================================================
// DataManager
//=============================================================================

Yanfly.IBS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.IBS.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_InBattleStatus) {
    this.processIBSNotetags1($dataStates);
    Yanfly._loaded_YEP_X_InBattleStatus = true;
  }
  
  return true;
};

DataManager.processIBSNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    var fmt1 = Yanfly.Param.IBSStateHelp1;
    obj.description = fmt1.format(obj.iconIndex, obj.name);
    var descLength = obj.description.length;
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i)) {
        evalMode = 'help description';
      } else if (line.match(/<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'help description') {
        if (obj.description.length > descLength) obj.description += '\n';
        obj.description += line;
      }
    }

    var fmt2 = Yanfly.Param.IBSStateHelp2;
    obj.description += fmt2.format(obj.iconIndex, obj.name);
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.IBS.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.IBS.Game_System_initialize.call(this);
  this.initIBSSettings();
};

Game_System.prototype.initIBSSettings = function() {
  this._showInBattleStatus = Yanfly.Param.IBSCmdShow;
};

Game_System.prototype.isShowInBattleStatus = function() {
  if (this._showInBattleStatus === undefined) this.initIBSSettings();
  return this._showInBattleStatus;
};

Game_System.prototype.setShowInBattleStatus = function(value) {
  if (this._showInBattleStatus === undefined) this.initIBSSettings();
  this._showInBattleStatus = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.IBS.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.IBS.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ShowInBattleStatus') {
    $gameSystem.setShowInBattleStatus(true);
  } else if (command === 'HideInBattleStatus') {
    $gameSystem.setShowInBattleStatus(false);
  }
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.IBS.Window_Base_convertEscapeCharacters =
  Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
  text = this.convertStateHelpText(text);
  return Yanfly.IBS.Window_Base_convertEscapeCharacters.call(this, text);
};

Window_Base.prototype.convertStateHelpText = function(text) {
  text = text.replace(/\\V\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\\V\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\\TH\[(\d+)\]/gi, function() {
    return $dataStates[parseInt(arguments[1])].description;
  }.bind(this));
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bTH\[(\d+)\]/gi, function() {
    return $dataStates[parseInt(arguments[1])].description;
  }.bind(this));
  return text;
};

if (Imported.YEP_X_MessageMacros1) {

Yanfly.IBS.Window_Base_convertMacroText =
    Window_Base.prototype.convertMacroText;
Window_Base.prototype.convertMacroText = function(text) {
  text = Yanfly.IBS.Window_Base_convertMacroText.call(this, text);
  text = this.convertStateHelpText(text);
  return text;
};

}; // Imported.YEP_X_MessageMacros1

//=============================================================================
// Window_Command
//=============================================================================

Window_Command.prototype.addCommandAt = function(index, name, symbol, en, ext) {
  if (en === undefined) enabled = true;
  if (ext === undefined) ext = null;
  var obj = { name: name, symbol: symbol, enabled: en, ext: ext};
  this._list.splice(index, 0, obj);
};

//=============================================================================
// Window_PartyCommand
//=============================================================================

Yanfly.IBS.Window_PartyCommand_makeCommandList =
  Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
  Yanfly.IBS.Window_PartyCommand_makeCommandList.call(this);
  this.makeInBattleStatusCommand();
};

Window_PartyCommand.prototype.makeInBattleStatusCommand = function() {
  if (!$gameSystem.isShowInBattleStatus()) return;
  var index = this.findSymbol('escape');
  var text = Yanfly.Param.IBSCmdName;
  this.addCommandAt(index, text, 'inBattleStatus', true);
};

//=============================================================================
// Window_InBattleStatus
//=============================================================================

function Window_InBattleStatus() {
    this.initialize.apply(this, arguments);
}

Window_InBattleStatus.prototype = Object.create(Window_Base.prototype);
Window_InBattleStatus.prototype.constructor = Window_InBattleStatus;

Window_InBattleStatus.prototype.initialize = function() {
  var x = eval(Yanfly.Param.IBSWinX);
  var y = eval(Yanfly.Param.IBSWinY);
  var w = eval(Yanfly.Param.IBSWinWidth);
  var h = eval(Yanfly.Param.IBSWinHeight);
  this._battler = $gameParty.battleMembers()[0];
  Window_Base.prototype.initialize.call(this, x, y, w, h);
  this.hide();
};

Window_InBattleStatus.prototype.setBattler = function(battler) {
  this._battler = battler;
  this.refresh();
};

Window_InBattleStatus.prototype.refresh = function() {
  this.contents.clear();
  if (!this._battler) return;
  var x = this.standardPadding() + eval(Yanfly.Param.IBSStatusListWidth);
  this.drawActorFace(this._battler, x, 0, Window_Base._faceWidth);
  var x2 = x + Window_Base._faceWidth + this.standardPadding();
  var w = this.contents.width - x2;
  this.drawActorSimpleStatus(this._battler, x2, 0, w);
  w = this.contents.width - x;
  var y = Math.ceil(this.lineHeight() * 4.5);
  var h = this.contents.height - y;
  if (h >= this.lineHeight() * 6) {
    for (var i = 2; i < 8; ++i) {
      this.drawParam(i, x, y, w, this.lineHeight());
      y += this.lineHeight();
    }
  } else {
    w = Math.floor(w / 2);
    x2 = x;
    for (var i = 2; i < 8; ++i) {
      this.drawParam(i, x2, y, w, this.lineHeight());
      if (i % 2 === 0) {
        x2 += w;
      } else {
        x2 = x;
        y += this.lineHeight();
      }
    }
  }
};

Window_InBattleStatus.prototype.drawParam = function(paramId, dx, dy, dw, dh) {
  this.drawDarkRect(dx, dy, dw, dh);
  var level = this._battler._buffs[paramId];
  var icon = this._battler.buffIconIndex(level, paramId);
  this.drawIcon(icon, dx + 2, dy + 2);
  dx += Window_Base._iconWidth + 4;
  dw -= Window_Base._iconWidth + 4 + this.textPadding() + 2;
  this.changeTextColor(this.systemColor());
  this.drawText(TextManager.param(paramId), dx, dy, dw);
  var value = this._battler.param(paramId);
  this.changeTextColor(this.paramchangeTextColor(level));
  this.drawText(Yanfly.Util.toGroup(value), dx, dy, dw, 'right');
};

Window_InBattleStatus.prototype.drawDarkRect = function(dx, dy, dw, dh) {
  var color = this.gaugeBackColor();
  this.changePaintOpacity(false);
  this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
  this.changePaintOpacity(true);
};

//=============================================================================
// Window_InBattleStateList
//=============================================================================

function Window_InBattleStateList() {
    this.initialize.apply(this, arguments);
}

Window_InBattleStateList.prototype = Object.create(Window_Selectable.prototype);
Window_InBattleStateList.prototype.constructor = Window_InBattleStateList;

Window_InBattleStateList.prototype.initialize = function(parentWindow) {
  this._parentWindow = parentWindow;
  this._battler = $gameParty.battleMembers()[0];
  var x = parentWindow.x;
  var y = parentWindow.y;
  var width = eval(Yanfly.Param.IBSStatusListWidth);
  width += this.standardPadding() * 2;
  width = Math.ceil(width);
  var height = parentWindow.height;
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this.deactivate();
  this.backOpacity = 0;
  this.opacity = 0;
  this.hide();
  this._data = [];
};

Window_InBattleStateList.prototype.setStatusWindow = function(win) {
  this._statusWindow = win;
};

Window_InBattleStateList.prototype.setBattler = function(battler) {
  this._battler = battler;
  this._parentWindow.setBattler(battler);
  this.refresh();
  this.select(0);
  if (this._statusWindow) {
    var index = $gameParty.battleMembers().indexOf(battler)
    this._statusWindow.select(index);
  }
};

Window_InBattleStateList.prototype.maxItems = function() {
  return this._data ? this._data.length : 1;
};

Window_InBattleStateList.prototype.item = function() {
  var index = this.index();
  return this._data && index >= 0 ? this._data[index] : null;
};

Window_InBattleStateList.prototype.includes = function(item) {
  if (!item) return false;
  if (item.name.length <= 0) return false;
  if (item.iconIndex <= 0) return false;
  return true;
};

Window_InBattleStateList.prototype.makeItemList = function() {
  this._data = [];
  if (this._battler) {
    var states = this._battler.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (this.includes(state)) this._data.push(state);
    }
    for (var i = 0; i < 8; ++i) {
      if (this._battler.isBuffAffected(i) ||
      this._battler.isDebuffAffected(i)) {
        this._data.push('buff ' + i);
      }
    }
  }
  if (this._data.length <= 0) this._data.push(null);
};

Window_InBattleStateList.prototype.drawItem = function(index) {
  var item = this._data[index];
  var rect = this.itemRect(index);
  rect.width -= this.textPadding();
  if (item === null) {
    var icon = Yanfly.Param.IBSHealthyIcon;
    var text = Yanfly.Param.IBSHealthyText;
    var ibw = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    this.drawText(text, rect.x + ibw, rect.y, rect.width - ibw);
  } else if (typeof item === 'string' && item.match(/BUFF[ ](\d+)/i)) {
    var paramId = parseInt(RegExp.$1);
    var level = this._battler._buffs[paramId];
    var icon = this._battler.buffIconIndex(level, paramId);
    var ibw = Window_Base._iconWidth + 4;
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    if (level > 0) {
      var text = Yanfly.Param.IBSBuffText[paramId];
    } else {
      var text = Yanfly.Param.IBSDebuffText[paramId];
    }
    this.drawText(text, rect.x + ibw, rect.y, rect.width - ibw);
    if (!Imported.YEP_BuffsStatesCore) return;
    this.drawBuffTurns(this._battler, paramId, rect.x + 2, rect.y);
    if (Yanfly.Param.BSCShowBuffRate) {
      this.drawBuffRate(this._battler, paramId, rect.x + 2, rect.y);
    }
  } else if (item) {
    this.drawItemName(item, rect.x, rect.y, rect.width);
    if (!Imported.YEP_BuffsStatesCore) return;
    if (item.autoRemovalTiming > 0) {
      this.drawStateTurns(this._battler, item, rect.x + 2, rect.y);
    }
    this.drawStateCounter(this._battler, item, rect.x + 2, rect.y);
  }
};

Window_InBattleStateList.prototype.updateHelp = function() {
  if (this.item() === null) {
    var text = Yanfly.Param.IBSHealthyHelp;
    this._helpWindow.setText(text);
  } else if (typeof this.item() === 'string' &&
  this.item().match(/BUFF[ ](\d+)/i)) {
    var paramId = parseInt(RegExp.$1);
    var level = this._battler._buffs[paramId];
    if (level > 0) {
      var fmt = Yanfly.Param.IBSBuffHelp[paramId];
    } else {
      var fmt = Yanfly.Param.IBSDebuffHelp[paramId];
    }
    var rate = Math.floor(this._battler.paramBuffRate(paramId) * 100);
    var turns = this._battler._buffTurns[paramId];
    var text = fmt.format(rate, Math.abs(level), turns);
    this._helpWindow.setText(text);
  } else if (this.item()) {
    this.setHelpWindowItem(this.item());
  }
};

Window_InBattleStateList.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};

Window_InBattleStateList.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  if (this.active && this._battler) this.updateLeftRight();
};

Window_InBattleStateList.prototype.updateLeftRight = function() {
  var index = $gameParty.battleMembers().indexOf(this._battler);
  var current = index;
  if (Input.isRepeated('left')) {
    index -= 1;
  } else if (Input.isRepeated('right')) {
    index += 1;
  }
  index = index.clamp(0, $gameParty.battleMembers().length - 1);
  if (current !== index) {
    var battler = $gameParty.battleMembers()[index];
    this.setBattler(battler);
    SoundManager.playCursor();
  }
};

//=============================================================================
// Window_CTBIcon
//=============================================================================

if (Imported.YEP_X_BattleSysCTB) {

Yanfly.IBS.Window_CTBIcon_isReduceOpacity =
  Window_CTBIcon.prototype.isReduceOpacity;
Window_CTBIcon.prototype.isReduceOpacity = function() {
  if (SceneManager._scene._inBattleStatusWindow) {
    if (SceneManager._scene._inBattleStatusWindow.visible) return true;
  }
  return Yanfly.IBS.Window_CTBIcon_isReduceOpacity.call(this);
};

}; // Imported.YEP_X_BattleSysCTB

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.setInBattleStatusWindow = function(win) {
  this._inBattleStatusWindow = win;
};

Yanfly.IBS.Window_BattleStatus_update = Window_BattleStatus.prototype.update;
Window_BattleStatus.prototype.update = function() {
  Yanfly.IBS.Window_BattleStatus_update.call(this);
  this.processInBattleStatusTouch();
};

Window_BattleStatus.prototype.processInBattleStatusTouch = function() {
  if (!this._inBattleStatusWindow) return;
  if (!this._inBattleStatusWindow.active) return;
  if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
    this.onInBattleStatusTouch();
  }
};

Window_BattleStatus.prototype.onInBattleStatusTouch = function() {
  var lastIndex = this.index();
  var x = this.canvasToLocalX(TouchInput.x);
  var y = this.canvasToLocalY(TouchInput.y);
  var hitIndex = this.hitTest(x, y);
  if (hitIndex >= 0) {
    var actor = $gameParty.battleMembers()[hitIndex];
    var win = this._inBattleStatusWindow;
    if (win && actor) {
      win.setBattler(actor);
      SoundManager.playCursor();
    }
  }
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.IBS.Scene_Battle_createAllWindows =
  Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  Yanfly.IBS.Scene_Battle_createAllWindows.call(this);
  this.createInBattleStatusWindows();
};

Scene_Battle.prototype.createInBattleStatusWindows = function() {
  this._inBattleStatusWindow = new Window_InBattleStatus();
  this.addChild(this._inBattleStatusWindow);
  var win = this._inBattleStatusWindow;
  this._inBattleStateList = new Window_InBattleStateList(win);
  this._inBattleStateList.setHelpWindow(this._helpWindow);
  this._inBattleStateList.setStatusWindow(this._statusWindow);
  this.addChild(this._inBattleStateList);
  this._inBattleStateList.setHandler('cancel', 
    this.onInBattleStatusCancel.bind(this));
  this._statusWindow.setInBattleStatusWindow(this._inBattleStateList);
};

Yanfly.IBS.Scene_Battle_createPartyCommandWindow =
  Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  Yanfly.IBS.Scene_Battle_createPartyCommandWindow.call(this);
  var win = this._partyCommandWindow;
  win.setHandler('inBattleStatus', this.commandInBattleStatus.bind(this));
};

Scene_Battle.prototype.commandInBattleStatus = function() {
  this._helpWindow.show();
  this._inBattleStatusWindow.show();
  this._inBattleStateList.show();
  this._inBattleStateList.activate();
  this._inBattleStateList.setBattler($gameParty.battleMembers()[0]);
  if (Imported.YEP_X_PartyLimitGauge) {
    this._showPartyLimitGauge = $gameSystem.isShowPartyLimitGauge();
    this._showTroopLimitGauge = $gameSystem.isShowTroopLimitGauge();
    $gameSystem.setShowPartyLimitGauge(false);
    $gameSystem.setShowTroopLimitGauge(false);
  }
};

Scene_Battle.prototype.onInBattleStatusCancel = function() {
  this._helpWindow.hide();
  this._inBattleStatusWindow.hide();
  this._inBattleStateList.hide();
  this._inBattleStateList.deactivate();
  this._partyCommandWindow.activate();
  this._statusWindow.deselect();
  if (Imported.YEP_X_PartyLimitGauge) {
    $gameSystem.setShowPartyLimitGauge(this._showPartyLimitGauge);
    $gameSystem.setShowTroopLimitGauge(this._showTroopLimitGauge);
  }
};

Yanfly.IBS.Scene_Battle_isAnyInputWindowActive =
  Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
  if (this._inBattleStateList && this._inBattleStateList.active) return true;
  return Yanfly.IBS.Scene_Battle_isAnyInputWindowActive.call(this);
};

if (Imported.YEP_X_BattleSysCTB) {

Yanfly.IBS.Scene_Battle_updateWindowPositionsCTB =
  Scene_Battle.prototype.updateWindowPositionsCTB;
Scene_Battle.prototype.updateWindowPositionsCTB = function() {
  if (this._inBattleStatusWindow && this._inBattleStatusWindow.visible) {
    return;
  }
  Yanfly.IBS.Scene_Battle_updateWindowPositionsCTB.call(this);
};

}; // Imported.YEP_X_BattleSysCTB

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {

Yanfly.Util.toGroup = function(inVal) {
  return inVal;
}

};

//=============================================================================
// End of File
//=============================================================================
};