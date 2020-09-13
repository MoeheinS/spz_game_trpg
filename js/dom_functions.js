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
      document.querySelector('.UI_missionButton--embark').disabled = ( game_state.squad.length > 0 ? false : true );
      document.querySelector('.UI_missionButton--survey').disabled = false;
    };

    document.querySelector('.UI_missionList').appendChild(button);
  }
}

function dom_listUnits(){
  document.querySelector('.UI_unitList').innerHTML = '';
  // populate unit list
  for( unit of unitList ){

    var button = document.createElement("button");
    button.innerHTML = unit.name;
    button.className = 'UI_unitButton';
    button.onclick = function(){
      dom_updateInspector(this.innerHTML);
      dom_squadUp(this.innerHTML, this.dataset.amount);
    };
    button.style.setProperty('--bgimage', `url(../assets/noah/${unit.artName}.png)`);
    button.dataset.artname = unit.artName;
    button.dataset.amount = unit.amount;

    document.querySelector('.UI_unitList').appendChild(button);
  }
}

function dom_updateInspector(unitID){
  for( unit of unitList ){
    if( unit.name == unitID ){
      document.querySelector('.UI_inspector--header').innerHTML = unit.name;
      document.querySelector('.UI_inspector--header').dataset.rarity = unit.rarity;
      document.querySelector('.UI_inspector--art').style.setProperty('--bgimage', `url(../assets/noah/${unit.artName}.png)`);
      document.querySelector('.dom_unit--count').innerHTML = unit.amount;
      document.querySelector('.dom_unit--hpMax').innerHTML = unit.hp;
      document.querySelector('.dom_unit--damage').innerHTML = unit.damage;
      document.querySelector('.dom_unit--aspeed').innerHTML = `${(unit.attackCD/60).toFixed(2)}s/atk`;
      document.querySelector('.dom_unit--range').innerHTML = unit.attackRange;
      document.querySelector('.dom_unit--target').innerHTML = unit.preferredTarget;
      document.querySelector('.dom_unit--notes').innerHTML = ( unit.notes ? unit.notes : '--');
      return;
    }
  }
  document.querySelector('.UI_inspector--header').innerHTML = '&nbsp;';
  document.querySelector('.UI_inspector--header').dataset.rarity = '';
  document.querySelector('.UI_inspector--art').style.setProperty('--bgimage', `url(../assets/fbbg.jpg)`);
  document.querySelector('.dom_unit--count').innerHTML = '--';
  document.querySelector('.dom_unit--hpMax').innerHTML = '--';
  document.querySelector('.dom_unit--damage').innerHTML = '--';
  document.querySelector('.dom_unit--aspeed').innerHTML = '--';
  document.querySelector('.dom_unit--range').innerHTML = '--';
  document.querySelector('.dom_unit--target').innerHTML = '--';
  document.querySelector('.dom_unit--notes').innerHTML = '--';
}

function dom_squadUp(unitID, unitAmount){
  if( game_state.squad.length < 6 ){
    for( squaddie of game_state.squad ){
      if( squaddie.unitID == unitID ){
        return;
      }
    }
    game_state.squad.push({ unitID: unitID, amount: unitAmount, amount_base: unitAmount });
    dom_refreshSquadlist();
  }
}

function dom_squadDown(unitID){
  if( game_state.squad.length > 0 ){
    for (let i = 0; i < 6; i++) {
      let squaddie = game_state.squad[i];
      if( squaddie.unitID == unitID ){
        game_state.squad.splice(i, 1);
        return dom_refreshSquadlist();
      }
    }
  }
}

function dom_refreshSquadlist(){
  document.querySelector('.UI_unitList--squad').innerHTML = '';
  // populate unit list
  for (let i = 0; i < 6; i++) {
    let squaddie = game_state.squad[i];
    console.log(squaddie, i);
    if( squaddie && squaddie.unitID ){
      for( unit of unitList ){
        if( unit.name == squaddie.unitID ){
          var button = document.createElement("button");
          button.innerHTML = unit.name;
          button.className = 'UI_unitButton';
          button.onclick = function(){
            //dom_updateInspector(this.innerHTML);
            //dom_squadUp(this.innerHTML, this.dataset.amount);
            dom_squadDown(this.innerHTML);
          };
          button.style.setProperty('--bgimage', `url(../assets/noah/${unit.artName}.png)`);
          button.dataset.artname = unit.artName;
          button.dataset.amount = unit.amount;
      
          document.querySelector('.UI_unitList--squad').appendChild(button);
          break;
        }
      }
    }else{
      var button = document.createElement("button");
      button.innerHTML = '';
      button.className = 'UI_unitButton';
      button.onclick = function(){
        dom_updateInspector(this.innerHTML);
      };
      button.style.setProperty('--bgimage', `url(../assets/fbbg.jpg)`);
      //button.dataset.artname = unit.artName;
      //button.dataset.amount = unit.amount;
  
      document.querySelector('.UI_unitList--squad').appendChild(button);
    }
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
dom_refreshSquadlist();
dom_listMissions();
dom_listUnits();