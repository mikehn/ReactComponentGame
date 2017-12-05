# React PacMan Component Game
React PacMan Component game, for Teaching react basics in a visual way.
Create a worshop / group session / class , 
where all will be part of adding Ghost components for this game.
The components will need to find PacMan.
After combining all components run game to find out who will catch pacman first.



## How to use



### Bring up
to install the project:

```
npm install
```

to run it:

```
npm start
```

### Usage Instructions
* All particepants wil be required to download the following:
  1. Node [download link](https://nodejs.org/en/download/current/)
  2. Code [this repo](https://github.com/mikehn/ReactComponentGame)
  3. run `npm install`

* Explain rules:
  every one will need to create a ghost component with their name as the component name.
  they can use the ghost template (located at ./src/ghostComponents),
  for a quick class setup and inline instructions.
  if you want to make it more chalenging remove all ghost refrences from that folder.

  **basic ghost requirments**
  1. if lastMoveSuccess from props is false need color ghost red 
  2. if your ghost close to pacman need to change color to green
  3. if your ghost is close to other ghosts need to change color to blue
  4. implement logic to handle setNextMove to try and catch pacman
  5. finnaly add winMessage using the winMessage props to your render function.

  **ghost props**
  1.  this.props.sides                 : an object containing  
                                            * all side keys (mapping to PIECES_TYPES)
                                             {topLeft,top,topRight,left,right,bottomLeft,bottom,bottomRight}
                                             i.e. if you want to access whats above ghost,
                                             you can use sides.top which will return i.e. PIECES_TYPES.PACMAN
                                            * sides.directions() -> gets all keys above as a list you can iterate
                                            * sides.elements() -> gets all surrounding side elemnts as a list
  2.  this.props.size                  :   int representing size of ghost
  3.  this.props.setNextMove(direction):   function that will set your components next move.
                                            the function recives a direction which is one of the const in PIECES_TYPES
                                            you can see list below.
  4.  this.props.winMessage(msg)       :   function that on win will return a winnig messeage component
                                            with the given msg 
  5.  this.props.lastMoveSuccess       :   boolean that indecates if you last move was illegal.

  **constant class**
  you are given a [constant class](Consts.js) containing
  * MOVE_DIRECTION : constant describing move direction (i.e. UP)
  * PIECES_TYPES   : constant describing peice type (i.e PACMAN)

  **winning**
  winner is the first one to catch pacman - a message will pop to screen automaticly declaring user.
  it is important that ghost component written by user will be named as user, as message will display 
  component name as winner.

## Built With
Using only React !
we only used the project create-react-app 
* [create-react-app](https://github.com/facebookincubator/create-react-app) -Create React apps with no build configuration
no images or canvas were used in project, its only jsx + css

## Versioning
1.2.4

## Authors

* **Michael Hasin** - *developer @intel*  
* **David Saper**   - *developer @intel*  
* **Nir Parisian**  - *developer @intel*  


## License
GNU General Public License v3.0