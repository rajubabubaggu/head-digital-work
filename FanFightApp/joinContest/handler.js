'use strict';

module.exports.joinContest = async (event) => {
  if (event >= 0  && typeof event === 'number') {
    const userCurrentWalletBanance = getfanFightWallet();
    const discountPercentage = event;
    const initialEntryFreeForTheContest = getInitialEntryFee();
    const afterDiscountEntryFee = initialEntryFreeForTheContest.initialEntryFee - Math.round((discountPercentage/100) * 400);
    if (userHasSufficientBalance(userCurrentWalletBanance, afterDiscountEntryFee)) {
        const afterDeduction = deductAndUpdateMoneyFromUserWallet(userCurrentWalletBanance, afterDiscountEntryFee);
        return {
          statusCode: 200,
          body: {
            message: 'User successfully join the contest',
            input: event,
            currentBalance: afterDeduction
          }
        }
    } else {
      return {
        statusCode: 400,
        body: {
          message: 'Bad Request: User does not ahve sufficient balance to join the contest',
          input: event
        }
      }
    }
  } else {
    return {
      statusCode: 400,
      body: {
        message: 'Bad Request: Input value is not a number',
        input: event
      }
    }
  }

};

const getfanFightWallet = () => {
  // Assume this is the wallet balance getting from database for given user
  return {
    deposit: 100,
    bonus: 60,
    winnings: 340
  }
}

const getInitialEntryFee = () => {
  // Assume the initial entry fee will get it from database by selected contest
  return {
    initialEntryFee: 400
  }
}

const userHasSufficientBalance = (userCurrentWalletBanance, afterDiscountEntryFee) => {
  const userTotalWalletBalance = userCurrentWalletBanance.deposit + userCurrentWalletBanance.bonus + userCurrentWalletBanance.winnings;
  if (userTotalWalletBalance >= afterDiscountEntryFee) {
    return true;
  }
  return false
}

const deductAndUpdateMoneyFromUserWallet = (userCurrentWalletBanance, afterDiscountEntryFee) => {
  console.log(afterDiscountEntryFee)
  if (afterDiscountEntryFee > 0) {
    const tenPercentageOfEntryFee = Math.round((10/100) * afterDiscountEntryFee);
    if (userCurrentWalletBanance.bonus && userCurrentWalletBanance.bonus >= tenPercentageOfEntryFee) {
      userCurrentWalletBanance.bonus = userCurrentWalletBanance.bonus - tenPercentageOfEntryFee;
      afterDiscountEntryFee = afterDiscountEntryFee - tenPercentageOfEntryFee;
    }
    if (userCurrentWalletBanance.deposit && userCurrentWalletBanance.deposit < afterDiscountEntryFee) {
      afterDiscountEntryFee = afterDiscountEntryFee - userCurrentWalletBanance.deposit;
      userCurrentWalletBanance.deposit = 0;
    } else {
      userCurrentWalletBanance.deposit = userCurrentWalletBanance.deposit - afterDiscountEntryFee;
      afterDiscountEntryFee = 0
    }
    if (afterDiscountEntryFee > 0) {
      userCurrentWalletBanance.winnings = userCurrentWalletBanance.winnings - afterDiscountEntryFee;
    }
  }
  // update user wallet in databse after deducting the joing fee
  return userCurrentWalletBanance;
}
