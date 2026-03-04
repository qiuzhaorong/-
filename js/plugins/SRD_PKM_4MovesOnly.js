/*:
 * @plugindesc SRD技能数量限制|口袋妖怪[v1.1]
 * @author SumRndmDde
 *
 * @param == Forget Window ==
 * @text == 遗忘技能窗口设置 ==
 * @default
 *
 * @param Max Columns
 * @text 最大列数
 * @desc 这将是技能遗忘窗口技能列表中的最大列数
 * @default 1
 *
 * @param Spacing
 * @text 选项间距
 * @desc 这将是技能遗忘窗口技能列表中选项的间距
 * @default 48
 *
 * @param Message Background
 * @text 提示框背景样式
 * @desc 用于显示文本提示的消息框背景样式
 * '0' = 普通的, '1' = 暗淡, '2' = 无
 * @default 0
 *
 * @param == Alert Lines ==
 * @text == 提示文本行 ==
 * @default
 *
 * @param Alert Line 1
 * @text 提示文本行1
 * @desc 当角色学习的技能超过上限时
提示对话框的第一行文本
 * @default \actor 技能达到了上限！
 *
 * @param Alert Line 2
 * @text 提示文本行2
 * @desc 当角色学习的技能超过上限时
提示对话框的第二行文本
 * @default \!请选择一个技能进行遗忘
 *
 * @param Alert Line 3
 * @text 提示文本行3
 * @desc 当角色学习的技能超过上限时
 提示对话框的第三行文本
 * @default
 *
 * @param Alert Line 4
 * @text 提示文本行4
 * @desc 当角色学习的技能超过上限时
 提示对话框的第四行文本
 * @default
 *
 * @param == End Lines ==
 * @text == 完成文本行 ==
 * @default
 *
 * @param End Line 1
 * @text 完成文本行1
 * @desc 技能遗忘操作完成后对话框的第一行文本
 * \actor = 角色名称       \skill = 被遗忘的技能名称
 * @default 1\..\..\..2\..\..\..\..\..已完成！
 *
 * @param End Line 2
 * @text 完成文本行2
 * @desc 技能遗忘操作完成后对话框的第二行文本
 * \actor = 角色名称       \skill = 被遗忘的技能名称
 * @default \!\actor 遗忘了 \skill!
 *
 * @param End Line 3
 * @text 完成文本行3
 * @desc 技能遗忘操作完成后对话框的第三行文本
 * \actor = 角色名称       \skill = 被遗忘的技能名称
 * @default
 *
 * @param End Line 4
 * @text 完成文本行4
 * @desc 技能遗忘操作完成后对话框的第四行文本
 * \actor = 角色名称       \skill = 被遗忘的技能名称
 * @default

 * @param == Sound Effect ==
 * @text == 音效设置 ==
 * @default

 * @param Sound Effect Name
 * @text 音效名称
 * @desc 技能遗忘完成时播放的音效名称
 * @default TISHI

 * @param Sound Effect Volume
 * @text 音效音量
 * @desc 技能遗忘完成时播放的音效音量
 * @default 90

 * @param Sound Effect Pitch
 * @text 音效音调
 * @desc 技能遗忘完成时播放的音效音调
 * @default 100

 * @param Sound Effect Pan
 * @text 音效相位
 * @desc 技能遗忘完成时播放的音效相位
 * @default 0
 *
 * @help
 * ============================================================================
 * ❀ 插件使用                                                    (o゜▽゜)o☆
 * ============================================================================
 * 当角色学习的技能数量超过4个时，会弹出技能选择界面
 * 玩家必须选择一个技能进行遗忘
 *
 * 该系统复刻了《口袋妖怪》系列中的技能数量限制机制。
 *
 * 其他需要注意的事项：
 * - 角色初始化时，只会保留最近学习的4个技能
 * - 本插件仅对我方角色生效，不影响敌人
 * - 可自定义技能遗忘相关的提示文本
 * - 可将特定技能设置为"不可遗忘"
 * - 角色最近学习的技能始终可以被遗忘
 * ============================================================================
 * ❀ 插件参数                                                    (o゜▽゜)o☆
 * ============================================================================
 *
 * 你可以通过调整参数来改变技能选择界面的显示效果，
 * 以及自定义提示玩家需要遗忘技能的文本内容
 *
 * 修改「提示框背景样式」可将对话框背景切换为
 * 普通、暗淡等样式
 *
 * 「提示文本行」和「完成文本行」的每一行对应
 * 对话框中显示的一行文本内容
 *
 * ============================================================================
 * ❀ 技能标签                                                    (o゜▽゜)o☆
 * ============================================================================
 *
<Cannot Forget> 
该标签标记的技能在遗忘流程中无法被选择删除
 *
 */

//Ugh, I think I'm gonna have to start actually making this
//an extendable Plugin or somethin... :/

var SRD = SRD || {};
SRD.PKM = SRD.PKM || {};
SRD.PKM.FourMovesOnly = {};

var Imported = Imported || {};
Imported.SRD_PKM_4MovesOnly = true;

SRD.PKM.FourMovesOnly.maxColumns = Number(PluginManager.parameters('SRD_PKM_4MovesOnly')['Max Columns']);
SRD.PKM.FourMovesOnly.spacing = Number(PluginManager.parameters('SRD_PKM_4MovesOnly')['Spacing']);
SRD.PKM.FourMovesOnly.background = Number(PluginManager.parameters('SRD_PKM_4MovesOnly')['Message Background']);

SRD.PKM.FourMovesOnly.alertLinesCount = 4;
SRD.PKM.FourMovesOnly.alertLines = [];
for(var i = 1; i <= SRD.PKM.FourMovesOnly.alertLinesCount; i++) {
	SRD.PKM.FourMovesOnly.alertLines[i-1] = String(PluginManager.parameters('SRD_PKM_4MovesOnly')['Alert Line ' + i]);
}

SRD.PKM.FourMovesOnly.endLinesCount = 4;
SRD.PKM.FourMovesOnly.endLines = [];
for(var i = 1; i <= SRD.PKM.FourMovesOnly.endLinesCount; i++) {
	SRD.PKM.FourMovesOnly.endLines[i-1] = String(PluginManager.parameters('SRD_PKM_4MovesOnly')['End Line ' + i]);
}

// 读取音效参数
SRD.PKM.FourMovesOnly.soundEffectName = String(PluginManager.parameters('SRD_PKM_4MovesOnly')['Sound Effect Name']);
SRD.PKM.FourMovesOnly.soundEffectVolume = Number(PluginManager.parameters('SRD_PKM_4MovesOnly')['Sound Effect Volume']);
SRD.PKM.FourMovesOnly.soundEffectPitch = Number(PluginManager.parameters('SRD_PKM_4MovesOnly')['Sound Effect Pitch']);
SRD.PKM.FourMovesOnly.soundEffectPan = Number(PluginManager.parameters('SRD_PKM_4MovesOnly')['Sound Effect Pan']);

//-----------------------------------------------------------------------------
// DataManager
//-----------------------------------------------------------------------------

SRD.PKM.FourMovesOnly.areNotetagsLoaded = false;
SRD.PKM.FourMovesOnly._DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if(!SRD.PKM.FourMovesOnly._DataManager_isDatabaseLoaded.call(this)) return false;
    if(!SRD.PKM.FourMovesOnly.areNotetagsLoaded) {
    	for(var i = 1; i < $dataSkills.length; i++) {
    		if($dataSkills[i].note.match(/<\s*Cannot\s*Forget\s*>/im)) {
    			$dataSkills[i].pkm_cannotDelete = true;
    		} else {
    			$dataSkills[i].pkm_cannotDelete = false;
    		}
    	}
    	SRD.PKM.FourMovesOnly.areNotetagsLoaded = true;
    }
    return true;
};

//-----------------------------------------------------------------------------
// Game_Actor
//-----------------------------------------------------------------------------

SRD.PKM.FourMovesOnly._Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    SRD.PKM.FourMovesOnly._Game_Actor_initMembers.call(this);
    this._mostRecentSkillId = 0;
};

SRD.PKM.FourMovesOnly._Game_Actor_initSkills = Game_Actor.prototype.initSkills;
Game_Actor.prototype.initSkills = function() {
    SRD.PKM.FourMovesOnly._Game_Actor_initSkills.call(this);
    while(this._skills.length > 4) {
    	this._skills.splice(0, 1);
    }
};

Game_Actor.prototype.setMostRecentSkillId = function(id) {
	this._mostRecentSkillId = id;
}

Game_Actor.prototype.mostRecentSkillId = function() {
	return this._mostRecentSkillId;
}

SRD.PKM.FourMovesOnly._Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
	if (!this.isLearnedSkill(skillId)) {
    	this.setMostRecentSkillId(skillId);
    }
    SRD.PKM.FourMovesOnly._Game_Actor_learnSkill.call(this, skillId);
    if(this._skills.length > 4) {
    	if($gameParty.forgetSkillReadyActorId() === 0) {
    		var lines = [];
	    	for(var i = 0; i < SRD.PKM.FourMovesOnly.alertLinesCount; i++) {
	    		lines[i] = SRD.PKM.FourMovesOnly.alertLines[i].replace(/\\actor/im, this._name);
	    	}
	    	for(var i = 0; i < SRD.PKM.FourMovesOnly.alertLinesCount; i++) {
	    		if(lines[i].trim().length > 0) {
	    			$gameMessage.setBackground(SRD.PKM.FourMovesOnly.background);
	    			$gameMessage.add(lines[i]);
	    		}
	    	}
	    	$gameParty.setForgetSkillReady(1);
	    	$gameParty.setForgetSkillReadyActorId(this._actorId);
    	} else {
    		$gameParty.addForgetSkillReadyActorIds(this._actorId);
    	}
    }
};

//-----------------------------------------------------------------------------
// Game_Party
//-----------------------------------------------------------------------------

SRD.PKM.FourMovesOnly._Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    SRD.PKM.FourMovesOnly._Game_Party_initialize.call(this);
    this._skillForgetReady = 0;
    this._skillForgetReadyActorId = 0;
    this._skillForgetReadyActorIds = [];
    this._canRemoveHMMoves = false;
};

Game_Party.prototype.forgetSkillReady = function() {
    return this._skillForgetReady;
};

Game_Party.prototype.forgetSkillReadyActorId = function() {
    return this._skillForgetReadyActorId;
};

Game_Party.prototype.setForgetSkillReady = function(isReady) {
    this._skillForgetReady = isReady;
};

Game_Party.prototype.getForgetSkillReady = function() {
    return this._skillForgetReady;
};

Game_Party.prototype.setForgetSkillReadyActorId = function(actorId) {
    this._skillForgetReadyActorId = actorId;
};

Game_Party.prototype.addForgetSkillReadyActorIds = function(actorId) {
    this._skillForgetReadyActorIds.push(actorId);
};

Game_Party.prototype.getNextForgetSkillReadyActorId = function() {
    var result = this._skillForgetReadyActorIds[0];
    this._skillForgetReadyActorIds.splice(0, 1);
    return result;
};

Game_Party.prototype.checkForgetSkillReadyActorId = function() {
	return this._skillForgetReadyActorIds.length !== 0;
};

Game_Party.prototype.canRemoveHMMoves = function() {
    return this._canRemoveHMMoves;
};

Game_Party.prototype.setCanRemoveHMMoves = function(canHM) {
    this._canRemoveHMMoves = canHM;
};

//-----------------------------------------------------------------------------
// Scene_Base
//-----------------------------------------------------------------------------

SRD.PKM.FourMovesOnly._Scene_Base_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
    SRD.PKM.FourMovesOnly._Scene_Base_update.call(this);
    if($gameParty.forgetSkillReady() > 0 && !$gameMessage.isBusy()) {
    	if($gameParty.forgetSkillReady() === 1) {
    		$gameParty.setForgetSkillReady(0);
			SceneManager.push(Scene_ForgetSkill);
    	}
    	if($gameParty.forgetSkillReady() === 2) {
    		$gameMessage.clear();
			var id = $gameParty.getNextForgetSkillReadyActorId();
	    	var actor = $gameActors.actor(id);
	    	var lines = [];
	    	for(var i = 0; i < SRD.PKM.FourMovesOnly.alertLinesCount; i++) {
	    		lines[i] = SRD.PKM.FourMovesOnly.alertLines[i].replace(/\\actor/im, actor.name());
	    	}
	    	for(var i = 0; i < SRD.PKM.FourMovesOnly.alertLinesCount; i++) {
	    		if(lines[i].trim().length > 0) {
	    			$gameMessage.setBackground(SRD.PKM.FourMovesOnly.background);
	    			$gameMessage.add(lines[i]);
	    		}
	    	}
	    	$gameParty.setForgetSkillReady(1);
	    	$gameParty.setForgetSkillReadyActorId(actor.actorId());
	    }
	}
};

//-----------------------------------------------------------------------------
// Scene_ForgetSkill
//-----------------------------------------------------------------------------

function Scene_ForgetSkill() {
    this.initialize.apply(this, arguments);
}

Scene_ForgetSkill.prototype = Object.create(Scene_ItemBase.prototype);
Scene_ForgetSkill.prototype.constructor = Scene_ForgetSkill;

Scene_ForgetSkill.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

Scene_ForgetSkill.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createStatusWindow2();
    this.createHelpWindow();
    this.createStatusWindow();
    this.createItemWindow();
    this.refreshActor();
    this.commandSkill();
};

Scene_ForgetSkill.prototype.createStatusWindow2 = function() {
    this._statusWindow2 = new Window_ForgetSkillStatus2(0, 0, Graphics.boxWidth, 70);
    this.addWindow(this._statusWindow2);
    this._statusWindow2.refresh();
}

Scene_ForgetSkill.prototype.createHelpWindow = function() {
	this._helpWindow = new Window_Help();
    this._helpWindow.y = this._statusWindow2.y + this._statusWindow2.height;
    this.addWindow(this._helpWindow);
}

Scene_ForgetSkill.prototype.createStatusWindow = function() {
	var wx = 0;
    var wy = this._helpWindow.y + this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = 70;
    this._statusWindow = new Window_ForgetSkillStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
    this._statusWindow.refresh();
};

Scene_ForgetSkill.prototype.createItemWindow = function() {
    var wx = 0;
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_ForgetSkillList(wx, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
    if($gameParty.canRemoveHMMoves()) {
    	this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    }
    this.addWindow(this._itemWindow);
};

Scene_ForgetSkill.prototype.actor = function() {
    return $gameActors.actor($gameParty.forgetSkillReadyActorId());
};

Scene_ForgetSkill.prototype.user = function() {
    return this.actor();
};

Scene_Skill.prototype.playSeForItem = function() {
};

Scene_ForgetSkill.prototype.refreshActor = function() {
    var actor = this.actor();
    this._statusWindow.setActor(actor);
    this._itemWindow.setActor(actor);
};

Scene_ForgetSkill.prototype.commandSkill = function() {
    this._itemWindow.activate();
    this._itemWindow.selectLast();
};

Scene_ForgetSkill.prototype.onItemOk = function() {
    this.actor().forgetSkill(this.item().id);
    var name = this.actor().name();
    var itemName = this.item().name;
    $gameParty.setForgetSkillReadyActorId(0);
    $gameParty.setCanRemoveHMMoves(false);
    this.popScene();
    
    var lines = [];
    for(var i = 0; i < SRD.PKM.FourMovesOnly.endLinesCount; i++) {
    	lines[i] = SRD.PKM.FourMovesOnly.endLines[i].replace(/\\actor/im, name);
    	lines[i] = lines[i].replace(/\\skill/im, itemName);
    }
    for(var i = 0; i < SRD.PKM.FourMovesOnly.endLinesCount; i++) {
    	if(lines[i].trim().length > 0) {
    		$gameMessage.setBackground(SRD.PKM.FourMovesOnly.background);
    		$gameMessage.add(lines[i]);
        
        // 在显示完成文本行2的时候播放音效（索引为1，因为数组从0开始）
        if(i === 1) {
            AudioManager.playSe({
                name: SRD.PKM.FourMovesOnly.soundEffectName,
                volume: SRD.PKM.FourMovesOnly.soundEffectVolume,
                pitch: SRD.PKM.FourMovesOnly.soundEffectPitch,
                pan: SRD.PKM.FourMovesOnly.soundEffectPan
            });
        }
    	}
    }

    if($gameParty.checkForgetSkillReadyActorId()) {
    	$gameParty.setForgetSkillReady(2);
    }
};

Scene_ForgetSkill.prototype.onItemCancel = function() {
    $gameParty.setForgetSkillReadyActorId(0);
    $gameParty.setCanRemoveHMMoves(false);
    this.popScene();
};

//-----------------------------------------------------------------------------
// Window_ForgetSkillList
//-----------------------------------------------------------------------------

function Window_ForgetSkillList() {
    this.initialize.apply(this, arguments);
}

Window_ForgetSkillList.prototype = Object.create(Window_SkillList.prototype);
Window_ForgetSkillList.prototype.constructor = Window_ForgetSkillList;

Window_ForgetSkillList.prototype.initialize = function(x, y, width, height) {
    Window_SkillList.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this._data = [];
};

Window_ForgetSkillList.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
        this.resetScroll();
    }
};

Window_ForgetSkillList.prototype.maxCols = function() {
    return SRD.PKM.FourMovesOnly.maxColumns;
};

Window_ForgetSkillList.prototype.spacing = function() {
    return SRD.PKM.FourMovesOnly.spacing;
};

Window_ForgetSkillList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_ForgetSkillList.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_ForgetSkillList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_ForgetSkillList.prototype.isEnabled = function(item) {
    return !item.pkm_cannotDelete || item.id === this._actor.mostRecentSkillId() || $gameParty.canRemoveHMMoves();
};

Window_ForgetSkillList.prototype.makeItemList = function() {
    if (this._actor) {
        this._data = this._actor.skills();
    } else {
        this._data = [];
    }
};

Window_ForgetSkillList.prototype.selectLast = function() {
    this.select(0);
};

Window_ForgetSkillList.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

Window_ForgetSkillList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

//-----------------------------------------------------------------------------
// Window_ForgetSkillStatus
//-----------------------------------------------------------------------------

function Window_ForgetSkillStatus() {
    this.initialize.apply(this, arguments);
}

Window_ForgetSkillStatus.prototype = Object.create(Window_Base.prototype);
Window_ForgetSkillStatus.prototype.constructor = Window_ForgetSkillStatus;

Window_ForgetSkillStatus.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
};

Window_ForgetSkillStatus.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_ForgetSkillStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
    	var x = 0;
	    var x2 = x + 280;
	    var x3 = x2 + 280;
	    var y = 0;
        var actor = this._actor;
	    this.drawActorName(actor, x, y);
	    this.drawActorLevel(actor, x2, y);
	    this.drawActorClass(actor, x3, y);
    }
};

//-----------------------------------------------------------------------------
// Window_ForgetSkillStatus2
//-----------------------------------------------------------------------------

function Window_ForgetSkillStatus2() {
    this.initialize.apply(this, arguments);
}

Window_ForgetSkillStatus2.prototype = Object.create(Window_Base.prototype);
Window_ForgetSkillStatus2.prototype.constructor = Window_ForgetSkillStatus;

Window_ForgetSkillStatus2.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
};

Window_ForgetSkillStatus2.prototype.refresh = function() {
    this.contents.clear();
    this.drawText("请选择要删除的技能", 0, 0, (Graphics.boxWidth), 'center');
};