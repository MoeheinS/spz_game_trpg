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
      dom_squadUp(this.innerHTML, this.dataset.amount, this.dataset.artname);
    };
    button.style.setProperty('--bgimage', `url(../assets/noah/${unit.artName}.png)`);
    button.dataset.artname = unit.artName;
    button.dataset.showname = ( unit.shortName ? unit.shortName : unit.name );
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

function dom_squadUp(unitID, unitAmount, unitArtname){
  if( game_state.squad.length < 6 ){
    for( squaddie of game_state.squad ){
      if( squaddie.unitID == unitID ){
        return;
      }
    }
    game_state.squad.push({ unitID: unitID, amount: unitAmount, amount_base: unitAmount, artName: unitArtname });
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
          button.dataset.showname = ( unit.shortName ? unit.shortName : unit.name );
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
  
      document.querySelector('.UI_unitList--squad').appendChild(button);
    }
  }

  dom_refreshSquadpicker();
}

function dom_refreshSquadpicker(){
  document.querySelector('.partyPicker').innerHTML = '';

  for( squaddie of game_state.squad ){
    let rootItem = document.createElement("label");
    let inputItem = document.createElement("input");
        inputItem.type = 'radio';
        inputItem.name = 'partyPicker-deployer';
        inputItem.value = squaddie.unitID;
        rootItem.appendChild(inputItem);
    let articleItem = document.createElement("article");
        articleItem.className = 'partyPicker-member';
        articleItem.dataset.amount = squaddie.amount;
        articleItem.style.setProperty('--background', `url(../assets/noah/${squaddie.artName}.png)`);
        rootItem.appendChild(articleItem);
    document.querySelector('.partyPicker').appendChild(rootItem);
  }
}

function dom_flowControl(command){
  switch (command) {
    case 'toMenu':
      // quick and dirty
      document.querySelector('.UI_container--animationLayer').dataset.active = false;
      document.querySelector('.UI_container--animationLayer').innerHTML = '';
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
          //document.querySelector('.UI_container').dataset.show = true;
          //game_state.game_phase = 'survey';
          dom_aftermath(); // sets state to survey, acts like a retreat function
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
      dom_refreshSquadpicker();
      flowControl('countdown');
      break;
    case 'survey':
      document.querySelector('.UI_container').dataset.show = false; 
      break;
    default:
      break;
  }
}

function dom_textAnimation(text, persist){
  let bubble = document.createElement("div");
      bubble.className = 'textAnim';
      bubble.innerText = text;
      if( !persist ){
        bubble.addEventListener("animationend", function(){ this.remove() });
      }
  document.querySelector('.UI_container--animationLayer').appendChild(bubble);
}

function dom_aftermath(){
  if( document.querySelector('.UI_container--animationLayer').dataset.active == 'true' ){
    return; // to prevent message spam?
  }
  game_state.game_phase = 'survey';
  document.querySelector('.UI_container--animationLayer').dataset.active = true;
  var progress_pct = ( game_state.initial_buildings ? 100 - Math.floor( buildings_Array.length / game_state.initial_buildings * 100 ) : 0 );
  var winConditions = 0;
  if( progress_pct >= 50 ){
    winConditions++;
    var bronzeText = [
      'Halfway there...',
      "Almost got 'em",
      `${progress_pct}% destruction rate`,
      'Over half?!'
    ];
    dom_textAnimation(bronzeText[Math.floor(Math.random() * bronzeText.length)], true);
  }
  if( building_CORE && building_CORE.custom.hp_current <= 0 ){
    winConditions++;
    var silverText = [
      'Headquarters down',
      'Core destroyed',
      'Core building demolished'
    ];
    dom_textAnimation(silverText[Math.floor(Math.random() * silverText.length)], true);
  }
  if( progress_pct >= 100 ){
    winConditions++;
    var goldText = [
      '100% destruction',
      'Core destroyed',
      'Core building demolished',
      'Brutal',
      'Obliterated',
      'No Mercy'
    ];
    dom_textAnimation(goldText[Math.floor(Math.random() * goldText.length)], true);
  }
  if( winConditions == 0 ){
    var lossText = [
      "Mission Failed. We'll get 'em next time",
      "Can I get an F in chat?",
      "Come back with a stronger team",
      "Try a different team composition"
    ];
    dom_textAnimation(lossText[Math.floor(Math.random() * lossText.length)], true);
  }else{
    var winText = [
      'WINNER IS YOU',
      'VICTOLY',
      'You are victorious',
    ];
    if( winConditions < 3 ){
      winText.push('Try going for all medals');
    }else{
      winText.push('Try going for a faster time');
      winText.push('Try using a weaker team');
      winText.push('Try a higher difficulty'); // TODO: I could check what difficulty was attempted, but that's for future me
    }
    dom_textAnimation(winText[Math.floor(Math.random() * winText.length)], true);
  }
  
}

/*
  The final functions that are called on document load
*/
dom_refreshSquadlist();
dom_listMissions();
dom_listUnits();