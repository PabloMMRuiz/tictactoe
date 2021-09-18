let P1;
let P2;
let player1 = new playerModule("#P1");
let player2 = new playerModule("#P2");

player1.formMaker();
player2.formMaker();


const gameboard =(() => {
    const cells =  ["", "", "", "", "", "", "", "", "", ""];
    const board = document.querySelector("#board");
    const initializeBoard = function(){
            for (let i = 0; i<9; i++){
            const cell = document.createElement("p");
            cell.classList.add("cell");
            cell.id = i;
            cell.textContent = cells[i];
            board.appendChild(cell);
        }
        board.classList.toggle("solid");
    }
    const _renderCell = function(cellNum, colour){
        const cell = document.getElementById(cellNum);
        cell.style.color =  colour;
        cell.textContent = cells[cellNum];
    }
    const setCell = function(cellId, player){
        cells[cellId] = player.symbol;
        _renderCell(cellId, player.color);
    }
    const getCell = function(id){
        return cells[id];
    }
    const clearBoard = function(){
        for (let i = 0; i<9; i++){
            cells[i] = "";
            _renderCell(i, "black");
        }

    }
    return {setCell, getCell, clearBoard, initializeBoard};
    
})();

function playerMaker(name, symbol, color){
    symbol = symbol.toString();
    return{
        name, 
        score: 0,
        symbol,
        color,
    }
}




const gameStarter = (()=>{
    let formCount = 0;
    function setFormCount(){
        formCount = formCount+1
        if (formCount > 1){
            startManager();
        }
        return;
    };

    return {setFormCount};
})();

function playerModule(player){
    const pla = document.querySelector(player);

    function formMaker(){
        const form = document.createElement("div");
        form.classList.add("playerForm")

        const playerName = document.createElement("p");
        playerName.textContent = "Player name:";
        form.appendChild(playerName);

        const playerNameSpace = document.createElement("input");
        playerNameSpace.placeholder = "Your name...";
        form.appendChild(playerNameSpace);

        const playerSymbol = document.createElement("p");
        playerSymbol.textContent = "Player symbol:";
        form.appendChild(playerSymbol);

        const playerSymbolSpace = document.createElement("input");
        playerSymbolSpace.placeholder = "Write one character...";
        form.appendChild(playerSymbolSpace);

        const sumbitButton = document.createElement("button");
        sumbitButton.textContent = "Ready!";
        form.appendChild(sumbitButton);


        pla.appendChild(form);
        

        sumbitButton.addEventListener("click", function(){
            if (playerNameSpace.value == ""){
                alert("You must have a name!");
            }

            else if (playerNameSpace.value.length > 25){
                alert("Name must be shorter");
            }
            else if (playerSymbolSpace.value.length > 1){
                alert("The player's symbol must be only one character")
            }
            else{
                if(player == "#P1"){
                    P1 = new playerMaker(playerNameSpace.value, playerSymbolSpace.value, "red");
                    pla.innerHTML = ""
                    playerInfo(pla, P1);
                    gameStarter.setFormCount();
                    return;
                }
                else if (player == "#P2"){
                    P2 = new playerMaker(playerNameSpace.value, playerSymbolSpace.value, "blue");
                    pla.innerHTML = ""
                    playerInfo(pla, P2);
                    gameStarter.setFormCount();
                    return;


                }
            }
        })
    }
   


const playerInfo = function(player, side){
    const playerData = document.createElement("div");
    const playerName = document.createElement("p");
    playerName.textContent = side.name;
    playerName.classList.toggle("name")
    playerData.appendChild(playerName);
    const playerScore = document.createElement("p");
    playerScore.textContent = `Score: ${side.score}`;
    playerScore.id = "playerscore";
    playerData.appendChild(playerScore);
    const playerSymbol = document.createElement("p");
    playerSymbol.textContent = side.symbol;
    playerData.appendChild(playerSymbol);
    playerData.classList.add("playerData")
    player.appendChild(playerData);
    
}
return {formMaker}


}


function startManager(){

    gameboard.initializeBoard();
const gameManager = (()=>{
    let count = 0;
    let currentPlayer = P1;
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i <9; i++ ){
        cells[i].addEventListener("click", function(){
            if (gameboard.getCell(i) == ""){
                gameboard.setCell(i, currentPlayer);
                winChecker();
                if (count == 9){
                    alert("It's a draw!");
                    gameboard.clearBoard();
                    count = 0;
                }
                if (currentPlayer == P1){
                    currentPlayer = P2;
                }
                else{
                    currentPlayer = P1;
                }
        }
        
        })
    }

    const winChecker = ()=>{
        count = count+1;

        //check rows

        for (let i = 0; i <=8; i=i + 3){
            let checker = [];
            for(let counter = 0; counter<=2; counter++){
                let square = i+counter;
                checker.push(gameboard.getCell(square));

            }
            if (checker[0] == checker[1] && checker[0] == checker[2]){
                if(checker[0] == P1.symbol){
                    winner("Player1")
                }
                else if(checker[0] == P2.symbol){
                    winner("Player2")
                }
            }
        }

        //check columns

        for (let i = 0; i <=2; i++){
            let checker = [];
            for(let counter = 0; counter<=8; counter = counter+3){
                let square = i+counter;
                checker.push(gameboard.getCell(square));

            }
            if (checker[0] == checker[1] && checker[0] == checker[2]){
                if(checker[0] == P1.symbol){
                    winner("Player1")
                }
                else if(checker[0] == P2.symbol){
                    winner("Player2")
                }
            }
        }

        //check diagonals
        for(let i = 0; i<=1; i++){
            let checker = [];
            let counter = 0;
            if (i == 0){
            for (let i = 0; i <=8; i=i + 3){
                let square = i+counter;
                counter = counter + 1;
                  checker.push(gameboard.getCell(square));

                if (checker[0] == checker[1] && checker[0] == checker[2]){
                 if(checker[0] == P1.symbol){
                        winner("Player1")
                    }
                    else if(checker[0] == P2.symbol){
                        winner("Player2")
                    }
                }
            }
        }
        else if(i ==1){
            for (let i = 2; i <=8; i=i + 3){
                let square = i+counter;
                counter = counter - 1;
                  checker.push(gameboard.getCell(square));

                if (checker[0] == checker[1] && checker[0] == checker[2]){
                 if(checker[0] == P1.symbol){
                        winner("Player1")
                    }
                    else if(checker[0] == P2.symbol){
                        winner("Player2")
                    }
                }
            }
        }
            
        }
        
    }

    const winner = (champion)=>{
        if (champion === "Player1"){
            alert(`${P1.name} won!`);
            gameboard.clearBoard();
            P1.score = P1.score + 1;
            count = 0;

            const player = document.querySelector("#P1");
            const playerScore = player.querySelector("#playerscore")
            playerScore.textContent = `Score: ${P1.score}`;
        }
        else if (champion === "Player2"){
            alert(`${P2.name} won!`);
            gameboard.clearBoard()
            P2.score = P2.score + 1;
            count = 0;

            const player = document.querySelector("#P2");
            const playerScore = player.querySelector("#playerscore")
            playerScore.textContent = `Score: ${P1.score}`;


        }
    }
})()
}


