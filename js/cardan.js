class etPlayer {
  constructor() {
    this.gear = new Object;
    this.stats = new Object;
    this.statGrowths = new Object;
    this.classList = new Array;
    this.skills = new Array;
    this.gathering = new Object;
    
    this.initStats();
    this.initGear();
    this.initGathering();
  }

  initGear() {
    let gearSlots = ['hand1','hand2','head','body','legs','relic1','relic2','relic3'];
    for( let slot of gearSlots ){
      this.gear[slot] = null;
    }
  }

  setGear(slot, gearID) {
    this.gear[slot] = gearID;
    console.table(this.gear);
  }

  initStats() {
    let statList = ['hp','str','int','vit','wis','agi','luc'];
    for( let stat of statList ){
      this.stats[stat] = 1;
      this.statGrowths[stat] = 0;
    }
  }

  calcStats() {
    // iterate over equipped gear
    Object.entries(this.gear).map(function(i){
      console.log(i);
    });
  }

  initGathering() {
    this.gathering.take = 0;
    this.gathering.chop = 0;
    this.gathering.mine = 0;
    this.gathering.multiplier = 1; // natural instinct = 1.2 factor
  }

  setClass(className) {
    if( this.classList.length >= 5 ){
      console.error('max classes');
      return;
    }
    let foundClass = classGrimoire.filter( c => c.className == className )[0];
    if( foundClass ){
      if( this.classList.includes(className) ){
        console.error('already specced into '+className);
      }else{
        this.classList.push(className);
        for( let [stat,value] of Object.entries(foundClass.stats) ){
          this.stats[stat] += value;
        }
        for( let [stat,value] of Object.entries(foundClass.statGrowths) ){
          this.statGrowths[stat] += value;
        }
      }
    }
    console.table(this.classList);
  }

  setSkill(skillName) {
    let foundSkill = skillGrimoire.filter( c => c.skillName == skillName )[0];
    if( foundSkill ){
      this.skills.push(skillName);
    }
  }
}

const classGrimoire = new Array;
const classCompendium = [
  // class,           hp, str, int, vit, wis, agi, luc,    hp, str, int, vit, wis, agi, luc
  ["ninja",           45,13,16,11,13,19,20,                2.2,0.8,0.9,0.6,0.8,1.1,1.1],
  ["nightseeker",     51,15,11,12,12,20,17,                2.5,0.8,0.6,0.7,0.7,1.2,1.0],
  ["dragoon",         60,13,10,20,15, 8,13,                3.1,0.7,0.6,1.2,0.8,0.5,0.8],
  ["medic",           50,12,16,14,20,11,15,                2.3,0.7,1.0,0.8,1.2,0.6,0.9],
  ["survivalist",     53,14,13,13,14,19,13,                2.4,0.8,0.7,0.7,0.8,1.1,0.7],
  ["ronin",           52,20, 9,10,13,18,12,                2.4,1.2,0.5,0.6,0.8,1.1,0.7],
  ["gunner",          49,18,14, 9,14,10,17,                2.2,1.1,0.8,0.5,0.8,0.6,1.0],
  ["war magus",       53,14,15,15,19, 9,13,                2.6,0.8,0.9,0.9,1.1,0.5,0.8],
  ["highlander",      57,17,10,18,11,16,13,                2.9,1.0,0.5,1.0,0.6,0.9,0.8],
  ["sovereign",       51,10,18,16,17, 9,14,                2.5,0.6,1.1,1.0,1.0,0.5,0.8],
  ["zodiac",          43, 7,20, 8,14,13,14,                1.8,0.3,1.0,0.4,0.7,0.6,0.7],
  ["farmer",          56,11, 9,16,10,13,21,                2.8,0.6,0.5,0.9,0.5,0.7,1.3],
  ["shogun",          55,16,14,15,15,15,11,                2.5,0.9,0.8,1.0,1.0,1.0,0.6],
  ["landsknecht",     56,16,13,16,14,14,10,                2.8,0.9,0.8,0.9,0.8,0.8,0.6],
  ["arcanist",        44, 9,19,10,16,11,19,                2.1,0.5,1.1,0.6,1.0,0.6,1.1],
  ["imperial",        58,18,12,18,12, 7, 9,                2.5,1.0,0.6,0.9,0.6,0.3,0.4],
  ["harbinger",       54,14,15,16,18,13,16,                2.5,0.8,1.0,0.9,1.1,0.7,0.9],
  ["pugilist",        65,16, 7,11, 8,16,18,                3.3,0.9,0.4,0.7,0.5,0.9,1.1],
  ["hero",            56,15,12,17,16,15, 9,                2.8,1.0,0.7,1.0,0.8,0.9,0.6]
];
for( let cls of classCompendium ){
  classGrimoire.push({
    "className": cls[0],
    "stats": {
      "hp":  cls[1],
      "str": cls[2],
      "int": cls[3],
      "vit": cls[4],
      "wis": cls[5],
      "agi": cls[6],
      "luc": cls[7]
    },
    "statGrowths": {
      "hp":  cls[8],
      "str": cls[9],
      "int": cls[10],
      "vit": cls[11],
      "wis": cls[12],
      "agi": cls[13],
      "luc": cls[14]
    }
  });
}

const skillGrimoire = new Array;
const skillCompendium = [
  //class             skill name                bodypart  stat    gearReq ailment   bind    #enemies    targetmode           dmgmod%      speed      magicEl       desc
  //                                                                                            #hits                 ail%          accur    physEl         prereq
  ["ninja",           "Ninpo: Daggers",         "head",   "str",  false,  "sleep",  false,  5,  1,      "random",     55,     150,  0.94, 1, "stab", false, false, "Ranged stab attack to 3 enemies. May put to sleep."],
  ["ninja",           "Ninpo: Caltrops",        "arm",    "str",  false,  "poison", false,  0,  1,      "counter",    100,    35,   1,    1, "cut",  false, "Ninpo: Daggers", "Ranged cut counterattack to an enemy who physically hits ally line. May poison."]
    // already we're running into issues; caltrops needs to counter attacks; ie it's a 1turn reaction type buff, which should fire off at start of turn (ie the SPEEDY bucket)
];
for( let skl of skillCompendium ){
  skillGrimoire.push({
    "skillName": skl[0]
  });
}

// class etClass {
//   constructor(className) {
//     let foundClass = classGrimoire.filter({ c => c.className == className });
//   }
// }

const Lucina = new etPlayer();
Lucina.setGear('hand1', 1212);
Lucina.calcStats();
Lucina.setClass('ninja');
Lucina.setClass('nightseeker');
Lucina.setClass('survivalist');

/*
  For items in shop: 
  const found = arr1.some(r=> arr2.indexOf(r) >= 0)
  where items have an array of which classes they CAN be used by so use "some" off the player's classList onto the item's classList

*/