function dom_listMissions(){
  // set HTML to template
  document.querySelector('.UI_container').innerHTML = document.querySelector('#missionSelect').innerHTML;

  // populate mission list
  for( mission of missionList ){

    let button = document.createElement("button");
    button.innerHTML = mission.id;
    button.className = 'UI_missionButton';
    button.onclick = function(){
      flowControl('load', this.innerText, document.querySelector('.input_difficultySlider').value)
    };

    document.querySelector('.UI_missionList').appendChild(button);
  }
}

dom_listMissions();