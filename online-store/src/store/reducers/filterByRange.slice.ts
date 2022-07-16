import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocaleStorage from '../../global/helpers/LocalStorage';
import { FilterByRangePayload, IFilterByRangeInitialState } from '../../models/models';
import { getFiltersByRangeFromStore, getMinMaxValuesForRangeSlider } from './helpers';

const Storage = new LocaleStorage();
const { storeRangePrice, storeRangeQuantity } = getFiltersByRangeFromStore();
const minMaxValues = getMinMaxValuesForRangeSlider();
const { maxPrice, minPrice, maxQuantity, minQuantity } = minMaxValues;
const defaultValueQuantity = { min: minQuantity, max: maxQuantity };
const defaultValuePrice = { min: minPrice, max: maxPrice };

const initialState: IFilterByRangeInitialState = {
  filterByQuantity: storeRangeQuantity || defaultValueQuantity,
  filterByPrice: storeRangePrice || { min: minPrice, max: maxPrice }
};

const filterByRangeSlice = createSlice({
  name: 'range',
  initialState,
  reducers: {
    setfilterByQuantity: (state, action: PayloadAction<FilterByRangePayload>) => {
      const stateVar = state;
      const { filterByQuantity } = stateVar;
      filterByQuantity.min = action.payload.min;
      filterByQuantity.max = action.payload.max;
      Storage.set('filterByRangeSettings', stateVar);
    },
    setfilterByPrice: (state, action: PayloadAction<FilterByRangePayload>) => {
      const stateVar = state;
      const { filterByPrice } = stateVar;
      filterByPrice.min = action.payload.min;
      filterByPrice.max = action.payload.max;
      Storage.set('filterByRangeSettings', stateVar);
    },
    updateStateFiltersByRange: (state) => {
      const stateVar = state;
      stateVar.filterByPrice = defaultValuePrice;
      stateVar.filterByQuantity = defaultValueQuantity;
      Storage.set('filterByRangeSettings', stateVar);
    }
  }
});

export const { setfilterByQuantity, setfilterByPrice, updateStateFiltersByRange } =
  filterByRangeSlice.actions;
export const filterByRangeReducer = filterByRangeSlice.reducer;
