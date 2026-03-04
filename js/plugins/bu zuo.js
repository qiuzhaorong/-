// 禁用攻击键插件
/*:
 * @plugindesc 禁用攻击键但保留其他确认功能 v2.0
 * @author 你的名字
 *
 * @param Disable In Menu
 * @desc 在菜单中是否禁用攻击键
 * @default true
 *
 * @param Disable In Map
 * @desc 在地图中是否禁用攻击键
 * @default true
 *
 * @param Disable In Battle
 * @desc 在战斗中是否禁用攻击键
 * @default true
 *
 * @help
 * 禁用攻击键功能，但保留确认键的其他用途
 */

(function() {
    'use strict';
    
    var parameters = PluginManager.parameters('DisableAttackKey');
    var disableInMenu = parameters['Disable In Menu'] === 'true';
    var disableInMap = parameters['Disable In Map'] === 'true';
    var disableInBattle = parameters['Disable In Battle'] === 'true';
    
    // 保存原始输入检查方法
    var _Input_isTriggered = Input.isTriggered;
    var _Input_isPressed = Input.isPressed;
    var _Input_isRepeated = Input.isRepeated;
    
    // 重写输入检查方法
    Input.isTriggered = function(keyName) {
        if (this.shouldBlockAttack(keyName)) {
            return false;
        }
        return _Input_isTriggered.call(this, keyName);
    };
    
    Input.isPressed = function(keyName) {
        if (this.shouldBlockAttack(keyName)) {
            return false;
        }
        return _Input_isPressed.call(this, keyName);
    };
    
    Input.isRepeated = function(keyName) {
        if (this.shouldBlockAttack(keyName)) {
            return false;
        }
        return _Input_isRepeated.call(this, keyName);
    };
    
    // 检查是否应该阻止攻击键
    Input.shouldBlockAttack = function(keyName) {
        if (keyName !== 'ok' && keyName !== 'shift') return false;
        
        var scene = SceneManager._scene;
        
        // 在地图场景中禁用攻击
        if (disableInMap && scene instanceof Scene_Map) {
            return keyName === 'ok';
        }
        
        // 在战斗场景中禁用攻击
        if (disableInBattle && scene instanceof Scene_Battle) {
            return keyName === 'ok';
        }
        
        // 在菜单场景中禁用攻击
        if (disableInMenu && scene instanceof Scene_Menu) {
            return keyName === 'ok';
        }
        
        return false;
    };
    
    // 移除战斗指令中的攻击选项
    if (disableInBattle) {
        Window_ActorCommand.prototype.makeCommandList = function() {
            if (this._actor) {
                this.addSkillCommands();
                this.addCommand(TextManager.guard, 'guard', this._actor.canGuard());
                this.addCommand(TextManager.item, 'item');
                // 不添加攻击命令
            }
        };
    }
    
})();