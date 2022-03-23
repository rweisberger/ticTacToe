//Must establish a winner
function checkWinner(state) {
    
    const win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
        ];
        
        for(let i = 0; i < win.length; i++) {
            console.log(`checking for winner`)
            const [a, b, c] = win[i];
            if(state[a] == state[b] && state[a] == state[c] && state[a] != null)
            return state[a];
        }
        return null
};

const Square = ({ id, player, newState }) => { //destructuring props to access id
    const [mark, setMark] = React.useState(null);
    const symbols =["X", "O"];
  
    return (
      <button onClick={(e) => {
        let symbol=symbols[mark];
        newState(id, symbol)
        setMark(Number(player));
      }
      }disabled={(mark != null) ? true : false}>
        {symbols[mark]}
        </button>
    );
  };
  
  const Board = () => {
    const [player, setPlayer] = React.useState(false);
    const [state, setState] = React.useState([null,null,null,null,null,null,null,null,null]); //Array(9).fill(null)
    let status = `Player ${Number(player) + 1}'s turn`;
    let winner = checkWinner(state);
    console.log("checking for winner")
    if(winner != null) status = `Player ${winner + 1} wins!`
    
    // with the lines of code below the incorrect winner is returned
    const newState = (id) => {
      state[id] = Number(player);
      setState(state); 
      console.log(`changing state :${JSON.stringify(state)}`);      
      setPlayer(!player);
      
      return player
    }

    // const newState = (id) => {
    //   let thePlayer = player;
    //   state[id] = Number(player);
    //   setState(state); 
    //   console.log(`changing state :${JSON.stringify(state)}`);      
    //   setPlayer(!player);
    //   return thePlayer
    // }
  
    function renderSquare(i){
      return <Square id={i} player={player} newState={newState}></Square>
  
    }
    return (
     
      <div className="game-board">
        <div className="grid-row"> 
          {renderSquare(0)} 
          {renderSquare(1)}         
          {renderSquare(2)} 
        </div>
        <div className="grid-row"> 
          {renderSquare(3)} 
          {renderSquare(4)}         
          {renderSquare(5)} 
        </div>
        <div className="grid-row"> 
          {renderSquare(6)} 
          {renderSquare(7)}         
          {renderSquare(8)} 
        </div>
        <div id="info">
          <h1> {status} </h1>
        </div>
      </div>
  
    );
  };
  
  // ========================================
  
  ReactDOM.render(<Board />, document.getElementById("root"));
  