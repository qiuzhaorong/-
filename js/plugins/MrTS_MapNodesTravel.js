//=============================================================================
// MrTS_MapNodesTravel.js
//=============================================================================

/*:
* @plugindesc MrTS地图传送旅行[v1.0]
* @author Mr. Trivel
*
* @param Cursor Offset
* @text 光标图坐标
* @desc 光标图片的偏移值
* @default -20 -100
*
* @param Info Offset
* @text 节点图坐标
* @desc 节点图片的偏移值
* @default 0 0
* 
* @help 
* --------------------------------------------------------------------------------
* 使用条款
* --------------------------------------------------------------------------------
* 不要移除插件头部注释，或声称该插件由你编写。
* 若在项目中使用本插件，请标注作者 Mr. Trivel。
* 可免费用于商业和非商业项目。
* --------------------------------------------------------------------------------
* 版本 1.0
* --------------------------------------------------------------------------------
*
* --------------------------------------------------------------------------------
* 节点设置方法
* --------------------------------------------------------------------------------
* 用你常用的文本编辑器打开本插件，向下滚动到标注“EDIT MAP NODES HERE”的位置，
* 按照以下格式配置节点：
* "节点标识名": {
*    picture: "pictureName",
*    xMenu: number,
*    yMenu: number,
*    mapID: number,
*    mapX: number,
*    mapY: number    
* },
*
* "节点标识名" - 用于锁定/解锁节点的唯一标识（单个单词）。
* picture - 显示在节点上方的图片名称
* xMenu - 节点在旅行菜单中的X坐标
* yMenu - 节点在旅行菜单中的Y坐标
* mapID - 传送目标地图的ID
* mapX - 传送目标地图的X坐标
* mapY - 传送目标地图的Y坐标
* --------------------------------------------------------------------------------
*
* --------------------------------------------------------------------------------
* 插件指令
* --------------------------------------------------------------------------------
MapNode Enter
打开地图节点旅行界面
* 
MapNode Show 节点标识名
在地图上显示指定节点

MapNode Hide 节点标识名
在地图上隐藏指定节点
*
MapNode Lock 节点标识名
锁定指定节点（无法传送）

MapNode Unlock 节点标识名
解锁指定节点（可传送
*
* 示例:
* MapNode Enter
* 
MapNode Show 新手村
MapNode Hide 新手村
*
MapNode Lock 新手村
Mapnode Unlock 新手村

* --------------------------------------------------------------------------------
* 图片资源
* --------------------------------------------------------------------------------
* 所有图片需放入 img\system 文件夹。
* 默认需要的图片：
* img\system\mapNodeCursor.png（光标图片）
* img\system\mapNodeBackground.png（背景图片）
* img\system\mapNodeLocked.png（节点锁定状态图片）
* img\system\mapNodeUnlocked.png（节点解锁状态图片）
* --------------------------------------------------------------------------------
*
  使用条款：
  允许商业游戏制作
  
  汉化：硕明云书
  素材制作：硕明云书
   
* --------------------------------------------------------------------------------
* 版本历史
* --------------------------------------------------------------------------------
* 1.0 - 首发版本
*/

(function() {
	var mapNodeList = {
	//--------------------------------------------------------------------------------
	// 在这里面设置 v
	//--------------------------------------------------------------------------------
	"新手村": {
    picture: "xsc", 
    xMenu: 50,             
    yMenu: 330,             
    mapId: 1,              
    mapX: 8,               
    mapY: 7                
    },
	"岩系道馆": {
    picture: "yxdg", 
    xMenu: 300,             
    yMenu: 400,             
    mapId: 17,              
    mapX: 27,               
    mapY: 18                
    },
	"水系道馆": {
    picture: "sxdg", 
    xMenu: 450,             
    yMenu: 450,             
    mapId: 27,              
    mapX: 7,               
    mapY: 7                
    },	
	"冰系道馆": {
    picture: "bxdg", 
    xMenu: 650,             
    yMenu: 500,             
    mapId: 52,              
    mapX: 15,               
    mapY: 7                
    },
	"超能系道馆": {
    picture: "cnxdg", 
    xMenu: 700,             
    yMenu: 150,             
    mapId: 76,              
    mapX: 21,               
    mapY: 9                
    },
	"火系道馆": {
    picture: "hxdg", 
    xMenu: 100,             
    yMenu: 50,             
    mapId: 93,              
    mapX: 17,               
    mapY: 14                
    },
	"电系道馆": {
    picture: "dxdg", 
    xMenu: 500,             
    yMenu: 80,             
    mapId: 111,              
    mapX: 21,               
    mapY: 15                
    },
	"虫系道馆": {
    picture: "cxdg", 
    xMenu: 200,             
    yMenu: 230,             
    mapId: 12,              
    mapX: 6,               
    mapY: 5                
    },
	"草系道馆": {
    picture: "c xdg", 
    xMenu: 380,             
    yMenu: 200,             
    mapId: 133,              
    mapX: 24,               
    mapY: 11                
    },
    "空道馆": {
    picture: "kdg", 
    xMenu: 540,             
    yMenu: 280,             
    mapId: 142,              
    mapX: 25,               
    mapY: 47                
    }

                //--------------------------------------------------------------------------------
	// 在这里面设置 ^
	//--------------------------------------------------------------------------------
	}

	var parameters = PluginManager.parameters('MrTS_MapNodesTravel');
	var paramCursorOffset = String(parameters['Cursor Offset'] || "0 -48");
	var paramCursorOffsetData = paramCursorOffset.split(' ');
	paramCursorOffsetData[0] = Number(paramCursorOffsetData[0]);
	paramCursorOffsetData[1] = Number(paramCursorOffsetData[1]);
	var paramInfoOffset = String(parameters['Info Offset'] || "-88 -118");
	var paramInfoOffsetData = paramInfoOffset.split(' ');
	paramInfoOffsetData[0] = Number(paramInfoOffsetData[0]);
	paramInfoOffsetData[1] = Number(paramInfoOffsetData[1]);

	//--------------------------------------------------------------------------
	// Game_Interpreter
	// 
	
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.toLowerCase() === "mapnode") {
			switch (args[0].toUpperCase())
			{
				case 'ENTER':
				{
					SceneManager.push(Scene_MapNodes);
				} break;
				case 'SHOW':
				{
					$gameSystem.showMapNode(args[1]);
				} break;
				case 'HIDE':
				{
					$gameSystem.hideMapNode(args[1]);
				} break;
				case 'LOCK':
				{
					$gameSystem.lockMapNode(args[1]);
				} break;
				case 'UNLOCK':
				{
					$gameSystem.unlockMapNode(args[1]);
				} break;
			}
		}
	};

	//--------------------------------------------------------------------------
	// Game_System
	// 

	_Game_System_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		_Game_System_initialize.call(this);
		this._nodesShown = [];
		this._nodesLocked = [];
	};

	Game_System.prototype.showMapNode = function(keyname) {
		if (!mapNodeList[keyname]) {
			console.warn(keyname + " doesn't exist in mapNodeList!");
			return;
		}

		if (!this.mapNodeShown(keyname)) this._nodesShown.push(keyname);
	};

	Game_System.prototype.hideMapNode = function(keyname) {
		if (this.mapNodeShown(keyname)) 
			this._nodesShown.splice(this._nodesShown.indexOf(keyname), 1);
	};

	Game_System.prototype.lockMapNode = function(keyname) {
		if (!mapNodeList[keyname]) {
			console.warn(keyname + " doesn't exist in mapNodeList!");
			return;
		}

		if (!this.mapNodeLocked(keyname)) this._nodesLocked.push(keyname);
	};

	Game_System.prototype.unlockMapNode = function(keyname) {
		if (this.mapNodeLocked(keyname)) 
			this._nodesLocked.splice(this._nodesLocked.indexOf(keyname), 1);
	};

	Game_System.prototype.mapNodeShown = function(keyname) {
		return this._nodesShown.contains(keyname);
	};

	Game_System.prototype.mapNodeLocked = function(keyname) {
		return this._nodesLocked.contains(keyname);
	};

	Game_System.prototype.getMapNodesShown = function() {
		return this._nodesShown;
	};

	//--------------------------------------------------------------------------
	// Scene_MapNodes
	//
	// Map Nodes scene. For travelling.
	
	function Scene_MapNodes() {
		this.initialize.apply(this, arguments);	
	};
	
	Scene_MapNodes.prototype = Object.create(Scene_Base.prototype);
	Scene_MapNodes.prototype.constructor = Scene_MapNodes;
	
	Scene_MapNodes.prototype.initialize = function() {
		Scene_Base.prototype.initialize.call(this);
	};
	
	Scene_MapNodes.prototype.create = function() {
		Scene_Base.prototype.create.call(this);
		this.createBackground();
		this.createWindowLayer();
		this.createSelectionWindow();
	};

	Scene_MapNodes.prototype.createBackground = function() {
		this._backgroundImage = new Sprite();
		this._backgroundImage.bitmap = ImageManager.loadSystem("mapNodeBackground");
		this.addChild(this._backgroundImage);
	};

	Scene_MapNodes.prototype.createSelectionWindow = function() {
		this._selectWindow = new Window_MapNodes();
		this._selectWindow.setHandler('ok', this.selectOk.bind(this));
		this._selectWindow.setHandler('cancel', this.popScene.bind(this));
		this._selectWindow.select(0);
		this._selectWindow.activate();
		this.addWindow(this._selectWindow);
	};

	Scene_MapNodes.prototype.selectOk = function() {
		var node = mapNodeList[$gameSystem.getMapNodesShown()[this._selectWindow.index()]];
		console.log(node);
		$gamePlayer.reserveTransfer(node.mapId, node.mapX, node.mapY, 2, 0);
		this.popScene();
	};

	//--------------------------------------------------------------------------
	// Window_MapNodes
	//
	// Shows all nodes and allows travelling between them.
	
	function Window_MapNodes() {
		this.initialize.apply(this, arguments);	
	};
	
	Window_MapNodes.prototype = Object.create(Window_Selectable.prototype);
	Window_MapNodes.prototype.constructor = Window_MapNodes;
	
	Window_MapNodes.prototype.initialize = function() {
		var sp = this.standardPadding();
		this._nodes = [];
		this._cursor = new Sprite();
		this._info = new Sprite();
		this._cursor.bitmap = ImageManager.loadSystem("mapNodeCursor");
		this._nodeLockedBitmap = ImageManager.loadSystem("mapNodeLocked");
		this._nodeUnlockedBitmap = ImageManager.loadSystem("mapNodeUnlocked");
		Window_Selectable.prototype.initialize.call(this, -sp, -sp, Graphics.boxWidth+sp, Graphics.boxHeight+sp);
		var nodes = $gameSystem.getMapNodesShown();
		for (var i = 0; i < this.maxItems(); i++) {
			var node = mapNodeList[nodes[i]];
			var tmpSpr = new Sprite();
			tmpSpr.bitmap = $gameSystem.mapNodeLocked(nodes[i]) ? this._nodeLockedBitmap : this._nodeUnlockedBitmap;
			tmpSpr.x = node.xMenu;
			tmpSpr.y = node.yMenu;
			this._nodes.push(tmpSpr);
			this.addChild(tmpSpr);
		}
		var rect = this.itemRect(0);
		this._cursor.x = rect.x;
		this._cursor.y = rect.y;
		var node = mapNodeList[nodes[0]];
		this._info.bitmap = ImageManager.loadSystem(node.picture);
		this._info.x = node.xMenu + paramInfoOffsetData[0];
		this._info.y = node.yMenu + paramInfoOffsetData[1];
		this.addChild(this._cursor);
		this.addChild(this._info);
		this.opacity = 0;
		this.refresh();
	};

	Window_MapNodes.prototype.maxItems = function() {
		return $gameSystem.getMapNodesShown().length;
	};

	Window_MapNodes.prototype.updateCursor = function() {
        this.setCursorRect(0, 0, 0, 0);
	};

	Window_MapNodes.prototype.itemRect = function(index) {
		var rect = new Rectangle;
		var nodes = $gameSystem.getMapNodesShown();		
		var node = mapNodeList[nodes[index]];
		if ($gameSystem.mapNodeLocked(nodes[index]) && this._nodeLockedBitmap.isReady())
		{
			
			rect.x = node.xMenu;
			rect.y = node.yMenu;
			rect.width = this._nodeLockedBitmap.width;
			rect.height = this._nodeLockedBitmap.height;
		}
		else if (!$gameSystem.mapNodeLocked(nodes[index]) && this._nodeUnlockedBitmap.isReady())
		{
			rect.x = node.xMenu;
			rect.y = node.yMenu;
			rect.width = this._nodeUnlockedBitmap.width;
			rect.height = this._nodeUnlockedBitmap.height;
		}
		else
		{
			rect.x = node.xMenu;
			rect.y = node.yMenu;
			rect.width = 48;
			rect.height = 48;
		}
		rect.x -= this.standardPadding();
		rect.y -= this.standardPadding();
		return rect;
	};

	Window_MapNodes.prototype.update = function() {
		Window_Selectable.prototype.update.call(this);
		var node = mapNodeList[$gameSystem.getMapNodesShown()[this.index()]];
		var tX = node.xMenu + paramCursorOffsetData[0];
		var tY = node.yMenu + paramCursorOffsetData[1];
		var dX = tX - this._cursor.x;
		var dY = tY - this._cursor.y;

		this._cursor.x += dX * 0.08;
		this._cursor.y += dY * 0.08;
	};

	Window_MapNodes.prototype.updateInfoSprite = function() {
		var nodes = $gameSystem.getMapNodesShown();
		var node = mapNodeList[nodes[this.index()]];
		this._info.x = node.xMenu + paramInfoOffsetData[0];
		this._info.y = node.yMenu + paramInfoOffsetData[1];
		this._info.bitmap = ImageManager.loadSystem(node.picture);
	};

	Window_MapNodes.prototype.cursorDown = function(wrap) {
		var lowerWithY = [];
		var index = this.index();
		for (var i = 0; i < this._nodes.length; i++) {
			if (this._nodes[i].y > this._nodes[index].y)
				lowerWithY.push(i);
		}
		var cs = this._nodes;
		var df = this.distance;
		lowerWithY.sort(function(a, b) {
			return df(cs[index].x, cs[index].y, cs[a].x, cs[a].y) - df(cs[index].x, cs[index].y, cs[b].x, cs[b].y)
		});
		if (lowerWithY.length > 0) this.select(lowerWithY[0]);
		this.updateInfoSprite();
	};

	Window_MapNodes.prototype.cursorUp = function(wrap) {
		var higherWithY = [];
		var index = this.index();
		for (var i = 0; i < this._nodes.length; i++) {
			if (this._nodes[i].y < this._nodes[index].y)
				higherWithY.push(i);
		}
		var cs = this._nodes;
		var df = this.distance;
		higherWithY.sort(function(a, b) {
			return df(cs[index].x, cs[index].y, cs[a].x, cs[a].y) - df(cs[index].x, cs[index].y, cs[b].x, cs[b].y)
		});
		if (higherWithY.length > 0) this.select(higherWithY[0]);
		this.updateInfoSprite();
	};

	Window_MapNodes.prototype.cursorRight = function(wrap) {
	    var higherWithX = [];
		var index = this.index();
		for (var i = 0; i < this._nodes.length; i++) {
			if (this._nodes[i].x > this._nodes[index].x)
				higherWithX.push(i);
		}
		var cs = this._nodes;
		var df = this.distance;
		higherWithX.sort(function(a, b) {
			return df(cs[index].x, cs[index].y, cs[a].x, cs[a].y) - df(cs[index].x, cs[index].y, cs[b].x, cs[b].y)
		});
		if (higherWithX.length > 0) this.select(higherWithX[0]);
		this.updateInfoSprite();
	};

	Window_MapNodes.prototype.cursorLeft = function(wrap) {
	    var lowerWithX = [];
		var index = this.index();
		for (var i = 0; i < this._nodes.length; i++) {
			if (this._nodes[i].x < this._nodes[index].x)
				lowerWithX.push(i);
		}
		var cs = this._nodes;
		var df = this.distance;
		lowerWithX.sort(function(a, b) {
			return df(cs[index].x, cs[index].y, cs[a].x, cs[a].y) - df(cs[index].x, cs[index].y, cs[b].x, cs[b].y)
		});
		if (lowerWithX.length > 0) this.select(lowerWithX[0]);
		this.updateInfoSprite();
	};

	Window_MapNodes.prototype.distance = function(x1, y1, x2, y2) {
		var a = x1 - x2;
		var b = y1 - y2;
		return Math.abs(a) + Math.abs(b);
	};

	Window_MapNodes.prototype.isCurrentItemEnabled = function() {
	    return !$gameSystem.mapNodeLocked($gameSystem.getMapNodesShown()[this.index()]);
	};

	Window_MapNodes.prototype.onTouch = function(triggered) {
		Window_Selectable.prototype.onTouch.call(this, triggered);
		this.updateInfoSprite();
	};
})();
