/*:
 * @target MZ MV
 * @plugindesc 【角色仓库系统】v1.0 - 扩展的成员存储和管理系统
 * @author 你的名字
 *
 * @help
 * 功能说明：
 * - 扩展的保留盒子系统，支持多个仓库
 * - 可视化仓库管理界面
 * - 成员分类和筛选功能
 * - 批量操作支持
 *
 * 使用方法：
 * 1. 在事件脚本中调用：SceneManager.push(Scene_CharacterStorage);
 * 2. 或添加到菜单：在插件参数中设置
 *
 * @param MaxStorageBoxes
 * @text 最大仓库数量
 * @type number
 * @desc 可创建的最大仓库数量
 * @default 50
 *
 * @param MaxMembersPerBox
 * @text 每仓库最大成员数
 * @type number
 * @desc 每个仓库可存储的最大成员数量
 * @default 100
 *
 * @param EnableMenuAccess
 * @text 启用菜单访问
 * @type boolean
 * @desc 是否在主菜单中添加仓库选项
 * @default true
 *
 * @param MenuCommandName
 * @text 菜单命令名称
 * @type string
 * @desc 在主菜单中显示的命令名称
 * @default 角色仓库
 */

(function() {
    'use strict';

    const pluginName = "CharacterStorageSystem";
    const parameters = PluginManager.parameters(pluginName);

    // 插件参数
    const MaxStorageBoxes = Number(parameters['MaxStorageBoxes'] || 50);
    const MaxMembersPerBox = Number(parameters['MaxMembersPerBox'] || 100);
    const EnableMenuAccess = eval(parameters['EnableMenuAccess'] || 'true');
    const MenuCommandName = String(parameters['MenuCommandName'] || '角色仓库');

    // 初始化仓库系统
    let _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this.initStorageSystem();
    };

    Game_System.prototype.initStorageSystem = function() {
        if (!this._storageBoxes) {
            this._storageBoxes = [];
            for (let i = 0; i < MaxStorageBoxes; i++) {
                this._storageBoxes.push([]);
            }
        }
        this._currentStorageBox = 0;
    };

    // 仓库操作方法
    Game_System.prototype.getStorageBox = function(boxIndex) {
        return this._storageBoxes[boxIndex] || [];
    };

    Game_System.prototype.setStorageBox = function(boxIndex, members) {
        this._storageBoxes[boxIndex] = members;
    };

    Game_System.prototype.addToStorage = function(actor, boxIndex = 0) {
        const box = this.getStorageBox(boxIndex);
        if (box.length < MaxMembersPerBox) {
            box.push(actor);
            return true;
        }
        return false;
    };

    Game_System.prototype.removeFromStorage = function(boxIndex, memberIndex) {
        const box = this.getStorageBox(boxIndex);
        if (memberIndex >= 0 && memberIndex < box.length) {
            return box.splice(memberIndex, 1)[0];
        }
        return null;
    };

    Game_System.prototype.getStorageMember = function(boxIndex, memberIndex) {
        const box = this.getStorageBox(boxIndex);
        return box[memberIndex] || null;
    };

    Game_System.prototype.getStorageBoxCount = function() {
        return this._storageBoxes.length;
    };

    Game_System.prototype.getMembersInBox = function(boxIndex) {
        return this.getStorageBox(boxIndex).length;
    };

    Game_System.prototype.isBoxFull = function(boxIndex) {
        return this.getMembersInBox(boxIndex) >= MaxMembersPerBox;
    };

    Game_System.prototype.findEmptyBox = function() {
        for (let i = 0; i < this._storageBoxes.length; i++) {
            if (!this.isBoxFull(i)) {
                return i;
            }
        }
        return -1;
    };

    Game_System.prototype.swapPartyStorage = function(partyIndex, storageBox, storageIndex) {
        const partyMember = $gameParty._actors[partyIndex];
        const storageMember = this.getStorageMember(storageBox, storageIndex);

        if (partyMember && storageMember) {
            // 交换成员
            $gameParty._actors[partyIndex] = storageMember;
            this._storageBoxes[storageBox][storageIndex] = partyMember;
            return true;
        } else if (partyMember && !storageMember) {
            // 将队伍成员移到仓库
            if ($gameParty._actors.length > 1) {
                this.addToStorage(partyMember, storageBox);
                $gameParty._actors.splice(partyIndex, 1);
                return true;
            }
        } else if (!partyMember && storageMember) {
            // 将仓库成员加入队伍
            if ($gameParty._actors.length < $gameParty.maxBattleMembers()) {
                $gameParty._actors.push(storageMember);
                this.removeFromStorage(storageBox, storageIndex);
                return true;
            }
        }
        return false;
    };

    // 添加到菜单系统
    if (EnableMenuAccess) {
        let _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
        Window_MenuCommand.prototype.addOriginalCommands = function() {
            _Window_MenuCommand_addOriginalCommands.call(this);
            this.addCommand(MenuCommandName, 'characterStorage', true);
        };

        let _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function() {
            _Scene_Menu_createCommandWindow.call(this);
            this._commandWindow.setHandler('characterStorage', this.commandCharacterStorage.bind(this));
        };

        Scene_Menu.prototype.commandCharacterStorage = function() {
            SceneManager.push(Scene_CharacterStorage);
        };
    }

    // 仓库场景
    function Scene_CharacterStorage() {
        this.initialize.apply(this, arguments);
    }

    Scene_CharacterStorage.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_CharacterStorage.prototype.constructor = Scene_CharacterStorage;

    Scene_CharacterStorage.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createBoxWindow();
        this.createMemberWindow();
        this.createPartyWindow();
        this.createStatusWindow();
        this.refreshWindows();
    };

    Scene_CharacterStorage.prototype.createBoxWindow = function() {
        const width = 200;
        const height = Graphics.boxHeight - this._helpWindow.height;
        this._boxWindow = new Window_StorageBoxList(0, this._helpWindow.height, width, height);
        this._boxWindow.setHandler('ok', this.onBoxOk.bind(this));
        this._boxWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._boxWindow);
    };

    Scene_CharacterStorage.prototype.createMemberWindow = function() {
        const width = 300;
        const height = Graphics.boxHeight - this._helpWindow.height;
        this._memberWindow = new Window_StorageMemberList(200, this._helpWindow.height, width, height);
        this._memberWindow.setHandler('ok', this.onMemberOk.bind(this));
        this._memberWindow.setHandler('cancel', this.onMemberCancel.bind(this));
        this._memberWindow.deactivate();
        this.addWindow(this._memberWindow);
    };

    Scene_CharacterStorage.prototype.createPartyWindow = function() {
        const width = Graphics.boxWidth - 500;
        const height = 200;
        this._partyWindow = new Window_StoragePartyList(500, this._helpWindow.height, width, height);
        this._partyWindow.setHandler('ok', this.onPartyOk.bind(this));
        this._partyWindow.setHandler('cancel', this.onPartyCancel.bind(this));
        this._partyWindow.deactivate();
        this.addWindow(this._partyWindow);
    };

    Scene_CharacterStorage.prototype.createStatusWindow = function() {
        const width = Graphics.boxWidth - 500;
        const height = Graphics.boxHeight - this._helpWindow.height - 200;
        this._statusWindow = new Window_StorageStatus(500, this._helpWindow.height + 200, width, height);
        this.addWindow(this._statusWindow);
    };

    Scene_CharacterStorage.prototype.onBoxOk = function() {
        this._memberWindow.activate();
        this._memberWindow.select(0);
        this.refreshMemberWindow();
    };

    Scene_CharacterStorage.prototype.onMemberOk = function() {
        this._partyWindow.activate();
        this._partyWindow.select(0);
        this.updateStatusWindow();
    };

    Scene_CharacterStorage.prototype.onMemberCancel = function() {
        this._boxWindow.activate();
        this._memberWindow.deactivate();
    };

    Scene_CharacterStorage.prototype.onPartyOk = function() {
        const boxIndex = this._boxWindow.index();
        const memberIndex = this._memberWindow.index();
        const partyIndex = this._partyWindow.index();
        
        if ($gameSystem.swapPartyStorage(partyIndex, boxIndex, memberIndex)) {
            SoundManager.playOk();
            this.refreshAllWindows();
        } else {
            SoundManager.playBuzzer();
        }
        
        this._partyWindow.deactivate();
        this._memberWindow.activate();
    };

    Scene_CharacterStorage.prototype.onPartyCancel = function() {
        this._partyWindow.deactivate();
        this._memberWindow.activate();
    };

    Scene_CharacterStorage.prototype.refreshWindows = function() {
        this.refreshMemberWindow();
        this.refreshPartyWindow();
        this.updateStatusWindow();
    };

    Scene_CharacterStorage.prototype.refreshAllWindows = function() {
        this._boxWindow.refresh();
        this.refreshMemberWindow();
        this.refreshPartyWindow();
        this.updateStatusWindow();
    };

    Scene_CharacterStorage.prototype.refreshMemberWindow = function() {
        const boxIndex = this._boxWindow.index();
        this._memberWindow.setBoxIndex(boxIndex);
        this._memberWindow.refresh();
    };

    Scene_CharacterStorage.prototype.refreshPartyWindow = function() {
        this._partyWindow.refresh();
    };

    Scene_CharacterStorage.prototype.updateStatusWindow = function() {
        const boxIndex = this._boxWindow.index();
        const memberIndex = this._memberWindow.index();
        const partyIndex = this._partyWindow.index();
        
        let actor = null;
        if (this._memberWindow.active) {
            actor = $gameSystem.getStorageMember(boxIndex, memberIndex);
        } else if (this._partyWindow.active) {
            actor = $gameParty._actors[partyIndex];
        }
        
        this._statusWindow.setActor(actor);
        this._statusWindow.refresh();
    };

    // 仓库盒子列表窗口
    function Window_StorageBoxList() {
        this.initialize.apply(this, arguments);
    }

    Window_StorageBoxList.prototype = Object.create(Window_Selectable.prototype);
    Window_StorageBoxList.prototype.constructor = Window_StorageBoxList;

    Window_StorageBoxList.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_StorageBoxList.prototype.maxItems = function() {
        return $gameSystem.getStorageBoxCount();
    };

    Window_StorageBoxList.prototype.drawItem = function(index) {
        const rect = this.itemRectForText(index);
        const memberCount = $gameSystem.getMembersInBox(index);
        const text = `仓库 ${index + 1} (${memberCount}/${MaxMembersPerBox})`;
        this.drawText(text, rect.x, rect.y, rect.width);
    };

    // 仓库成员列表窗口
    function Window_StorageMemberList() {
        this.initialize.apply(this, arguments);
    }

    Window_StorageMemberList.prototype = Object.create(Window_Selectable.prototype);
    Window_StorageMemberList.prototype.constructor = Window_StorageMemberList;

    Window_StorageMemberList.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._boxIndex = 0;
    };

    Window_StorageMemberList.prototype.setBoxIndex = function(boxIndex) {
        this._boxIndex = boxIndex;
    };

    Window_StorageMemberList.prototype.maxItems = function() {
        return $gameSystem.getMembersInBox(this._boxIndex);
    };

    Window_StorageMemberList.prototype.drawItem = function(index) {
        const actor = $gameSystem.getStorageMember(this._boxIndex, index);
        if (actor) {
            const rect = this.itemRectForText(index);
            this.drawActorName(actor, rect.x, rect.y, 150);
            this.drawText(`Lv.${actor.level}`, rect.x + 160, rect.y, 60);
            this.drawActorHp(actor, rect.x + 230, rect.y, 100);
        }
    };

    // 队伍列表窗口
    function Window_StoragePartyList() {
        this.initialize.apply(this, arguments);
    }

    Window_StoragePartyList.prototype = Object.create(Window_Selectable.prototype);
    Window_StoragePartyList.prototype.constructor = Window_StoragePartyList;

    Window_StoragePartyList.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_StoragePartyList.prototype.maxItems = function() {
        return $gameParty._actors.length + 1; // +1 用于空位
    };

    Window_StoragePartyList.prototype.drawItem = function(index) {
        const rect = this.itemRectForText(index);
        if (index < $gameParty._actors.length) {
            const actor = $gameParty._actors[index];
            this.drawActorName(actor, rect.x, rect.y, 150);
            this.drawText(`Lv.${actor.level}`, rect.x + 160, rect.y, 60);
            this.drawActorHp(actor, rect.x + 230, rect.y, 100);
        } else {
            this.drawText("【空位】", rect.x, rect.y, rect.width);
        }
    };

    // 状态窗口
    function Window_StorageStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_StorageStatus.prototype = Object.create(Window_Base.prototype);
    Window_StorageStatus.prototype.constructor = Window_StorageStatus;

    Window_StorageStatus.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
    };

    Window_StorageStatus.prototype.setActor = function(actor) {
        this._actor = actor;
    };

    Window_StorageStatus.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            this.drawActorFullStatus(this._actor, 0, 0);
        } else {
            this.drawText("选择角色查看状态", 0, 0, this.contentsWidth());
        }
    };

    // 脚本调用接口
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "CharacterStorage") {
            this.processStorageCommand(args);
        }
    };

    Game_Interpreter.prototype.processStorageCommand = function(args) {
        const subCommand = args[0];
        switch (subCommand) {
            case "open":
                SceneManager.push(Scene_CharacterStorage);
                break;
            case "add":
                const actorId = parseInt(args[1]);
                const boxIndex = parseInt(args[2]) || 0;
                const actor = new Game_Actor(actorId);
                if ($gameSystem.addToStorage(actor, boxIndex)) {
                    $gameMessage.add(`${actor.name()} 已添加到仓库 ${boxIndex + 1}`);
                } else {
                    $gameMessage.add("仓库已满，无法添加角色");
                }
                break;
            case "remove":
                const removeBoxIndex = parseInt(args[1]);
                const removeMemberIndex = parseInt(args[2]);
                const removedActor = $gameSystem.removeFromStorage(removeBoxIndex, removeMemberIndex);
                if (removedActor) {
                    $gameMessage.add(`${removedActor.name()} 已从仓库移除`);
                }
                break;
        }
    };

    // 全局函数，方便事件调用
    window.OpenCharacterStorage = function() {
        SceneManager.push(Scene_CharacterStorage);
    };

    window.AddToStorage = function(actorId, boxIndex = 0) {
        const actor = new Game_Actor(actorId);
        return $gameSystem.addToStorage(actor, boxIndex);
    };

    console.log("角色仓库插件加载完成");
})();