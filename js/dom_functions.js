function dom_listMissions(){
  // set HTML to template
  //document.querySelector('.UI_container').innerHTML = document.querySelector('#missionSelect').innerHTML;

  // populate mission list
  for( mission of missionList ){

    let button = document.createElement("button");
    button.innerHTML = mission.id;
    button.className = 'UI_missionButton';
    button.onclick = function(){
      flowControl('load', this.innerText, document.querySelector('.input_difficultySlider').value);
      document.querySelector('.UI_missionButton--embark').disabled = false;
      document.querySelector('.UI_missionButton--survey').disabled = false;
    };

    document.querySelector('.UI_missionList').appendChild(button);
  }
}

function dom_listUnits(){
  // populate unit list
  for( unit of unitList ){

    let button = document.createElement("button");
    button.innerHTML = unit.name;
    button.className = 'UI_unitButton';
    button.onclick = function(){};

    document.querySelector('.UI_unitList').appendChild(button);
  }
}

function dom_flowControl(command){
  switch (command) {
    case 'toMenu':
      // back to menu when surveying
      // tally results, declare win/loss, back to menu when engage
      switch (game_state.game_phase) {
        case 'survey':
          document.querySelector('.UI_container').dataset.show = true;
          //game_state.game_phase = 'survey';
          game_state.timer_deploy = false;
          flowControl('clear');
          dom_flowControl('unready');
          break;
        case 'engage':
          document.querySelector('.UI_container').dataset.show = true;
          game_state.game_phase = 'survey';
          game_state.timer_deploy = false;
          flowControl('clear');
          dom_flowControl('unready');
          break;
        default:
          break;
      }
      break;
    case 'unready':
      document.querySelector('.UI_missionButton--embark').disabled = true;
      document.querySelector('.UI_missionButton--survey').disabled = true;
      break;
    case 'ready':
      document.querySelector('.UI_container').dataset.show = false; 
      flowControl('countdown');
      break;
    case 'survey':
      document.querySelector('.UI_container').dataset.show = false; 
      break;
    default:
      break;
  }
}

/*
  The final functions that are called on document load
*/
dom_listMissions();
dom_listUnits();