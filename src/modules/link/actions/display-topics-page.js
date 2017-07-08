import { selectCategoriesLink } from 'modules/link/selectors/links';

export const displayCategoriesPage = redirect => (dispatch) => {
  const categoriesLink = selectCategoriesLink(dispatch);
  if (categoriesLink && redirect) categoriesLink.onClick();
};
