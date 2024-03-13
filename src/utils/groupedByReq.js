export const groupedByActionType = (data) => {
  return data.reduce((result, item) => {
    const actionType = item.action_type;
    if (!result[actionType]) {
      result[actionType] = [];
    }
    result[actionType].push(item);
    return result;
  }, {});
};
export const groupedByRefNo = (data) => {
  return data.reduce((result, item) => {
    const byType = item.reference_no;
    if (!result[byType]) {
      result[byType] = [];
    }
    result[byType].push(item);
    return result;
  }, {});
};
