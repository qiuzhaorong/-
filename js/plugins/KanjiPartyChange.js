/*
 * ===========================================================================
 * KanjiPartyChange.js
 * ---------------------------------------------------------------------------
 * version 1.1.1
 * Copyright (c) 2020 Kanji the Grass
 * This work is provided under the MTCM Blue License
 * - https://ja.materialcommons.org/mtcm-b-summary/
 * Credits display: Kanji the Grass ordered by Munokura fungamemake.com
 * ===========================================================================
 */

/*:
 * @target MV MZ
 * @plugindesc 小迷弟改角色仓库
 * @author Kanji the Grass 
 *
 * @command start
 * @text 打开角色仓库场景
 * @desc 启动角色仓库场景，允许在队伍和角色仓库之间切换角色。
 *
 * @command add
 * @text 添加到角色仓库
 * @desc 将指定角色添加到角色仓库。
 *
 * @arg actors
 * @text 角色列表
 * @desc 要添加的角色 ID 列表。
 * @type actor[]
 * @default []
 *
 * @command del
 * @text 从角色仓库移除
 * @desc 从角色仓库中移除指定角色。
 *
 * @arg actors
 * @text 角色列表
 * @desc 要移除的角色 ID 列表。
 * @type actor[]
 * @default []
 *
 * @command lock
 * @text 锁定角色
 * @desc 锁定指定角色，防止其从队伍中移除。
 *
 * @arg actors
 * @text 角色列表
 * @desc 要锁定的角色 ID 列表。
 * @type actor[]
 * @default []
 *
 * @command unlock
 * @text 解锁角色
 * @desc 解锁指定角色，允许其从队伍中移除。
 *
 * @arg actors
 * @text 角色列表
 * @desc 要解锁的角色 ID 列表。
 * @type actor[]
 * @default []
 *
 * @command clear
 * @text 清空角色仓库
 * @desc 清空角色仓库中的所有角色。
 *
 * @command changeMaxParty
 * @text 更改最大队伍人数
 * @desc 更改队伍的最大人数限制。
 *
 * @arg partySize
 * @text 最大人数
 * @desc 新的最大队伍人数。
 * @type number
 * @default 1
 *
 * @param system
 * @text ---常规设置---
 * @desc 角色仓库系统的基本设置。
 *
 * @param addThisIntoMenuCommand
 * @parent system
 * @text 显示菜单命令
 * @desc 是否在菜单中显示“角色仓库”命令？
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @default true
 *
 * @param partyChangeCommand
 * @parent system
 * @text 角色仓库命令文本
 * @desc 菜单中“角色仓库”命令的显示文本。
 * @type string
 * @default 角色仓库
 *
 * @param maxBattleMembers
 * @parent system
 * @text 战斗人数
 * @desc 可参与战斗的最大角色数。设为 0 则不使用此功能。
 * @type number
 * @default 0
 *
 * @param maxAllParty
 * @parent system
 * @text 菜单显示人数
 * @desc 队伍的最大角色数（包括战斗和非战斗成员）。
 * @type number
 * @min 1
 * @default 8
 *
 * @param autoStorageThreshold
 * @parent system
 * @text 队伍人数上限
 * @desc 当队伍人数超过此值时，多余角色将自动转移到角色仓库。
 * @type number
 * @min 1
 * @default 4
 *
 * @param lockIcon
 * @parent system
 * @text 锁定图标
 * @desc 锁定角色时使用的图标 ID。
 * @type number
 * @default 195
 *
 * @param layoutCW
 * @text ---命令窗口---
 * @desc 命令窗口的布局设置。
 *
 * @param CWpos
 * @parent layoutCW
 * @text 窗口位置
 * @desc 命令窗口的位置和大小，格式 [x, y, 宽度, 高度]。
 * @type string[]
 * @default [0, 0, 270, 192]
 *
 * @param alignmentOfCommand
 * @parent layoutCW
 * @text 文本对齐
 * @desc 命令窗口的文本对齐方式。
 * @type combo
 * @default center
 * @option 左对齐
 * @value left
 * @option 居中
 * @value center
 * @option 右对齐
 * @value right
 *
 * @param mcLineHeight
 * @parent layoutCW
 * @text 行高
 * @desc 命令窗口的行高。
 * @type number
 * @default 36
 *
 * @param changeTerm
 * @parent layoutCW
 * @text 更换命令
 * @desc “更换”命令的显示文本。留空则移除。
 * @type string
 * @default 更换
 *
 * @param removeTerm
 * @parent layoutCW
 * @text 移除命令
 * @desc “移除”命令的显示文本。留空则移除。
 * @type string
 * @default 移除
 *
 * @param revertTerm
 * @parent layoutCW
 * @text 恢复命令
 * @desc “恢复”命令的显示文本。留空则移除。
 * @type string
 * @default 恢复
 *
 * @param finishTerm
 * @parent layoutCW
 * @text 完成命令
 * @desc “完成”命令的显示文本。留空则移除。
 * @type string
 * @default 完成
 *
 * @param layoutPW
 * @text ---队伍窗口---
 * @desc 队伍窗口的布局设置。
 *
 * @param PWpos
 * @parent layoutPW
 * @text 窗口位置
 * @desc 队伍窗口的位置和大小，格式 [x, y, 宽度, 高度]。
 * @type string[]
 * @default [270, 0, w-270, 192]
 *
 * @param pwFaceType
 * @parent layoutPW
 * @text 显示角色
 * @desc 角色显示类型：行走 / 头像 / 侧视战斗 / 无。
 * @type combo
 * @default walk
 * @option 行走
 * @value walk
 * @option 头像
 * @value face
 * @option 侧视战斗
 * @value sideV
 * @option 无
 * @value none
 *
 * @param actorListColMax
 * @parent layoutPW
 * @text 窗口列数
 * @desc 显示的列数，超出此数的成员将向下滚动。推荐 3 到 6。
 * @type number
 * @default 4
 *
 * @param emptyFrameTerm
 * @parent layoutPW
 * @text 空位文本
 * @desc 队伍空位显示的文本。
 * @type string
 * @default - 空位 -
 *
 * @param layoutWW
 * @text ---角色仓库窗口---
 * @desc 角色仓库窗口的布局设置。
 *
 * @param WWpos
 * @parent layoutWW
 * @text 窗口位置
 * @desc 角色仓库窗口的位置和大小，格式 [x, y, 宽度, 高度]。
 * @type string[]
 * @default [0, 192, 250, h - 192]
 *
 * @param wwFaceType
 * @parent layoutWW
 * @text 显示角色
 * @desc 角色显示类型：行走 / 头像 / 侧视战斗 / 无。
 * @type combo
 * @default walk
 * @option 行走
 * @value walk
 * @option 头像
 * @value face
 * @option 侧视战斗
 * @value sideV
 * @option 无
 * @value none
 *
 * @param wwRowHeight
 * @parent layoutWW
 * @text 行高
 * @desc 每行角色的高度。
 * @type number
 * @default 36
 *
 * @param removeOnReserveTerm
 * @parent layoutWW
 * @text 移除命令
 * @desc 角色仓库窗口中“移除”命令的显示文本。留空则移除。
 * @type string
 * @default 移除
 *
 * @param layoutSW
 * @text ---参数窗口---
 * @desc 参数窗口的布局设置。
 *
 * @param SWpos
 * @parent layoutSW
 * @text 窗口位置
 * @desc 参数窗口的位置和大小，格式 [x, y, 宽度, 高度]。
 * @type string[]
 * @default [250, 192, w - 250, h - 192]
 *
 * @param hpPos
 * @parent layoutSW
 * @text HP 位置
 * @desc HP 显示位置，格式 [x, y, 宽度]。宽度设为 0 则隐藏。
 * @type string[]
 * @default [150, 72, 200]
 *
 * @param mpPos
 * @parent layoutSW
 * @text MP 位置
 * @desc MP 显示位置，格式 [x, y, 宽度]。宽度设为 0 则隐藏。
 * @type string[]
 * @default [150, 108, 200]
 *
 * @param tpPos
 * @parent layoutSW
 * @text TP 位置
 * @desc TP 显示位置，格式 [x, y, 宽度]。宽度设为 0 则隐藏。
 * @type string[]
 * @default [360, 72, 144]
 *
 * @param swFaceType
 * @parent layoutSW
 * @text 显示角色
 * @desc 角色显示类型：行走 / 头像 / 侧视战斗 / 无。
 * @type combo
 * @default face
 * @option 行走
 * @value walk
 * @option 头像
 * @value face
 * @option 侧视战斗
 * @value sideV
 * @option 无
 * @value none
 *
 * @param facePos
 * @parent layoutSW
 * @text 角色图像位置
 * @desc 显示角色的位置，格式 [x, y]。
 * @type string[]
 * @default [0, 0]
 *
 * @param nameShow
 * @parent layoutSW
 * @text 显示角色名称
 * @desc 是否显示角色名称？
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @default true
 *
 * @param namePos
 * @parent layoutSW
 * @text 名称位置
 * @desc 显示角色名称的位置，格式 [x, y, 宽度]。
 * @type string[]
 * @default [150, 0, 180]
 *
 * @param classShow
 * @parent layoutSW
 * @text 显示职业
 * @desc 是否显示角色职业？
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @default true
 *
 * @param classPos
 * @parent layoutSW
 * @text 职业位置
 * @desc 显示职业的位置，格式 [x, y, 宽度]。
 * @type string[]
 * @default [330, 0, 180]
 *
 * @param levelShow
 * @parent layoutSW
 * @text 显示等级
 * @desc 是否显示角色等级？
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @default true
 *
 * @param levelPos
 * @parent layoutSW
 * @text 等级位置
 * @desc 显示等级的位置，格式 [x, y, 宽度]。
 * @type string[]
 * @default [150, 36, 120]
 *
 * @param iconsPos
 * @parent layoutSW
 * @text 状态图标位置
 * @desc 显示状态图标的位置，格式 [x, y, 宽度]。宽度设为 0 则隐藏。
 * @type string[]
 * @default [330, 36, 180]
 *
 * @param horzLineYPos
 * @parent layoutSW
 * @text 水平线位置
 * @desc 显示水平线的 Y 坐标，格式 [Y1, Y2, ...]。
 * @type string[]
 * @default [148]
 *
 * @param equipShow
 * @parent layoutSW
 * @text 显示装备
 * @desc 是否显示角色的装备列表？
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @default true
 *
 * @param equipPos
 * @parent layoutSW
 * @text 装备位置
 * @desc 显示装备的位置，格式 [x, y, 宽度]。
 * @type string[]
 * @default [0, 158, 320]
 *
 * @param equipRowHeight
 * @parent layoutSW
 * @text 装备行高
 * @desc 每行装备的高度。
 * @type number
 * @default 36
 *
 * @param statusShow
 * @parent layoutSW
 * @text 显示角色参数
 * @desc 是否显示角色的参数？
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @default true
 *
 * @param statusPos
 * @parent layoutSW
 * @text 参数位置
 * @desc 显示参数的位置，格式 [x, y, 宽度]。
 * @type string[]
 * @default [340, 158, 180]
 *
 * @param statusRowHeight
 * @parent layoutSW
 * @text 参数行高
 * @desc 每行参数的高度。
 * @type number
 * @default 36
 *
 * @param paramListSW
 * @parent layoutSW
 * @text 参数列表
 * @desc 显示的参数列表。数字表示普通参数，X 开头表示附加参数，S 开头表示特殊参数。
 * @type string[]
 * @default ["2","3","4","5","X1","S1"]
 *
 * @param xParamNames
 * @parent layoutSW
 * @text 附加参数名称
 * @desc 附加参数的名称，可根据需要更改。
 * @type string[]
 * @default ["命中率","回避率","暴击率","暴击回避率","魔法回避率","魔法反射率","反击率","HP再生率","MP再生率","TP再生率"]
 *
 * @param sParamNames
 * @parent layoutSW
 * @text 特殊参数名称
 * @desc 特殊参数的名称，可根据需要更改。
 * @type string[]
 * @default ["被锁定率","防御效果率","恢复效果率","药理知识","MP消耗率","TP充能率","物理伤害率","魔法伤害率","地面伤害率","经验获取率"]
 *
 * @param parcentStr
 * @parent layoutSW
 * @text 附加/特殊参数百分比符号
 * @desc 显示附加或特殊参数时的百分比符号。
 * @type string
 * @default %
 *
 * @help
 * 本插件：
 * - 同时支持MV MZ
 * - 小迷弟改说明，指定队伍超过人数，多余角色自动到仓库，实现角色正真离开队伍
 *
 * 窗口位置和高度的数组支持公式描述：
 * - Graphics.boxWidth 缩写为 w（屏幕宽度）。
 * - Graphics.boxHeight 缩写为 h（屏幕高度）。
 *
 * 插件命令：
 *   kanjiPC start
 *     打开“角色仓库场景”。
 *
 *   kanjiPC add 3
 *     将 ID 为 3 的角色添加到角色仓库。
 *     如果角色已在队伍或仓库中，则无操作。
 *
 *   kanjiPC del 4 5-10
 *     从角色仓库移除 ID 为 4 和 5-10 的角色。
 *     如果角色在队伍中，则无操作。
 *
 *   kanjiPC lock 1 3-5
 *     锁定 ID 为 1、3、4、5 的角色，防止从队伍移除。
 *
 *   kanjiPC unlock 1 3-5 6
 *     解锁 ID 为 1、3、4、5、6 的角色。
 *     注意：连番指定时（如 1-100），左侧数字必须小于右侧数字。
 *
 *   kanjiPC clear
 *     清空角色仓库。
 *
 *   kanjiPC changeMaxParty 9
 *     将最大队伍人数更改为 9。
 *
 * 参数说明：
 * - 角色仓库场景的参数窗口支持显示普通参数、附加参数（命中率等）和特殊参数（被锁定率等）。
 * - 在 paramListSW 中：
 *   - 数字（如 "2"）表示普通参数（如攻击力）。
 *   - 以 "X" 开头（如 "X1"）表示附加参数（如回避率）。
 *   - 以 "S" 开头（如 "S1"）表示特殊参数（如防御效果率）。
 *   - 设置为 "null" 则显示空行。
 *
 * 普通参数 ID 列表：
 *  0: 最大 HP | 1: 最大 MP | 2: 攻击力
 *  3: 防御力 | 4: 魔法攻击 | 5: 魔法防御
 *  6: 敏捷 | 7: 幸运
 *
 * 附加参数 ID 列表：
 *  X0: 命中率 | X1: 回避率 | X2: 暴击率
 *  X3: 暴击回避率 | X4: 魔法回避率 | X5: 魔法反射率
 *  X6: 反击率 | X7: HP 再生率 | X8: MP 再生率
 *  X9: TP 再生率
 *
 * 特殊参数 ID 列表：
 *  S0: 被锁定率 | S1: 防御效果率 | S2: 恢复效果率
 *  S3: 药理知识 | S4: MP 消耗率 | S5: TP 充能率
 *  S6: 物理伤害率 | S7: 魔法伤害率 | S8: 地面伤害率
 *  S9: 经验获取率
 *
 * --- 使用条款 ---
 * 本作品采用 MTCM Blue License 提供
 * - https://ja.materialcommons.org/mtcm-b-summary/
 * クレジット表示：Kanji the Grass (由 Munokura fungamemake.com 订购)
 *
 * 请确认许可内容后使用。
 */

const KanjiPartyChange = {
    exports: {},
    _commands: {},
    registerCommand(name, args) {
        if (Utils.RPGMAKER_NAME === 'MZ') {
            PluginManager.registerCommand('KanjiPartyChange', name, args => {
                this.executeCommand(name, args);
            });
        }
        this._commands[name] = args;
    },
    executeCommand(command, args) {
        if (Utils.RPGMAKER_NAME === 'MZ') {
            args = [command].concat(args);
        } else {
            command = args[0];
        }
        if (this._commands[command]) {
            this._commands[command].call(this, args);
        } else {
            throw new Error(`[KanjiPartyChange] invalid command(${args})`);
        }
    },
    faceWidth() { return Utils.RPGMAKER_NAME === 'MZ' ? ImageManager.faceWidth : Window_Base._faceWidth; },
    faceHeight() { return Utils.RPGMAKER_NAME === 'MZ' ? ImageManager.faceHeight : Window_Base._faceHeight; },
    parseRectangle: function(pos) {
        var w = Graphics.boxWidth, h = Graphics.boxHeight;
        return pos ? eval(pos).map(n => typeof n === 'number' ? n : eval(n)) : null;
    },
};

(function () {
    "use strict";

    var param = PluginManager.parameters('KanjiPartyChange');

    param.alignmentOfCommand     = String(param['alignmentOfCommand']  || "center");
    param.removeOnReserveTerm    = String(param['removeOnReserveTerm']);
    param.actorListColMax        = Number(param['actorListColMax']  || 4);
    param.maxBattleMembers       = Number(param['maxBattleMembers'] || 0);
    param.mcLineHeight           = Number(param['mcLineHeight'] || 36);
    param.addThisIntoMenuCommand = eval(param['addThisIntoMenuCommand'] || false);
    param.partyChangeCommand     = String(param['partyChangeCommand'] || "角色仓库");
    param.cwPos = param['CWpos'] || "[0, 0, 270, 192]";
    param.pwPos = param['PWpos'] || "[270, 0, w - 270, 192]";
    param.wwPos = param['WWpos'] || "[0, 192, 250, h - 192]";
    param.swPos = param['SWpos'] || "[250, 192, w - 250, h - 192]";
    param.lockIcon    = Number(param['lockIcon']       || 195);
    param.changeTerm  = String(param['changeTerm']     || "更换");
    param.removeTerm  = String(param['removeTerm']     || "移除");
    param.revertTerm  = String(param['revertTerm']     || "恢复");
    param.finishTerm  = String(param['finishTerm']     || "完成");
    param.emptyFrame  = String(param['emptyFrameTerm'] || "- 空位 -");
    param.swFaceType  = String(param['swFaceType']     || "face");
    param.pwFaceType  = String(param['pwFaceType']     || "walk");
    param.wwFaceType  = String(param['wwFaceType']     || "walk");
    param.equipShow   = eval(param['equipShow']        || true);
    param.levelShow   = eval(param['levelShow']        || true);
    param.statusShow  = eval(param['statusShow']       || true);
    param.nameShow    = eval(param['nameShow']         || true);
    param.classShow   = eval(param['classShow']        || true);
    param.levelPos    = param['levelPos']  || "[150, 36, 120]";
    param.equipPos    = param['equipPos']  || "[0, 158, 320]";
    param.statusPos   = param['statusPos'] || "[340, 158, 180]";
    param.facePos     = param['facePos']   || "[0, 0]";
    param.namePos     = param['namePos']   || "[150, 0, 180]";
    param.classPos    = param['classPos']  || "[330, 0, 180]";
    param.iconsPos    = param['iconsPos']  || "[330, 36, 180]";
    param.hpPos       = param['hpPos']     || "[150, 72, 200]";
    param.mpPos       = param['mpPos']     || "[150, 108, 200]";
    param.tpPos       = param['tpPos']     || "[360, 72, 144]";
    param.horzLineYPos= param['horzLineYPos']           || "[148]";
    param.wwRowHeight = Number(param['wwRowHeight']     || 36);
    param.equipRow    = Number(param['equipRowHeight']  || 36);
    param.statusRow   = Number(param['statusRowHeight'] || 36);
    param.maxAllParty = Number(param['maxAllParty']     || 8);
    param.autoStorageThreshold = Number(param['autoStorageThreshold'] || 4);

    // ver.1.04 parameters
    param.paramListSW = eval(param['paramListSW'] || ["2","3","4","5","X1","S1"]);
    param.xParamNames = eval(param['xParamNames'] || 
        ["命中率","回避率","暴击率","暴击回避率","魔法回避率","魔法反射率",
         "反击率","HP再生率","MP再生率","TP再生率"]);
    param.sParamNames = eval(param['sParamNames'] || 
        ["被锁定率","防御效果率","恢复效果率","药理知识","MP消耗率",
         "TP充能率","物理伤害率","魔法伤害率","地面伤害率","经验获取率"]);
    param.parcentStr = String(param.parcentStr || "%");

    //=================================================
    // KanjiPartyChange
    //=================================================
    KanjiPartyChange._parseIdList = function(data) {
        if (Utils.RPGMAKER_NAME === 'MZ') {
            return JsonEx.parse(data.actors).map(n => Number(n));
        }
        let list = data.match(/(\d+)(?:-(\d+))?/);
        if (list[2]) {
            var min = Number(list[1]), max = Number(list[2]);
            list = new Array(max - min + 1);
            for (var i = 0; i < list.length; i++) list[i] = i + min;
        } else {
            list = [Number(list[1])];
        }
        return list;
    };

    KanjiPartyChange._setLock = function(args, isLock) {
        for (var i = 1; args[i]; i++) {
            var m = KanjiPartyChange._parseIdList(args[i]);
            for (var j = 0; m[j]; j++) $gameActors.actor(m[j]).setKanjiPCLock(isLock);
        }
    };

    KanjiPartyChange.registerCommand('start', function() {
        SceneManager.push(Scene_KanjiPartyChange);
    });

    KanjiPartyChange.registerCommand('add', function(args) {
        var data, array = $gameSystem.storageMembers();
        for (var i = 1; args[i]; i++) {
            var m = KanjiPartyChange._parseIdList(args[i]);
            for (var j = 0; data = m[j]; j++) {
                if (!array.some(arr => arr[0] === data) && !$gameParty._actors.includes(data)) {
                    array.push([data]);
                }
            }
        }
    });

    KanjiPartyChange.registerCommand('del', function(args) {
        if (!$gameSystem._storageMembers) $gameSystem._storageMembers = [];
        for (var i = 1; args[i]; i++) {
            var data, m = KanjiPartyChange._parseIdList(args[i]);
            for (var j = 0; data = m[j]; j++) {
                $gameSystem._storageMembers = 
                    $gameSystem._storageMembers.filter(arr => arr[0] !== data);
            }
        }
    });

    KanjiPartyChange.registerCommand('lock', function(args) {
        KanjiPartyChange._setLock(args, true);
    });

    KanjiPartyChange.registerCommand('unlock', function(args) {
        KanjiPartyChange._setLock(args, false);
    });

    KanjiPartyChange.registerCommand('clear', function() {
        $gameSystem.storageMembers().length = 0;
    });

    KanjiPartyChange.registerCommand('changeMaxParty', function(args) {
        let num;
        if (Utils.RPGMAKER_NAME === 'MZ') {
            num = Number(args.partySize);
        } else {
            num = Number(args[1]);
        }
        $gameSystem._kanjiPCMaxParty = num;
        $gameParty.restrictPartySize();
    });

    //=================================================
    // Game_Interpreter
    //=================================================
    const __pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        __pluginCommand.call(this, command, args);
        if (command === 'kanjiPC') { KanjiPartyChange.executeCommand(command, args); }
    };

    //=================================================
    // Game_Party
    //=================================================
    const __maxBattleMembers_Game_Party = Game_Party.prototype.maxBattleMembers;
    Game_Party.prototype.maxBattleMembers = function() {
        return param.maxBattleMembers ? param.maxBattleMembers :
            __maxBattleMembers_Game_Party.call(this);
    };

    const __addActor_Game_Party = Game_Party.prototype.addActor;
    Game_Party.prototype.addActor = function(actorId) {
        __addActor_Game_Party.call(this, actorId);
        this.restrictPartySize();
    };

    Game_Party.prototype.restrictPartySize = function() {
        if (this._actors.length > param.autoStorageThreshold) {
            let excessActors = this._actors.slice(param.autoStorageThreshold).filter(id => {
                return !$gameActors.actor(id).kanjiPCLock();
            });
            this._actors = this._actors.slice(0, param.autoStorageThreshold);
            let storage = $gameSystem.storageMembers();
            excessActors.forEach(id => {
                if (!storage.some(arr => arr[0] === id)) {
                    storage.push([id]);
                }
            });
            $gamePlayer.refresh();
        }
    };

    //=================================================
    // Game_Actor
    //=================================================
    Game_Actor.prototype.kanjiPCLock = function () {
        return this._kanjiPCLock || false;
    };

    Game_Actor.prototype.setKanjiPCLock = function (lock) {
        this._kanjiPCLock = lock;
    };

    //=================================================
    // Game_System
    //=================================================
    Game_System.prototype.storageMembers = function () {
        if (!this._storageMembers) this._storageMembers = [];
        return this._storageMembers;
    };

    //=================================================
    // Window_MenuCommand
    //=================================================
    const _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
    Window_MenuCommand.prototype.addMainCommands = function() {
        _Window_MenuCommand_addMainCommands.call(this);
        if (param.addThisIntoMenuCommand) this.addCommand(param.partyChangeCommand, 'partyChange');
    };

    //=================================================
    // Scene_Menu
    //=================================================
    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('partyChange', this.commandKNSPartyChange.bind(this));
    };

    Scene_Menu.prototype.commandKNSPartyChange = function () {
        SceneManager.push(Scene_KanjiPartyChange);
    };

    //=================================================
    // Window_PCMainCommand
    //=================================================
    function Window_PCMainCommand() {
        return this.initialize.apply(this, arguments);
    }

    Window_PCMainCommand.prototype = Object.create(Window_Command.prototype);
    Window_PCMainCommand.prototype.constructor = Window_PCMainCommand;

    if (Utils.RPGMAKER_NAME === 'MV') {
        Window_PCMainCommand.prototype.initialize = function (x, y, w, h) {
            this.__windowWidth = w, this.__windowHeight = h;
            Window_Command.prototype.initialize.call(this, x, y);
        };

        Window_PCMainCommand.prototype.windowWidth = function () {
            return this.__windowWidth;
        };

        Window_PCMainCommand.prototype.windowHeight = function () {
            return this.__windowHeight;
        };
    }

    Window_PCMainCommand.prototype.makeCommandList = function () {
        if (param.changeTerm) this.addCommand(param.changeTerm, "change");
        if (param.removeTerm) this.addCommand(param.removeTerm, "remove");
        if (param.revertTerm) this.addCommand(param.revertTerm, "revert");
        if (param.finishTerm) this.addCommand(param.finishTerm, "cancel");
    };

    Window_PCMainCommand.prototype.itemTextAlign = function() {
        return param.alignmentOfCommand;
    };

    Window_PCMainCommand.prototype.lineHeight = function() {
        return param.mcLineHeight;
    };

    Window_PCMainCommand.prototype.itemHeight = function() {
        return param.mcLineHeight;
    };

    //=================================================
    // Window_PCActorList
    //=================================================
    function Window_PCActorList() {
        return this.initialize.apply(this, arguments);
    }

    Window_PCActorList.prototype = Object.create(Window_Selectable.prototype);
    Window_PCActorList.prototype.constructor = Window_PCActorList;

    Window_PCActorList.prototype.maxCols = function() {
        return param.actorListColMax;
    };

    Window_PCActorList.prototype.itemHeight = function() {
        return Utils.RPGMAKER_NAME === 'MZ' ? this.innerHeight : this.contentsHeight();
    };

    Window_PCActorList.prototype.maxItems = function() {
        return $gameSystem._kanjiPCMaxParty || param.maxAllParty;
    };

    Window_PCActorList.prototype.standardFontSize = function() {
        return 22;
    };

    Window_PCActorList.prototype.drawItem = function (index) {
        var actor = $gameActors.actor($gameParty._actors[index]), rect = this.itemRect(index);
        if (actor) {
            if (param.pwFaceType !== "none") {
                switch (param.pwFaceType) {
                    case "walk":
                        this.drawActorCharacter(actor, rect.x + rect.width / 2,
                            rect.y + rect.height - 30);
                        break;
                    case "face":
                        this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
                        break;
                    case "sideV":
                        var bitmap = ImageManager.loadSvActor(actor.battlerName());
                        var ww = bitmap.width / 9, hh = bitmap.height / 6;
                        this.contents.blt(bitmap, 0, 0, ww, hh, rect.x + (rect.width - ww) / 2,
                            rect.y + (rect.height - hh) / 2);
                        break;
                }
            }
            this.drawText(actor.name(), rect.x,
                rect.y + rect.height - this.standardFontSize() - 14, rect.width, "center");
            if (actor.kanjiPCLock()) this.drawIcon(param.lockIcon, rect.x, rect.y);
        } else {
            this.contents.paintOpacity = 128;
            this.drawText(param.emptyFrame, rect.x, rect.y + (this.itemHeight() - this.standardFontSize()) / 2,
                rect.width, "center");
            this.contents.paintOpacity = 255;
        }
    };

    Window_PCActorList.prototype.updateHelp = function () {
        const actor = $gameActors.actor($gameParty._actors[this._index]);
        this._helpWindow.refreshStatus(actor);
    };

    //=================================================
    // Window_StorageMember
    //=================================================
    function Window_StorageMember() {
        this.initialize.apply(this, arguments);
    }

    Window_StorageMember.prototype = Object.create(Window_Selectable.prototype);
    Window_StorageMember.prototype.constructor = Window_StorageMember;

    Window_StorageMember.prototype.maxItems = function() {
        return $gameSystem.storageMembers().length + (param.removeOnReserveTerm ? 1 : 0);
    };

    Window_StorageMember.prototype.drawItem = function (index) {
        const rect = this.itemRect(index);
        if (!param.removeOnReserveTerm || index > 0) {
            var actor = $gameActors.actor($gameSystem.storageMembers()[index - 
                (param.removeOnReserveTerm ? 1 : 0)][0]);
            if (param.wwFaceType !== "none") {
                switch (param.wwFaceType) {
                    case "walk":
                        this.drawActorCharacter(actor, rect.x + 20, rect.y, rect.width, rect.height);
                        this.drawText(actor.name(), rect.x + 42, rect.y, rect.width);
                        break;
                    case "face":
                        this.drawActorFace(actor, rect.x + rect.width - KanjiPartyChange.faceWidth(),
                            rect.y, KanjiPartyChange.faceWidth(), rect.height);
                        this.drawText(actor.name(), rect.x, rect.y, rect.width);
                        break;
                    case "sideV":
                        var bitmap = ImageManager.loadSvActor(actor.battlerName());
                        var ww = bitmap.width / 9, hh = bitmap.height / 6;
                        this.contents.blt(bitmap, 0, 0, ww, Math.min(hh, rect.height), rect.x - 10, rect.y);
                        this.drawText(actor.name(), rect.x + 42, rect.y, rect.width);
                        break;
                }
            }
        } else {
            this.drawText(param.removeOnReserveTerm, rect.x, rect.y, rect.width, "center");
        }
    };

    Window_StorageMember.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
        var bitmap = ImageManager.loadCharacter(characterName);
        var big = ImageManager.isBigCharacter(characterName);
        var pw = bitmap.width / (big ? 3 : 12);
        var ph = bitmap.height / (big ? 4 : 8);
        var n = characterIndex;
        var sx = (n % 4 * 3 + 1) * pw;
        var sy = (Math.floor(n / 4) * 4) * ph;
        this.contents.blt(bitmap, sx, sy, pw, Math.min(ph, this.itemHeight()), x - pw / 2, y);
    };

    Window_StorageMember.prototype.lineHeight = function () {
        return param.wwRowHeight;
    };

    Window_StorageMember.prototype.updateHelp = function () {
        let actor = null;
        if (!param.removeOnReserveTerm || this._index > 0) {
            const index = this._index - (param.removeOnReserveTerm ? 1 : 0);
            if (index >= 0 && index < $gameSystem.storageMembers().length) {
                actor = $gameActors.actor($gameSystem.storageMembers()[index][0]);
            }
        }
        this._helpWindow.refreshStatus(actor);
    };

    //=================================================
    // Window_ActorInfo
    //=================================================
    function Window_ActorInfo() {
        this.initialize.apply(this, arguments);
    }

    Window_ActorInfo.prototype = Object.create(
        (Utils.RPGMAKER_NAME === 'MZ' ? Window_StatusBase : Window_Selectable).prototype
    );
    Window_ActorInfo.prototype.constructor = Window_ActorInfo;

    Window_ActorInfo.prototype.parseRectangle = function(pos) {
        return KanjiPartyChange.parseRectangle(pos);
    };

    Window_ActorInfo.prototype.refreshStatus = function(actor) {
        if (Utils.RPGMAKER_NAME === 'MZ') {
            this.refresh();
        } else {
            this.contents.clear();
        }
        if (!actor) {
            return;
        }
        let a, x, y;

        this.contents.fontSize = 26;
        if (param.swFaceType !== "none") {
            const a = this.parseRectangle(param.facePos);
            switch (param.swFaceType) {
                case "walk":
                    this.drawActorCharacter(actor, a[0] + KanjiPartyChange.faceWidth() / 2, a[1] + KanjiPartyChange.faceHeight() - 8);
                    break;
                case "face":
                    this.drawActorFace(actor, a[0], a[1], KanjiPartyChange.faceWidth(), KanjiPartyChange.faceHeight());
                    break;
                case "sideV":
                    var bitmap = ImageManager.loadSvActor(actor.battlerName());
                    var ww = bitmap.width / 9, hh = bitmap.height / 6;
                    this.contents.blt(bitmap, 0, 0, ww, hh,
                        a[0] + (KanjiPartyChange.faceWidth() - ww) / 2, a[1] + (KanjiPartyChange.faceHeight() - hh) / 2);
                    break;
            }
        }
        if (param.nameShow) {
            const a = this.parseRectangle(param.namePos);
            this.drawActorName(actor, a[0], a[1], a[2] || 180);
        }
        if (param.classShow) {
            const a = this.parseRectangle(param.classPos);
            this.drawActorClass(actor, a[0], a[1], a[2] || 180);
        }
        if (param.levelShow) this._drawLevel(actor, ...this.parseRectangle(param.levelPos));
        a = this.parseRectangle(param.iconsPos);
        if (a[2]) this.drawActorIcons(actor, ...a);
        a = this.parseRectangle(param.hpPos);
        if (a[2]) this.drawActorHp(actor, ...a);
        a = this.parseRectangle(param.mpPos);
        if (a[2]) this.drawActorMp(actor, ...a);
        a = this.parseRectangle(param.tpPos);
        if (a[2]) this.drawActorTp(actor, ...a);

        this.contents.paintOpacity = 48;
        a = this.parseRectangle(param.horzLineYPos);
        for (var i = 0; i < a.length; i++) {
            this.contents.fillRect(0, a[i], this.contentsWidth(), 2, this.normalColor());
        }
        this.contents.paintOpacity = 255;

        if (param.equipShow) {
            let a = this.parseRectangle(param.equipPos), x = a[0], y = a[1];
            const slots = actor.equips();
            actor.equipSlots().forEach(function(slotId, index){
                this.changeTextColor(this.systemColor());
                this.drawText($dataSystem.equipTypes[slotId], x, y, 100, this.lineHeight());
                if (slots[index]) {
                    this.drawItemName(slots[index], x + 100, y, a[2] - 100);
                }
                y += param.equipRow;
            }, this);
        }
        if (param.statusShow) {
            let a = this.parseRectangle(param.statusPos), x = a[0], y = a[1] - param.statusRow;
            let wid = Math.max(a[2] - 80, 68);
            const re = new RegExp("([XS]?)(\\d+)");
            for (var index = 0; index < param.paramListSW.length; index++) {
                y += param.statusRow;
                if (!re.test(param.paramListSW[index])) continue;
                this.changeTextColor(this.systemColor());

                var mode = RegExp.$1, num = parseInt(RegExp.$2), 
                paramName, paramValue, xPad = 0, percWid = this.textWidth(param.parcentStr);
                if (mode == 'X') {
                    paramName  = param.xParamNames[num];
                    paramValue = actor.xparam(num);
                    xPad = percWid;
                } else if (mode == 'S') {
                    paramName  = param.sParamNames[num];
                    paramValue = actor.sparam(num);
                    xPad = percWid;
                } else {
                    paramName  = TextManager.param(num);
                    paramValue = actor.param(num);
                }
                if (xPad) {
                    paramValue = parseInt(paramValue * 100);
                    this.drawText(param.parcentStr, x, y, a[2], 'right');
                }
                this.drawText(paramName, x, y, wid);
                this.resetTextColor();
                this.drawText(paramValue, x - xPad, y, a[2], 'right');
            }
        }
    };

    Window_ActorInfo.prototype._drawLevel = function(actor, x, y, width=120) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x, y, width, 'right');
    };

    //=================================================
    // Scene_KanjiPartyChange
    //=================================================
    function Scene_KanjiPartyChange() {
        return this.initialize.apply(this, arguments);
    }

    Scene_KanjiPartyChange.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_KanjiPartyChange.prototype.constructor = Scene_KanjiPartyChange;

    Scene_KanjiPartyChange.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        const array = $gameSystem.storageMembers();
        for (let i = 0; i < array.length; i++) {
            if ($gameParty._actors.includes(array[i][0])) array[i] = null;
        }
        $gameSystem._storageMembers = array.filter(function(id){ return id !== null });

        this._originalParty = $gameParty._actors.slice();
        this._originalMembers = $gameSystem._storageMembers.slice();
        this._originalParty.concat(this._originalMembers.map(arr => arr[0])).forEach(function(id){
            const actor = $gameActors.actor(id);
            ImageManager.loadFace(actor.faceName());
            ImageManager.loadCharacter(actor.characterName());
            ImageManager.loadSvActor(actor.battlerName());
        });

        this.createMainCommandsWindow();
        this.createActorListWindow();
        this.createStorageMemberWindow();
        this.createStatusWindow();
    };

    Scene_KanjiPartyChange.prototype.start = function() {
        Scene_MenuBase.prototype.start.apply(this, arguments);
        this.actorListWindow.refresh();
        this.storageMemberWindow.refresh();
    };

    Scene_KanjiPartyChange.prototype.parseRectangle = function(param) {
        const rect = KanjiPartyChange.parseRectangle(param);
        if (Utils.RPGMAKER_NAME === 'MZ') {
            return [new Rectangle(...rect)];
        } else {
            return rect;
        }
    };

    Scene_KanjiPartyChange.prototype.createMainCommandsWindow = function () {
        this.commandWindow = new Window_PCMainCommand(...this.parseRectangle(param.cwPos));
        this.commandWindow.setHandler('change', this.commandChange.bind(this));
        this.commandWindow.setHandler('remove', this.commandRemove.bind(this));
        this.commandWindow.setHandler('revert', this.commandRevert.bind(this));
        this.commandWindow.setHandler('cancel', this.commandFinish.bind(this));
        this.commandWindow.activate();
        this.addWindow(this.commandWindow);
    };

    Scene_KanjiPartyChange.prototype.createActorListWindow = function () {
        this.actorListWindow = new Window_PCActorList(...this.parseRectangle(param.pwPos));
        this.actorListWindow.setHandler('ok',     this.commandChangeActor.bind(this));
        this.actorListWindow.setHandler('cancel', this.commandCancelActor.bind(this));
        this.addWindow(this.actorListWindow);
    };

    Scene_KanjiPartyChange.prototype.createStorageMemberWindow = function () {
        this.storageMemberWindow = new Window_StorageMember(...this.parseRectangle(param.wwPos));
        this.storageMemberWindow.setHandler('ok',     this.commandOkStorage.bind(this));
        this.storageMemberWindow.setHandler('cancel', this.commandCancelStorage.bind(this));
        this.addWindow(this.storageMemberWindow);
    };

    Scene_KanjiPartyChange.prototype.createStatusWindow = function () {
        this.statusWindow = new Window_ActorInfo(...this.parseRectangle(param.swPos));
        this.actorListWindow.setHelpWindow(this.statusWindow);
        this.storageMemberWindow.setHelpWindow(this.statusWindow);
        this.addWindow(this.statusWindow);
    };

    // Window_PCMainCommand
    Scene_KanjiPartyChange.prototype.commandChange = function () {
        this.actorListWindow.activate();
        this.actorListWindow.select(0);
    };

    Scene_KanjiPartyChange.prototype.commandRemove = function () {
        this.actorListWindow.activate();
        this.actorListWindow.select(0);
    };

    Scene_KanjiPartyChange.prototype.commandRevert = function () {
        $gameParty._actors = this._originalParty.slice();
        $gameSystem._storageMembers = this._originalMembers.slice();
        this.actorListWindow.refresh();
        this.storageMemberWindow.refresh();
        this.actorListWindow.select(-1);
        this.commandWindow.activate();
    };

    Scene_KanjiPartyChange.prototype.commandFinish = function () {
        $gameParty.restrictPartySize();
        $gamePlayer.refresh();
        this.popScene();
    };

    // Window_PCActorList
    Scene_KanjiPartyChange.prototype.commandChangeActor = function () {
        var id = $gameParty._actors[this.actorListWindow._index];
        if (this.commandWindow._index == 1) {
            const actor = $gameActors.actor(id);
            if (actor && actor.kanjiPCLock()) {
                SoundManager.playBuzzer();
                this.actorListWindow.activate();
            } else {
                if ($gameParty._actors.length > 1 && id) {
                    $gameSystem.storageMembers().push($gameParty._actors.splice(this.actorListWindow._index, 1));
                    this.actorListWindow.refresh();
                    this.storageMemberWindow.refresh();
                    this.actorListWindow.updateHelp();
                } else {
                    SoundManager.playBuzzer();
                }
                this.actorListWindow.activate();
            }
        } else {
            this.storageMemberWindow.activate();
            this.storageMemberWindow.select(0);
        }
    };

    Scene_KanjiPartyChange.prototype.commandCancelActor = function () {
        this.actorListWindow.select(-1);
        this.commandWindow.activate();
    };

    // Window_StorageMember
    Scene_KanjiPartyChange.prototype.commandOkStorage = function () {
        var id = $gameParty._actors[this.actorListWindow._index],
            data = $gameSystem.storageMembers();
        if (param.removeOnReserveTerm && this.storageMemberWindow._index == 0) {
            const actor = $gameActors.actor(id);
            if (actor && actor.kanjiPCLock()) {
                SoundManager.playBuzzer();
                this.actorListWindow.activate();
            } else {
                if ($gameParty._actors.length > 1 && id) {
                    $gameSystem.storageMembers().push($gameParty._actors.splice(this.actorListWindow._index, 1));
                    this.actorListWindow.refresh();
                    this.storageMemberWindow.refresh();
                    this.actorListWindow.updateHelp();
                } else {
                    SoundManager.playBuzzer();
                }
                this.actorListWindow.activate();
            }
        } else {
            var index = this.storageMemberWindow._index - (param.removeOnReserveTerm ? 1 : 0);
            if (id) {
                $gameParty._actors[this.actorListWindow._index] = data[index][0];
                data[index] = [id];
                this.actorListWindow.refresh();
                this.storageMemberWindow.refresh();
            } else if ($gameParty._actors.length < ($gameSystem._kanjiPCMaxParty || param.maxAllParty)) {
                $gameParty._actors.push(data[index][0]);
                data.splice(index, 1);
                this.actorListWindow.refresh();
                this.storageMemberWindow.refresh();
            } else {
                SoundManager.playBuzzer();
            }
            this.storageMemberWindow.activate();
        }
    };

    Scene_KanjiPartyChange.prototype.commandCancelStorage = function () {
        this.storageMemberWindow.select(-1);
        this.actorListWindow.activate();
    };

    // MV/MZ Compatibility
    ([
        Window_PCActorList,
        Window_PCMainCommand,
        Window_StorageMember,
        Window_ActorInfo,
    ]).forEach(function(klass){
        if (Utils.RPGMAKER_NAME === 'MZ') {
            klass.prototype.normalColor = function() {
                return ColorManager.normalColor();
            };

            klass.prototype.systemColor = function() {
                return ColorManager.systemColor();
            };

            klass.prototype.drawActorCharacter = function(actor, x, y) {
                this.drawCharacter(actor.characterName(), actor.characterIndex(), x, y);
            };

            klass.prototype.drawActorFace = function(actor, x, y, width, height) {
                this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
            };

            klass.prototype.drawActorHp = function(actor, x, y, w){
                Window_StatusBase.prototype.placeGauge.call(this, actor, 'hp', x, y, w);
            };

            klass.prototype.drawActorMp = function(actor, x, y, w){
                Window_StatusBase.prototype.placeGauge.call(this, actor, 'mp', x, y, w);
            };

            klass.prototype.drawActorTp = function(actor, x, y, w){
                Window_StatusBase.prototype.placeGauge.call(this, actor, 'tp', x, y, w);
            };
        }
    }, this);

    Object.assign(KanjiPartyChange.exports, {
        Window_PCActorList,
        Window_PCMainCommand,
        Window_StorageMember,
        Window_ActorInfo,
        Scene_KanjiPartyChange,
    });
}).call(KanjiPartyChange);