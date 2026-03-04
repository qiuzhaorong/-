var Window_MenuCommand_makeCommandLis = Window_MenuCommand.prototype.makeCommandList;
Window_MenuCommand.prototype.makeCommandList = function() {
        Window_MenuCommand_makeCommandLis.call(this);
        this.addCommand('宠物', 'Pet');
};

var Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
        Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('Pet', this.openPet.bind(this));
};
Scene_Menu.prototype.openPet = function() {
        SceneManager.push(Scene_Pet);
};