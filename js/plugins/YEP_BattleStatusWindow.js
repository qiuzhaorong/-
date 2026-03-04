//=============================================================================
// Yanfly Engine Plugins - Battle Status Window
// YEP_BattleStatusWindow.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BattleStatusWindow = true;

var Yanfly = Yanfly || {};
Yanfly.BSW = Yanfly.BSW || {};
Yanfly.BSW.version = 1.09;

//=============================================================================
 /*:
 * @plugindesc YEP战斗状态窗口[v1.09]
 * @author Yanfly Engine Plugins
 *
 * @param ---Visual---
 * @text --- 视觉效果 ---
 * @default
 *
 * @param No Action Icon
 * @text 无动作图标
 * @parent ---Visual---
 * @type number
 * @min 0
 * @desc 未选择动作时使用的图标
 * @default 16
 *
 * @param Name Font Size
 * @text 姓名字体大小
 * @parent ---Visual---
 * @type number
 * @min 1
 * @desc 绘制角色姓名时使用的字体大小
 * Default: 28
 * @default 20
 *
 * @param Param Font Size
 * @text 数值字体大小
 * @parent ---Visual---
 * @type number
 * @min 1
 * @desc 绘制角色参数时使用的字体大小
 * Default: 28
 * @default 20
 *
 * @param Param Y Buffer
 * @text 数值 Y 轴缓冲
 * @parent ---Visual---
 * @type number
 * @min 0
 * @desc 参数文本绘制时向下偏移的距离
 * @default 7
 *
 * @param Param Current Max
 * @text 数值当前/最大值
 * @parent ---Visual---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 是否绘制当前值 / 最大值格式？
 * @default false
 *
 * @param Adjust Columns
 * @text 调整列数
 * @parent ---Visual---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 根据队伍规模调整列数？
 * @default false
 *
 * @param State Icons Row
 * @text 状态图标行
 * @parent ---Visual---
 * @type number
 * @min 0
 * @max 3
 * @desc 0状态图标显示在最上方的第0行为1显示
 在第 1 行；设为2或3时显示在更靠下 2行或第3行
 * Default: 1
 * @default 1
 *
 * @param ---Actor Switching---
 * @text --- 角色切换 ---
 * @default
 *
 * @param Left / Right
 * @text 左右方向键
 * @parent ---Actor Switching---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 使用左右方向键切换角色？
 * @default true
 *
 * @param PageUp / PageDown
 * @text PageUp/PageDown
 * @parent ---Actor Switching---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 使用 PageUp 和 PageDown 切换角色
 * @default true
 *
 * @param Allow Turn Skip
 * @text 允许跳过回合
 * @parent ---Actor Switching---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 对于基于时间的战斗系统，允许跳过回合
 * @default true
 *
 * @param ---Front View---
 * @text --- 正面视角 ---
 * @default
 *
 * @param Show Animations
 * @text 显示动画
 * @parent ---Front View---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 在正面视角中显示角色和他们的动画
 * @default true
 *
 * @param Show Sprites
 * @text 显示战斗角色
 * @parent ---Front View---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 在正面视角中显示角色精灵？
 * @default false
 *
 * @param Align Animations
 * @text 对齐动画
 * @parent ---Front View---
 * @type boolean
 * @on 是
 * @off 否
 * @desc 如果使用正面视角，是否将战斗动画与窗口对齐
 * @default true
 *
 * @param X Offset
 * @text X 偏移
 * @parent ---Front View---
 * @type number
 * @desc 你希望角色 X 位置偏移多少？
 * @default 24
 *
 * @param Y Offset
 * @text Y 偏移
 * @parent ---Front View---
 * @type number
 * @desc 你希望角色 Y 位置偏移多少
 * @default -16
 *
 * @help
 * ============================================================================
 * 使用说明
 * ============================================================================
 *
   将插件导入到 RPG Maker MV 的项目插件管理中，并启用该插件。
   根据你的游戏需求，在插件参数设置中调整各项视觉效果和操作方式
   可根据游戏画面风格调整字体大小、图标位置等视觉参数
   可根据操作习惯设置角色切换的按键方式
   针对正面视角战斗模式进行专门的动画和精灵显示设置
   插件会自动替换默认的战斗状态窗口，以水平列格式显示队伍成员的头像和状态信息
   在战斗中，你可以通过设置的按键（如左右方向键、PageUp/PageDown）切换角色
   状态图标会显示在你设定的行位置，参数显示格式可选择仅当前值或当前 / 最大值
 *
 
   注意事项
   该插件优化了正面视角下的动画显示，使玩家能更好地了解战斗情况
   与 Yanfly 的其他战斗相关插件（如 Battle Engine Core、ATB 战斗系统）有兼容性支持
   调整列数参数会影响战斗动画的播放位置
   当更改角色的头像图形等事件发生时，状态窗口会自动刷新
 
 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.09:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.08:
 * - Added 'State Icons Row' plugin parameter. This plugin parameter allows you
 * to adjust what 'row' you want the state icons to appear in.
 *
 * Version 1.07:
 * - Optimization update.
 *
 * Version 1.06:
 * - Fixed a bug that prevented animations from using flashes on the actor
 * sprite if they were visible from front view.
 *
 * Version 1.05:
 * - Optimized face drawing effect to work more efficiently.
 *
 * Version 1.04:
 * - Added 'Allow Turn Skip' plugin parameter to let you decide if you can let
 * the player skip turns for tick-based battle systems.
 *
 * Version 1.03:
 * - Added a failsafe check to make frontview animations work regardless of
 * having RPG Maker MV 1.0.1 update.
 *
 * Version 1.02a:
 * - Added 'Adjust Columns' parameter.
 * - Updated functionality for 'Adjust Columns' to alter where the animations
 * are played.
 * - Added a timed refresh for the face loading to show at faster intervals.
 *
 * Version 1.01a:
 * - Added refresh modifiers to update an actor's face whenever an event to
 * change the actor's face graphic.
 * - Made an override for ATB style to automatically default on style 1.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_BattleStatusWindow');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Icon.NoAction = Number(Yanfly.Parameters['No Action Icon']);
Yanfly.Param.BSWNameFontSize = Number(Yanfly.Parameters['Name Font Size']);
Yanfly.Param.BSWParamFontSize = Number(Yanfly.Parameters['Param Font Size']);
Yanfly.Param.BSWParamYBuffer = Number(Yanfly.Parameters['Param Y Buffer']);
Yanfly.Param.BSWCurrentMax = String(Yanfly.Parameters['Param Current Max']);
Yanfly.Param.BSWCurrentMax = eval(Yanfly.Param.BSWCurrentMax);
Yanfly.Param.BSWAdjustCol = eval(String(Yanfly.Parameters['Adjust Columns']));
Yanfly.Param.BSWStateIconRow = Number(Yanfly.Parameters['State Icons Row']);

Yanfly.Param.BSWLfRt = eval(String(Yanfly.Parameters['Left / Right']));
Yanfly.Param.BSWPageUpDn = eval(String(Yanfly.Parameters['PageUp / PageDown']));
Yanfly.Param.BSWTurnSkip = eval(String(Yanfly.Parameters['Allow Turn Skip']));

Yanfly.Param.BSWShowAni = eval(String(Yanfly.Parameters['Show Animations']));
Yanfly.Param.BSWShowSprite = eval(String(Yanfly.Parameters['Show Sprites']));
Yanfly.Param.BSWAlignAni = eval(String(Yanfly.Parameters['Align Animations']));
Yanfly.Param.BSWXOffset = Number(Yanfly.Parameters['X Offset']);
Yanfly.Param.BSWYOffset = Number(Yanfly.Parameters['Y Offset']);
Yanfly.Param.ATBGaugeStyle = 1;

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.BSW.BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
    Yanfly.BSW.BattleManager_startInput.call(this);
    this.refreshStatus();
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.BSW.Game_Action_clear = Game_Action.prototype.clear;
Game_Action.prototype.clear = function() {
    Yanfly.BSW.Game_Action_clear.call(this);
    this.subject().refresh();
};

Yanfly.BSW.Game_Action_setSkill = Game_Action.prototype.setSkill;
Game_Action.prototype.setSkill = function(skillId) {
    Yanfly.BSW.Game_Action_setSkill.call(this, skillId);
    this.subject().refresh();
};

Yanfly.BSW.Game_Action_setItem = Game_Action.prototype.setItem;
Game_Action.prototype.setItem = function(itemId) {
    Yanfly.BSW.Game_Action_setItem.call(this, itemId);
    this.subject().refresh();
};

Yanfly.BSW.Game_Action_setItemObject = Game_Action.prototype.setItemObject;
Game_Action.prototype.setItemObject = function(object) {
    Yanfly.BSW.Game_Action_setItemObject.call(this, object);
    this.subject().refresh();
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.BSW.Game_Actor_isSpriteVisible = Game_Actor.prototype.isSpriteVisible;
Game_Actor.prototype.isSpriteVisible = function() {
    if (Yanfly.Param.BSWShowAni && !$gameSystem.isSideView()) {
      return true;
    }
    return Yanfly.BSW.Game_Actor_isSpriteVisible.call(this);
};

Yanfly.BSW.Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
    Yanfly.BSW.Game_Actor_changeClass.call(this, classId, keepExp);
    this.battleStatusWindowRefresh();
};

Yanfly.BSW.Game_Actor_setCharacterImage = 
    Game_Actor.prototype.setCharacterImage;
Game_Actor.prototype.setCharacterImage = function(name, index) {
    Yanfly.BSW.Game_Actor_setCharacterImage.call(this, name, index);
    this.battleStatusWindowRefresh();
};

Yanfly.BSW.Game_Actor_setFaceImage =
    Game_Actor.prototype.setFaceImage;
Game_Actor.prototype.setFaceImage = function(faceName, faceIndex) {
    Yanfly.BSW.Game_Actor_setFaceImage.call(this, faceName, faceIndex);
    this.battleStatusWindowRefresh();
};

Yanfly.BSW.Game_Actor_setBattlerImage =
    Game_Actor.prototype.setBattlerImage;
Game_Actor.prototype.setBattlerImage = function(battlerName) {
    Yanfly.BSW.Game_Actor_setBattlerImage.call(this, battlerName);
    this.battleStatusWindowRefresh();
};

Game_Actor.prototype.battleStatusWindowRefresh = function() {
    if (!$gameParty.inBattle()) return;
    if (!$gameParty.battleMembers().contains(this)) return;
    BattleManager.refreshStatus();
};

//=============================================================================
// Sprite_Actor
//=============================================================================

Yanfly.BSW.Sprite_Actor_createMainSprite =
    Sprite_Actor.prototype.createMainSprite;
Sprite_Actor.prototype.createMainSprite = function() {
    Yanfly.BSW.Sprite_Actor_createMainSprite.call(this);
    if ($gameSystem.isSideView()) return;
    if (Yanfly.Param.BSWShowSprite) {
      this._effectTarget = this._mainSprite || this;
    } else {
      this._effectTarget = this;
    }
};

Yanfly.BSW.Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    if (Yanfly.Param.BSWAlignAni && !$gameSystem.isSideView()) {
      this.setActorHomeFrontView(index);
    } else {
      Yanfly.BSW.Sprite_Actor_setActorHome.call(this, index);
    }
};

Sprite_Actor.prototype.setActorHomeFrontView = function(index) {
    if (Imported.YEP_BattleEngineCore) {
      var statusHeight = Yanfly.Param.BECCommandRows;
    } else {
      var statusHeight = 4;
    }
    statusHeight *= Window_Base.prototype.lineHeight.call(this);
    statusHeight += Window_Base.prototype.standardPadding.call(this) * 2;
    var screenW = Graphics.boxWidth;
    var windowW = Window_PartyCommand.prototype.windowWidth.call(this);
    screenW -= windowW;
    windowW /= 2;
    if (Yanfly.Param.BSWAdjustCol) {
      var size = $gameParty.battleMembers().length;
    } else {
      var size = $gameParty.maxBattleMembers();
    }
    
    var homeX = screenW / size * index + windowW + screenW / (size * 2);
    homeX += Yanfly.Param.BSWXOffset;
    var homeY = Graphics.boxHeight - statusHeight;
    homeY += Yanfly.Param.BSWYOffset;
    this.setHome(homeX, homeY);
    this.moveToStartPosition();
};

Yanfly.BSW.Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
    Yanfly.BSW.Sprite_Actor_update.call(this);
    if (!this._actor) return;
    if ($gameSystem.isSideView()) return;
    if (Yanfly.Param.BSWShowSprite) return;
    this.hideAllSideviewSprites();
};

Sprite_Actor.prototype.hideAllSideviewSprites = function() {
    this._mainSprite.visible = false;
    this._shadowSprite.visible = false;
    this._weaponSprite.visible = false;
    this._stateSprite.visible = false;
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawActorActionIcon = function(actor, wx, wy) {
    var icon = Yanfly.Icon.NoAction;
    if (actor.currentAction() && actor.currentAction().item()) {
      icon = actor.currentAction().item().iconIndex || Yanfly.Icon.NoAction;
    }
    this.drawIcon(icon, wx + 2, wy + 2);
};

//=============================================================================
// Window_PartyCommand
//=============================================================================

Window_PartyCommand.prototype.processHandling = function() {
    if (this.isOpenAndActive() && Yanfly.Param.BSWPageUpDn) {
      if (this.isHandled('pagedown') && Input.isRepeated('pagedown')) {
        return this.processPagedown();
      }
    }
    Window_Selectable.prototype.processHandling.call(this);
    if (this.isOpenAndActive() && Yanfly.Param.BSWLfRt) {
      if (this.isHandled('right') && Input.isRepeated('right')) {
        this.processRight();
      }
    }
};

Window_PartyCommand.prototype.processRight = function() {
    SoundManager.playCursor();
    this.updateInputData();
    this.deactivate();
    this.callHandler('right');
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.processHandling = function() {
    if (this.isOpenAndActive() && Yanfly.Param.BSWPageUpDn) {
      if (this.isHandled('pageup') && Input.isRepeated('pageup')) {
        return this.processPageup();
      } else if (this.isHandled('pagedown') && Input.isRepeated('pagedown')) {
        return this.processPagedown();
      }
    }
    Window_Selectable.prototype.processHandling.call(this);
    if (this.isOpenAndActive() && Yanfly.Param.BSWLfRt) {
      if (this.isHandled('left') && Input.isRepeated('left')) {
        this.processLeft();
      } else if (this.isHandled('right') && Input.isRepeated('right')) {
        this.processRight();
      }
    }
};

Window_ActorCommand.prototype.processLeft = function() {
    SoundManager.playCursor();
    this.updateInputData();
    this.deactivate();
    this.callHandler('left');
};

Window_ActorCommand.prototype.processRight = function() {
    if (SceneManager._scene.isAllowRightCommand()) {
      SoundManager.playCursor();
    }
    this.updateInputData();
    this.deactivate();
    this.callHandler('right');
};

Window_ActorCommand.prototype.processCancel = function() {
    var action = BattleManager.inputtingAction();
    if (action) action.clear();
    Window_Command.prototype.processCancel.call(this);
};

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.createContents = function() {
    this.createFaceContents();
    this._currentMax = Yanfly.Param.BSWCurrentMax;
    Window_Selectable.prototype.createContents.call(this);
};

Window_BattleStatus.prototype.createFaceContents = function() {
    this._faceContents = new Sprite();
    var ww = this.contentsWidth();
    var wy = this.contentsHeight();
    this._faceContents.bitmap = new Bitmap(ww, wy);
    this.addChildAt(this._faceContents, 2);
    this._faceContents.move(this.standardPadding(), this.standardPadding());
};

Window_BattleStatus.prototype.drawAllItems = function() {
    Window_Selectable.prototype.drawAllItems.call(this);
    this.drawAllFaces();
};

Window_BattleStatus.prototype.drawAllFaces = function() {
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var member = $gameParty.battleMembers()[i];
      var bitmap = ImageManager.loadFace(member.faceName());
      if (bitmap.width <= 0) return setTimeout(this.drawAllFaces.bind(this), 5);
    }
    this._faceContents.bitmap.clear();
    for (var i = 0; i < this.maxItems(); ++i) {
      this.drawStatusFace(i);
    }
};

Window_BattleStatus.prototype.maxRows = function() {
    var rows = 1;
    return rows;
};

Window_BattleStatus.prototype.maxCols = function() {
    if (Yanfly.Param.BSWAdjustCol) {
      return this.maxItems();
    } else {
      return $gameParty.maxBattleMembers();
    }
    return cols;
};

Window_BattleStatus.prototype.itemWidth = function() {
    return this.contents.width / this.maxCols();
};

Window_BattleStatus.prototype.spacing = function() {
    return 0;
};

Window_BattleStatus.prototype.itemHeight = function() {
    return this.lineHeight() * this.numVisibleRows();
};

Window_BattleStatus.prototype.drawItem = function(index) {
    var actor = $gameParty.battleMembers()[index];
    this.drawBasicArea(this.basicAreaRect(index), actor);
    this.drawGaugeArea(this.gaugeAreaRect(index), actor);
    this.drawStateArea(this.basicAreaRect(index), actor);
};

Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    if (Imported.YEP_X_BattleSysATB && Yanfly.Param.ATBGaugeStyle) {
      if (BattleManager.isATB()) {
        this.drawActorAtbGauge(actor, rect.x - 2, rect.y, rect.width + 2);
      }
    }
    var iw = Window_Base._iconWidth;
    this.drawActorActionIcon(actor, rect.x, rect.y);
    this.resetFontSettings();
    this.contents.fontSize = Yanfly.Param.BSWNameFontSize;
    this.drawActorName(actor, rect.x + iw + 4, rect.y, rect.width);
};

Window_BattleStatus.prototype.basicAreaRect = function(index) {
    var rect = this.itemRectForText(index);
    rect.height = this.lineHeight() * 2;
    return rect;
};

Window_BattleStatus.prototype.drawGaugeArea = function(rect, actor) {
    this.contents.fontSize = Yanfly.Param.BSWParamFontSize;
    this._enableYBuffer = true;
    var wy = rect.y + rect.height - this.lineHeight();
    var wymod = (Imported.YEP_CoreEngine) ? Yanfly.Param.GaugeHeight : 6;
    var wymod = Math.max(16, wymod);
    this.drawActorHp(actor, rect.x, wy - wymod, rect.width);
    if (this.getGaugesDrawn(actor) <= 2) {
      this.drawActorMp(actor, rect.x, wy, rect.width);
    } else {
      var ww = rect.width / 2;
      this.drawActorMp(actor, rect.x, wy, ww);
      this.drawActorTp(actor, rect.x + ww, wy, ww);
    }
    this._enableYBuffer = false;
};

Window_BattleStatus.prototype.drawStateArea = function(rect, actor) {
  var row = Yanfly.Param.BSWStateIconRow;
  if (row === undefined) row = 1;
  var wy = rect.y + (this.lineHeight() * row);
  this.drawActorIcons(actor, rect.x + 2, wy, rect.width);
};

Window_BattleStatus.prototype.getGaugesDrawn = function(actor) {
    var value = 2;
    if ($dataSystem.optDisplayTp) value += 1;
    return value;
};

Window_BattleStatus.prototype.gaugeAreaRect = function(index) {
    var rect = this.itemRectForText(index);
    rect.height = this.contents.height - this.lineHeight() * 2;
    rect.y = this.contents.height - rect.height;
    return rect;
};

Window_BattleStatus.prototype.drawStatusFace = function(index) {
    var actor = $gameParty.battleMembers()[index];
    var rect = this.itemRect(index);
    var ww = Math.min(rect.width - 8, Window_Base._faceWidth);
    var wh = Math.min(rect.height - 8, Window_Base._faceHeight);
    var wx = rect.x + rect.width - ww - 6;
    var wy = rect.y + 4;
    this.drawActorFace(actor, wx, wy, ww, wh);
};

Window_BattleStatus.prototype.drawFace = function(fn, fi, x, y, width, height) {
    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    var bitmap = ImageManager.loadFace(fn);
    var pw = Window_Base._faceWidth;
    var ph = Window_Base._faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = fi % 4 * pw + (pw - sw) / 2;
    var sy = Math.floor(fi / 4) * ph + (ph - sh) / 2;
    this._faceContents.bitmap.blt(bitmap, sx, sy, sw, sh, dx, dy);
};

Window_BattleStatus.prototype.updateTransform = function() {
    Window_Selectable.prototype.updateTransform.call(this);
    this.updateFaceContents();
};

Window_BattleStatus.prototype.updateFaceContents = function() {
    var w = this._width - this._padding * 2;
    var h = this._height - this._padding * 2;
    if (w > 0 && h > 0) {
      this._faceContents.setFrame(this.origin.x, this.origin.y, w, h);
      this._faceContents.visible = this.isOpen();
    } else {
      this._faceContents.visible = false;
    }
};

Window_BattleStatus.prototype.drawText = function(text, wx, wy, ww, align) {
    if (this._enableYBuffer) {
      wy += Yanfly.Param.BSWParamYBuffer;
      wx += 2;
      ww -= 4;
    }
    Window_Selectable.prototype.drawText.call(this, text, wx, wy, ww, align);
};

Window_BattleStatus.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    if (this._currentMax) {
      Window_Selectable.prototype.drawCurrentAndMax.call(this, current, max,
        x, y, width, color1, color2);
    } else {
      this.changeTextColor(color1);
      var value = Yanfly.Util.toGroup(current);
      this.drawText(value, x, y, width, 'right');
    }
};

Window_BattleStatus.prototype.drawItemGaugeIcon = function(iconIndex, wx, wy) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var iconWidth = (Imported.YEP_CoreEngine) ? Yanfly.Param.GaugeHeight : 32;
    var iconHeight = (Imported.YEP_CoreEngine) ? Yanfly.Param.GaugeHeight : 32;
    wy += Window_Base._iconHeight - iconHeight;
    this.contents.blt(bitmap, sx, sy, pw, ph, wx, wy, iconWidth, iconHeight);
    return iconWidth;
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.BSW.Scene_Battle_createPartyCommandWindow =
    Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
    Yanfly.BSW.Scene_Battle_createPartyCommandWindow.call(this);
    var win = this._partyCommandWindow;
    if (Yanfly.Param.BSWLfRt) {
      win.setHandler('right', this.commandFight.bind(this));
    }
    if (Yanfly.Param.BSWPageUpDn) {
      win.setHandler('pagedown', this.commandFight.bind(this));
    };
};

Yanfly.BSW.Scene_Battle_createActorCommandWindow =
    Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    Yanfly.BSW.Scene_Battle_createActorCommandWindow.call(this);
    var win = this._actorCommandWindow;
    if (Yanfly.Param.BSWLfRt) {
      win.setHandler('left', this.selectPreviousCommand.bind(this));
      win.setHandler('right', this.selectRightCommand.bind(this));
    }
    if (Yanfly.Param.BSWPageUpDn) {
      win.setHandler('pageup', this.selectPreviousCommand.bind(this));
      win.setHandler('pagedown', this.selectRightCommand.bind(this));
    };
};

Scene_Battle.prototype.clearInputtingAction = function() {
    var action = BattleManager.inputtingAction();
    if (action) action.clear();
};

Yanfly.BSW.Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    Yanfly.BSW.Scene_Battle_onActorCancel.call(this);
    this.clearInputtingAction();
};

Yanfly.BSW.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    Yanfly.BSW.Scene_Battle_onEnemyCancel.call(this);
    this.clearInputtingAction();
};

Yanfly.BSW.Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function() {
    Yanfly.BSW.Scene_Battle_onSkillCancel.call(this);
    this.clearInputtingAction();
};

Yanfly.BSW.Scene_Battle_onItemCancel = Scene_Battle.prototype.onItemCancel;
Scene_Battle.prototype.onItemCancel = function() {
    Yanfly.BSW.Scene_Battle_onItemCancel.call(this);
    this.clearInputtingAction();
};

Scene_Battle.prototype.selectRightCommand = function() {
    if (!this.isAllowRightCommand()) {
      return this._actorCommandWindow.activate();
    }
    if (Imported.YEP_BattleEngineCore && BattleManager.isTickBased()) {
      if (BattleManager.actor()) BattleManager.actor().onTurnStart();
    }
    this.selectNextCommand();
};

Scene_Battle.prototype.isAllowRightCommand = function() {
  if (Yanfly.Param.BSWTurnSkip) return true;
  if (Imported.YEP_BattleEngineCore && BattleManager.isTickBased()) {
    return false;
  }
  return true;
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

//=============================================================================
// End of File
//=============================================================================
