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
    button.dataset.rarity = unit.rarity;

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
          button.dataset.rarity = unit.rarity;
      
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
      button.dataset.rarity = '-';
  
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
          //flowControl('clear');
          dom_flowControl('unready');
          break;
        default:
          break;
      }
      break;
    case 'unready':
      document.querySelector('.UI_missionButton--embark').disabled = true;
      document.querySelector('.UI_missionButton--survey').disabled = true;
      document.querySelector('.UI_container--animationLayer').innerHTML = '';
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

function dom_textAnimation(text, persist, wait){
  let bubble = document.createElement("div");
      bubble.className = 'textAnim';
      bubble.innerText = text;
      if( !persist ){
        bubble.addEventListener("animationend", function(){ this.remove() });
      }
  window.setTimeout(function(){
    document.querySelector('.UI_container--animationLayer').appendChild(bubble)
  }, ( wait ? wait : 0 ));
  
}

function dom_aftermath(){
  if( document.querySelector('.UI_container--animationLayer').dataset.active == 'true' ){
    return; // to prevent message spam?
  }
  game_state.game_phase = 'survey';
  document.querySelector('.UI_container--animationLayer').dataset.active = true;

  dom_textAnimation('Mission time: '+game_state.timer_missionTime_renderText, true);

  var progress_pct = ( game_state.initial_buildings ? 100 - Math.floor( buildings_Array.length / game_state.initial_buildings * 100 ) : 0 );
  var winConditions = 0;
  if( progress_pct >= 50 ){
    winConditions++;
    var bronzeText = [
      `${progress_pct}% destruction rate`,
      'Over half?!'
    ];
    if( progress_pct < 100 ){
      bronzeText.push('Halfway there...');
      bronzeText.push("Almost got 'em");
    }
    dom_textAnimation(bronzeText[Math.floor(Math.random() * bronzeText.length)], true, winConditions*2000);
  }
  if( building_CORE && building_CORE.custom.hp_current <= 0 ){
    winConditions++;
    var silverText = [
      'Headquarters down',
      'Core destroyed',
      'Core building demolished'
    ];
    dom_textAnimation(silverText[Math.floor(Math.random() * silverText.length)], true, winConditions*2000);
  }
  if( progress_pct >= 100 ){
    winConditions++;
    var goldText = [
      '100% destruction',
      'Core destroyed',
      'Core building demolished',
      'Brutal',
      'Enemy Obliterated',
      'No Mercy'
    ];
    dom_textAnimation(goldText[Math.floor(Math.random() * goldText.length)], true, winConditions*2000);
  }
  if( winConditions == 0 ){
    var lossText = [
      "Mission Failed. We'll get 'em next time",
      "Can I get an F in chat?",
      "Come back with a stronger team",
      "Try a different team composition"
    ];
    dom_textAnimation(lossText[Math.floor(Math.random() * lossText.length)], true, ( ( winConditions*2000 )+2000 ));
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
    dom_textAnimation(winText[Math.floor(Math.random() * winText.length)], true, ( ( winConditions*2000 )+2000 ));
  }
  
}

/*
  The final functions that are called on document load
*/
dom_refreshSquadlist();
dom_listMissions();
dom_listUnits();

const tutorial_Messages = [ // newline per 5
  'Ahoy!',

  'Welcome to this low-res kinda-sorta spiritual homage to Battle Champs / Little Noah, a mobile game launched in 2015<br>And shut down in Januari 2019...',
  "It was Cygames' attempt to compete with Clash of Clans by making the genre more appealing to the Japanese userbase on top of some innovations to the formula; such as boss fights against huge monsters, which you could attempt solo or with 3 other players",
  "They also got Akihiko Yoshida as an art director, and I'm a huge fan of his work (Final Fantasy, Bravely Default, Vagrant Story)",
  'So it made me really sad when the game got shut down. Being an always-online mobile game, this really reminds one how the same fate awaits all games-as-a-service<br>Here today, gone tomorrow... Whoops, you clicked [tutorial], not [existential crisis]',
  'EH-HEM',

  `The core goal of the game is simple; you assemble a squad of up to 6 puppets and send them out to pillage enemy bases, bringing back sweet sweet resources
  <br>Enemies will attempt to stop you by defending their resources with walls and turrets. It's your job to pick the right puppets for the job`,
  `Because I just wanted to preserve some of the art, practice my coding and see how far I can get with html/canvas/javascript, not all features of Little Noah are here.
  <br>No social aspects, no PVP, no boss fights, no base building, no player base raiding, no Avatars...
  <br>Some of these might get added later, but for now, try to enjoy what's there`,
  `Step by step! The right hand side of the screen lets you review units and assemble a squad`,
  `Add a unit from your lineup to the squad now`,
  `Clicking a unit in your lineup shows its information, which I'm now blocking with A R T. My UX skills are peerless`,

  `Clicking the unit in your squad lineup removes it.
  <br>Buildings are separated into [walls], [economy] and [defensive]. Some units prefer to attack one of these types. Some units can fly. Some units deal extra damage.
  <br>Taking out buildings that can attack fliers is an easy win
  <br>Some buildings don't switch targets until the puppet they're attacking dies, so throw a high HP blocker at them
  <br>And sometimes it's just best to blow a hole in the walls...`,
  `Once you have a squad, you can adjust the difficulty to your liking. Some maps are faithfully based on the level layouts from Little Noah, but as you might expect from a mobile game that lasted 3 years,
  the amount of data available online is not complete. So you get to choose your difficulty. Buildings level up to the difficulty or their own maximum level.
  <br>Picking -1 difficulty uses the levels from the game data.
  <br>You should go up a rank in puppet rarity for roughly every 2 difficulty levels, I guess?`,
  `Then you must pick a level. If I can find a place to host JSON I could host the levels online, but for now they're all included with the game files`,
  `Squad, difficulty, level. Then you can choose between [Survey] to scout the level, and [Embark] to go forth and pillage!`,
  `Once you embark, the UI shows you how many objectives you've met, what percentage of buildings you've destroyed and how much time you have left.`,

  `There's three objectives you can meet within 3 minutes. Getting any one means it counts as a victory for you.
  <br>&bull;Destroying over 50% of the enemy's buildings
  <br>&bull;Destroying the enemy's core building
  <br>&bull;Destroying all the enemy's buildings, except for walls`,
  `Your squad is also shown on this screen, along with the number of units you can still deploy. Click a puppet to make that your active unit`,
  `After selecting a unit to deploy, click on the playfield to place it. You're not allowed to deploy near enemy buildings`,
  `When in doubt, just look at your cursor
  <br>&bull;Scroll to zoom in or out
  <br>&bull;Hold down right click and move the mouse to pan the camera`,
  `The mission ends when all your units are dead, when you reach 100% destruction rate, when you run out of time, or when you press the airship button`,

  `And that's my poor explanation of how to play the game! Give it a shot and you'll get the hang of it!`
];

function dom_Tutorial(el) {
  console.log( parseInt(el.dataset.tut) );
  //el.dataset.tut = parseInt(el.dataset.tut)+1;

  if( parseInt(el.dataset.tut) == tutorial_Messages.length ){
    document.querySelector('.UI_container--tutorial').dataset.show = false;
  }else{
    el.innerHTML = tutorial_Messages[parseInt(el.dataset.tut)];
    document.querySelector('.UI_container--tutorial').style.background = '#0000009e';
    document.querySelector('.UI_container--tutorial').style.pointerEvents = 'all';
    switch (parseInt(el.dataset.tut)) {
      case 4:
        console.warn('SAD');
        el.dataset.tut = parseInt(el.dataset.tut)+1;
        break;
      case 8:
        document.querySelector('.UI_wrapper--unitSelect > section').classList.add('tutFocus');
        el.dataset.tut = parseInt(el.dataset.tut)+1;
        break;
      case 9:
        document.querySelector('.UI_container--tutorial').style.background = '#00000026';
        document.querySelector('.UI_container--tutorial').style.pointerEvents = 'none';
        document.querySelector('.tutFocus').classList.remove('tutFocus');
        document.querySelector('.UI_unitList').classList.add('tutFocus');
        if( game_state.squad.length ){
          el.dataset.tut = parseInt(el.dataset.tut)+1;
          el.innerHTML = tutorial_Messages[parseInt(el.dataset.tut)];
          break;
        }else{
          break;
        }
      case 10:
        document.querySelector('.tutFocus').classList.remove('tutFocus');
        document.querySelector('.UI_inspector').classList.add('tutFocus');
        el.dataset.tut = parseInt(el.dataset.tut)+1;
        break;
      case 11:
        document.querySelector('.tutFocus').classList.remove('tutFocus');
        document.querySelector('.UI_unitList--squad').classList.add('tutFocus');
        el.dataset.tut = parseInt(el.dataset.tut)+1;
        break;
      case 12:
        document.querySelector('.tutFocus').classList.remove('tutFocus');
        document.querySelector('.input_difficultySlider').classList.add('tutFocus');
        el.dataset.tut = parseInt(el.dataset.tut)+1;
        break;
      case 13:
        document.querySelector('.tutFocus').classList.remove('tutFocus');
        document.querySelector('.UI_missionList').classList.add('tutFocus');
        el.dataset.tut = parseInt(el.dataset.tut)+1;
        break;
      case 14:
        document.querySelector('.tutFocus').classList.remove('tutFocus');
        el.dataset.tut = parseInt(el.dataset.tut)+1;
        break;
      case 15:
      case 16:
        document.querySelector('.tutEx').style.opacity = 1;
        el.dataset.tut = parseInt(el.dataset.tut)+1;
        break;
      case 17:
        document.querySelector('.tutEx').style.opacity = 1;
        document.querySelector('.tutEx').src = './assets/art/tut_02.jpg';
        el.dataset.tut = parseInt(el.dataset.tut)+1;
        break;
      case 18:
        document.querySelector('.tutEx').style.opacity = 1;
        document.querySelector('.tutEx').src = './assets/art/tut_03.jpg';
        el.dataset.tut = parseInt(el.dataset.tut)+1;
        break;
      case 19:
        document.querySelector('.tutEx').style.opacity = 1;
        document.querySelector('.tutEx').src = './assets/art/tut_04.jpg';
        el.dataset.tut = parseInt(el.dataset.tut)+1;
        break;
      default:
        document.querySelector('.tutEx').style.opacity = 0;
        document.querySelector('.tutEx').src = './assets/art/tut_01.jpg';
        el.dataset.tut = parseInt(el.dataset.tut)+1;
        break;
    }
  }
}
function dom_Tutorial_start() {
  document.querySelector('.UI_container--tutorial').dataset.show = true;
  document.querySelector('.tutBox').dataset.tut = 0;
  dom_Tutorial(document.querySelector('.tutBox'));
}