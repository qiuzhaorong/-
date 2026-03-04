/*:
 * @plugindesc 口袋妖怪❀队伍控制|战斗相关|A组| 下
 * @author DreamX 汉化：硕明云书
 * 
 * @param Battle Members Only
 * @text 仅限战斗成员
 * @desc 只有战斗成员可以作为追随者出现，false：任何出现默认值：true
 * @default false
 * 
 * @param Automatic Follower Refresh
 * @text 自动追随者刷新
 * @desc 更改开关时自动刷新
 * @default true
 * 
 * @param 
 * @text 此插件搭配|A组|上
 * @desc 
 * @default 
 * @help
 * ============================================================================
 * ❀ 插件介绍                                                    (o゜▽゜)o☆
 * ============================================================================
 * 如果想要地图上整个队伍只显示一个驯兽师角色，
 * 那么需要给显示的那个角色添加<no_battle:1><no_menu:1>，
 * 其他角色一律添加<no_follow:1>
 * 
 * ============================================================================
 * ❀ 角色备注                                                    (o゜▽゜)o☆
 * ============================================================================
 *  <no_follow:1>角色不做为跟随者出现
 *  <no_follow_switch:x> 指定开关作为什么是否是追随者x 更改为开关编号
 *  <no_battle:1> 角色不会参战
 *  <no_menu:1>  角色不会出现在菜单中
 * ============================================================================
 * ❀ 插件指令                                                    (o゜▽゜)o☆
 * ============================================================================
 * ToggleFollower 2 	- 切换角色作为追随者的可见性。
 * 使用角色 ID。 在这种情况下，它是角色 #2.
 * ShowFollower 4 	- 将角色显示为追随者
 * 使用角色 ID。 在这种情况下，它是角色 #4.
 * HideFollower  6 	- 将角色隐藏为追随者
 * 使用角色 ID。 在这种情况下，它是角色 #6.
 * ============================================================================
 * ❀ 使用条款                                                    (o゜▽゜)o☆
 * ============================================================================
 * 免费使用和修改商业和非商业游戏。
 * 
 * 感谢 Rpg Maker 论坛上的 Shaz 和 Liquidize 的帮助。
 * 感谢 Rpg Maker 论坛上的 Gilles 的帮助。
 * 感谢 Yanfly 提供 YEP 队伍系统。
 */

var Imported = Imported || {};
Imported.DreamX_FollowerOptions = true;

var DreamX = DreamX || {};
DreamX.FollowerOptions = DreamX.FollowerOptions || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_FollowerOptions');
    var parameterBattleMembersOnly = eval(String(parameters['Battle Members Only']));
    var parameterAutoRefresh = eval(String(parameters['Automatic Follower Refresh']));

    DreamX.FollowerOptions.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.FollowerOptions.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_PartySystem) {
            throw new Error('DreamX_FollowerOptions requires YEP Party System');
        }
    };

    DreamX.FollowerOptions._Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.FollowerOptions._Game_Interpreter_pluginCommand.call(this,
                command, args);
        var actorId = args[0];
        if (!actorId) {
            return;
        }
        actorId = parseInt(actorId);
        if (actorId === NaN || actorId <= 0) {
            return;
        }

        var switchId = DreamX.FollowerOptions.getSwitchNum(actorId);
        switchId = parseInt(switchId);

        switch (command) {
            case 'ToggleFollower':
                DreamX.FollowerOptions.ToggleFollower(switchId);
                if (!parameterAutoRefresh) {
                    $gamePlayer.refresh();
                }
                break;
            case 'ShowFollower':
                DreamX.FollowerOptions.FollowerOff(switchId);
                if (!parameterAutoRefresh) {
                    $gamePlayer.refresh();
                }
                break;
            case 'HideFollower':
                DreamX.FollowerOptions.FollowerOn(switchId);

                if (!parameterAutoRefresh) {
                    $gamePlayer.refresh();
                }
                break;
        }
    };

    //==========================================================================
    // DreamX.FollowerOptions
    //==========================================================================
    DreamX.FollowerOptions.getSwitchNum = function (actorId) {
        if (!$dataActors[actorId])
            return -1;
        var switchNum = $dataActors[actorId].meta.no_follow_switch
                ? $dataActors[actorId].meta.no_follow_switch : -1;
        return switchNum;
    };

    DreamX.FollowerOptions.ToggleFollower = function (switchNum) {

        if ($gameSwitches.value(switchNum)) {
            DreamX.FollowerOptions.FollowerOff(switchNum);
        } else {
            DreamX.FollowerOptions.FollowerOn(switchNum);
        }
    };

    DreamX.FollowerOptions.FollowerOff = function (switchNum) {
        $gameSwitches.setValue(switchNum, false);
    };

    DreamX.FollowerOptions.FollowerOn = function (switchNum) {
        $gameSwitches.setValue(switchNum, true);
    };

    DreamX.FollowerOptions.disableCommand = function (symbol) {
        var disabledSymbols = ['status', 'skill', 'equip'];
        return $gameParty.members().length === 0 && disabledSymbols.indexOf(symbol) !== -1;
    };

    //==========================================================================
    // Game_Switches
    //==========================================================================
    DreamX.FollowerOptions.Game_Switches_onChange = Game_Switches.prototype.onChange;
    Game_Switches.prototype.onChange = function () {
        DreamX.FollowerOptions.Game_Switches_onChange.call(this);
        if (parameterAutoRefresh) {
            $gamePlayer.refresh();
        }
    };

    //==========================================================================
    // Game_Follower
    //==========================================================================
    Game_Follower.prototype.actor = function () {
        return $gameParty.followers()[this._memberIndex];
    };

    //==========================================================================
    // Game_Party
    //==========================================================================
    Game_Party.prototype.leader = function () {
        return this.followers()[0];
    };

    Game_Party.prototype.followers = function () {
        var group = parameterBattleMembersOnly ? this.battleMembers()
                : this.allMembers();

        return group.filter(function (member) {
            return $gameParty.isFollowerEnabled(member);
        });
    };

    Game_Party.prototype.isFollowerEnabled = function (member) {
        if (!member) {
            return false;
        }
        if (member.actor().meta.no_follow) {
            return false;
        }
        var switchId = member.actor().meta.no_follow_switch;
        if (!switchId) {
            return true;
        }
        switchId = parseInt(switchId);
        if ($gameSwitches.value(switchId)) {
            return false;
        }
        return true;
    };

    Game_Party.prototype.isBattleMemberEnabled = function (member) {
        if (!member) {
            return false;
        }
        if (member.actor().meta.no_battle) {
            return false;
        }
        var switchId = member.actor().meta.no_battle_switch;
        if (!switchId) {
            return true;
        }
        switchId = parseInt(switchId);
        if ($gameSwitches.value(switchId)) {
            return false;
        }
        return true;
    };

    Game_Party.prototype.isMenuMemberEnabled = function (member) {
        if (!member) {
            return false;
        }
        if (member.actor().meta.no_menu) {
            return false;
        }
        var switchId = member.actor().meta.no_menu_switch;
        if (!switchId) {
            return true;
        }
        switchId = parseInt(switchId);
        if ($gameSwitches.value(switchId)) {
            return false;
        }
        return true;
    };

    DreamX.FollowerOptions.Game_Party_initializeBattleMembers = Game_Party.prototype.initializeBattleMembers;
    Game_Party.prototype.initializeBattleMembers = function () {
        DreamX.FollowerOptions.Game_Party_initializeBattleMembers.call(this);
        var bm = [];

        for (var i = 0; i < this._battleMembers.length; i++) {
            var id = this._battleMembers[i];
            if (this.isBattleMemberEnabled($gameActors.actor(id))) {
                bm.push(id);
            } else {
                bm.push(0);
            }
        }

        this._battleMembers = bm;
    };

    DreamX.FollowerOptions.Game_Party_members = Game_Party.prototype.members;
    Game_Party.prototype.members = function () {
        var scene = SceneManager._scene;
        var members = DreamX.FollowerOptions.Game_Party_members.call(this);

        if (scene instanceof Scene_MenuBase) {
            members = members.filter(function (member) {
                return $gameParty.isMenuMemberEnabled(member);
            });
        }

        return members;
    };

    Game_Party.prototype.sortBattleMembers = function () {
        var regularMembers = this._battleMembers.filter(function (member) {
            return member !== 0;
        });

        var nullMembers = this._battleMembers.filter(function (member) {
            return member === 0;
        });

        this._battleMembers = regularMembers.concat(nullMembers);
    };

    DreamX.FollowerOptions.Game_Party_addActor = Game_Party.prototype.addActor;
    Game_Party.prototype.addActor = function (actorId) {
        if (!this.isBattleMemberEnabled($gameActors.actor(actorId))) {
            Yanfly.Party.Game_Party_addActor.call(this, actorId);
            this.sortBattleMembers();
            return;
        }
        DreamX.FollowerOptions.Game_Party_addActor.call(this, actorId);
        this.sortBattleMembers();
    };



    //==========================================================================
    // Window_PartyList
    //==========================================================================
    DreamX.FollowerOptions.Window_PartyList_createActorOrder = Window_PartyList.prototype.createActorOrder;
    Window_PartyList.prototype.createActorOrder = function () {
        DreamX.FollowerOptions.Window_PartyList_createActorOrder.call(this);
        var a = [];

        for (var i = 0; i < this._data.length; ++i) {
            var id = this._data[i];
            if ($gameParty.isBattleMemberEnabled($gameActors.actor(id))) {
                a.push(id);
            }
        }

        this._data = a;
    };

    //==========================================================================
    // Window_Command
    //==========================================================================
    DreamX.FollowerOptions.Window_Command_addCommand = Window_Command.prototype.addCommand;
    Window_Command.prototype.addCommand = function (name, symbol, enabled, ext) {
        if (DreamX.FollowerOptions.disableCommand(symbol)) {
            enabled = false;
        }
        DreamX.FollowerOptions.Window_Command_addCommand.call(this, name, symbol, enabled, ext);
    };

    if (Imported.YEP_X_ActorPartySwitch) {
        DreamX.FollowerOptions.Window_ActorPartySwitch_makeCommandList = Window_ActorPartySwitch.prototype.makeCommandList;
        Window_ActorPartySwitch.prototype.makeCommandList = function () {
            DreamX.FollowerOptions.Window_ActorPartySwitch_makeCommandList.call(this);
            this._list = this._list.filter(function (cmd) {
                var id = cmd.ext;
                return $gameParty.isBattleMemberEnabled($gameActors.actor(id));
            });
        };
    }

})();