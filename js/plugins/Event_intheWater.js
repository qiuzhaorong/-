/*=============================================================================
 Event_intheWater.js
----------------------------------------------------------------------------
 (c) 2019 fuku / chocowabu
  This software is released under the MIT License.
  http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2019/12/23 初版
//=============================================================================*/
/*:
 * @plugindesc 鱼类水中判定事件
 * @author fuku / チョコワ部
 *
 * @target MV MZ
 * @help
 
   MV/MZ通用插件
	
 =============================================================================
   介绍
 =============================================================================
 * 这是一款可将地图事件的通行判定设置
   为与大型船（交通工具）相同的插件
 * 制作鱼类或船只 NPC 时非常方便
 =============================================================================
 
 * 使用方法
 
 * 在事件备注栏中输入
<type:ship>  //判定大型船相同通行规则

<type:fish>  //并且该事件会显示在下层图块的下方
使用时建议将图块集的水部分设置为半透明，以达到更好的显示效果


 =============================================================================
 * 备注
 =============================================================================
 * 关于大型船的通行设置，请参考官方帮助
 * 如果穿透判定处于开启状态，会优先应用穿透判定。
 * 本插件没有插件命令
 =============================================================================
 * 使用条款：
 =============================================================================
 * 对修改、再分发、使用形式不做限制。请随意使用。
 * 使用时请注明作者名。详情请查阅MIT许可证。
 * 如果因本插件引发任何问题，我们无法提供相应支持。非常抱歉
 * 
 */
 
(function() {

var fishHook=function(events){
	var isMapPassable=function(x,y,d){
		var x2 = $gameMap.roundXWithDirection(x, d);
		var y2 = $gameMap.roundYWithDirection(y, d);

		return $gameMap.isShipPassable(x2,y2);
	};
	var screenZ=function(){return -2;};
	var i,max,event;
	for(i=0,max=events.length;i<max;i++){
		event=events[i];
		if(event){
			if(event.event().meta.type==='ship'){
				event.isMapPassable=isMapPassable;
			}else if(event.event().meta.type==='fish'){
				event.isMapPassable=isMapPassable;
				event.screenZ=screenZ;
			}
		}
	}
};

//シンプルだけどメニュー閉じた際や戦闘後も呼び出される
//負荷が大きい場合は軽量版を推奨
var sm_onMapLoaded=Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded=function(){
sm_onMapLoaded.call(this);
fishHook($gameMap.events());
};

//軽量版
/*
var gm_setupEvents=Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents=function(){
	gm_setupEvents.call(this);
	fishHook(this._events);
};

var need_restore=false;
var dm_extractSaveContents=DataManager.extractSaveContents;
DataManager.extractSaveContents=function(contents){
	dm_extractSaveContents.apply(this,arguments);
	need_restore=true;
};
var sm_onMapLoaded=Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded=function(){
	if(need_restore){
		fishHook($gameMap.events());
		need_restore=false;
	}
	sm_onMapLoaded.call(this);
};
*/

})();
