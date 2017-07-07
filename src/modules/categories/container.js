import { connect } from 'react-redux';
import CategoriesView from 'modules/categories/components/categories-view';
import { selectLoginAccount } from 'modules/auth/selectors/login-account';
import { selectCategoryLink, selectCreateMarketLink } from 'modules/link/selectors/links';
import { selectCategories } from 'modules/categories/selectors/categories';

const mapStateToProps = state => ({
  branch: state.branch,
  topics: selectCategories(state),
  loginAccount: selectLoginAccount(state)
});

const mapDispatchToProps = dispatch => ({
  selectCategory: category => selectCategoryLink(category, dispatch).onClick(),
  createMarketLink: selectCreateMarketLink(dispatch)
});

const Categories = connect(mapStateToProps, mapDispatchToProps)(CategoriesView);

export default Categories;
