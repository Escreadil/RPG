let xp = 0;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [];
let equippedItems = []  
let level = 1;
let strength = 1;
let dexterity = 1;
let vitality = 1;
let health = 100 + vitality*20;
let attackPower = 5;
let armourRating = 1;
let equippedArmour;
let equippedWeapon = "Dagger";
st.innerText = strength;
dx.innerText = dexterity;
vt.innerText = vitality;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4")
const text = document.querySelector("#text");
const levelText = document.querySelector("#levelText");
const healthText = document.querySelector("#healthText");
healthText.innerText = health;
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const str = document.getElementById("st")
const dex = document.getElementById("dx")
const vit = document.getElementById("vt")
const col1 = document.getElementById("invcol1")
const col2 = document.getElementById("invcol2")
const col3 = document.getElementById("invcol3")
const inventoryElement = document.getElementById("inventory");
const inventoryButton = document.getElementById("button4")
const shopOpen = document.getElementById("shop")
const equippedItemsElement = document.getElementById("equipped-items");
const buy = document.getElementById("buy")
const log = document.getElementById("log")

const items = [
  {name: 'Dagger', power: 5, type: "weapon" },
  {name: 'Iron Sword', power: 30, sellprice: 10, type: "weapon" },
  {name: 'Steel Hammer', power: 50, sellprice: 25, type: "weapon" },
  {name: 'Magical Sword', power: 100, sellprice: 50, type: "weapon"},
  {name: 'Leather', rating: 5, sellprice: 5, type: "armour"},
  {name: 'Chainmail', rating: 15, sellprice: 15, type: "armour" },
  {name: 'Steelplate', rating: 30, sellprice: 40, type: "armour"},
  {name: 'Dragonplate', rating: 45, sellprice: 75, type: "armour"}
];

const monsters = [
  {
    name: "Skeleton",
    level: 4,
    health: 50
  },
  {
    name: "Wright",
    level: 8,
    health: 150
  },
  {
    name: "Dragon",
    level: 20,
    health: 600
  }
];


const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to Graveyard", "Fight Dragon"],
    "button functions": [goStore, goGrave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Go to Blacksmith", "Go to town square"],
    "button functions": [buyHealth, goShop, goTown],
    text: "You enter the store."
  },
  {
    name: "graveyard",
    "button text": ["Fight skeleton", "Fight wraith", "Go to town square"],
    "button functions": [fightSkeleton, fightWraith, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Run", "Mock"],
    "button functions": [attack, goTown, enrageMonster],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
  
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goGrave;
button3.onclick = fightDragon;



function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
  shopOpen.style.display = "none"
  changeBackgroundImg("town")
}

function goStore() {
  update(locations[1]);
  changeBackgroundImg("store")
}

function goGrave() {
  update(locations[2]);
  changeBackgroundImg("graveyard")
}
function goShop() {
  shopOpen.style.display = "block";
  changeBackgroundImg("blacksmith")
  log.innerText = 'Blacksmith:  "Welcome to the shop, what would you like to buy?"'
  setTimeout(() => {
   log.innerText = "" 
  }, "3000")
  
} 
function enrageMonster () {
  text.innerText = "Monster does not seem to care."
}
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}
const levelUp = () => {
  level += 1
  levelText.innerText = level;
  log.innerText = `You have got stronger! You are now level ${level}`
  setTimeout(() => 
  {log.innerText = ""}
    , "3000")
  const parent1 = str.parentNode;
  const parent2 = dex.parentNode;
  const parent3 = vit.parentNode;

  let buttons = document.createElement('button')
  let buttond = document.createElement('button')
  let buttonv = document.createElement('button')

  buttons.appendChild(document.createTextNode("+"))
  buttond.appendChild(document.createTextNode("+"))
  buttonv.appendChild(document.createTextNode("+"))

  parent1.replaceChild(buttons, str);
  parent2.replaceChild(buttond, dex);
  parent3.replaceChild(buttonv, vit);

  buttons.addEventListener("click", () => {
    strength += 1;
    parent1.replaceChild(str, buttons)
    parent2.replaceChild(dex, buttond)
    parent3.replaceChild(vit, buttonv)
    st.innerText = strength;
    
  });
  buttond.addEventListener("click", () => {
    dexterity += 1;
    parent1.replaceChild(str, buttons)
    parent2.replaceChild(dex, buttond)
    parent3.replaceChild(vit, buttonv)
    dx.innerText = dexterity;
  });
  buttonv.addEventListener("click", () => {
    vitality += 1;
    parent1.replaceChild(str, buttons)
    parent2.replaceChild(dex, buttond)
    parent3.replaceChild(vit, buttonv)
    vt.innerText = vitality;
    healthText.innerText = health + 20;
  });
  
}

const checkLevelUp = (xp) => {
  const nextLevel = level * 20;
  if (xp => nextLevel) {
     levelUp()
  }
}



function fightSkeleton() {
  fighting = 0;
  goFight();
}

function fightWraith() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  changeBackgroundImg("dragon")
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  const monsterDmg = getMonsterAttackValue(monsters[fighting].level)/armourRating
  if (!isAttackDodged(dodgeChance(level, monsters[fighting].level))) {
    health -= monsterDmg;
    log.innerText += " You took " + monsterDmg + " damage!";

    setTimeout(() => {
    log.innerText = "";
    }, "1000");

    text.innerText += " You attack it with your " + equippedWeapon + ".";
    
  }
  else {
    text.innerText = "You dodged monster's attack!"
    setTimeout(() => 
    {text.innerText = ""}
    , "1500")
    text.innerText += " You attack it with your " + equippedWeapon + ".";
  }
  
  if (isMonsterHit()) {
    monsterHealth -= attackPower + Math.floor(Math.random() * level) + strength * 5;    
  } else {  
    text.innerText += " You miss.";
    setTimeout(() => 
    {log.innerText = ""}
    , "1000")
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  
}
const isAttackDodged = (chance) => {
  if (chance <= 0) {
    return false;
  }
  else {
  const random = Math.random()
  console.log(random)
  return random <= chance;
  }
}
const dodgeChance = (playerLevel, monsterLevel) => {
  if (monsterLevel > playerLevel) {
  const dodgeChance = Math.floor((5 * dexterity) - (monsterLevel - playerLevel))
    return dodgeChance/10 
}
  else {
  const dodgeChance = Math.floor(dexterity * playerLevel)
    return dodgeChance/10
  }
}
function getMonsterAttackValue(lvl) {
  const hit = (lvl * 5) - (Math.floor(Math.random() * lvl));
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  checkLevelUp(xp)
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  let xp = 0;
  let gold = 50;
  let currentWeapon = 0;
  let fighting;
  let monsterHealth;
  let inventory = [];
  let equippedItems = []  
  let level = 1;
  let strength = 1;
  let dexterity = 1;
  let vitality = 1;
  let health = 100 + vitality*20;
  let attackPower = 5;
  let armourRating = 1;
  let equippedArmour;
  let equippedWeapon = "Dagger";
  st.innerText = strength;
  dx.innerText = dexterity;
  vt.innerText = vitality;
  goldText.innerText = gold;
  healthText.innerText = health;
  levelText.innerText = level;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
buy.addEventListener("click", () => {
  const selectedElement = document.querySelector(".item.selected");
  if (selectedElement) {
      const itemName = selectedElement.getAttribute("data-item");
      const itemPrice = parseInt(selectedElement.getAttribute("data-price"));
      if (inventory.some(item => item === itemName)) {
        log.innerText = "You already have this item"
      }
      else {
          if (gold >= itemPrice) {
            gold -= itemPrice;
            inventory.push(itemName);
            updateInventory(itemName);
            updateGold();
          } 
          else {
            alert("Not enough money!")
          }
          }
      }
  else {
    alert("Select an item to buy!")
  }
})


const updateGold = () => {
  goldText.textContent = gold;
}

document.getElementById('shop').addEventListener("click", function(event) {
    let clickedElement = event.target;

    if (clickedElement.classList.contains('item')) {
        const items = document.querySelectorAll('.item');
        items.forEach((item) => {
          item.classList.remove('selected');
        })
        clickedElement.classList.add('selected');
    }
})

function updateInventory(itemname) {
  let inventoryElement = document.getElementById('inventory');

  
      let listItem = document.createElement('li');
      listItem.classList.add('item');
      listItem.textContent = itemname;

      // Add an "Equip" button to each item
      let equipButton = document.createElement('button');
      equipButton.textContent = 'Equip';
      equipButton.classList.add("buttonpad")
      equipButton.addEventListener('click', function (event) {
          event.stopPropagation(); // Prevent the item from being selected when the button is clicked
          equipItem(this.parentNode.textContent.split("EquipSell")[0]);
          
        
      });

      listItem.appendChild(equipButton);

      inventoryElement.appendChild(listItem);

      // Add an "Sell" button to each item
      let sellButton = document.createElement('button');
      sellButton.textContent = 'Sell';
      sellButton.classList.add("buttonpad")
      sellButton.addEventListener('click', function (event){
        event.stopPropagation();
        let theitem = this.parentNode.textContent.split("EquipSell")[0]
        sellItem(theitem)
        listItem.remove()
        
       
      });
        

      listItem.appendChild(sellButton);

      inventoryElement.appendChild(listItem);
  
}

function equipItem(itemName) {
  if (!equippedItems.includes(itemName)) {
      const selectedArmor = items.find(item => item.name === itemName && item.type === "armour")
      const selectedWeapon = items.find(item => item.name === itemName && item.type === "weapon")
      if (selectedArmor) {
        if(equippedArmour) {
          armourRating -= calculateArmorAttackPower(equippedArmour);
          let x = equippedItems.filter(item => item !== equippedArmour)
          equippedItems = x;
        }
        equippedArmour = selectedArmor;
        armourRating += calculateArmorAttackPower(itemName)
        equippedItems.push(itemName)
      }
      if (selectedWeapon) {
        if (equippedWeapon) {
          attackPower -= calculateArmorAttackPower(equippedWeapon);
          let x = equippedItems.filter(item => item !== equippedWeapon)
          equippedItems = x;
         
        }
        equippedWeapon = selectedWeapon;
        attackPower += calculateArmorAttackPower(itemName)
        equippedItems.push(itemName)
      }
      
    }
    


    
  else {
    log.innerText = itemName.split("EquipSell") + " is already equipped.";
}
}

const sellItem = (itemname) => {
  const foundItem = items.find(element => element.name === itemname)
  if (foundItem) {
    const sellPrice = foundItem.sellprice;
    const index = inventory.indexOf[itemname]
    inventory.splice(index, 1)
    let x = equippedItems.filter(item => item !== itemname)
    equippedItems = x;
    gold += sellPrice;
    goldText.innerText = gold;
  }
        
}
const calculateArmorAttackPower = (itemName) => {
  const foundWeapon = items.find(element => element.name === itemName && element.type === "weapon")
  const foundArmour = items.find(element => element.name === itemName && element.type === "armour")
  

  if (foundWeapon) {
    return foundWeapon.power;
  }
  if (foundArmour) {
    return foundArmour.rating;
  }

} 


inventoryButton.addEventListener("click", function(event) {
  if (inventoryElement.style.display === 'block') {
    inventoryElement.style.display = 'none';
  } 
  else {
    inventoryElement.style.display = 'block';
  }

  let clickedElement = event.target;

  if (clickedElement.classList.contains('item')) {
      // Deselect all items
      var items = document.querySelectorAll('.item');
      items.forEach(function (item) {
          item.classList.remove('selected');
      });

      // Select the clicked item
      clickedElement.classList.add('selected');
  }
})

  
  function changeBackgroundImg(place) {
    let body = document.body;
    if (place === "blacksmith"){
    body.style.backgroundImage = 'url("../static/blacksmith.jpg")';
  };
  if (place === "store"){
    body.style.backgroundImage = 'url("../static/store.jpg")';
  };
  if (place === "graveyard") {
    body.style.backgroundImage = 'url("../static/graveyard2.jpg")';
  }  
  if (place === "town") {
    body.style.backgroundImage = 'url("../static/town.jpg")';
  }  
  if (place === "dragon") {
    body.style.backgroundImage = 'url("../static/dragon.jpg")';
  }
  }
