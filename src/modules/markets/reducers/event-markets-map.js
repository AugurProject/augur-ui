import { CLEAR_MARKETS_DATA, UPDATE_EVENT_MARKETS_MAP } from 'modules/markets/actions/update-markets-data';

export default function (eventMarketsMap = {}, action) {
  switch (action.type) {
    case UPDATE_EVENT_MARKETS_MAP: {
      if (eventMarketsMap[action.eventID]) {

        const elements = (eventMarketsMap[action.eventID].concat(action.marketIDs))
        .reduce((agg, el) => {
          if (!agg.isUnique.hasOwnProperty(el)) {
            agg.isUnique[el] = true;
            agg.values.push(el);
          }
          return agg;
        }, { values: [], isUnique: {} });

        return {
          ...eventMarketsMap,
          [action.eventID]: elements.values
        };
      }
      return {
        ...eventMarketsMap,
        [action.eventID]: action.marketIDs
      };
    }
    case CLEAR_MARKETS_DATA:
      return {};
    default:
      return eventMarketsMap;
  }
}
