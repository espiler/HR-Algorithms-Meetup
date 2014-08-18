/*
  Greetings, algorithmics!

  Your task for today is to classify poker hands!  You have two functions to complete:

    - labelHand, which gives the name of a single hand.
    - findWinner, which determines which of several hands is best.

  Hands are 14-character strings that look like "8H TC KS 2C AD", where
    - there are exactly five cards
    - each card is separated by a space
    - each card is represented by a value followed by a suit
    - ace is "A" (remember, aces can be either low or high!)
    - king is "K"
    - queen is "Q"
    - jack is "J"
    - ten is "T"
    - all other cards are represented by their number.
    - the four suits are represented by "H", "C", "S", and "D"

  Hands will be legal, with no duplicate cards.

  Remember, the order of hands, from highest to lowest is
    /- Royal flush:      like a straight flush from Ten to Ace
    /- Straight flush:   5 cards in a row of the same suit
    - Four of a kind:   4 cards of the same value
    - Full house:       3 cards of the same value and one pair.
    /- Flush:            5 cards of the same suit
    /- Straight:         5 cards in a row
    - Three of a kind:  3 cards of the same value
    - Two pair:         you got this one.
    - Pair:             this one too.
    /- High card:        basically, no hand.

  There are no helper functions provided this time.
  You're on your own, but feel free to write whatever helpers you need!
*/


var poker = {
  // Returns the name of the input hand.
  // See the specs for the required formats.
  labelHand: function(hand) {
    return getHandObject(hand).label;
  },

  // Takes an array of hands and returns the index of the winning hand.
  // If two or more hands tie for the win, instead return an array of the winning hands.
  findWinner: function(hands) {
    var winners;
    var handObjects = map(hands, getHandObject),
        ranks = map(handObjects, function(val, i) { return val.rank; }),
        valueArrays = map(handObjects, function(val, i) { return val.valueArray; }),
        highCardValues = map(handObjects, function(val, i) { return cardValuesNum[cards.indexOf(val.highCard)]; });

//defines rank of highest ranked hand
    var highRank = Math.max.apply(null,ranks);
    
//returns correct winner if only 1
    if (ranks.indexOf(highRank) == ranks.lastIndexOf(highRank)) { 
      return ranks.indexOf(highRank);
    }

//defines array of indexes of hands to be compared for win
    var tiedWins = filterInd(ranks, function(val, i) { return val === highRank; });

//compares royals, straight-flushes, straights for win
    if (highRank === 9 || highRank === 8 || highRank === 4) {
      var tiedWinsHighs = map(tiedWins, function(val, i) { return highCardValues[val]; });
      var tiedWinsHighest = Math.max.apply(null, tiedWinsHighs);
      winners = filterInd(tiedWinsHighs, function(val, i) { return val == tiedWinsHighest; });
      if (winners.length == 1) { return winners[0]; }
      return winners;
    }

//compares flushes, highcard hands for win
    else if (highRank === 5 || highRank === 0) {
      var tiedValues = map(tiedWins, function(val, i) { return valueArrays[val]; });
      var winInd = compareHandValues(tiedValues);
      winners = map(winInd, function(val, i) { return tiedWins[val]; });
      if (winners.length == 1) { return winners[0]; }
      return winners;
    }

// compares single pair hands for win
    else if (highRank == 1) {
      var pairValues = map(tiedWins, function(val, i) { return valueArrays[val]; });
      for (var i=0; i<pairValues.length; i++) {
        pairValues[i].splice(pairValues[i].indexOf(cardValuesNum[cards.indexOf(handObjects[tiedWins[i]].highPair)]),2);
        pairValues[i].push(cardValuesNum[cards.indexOf(handObjects[tiedWins[i]].highPair)]);
      }
      var winInd = compareHandValues(pairValues);
      winners = map(winInd, function(val, i) { return tiedWins[val]; });
      if (winners.length == 1) { return winners[0]; }
      return winners;
    }

//  compares two pair hands for win
    else if (highRank == 2) {
      var pairValues = map(tiedWins, function(val, i) { return valueArrays[val]; });
      for (var i=0; i<pairValues.length; i++) {
        pairValues[i].splice(pairValues[i].indexOf(cardValuesNum[cards.indexOf(handObjects[tiedWins[i]].highPair)]),2);
        pairValues[i].splice(pairValues[i].indexOf(cardValuesNum[cards.indexOf(handObjects[tiedWins[i]].lowPair)]),2);
        pairValues[i].push(cardValuesNum[cards.indexOf(handObjects[tiedWins[i]].lowPair)]);
        pairValues[i].push(cardValuesNum[cards.indexOf(handObjects[tiedWins[i]].highPair)]);
      }
      var winInd = compareHandValues(pairValues);
      winners = map(winInd, function(val, i) { return tiedWins[val]; });
      if (winners.length == 1) { return winners[0]; }
      return winners;

    } 

// compares trips and full houses for win
    else if (highRank == 3 || highRank == 6) {
      var tripsValues = map(tiedWins, function(val, i) { return cardValuesNum[cards.indexOf(handObjects[val].trip)]; });
      return tiedWins[tripsValues.indexOf(Math.max.apply(null, tripsValues))];
    }

// compares quads for win
    else if (highRank == 7) {
      var quadValues = map(tiedWins, function(val, i) { return cardValuesNum[cards.indexOf(handObjects[val].quad)]; });
      return tiedWins[quadValues.indexOf(Math.max.apply(null, quadValues))];
    }
  }

};

var cards = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ],
    cardValuesString = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14' ],
    cardValuesNum = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ];
    
function map(input, iterator) {
  var result = [];
  for (var i =0;i<input.length;i++) {
    result.push(iterator(input[i],i));
  }
  return result;
};

function filterInd(input, iterator) {
  var result = [];
  for (var i =0;i<input.length;i++) {
    if (iterator(input[i],i)){
      result.push(i);
    }
  }
  return result;
};

function filter(input, iterator) {
  var result = [];
  for (var i =0;i<input.length;i++) {
    if (iterator(input[i],i)){
      result.push(input[i]);
    }
  }
  return result;
};

function getValueArray(hand) {
  var handSplit = hand.split(" ");
  var valueArray = map(handSplit, function(val,i) {return cardValuesNum[cards.indexOf(val[0])]; });
  return valueArray.sort(function(a,b){return a-b});
}

function getValueCount(valueArray) {
  var valueCount = {};
  for (var i=0;i<5;i++) {
    if (!valueCount[valueArray[i]]) {
      valueCount[valueArray[i]] = 1;
    }
    else {
      valueCount[valueArray[i]]++;
    }
  }
  return valueCount;
}


function getHandObject(hand){
  var object = {
    valueArray: getValueArray(hand)
  };
  var handSplit = hand.split(" ");
    for (var i=0;i<handSplit.length;i++) {
        handSplit[i] = handSplit[i].split("");
    }
    var valueArray = getValueArray(hand),
        valueCount = getValueCount(valueArray),
        pairCount = 0;

    var straight,
        flush,
        pair,
        twoPair,
        threeKind,
        fourKind,
        fullHouse,
        royal,
        highCard,
        fourKindOf,
        threeKindOf,
        pairOf,
        secPairOf;


    if (valueArray[0] + 1 == valueArray[1] &&
    valueArray[1] + 1 == valueArray[2] &&
    valueArray[2] + 1 == valueArray[3] &&
    (valueArray[3] + 1 == valueArray[4] || valueArray[3] + 9 == valueArray[4]
    )) {
        straight = true;
    }

    if (handSplit[0][1] == handSplit[1][1] && handSplit[0][1] == handSplit[2][1] && handSplit[0][1] == handSplit[3][1] && handSplit[0][1] == handSplit[4][1] ) {
        flush = true;
    }

    for (var value in valueCount) {
        if (valueCount[value] == 2) {
            pair = true;
            pairCount++;
            if (pairCount == 1){
              pairOf = value;
            }
            if (pairCount == 2){
              twoPair = true;
              secPairOf = value;
              for (var value in valueCount) {
                if (valueCount[value] == 1) {
                }
              }
            }
        }
        if (valueCount[value] == 3) {
            threeKind = true;
            object.trip = cards[cardValuesString.indexOf(value)];
        }
        if (valueCount[value] == 4) {
            fourKind = true;
            object.quad = cards[cardValuesString.indexOf(value)];
        }
    }
    if (threeKind && pair) {
        fullHouse = true;
    }
    if (straight && valueArray[0] === 10) {
        royal = true;
    }
    if (straight && valueArray[0] === 2){
      highCard = 5;
    }
    else {highCard = valueArray[4];}
    highCard = cards[cardValuesNum.indexOf(highCard)]; 
    object.highPair = cards[cardValuesNum.indexOf(Math.max(Number(pairOf), Number(secPairOf)))];
    object.lowPair = cards[cardValuesNum.indexOf(Math.min(Number(pairOf), Number(secPairOf)))];
    object.highCard = highCard;

    if (royal && flush) {
      object.label = "Royal flush";
      object.rank = 9;
    }
    else if (straight && flush) {
      object.label =  "Straight flush up to " + highCard;
      object.rank = 8;
    }
    else if (fourKind) {
      object.label =  "Four of a kind of " + object.quad;
      object.rank = 7;
    }
    else if (fullHouse) {
      object.label =  "Full house of " + object.trip;
      object.rank = 6;
    }
    else if (flush) {
      object.label =  "Flush with high card " + highCard;
      object.rank = 5;
    }
    else if (straight) {
      object.label =  "Straight up to " + highCard;
      object.rank = 4;
    }
    else if (threeKind) {
      object.label =  "Three of kind of " + object.trip;
      object.rank = 3;
    }
    else if (twoPair) {
      object.label =  "Two pair of " + object.highPair + " and " + object.lowPair;
      object.rank = 2;
    }
    else if (pair) {
      object.highPair = cards[cardValuesString.indexOf(pairOf)];
      object.label =  "Pair of " + object.highPair;
      object.rank = 1;
    }
    else {
      object.label = highCard + " High"
      object.rank = 0;
    }

  return object;
}


function compareHandValues(hands) {
  var handsCopy = filter(hands, function(val,i) {return val==val;} );
  var winners = map(hands, function(val,i) {return i;} ),
      high;
  for (var j=hands[0].length-1;j>-1;j--) {  
    high = Math.max.apply(null, map(handsCopy, function(val, i) {return val[j];} ))
    for (var i=0;i<hands.length;i++) {
      if (handsCopy[i][j] < high && handsCopy[i][j] !== 0) {
        handsCopy[i] = [0,0,0,0,0];
        winners.splice(winners.indexOf(i),1);
      }
    }
  }
  return winners;
}





