import { anyAccountBalancesZero } from 'modules/auth/selectors/balances';
import { fundNewAccount } from 'modules/auth/actions/fund-new-account';
import { loadAccountDataFromLocalStorage } from 'modules/auth/actions/load-account-data-from-local-storage';
import { loadRegisterBlockNumber } from 'modules/auth/actions/load-register-block-number';
import { updateAssets } from 'modules/auth/actions/update-assets';
import { updateLoginAccount } from 'modules/auth/actions/update-login-account';
import { displayCategoriesPage } from 'modules/link/actions/display-categories-page';

export const loadAccountData = (account, redirect) => (dispatch, getState) => {
  if (!account || !account.address) return console.error('account address required');
  dispatch(loadAccountDataFromLocalStorage(account.address));
  dispatch(updateLoginAccount(account));
  dispatch(displayCategoriesPage(redirect));
  dispatch(updateAssets((err, balances) => {
    if (err) return console.error(err);
    if (anyAccountBalancesZero(balances)) {
      dispatch(fundNewAccount());
    } else {
      dispatch(loadRegisterBlockNumber());
    }
  }));
};
