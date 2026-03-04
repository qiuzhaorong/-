//=============================================================================
// Yanfly Engine Plugins - Call Event
// YEP_CallEvent.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CallEvent = true;

var Yanfly = Yanfly || {};
Yanfly.CallEvent = Yanfly.CallEvent || {};
Yanfly.CallEvent.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc 【YEP❀实用类】调用任意地图事件|YEP_CallEvent.js
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 *  ▼ 介绍 
 * ============================================================================
 * 允许游戏调用任意事件中的事件触发。
 * 允许跨地图触发事件！
 * ============================================================================
 * ▼ 插件命令
 * ============================================================================
 *
 * 要从当前地图或其他地图调用事件，请使用插件
 * 以下命令：
 *
 *   插件命令：
 *
 *   CallEvent x
 *   -这将调用当前地图中的事件x并使用事件列表从事件的第一页开始。
 *
 *   CallEvent x, Page y
 *   -这将调用当前地图中的事件x并使用事件列表从事件的第y页开始。
 *
 *   CallEvent x, Map y
 *   -这将调用map y中的事件x，并使用事件的第一页。
 *
 *   CallEvent x, Page y, Map z
 *   -这将调用map z中的事件x，并使用事件的第y页。
 *
 *   CallEvent x, Map y, Page z
 *   -这将调用map y中的事件x，并使用事件的第z页。
 *
 * ============================================================================
 *  ▼ 版本：
 * ============================================================================
 *
 * Version 1.01:
 * - 为RPG Maker MV 1.5.0版更新。
 *
 * Version 1.00:
 * - 发布!
 * ============================================================================
 *  YEP官网：http://yanfly.moe/yep
 *  插件作者：Yanfly
 *  汉化插件：云书 
 *  使用条款：除非另有说明，否则 Yanfly 
 *  制作的任何原始材料均可免费用于免费和商业 RPG Maker 游戏。
 *  要求你在你的游戏致谢名单中提供“Yanfly”或“Yanfly Engine”。
 *  使用条款：http://www.yanfly.moe/wiki/Category:Yanfly_Engine_Plugins#Terms_of_Use
 *  声明：仅用于汉化参考，如发布游戏到官网下载原版插件。
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

var $callEventMap;

DataManager.loadCallMapData = function(mapId) {
  if (mapId > 0) {
    var filename = 'Map%1.json'.format(mapId.padZero(3));
    this.loadDataFile('$callEventMap', filename);
  } else {
    $callEventMap = {};
    $callEventMap.data = [];
    $callEventMap.events = [];
    $callEventMap.width = 100;
    $callEventMap.height = 100;
    $callEventMap.scrollType = 3;
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.CallEvent.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.CallEvent.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'CallEvent') this.callEvent(this.argsToString(args));
};

Game_Interpreter.prototype.argsToString = function(args) {
    var str = '';
    var length = args.length;
    for (var i = 0; i < length; ++i) {
      str += args[i] + ' ';
    }
    return str.trim();
};

Game_Interpreter.prototype.callEvent = function(line) {
  if (this._callEvent_Running) return this.processCallEvent();
  if (line.match(/(\d+),[ ](.*)/i)) {
    var eventId = parseInt(RegExp.$1);
    var line = String(RegExp.$2);
    if (line.match(/PAGE[ ](\d+)/i)) {
      var pageId = parseInt(RegExp.$1);
    } else {
      var pageId = 1;
    }
    if (line.match(/MAP[ ](\d+)/i)) {
      var mapId = parseInt(RegExp.$1);
    } else {
      var mapId = $gameMap.mapId();
    }
  } else {
    var eventId = parseInt(line);
    if (!eventId) return;
    var pageId = 1;
    var mapId = $gameMap.mapId();
  }
  $callEventMap = undefined;
  DataManager.loadCallMapData(mapId);
  this._callEvent_EventId = eventId;
  this._callEvent_PageId = pageId;
  this._callEvent_Running = true;
  this.processCallEvent();
};

Game_Interpreter.prototype.processCallEvent = function() {
  if ($callEventMap) {
    this.insertCallEventData(this._callEvent_EventId, this._callEvent_PageId);
  } else {
    this.wait(1);
    this._index--;
  }
};

Game_Interpreter.prototype.insertCallEventData = function(eventId, pageId) {
  this._callEvent_Running = false;
  var ev = $callEventMap.events[eventId];
  if (!ev) return;
  var page = ev.pages[pageId - 1];
  if (!page) return;
  var list = page.list;
  this.setupChild(list, this.eventId());
};

//=============================================================================
// End of File
//=============================================================================
