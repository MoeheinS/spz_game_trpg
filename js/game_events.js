// actor, waypoint
function cycle_movement(a, w){
    moveToPoint(a, {x: w.x, y: w.y}, 0.01, true);
}

function dev_buildMode(){
    game_state.debug_buildmode = true;
    game_state.game_phase = 'buildMode';

    let rootItem = document.createElement("div");
    let inputItem = document.createElement("input");
        inputItem.type = 'range';
        inputItem.step = 1;
        inputItem.min = 0;
        inputItem.max = buildingList.length - 1;
        inputItem.name = 'devBuilder--buildingType';
        inputItem.style.pointerEvents = 'all';
        inputItem.oninput = function(){
            console.log(buildingList[this.value]);
            dom_textAnimation(buildingList[this.value].name);
        };
        rootItem.appendChild(inputItem);
        
    let inputItem2 = document.createElement("input");
        inputItem2.type = 'range';
        inputItem2.step = 1;
        inputItem2.min = 0;
        inputItem2.max = 11;
        inputItem2.name = 'devBuilder--buildingLevel';
        inputItem2.style.pointerEvents = 'all';
        inputItem2.oninput = function(){
            console.log(this.value)
            dom_textAnimation('level '+this.value);
        };
        rootItem.appendChild(inputItem2);

    let button_clear = document.createElement("button");
        button_clear.innerHTML = 'clear';
        button_clear.onclick = function(){
            flowControl('clear');
        };
        button_clear.style.pointerEvents = 'all';
        button_clear.style.marginLeft = '2rem';
        button_clear.style.padding = '1rem';
        rootItem.appendChild(button_clear);

    let button_undo = document.createElement("button");
        button_undo.innerHTML = 'undo';
        button_undo.onclick = function(){
            dev_buildMode_undo();
        };
        button_undo.style.pointerEvents = 'all';
        button_undo.style.marginLeft = '2rem';
        button_undo.style.padding = '1rem';
        rootItem.appendChild(button_undo);

    let button_export = document.createElement("button");
        button_export.innerHTML = 'export level';
        button_export.onclick = function(){
            export_level(prompt('Export where?'));
        };
        button_export.style.pointerEvents = 'all';
        button_export.style.marginLeft = '2rem';
        button_export.style.padding = '1rem';
        rootItem.appendChild(button_export);

    document.querySelector('.partyPicker').appendChild(rootItem);
}
function dev_buildMode_undo(){
    World.remove(world, game_state.debug_buildmode_lastAdded[game_state.debug_buildmode_lastAdded.length-1], true);
    game_state.debug_buildmode_lastAdded.pop();
    window.setTimeout(function(){
        game_state.grass = landScape();
    },100);
}