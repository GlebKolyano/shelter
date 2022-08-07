/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICar, INewCar, URL } from '../../../global/models';
import { setError } from './helpers';
import { ICarsInitialState, TFetchCarsProps } from './models';

const initialState: ICarsInitialState = {
  cars: [],
  totalCars: 0,
  selectedCar: null,
  animations: {},
  isDisabledSelectRemoveBtns: false,
  status: '',
  error: ''
};

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async ({ page, limit }: TFetchCarsProps, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${URL.garage}?_page=${page}&_limit=${limit}`);

      if (!response.ok) {
        throw new Error('No cars for loading!');
      }
      const total = response.headers.get('x-total-count');
      const data = (await response.json()) as ICar[];

      dispatch(setTotalCars(Number(total)));

      return data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);

export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${URL.garage}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error("You can't delete this car!");
      }
      const total = response.headers.get('x-total-count');
      return dispatch(setTotalCars(Number(total)));
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);

export const createNewCar = createAsyncThunk(
  'cars/createNewCar',
  async (car: INewCar, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(URL.garage, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
      });

      if (!response.ok) {
        throw new Error("You can't create this car!");
      }
      const total = response.headers.get('x-total-count');
      return dispatch(setTotalCars(Number(total)));
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);

export const updateParamsCar = createAsyncThunk(
  'cars/updateParamsCar',
  async ({ color, name, id }: ICar, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${URL.garage}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          color,
          name
        })
      });

      if (!response.ok) {
        throw new Error("You can't create this car!");
      }
      const total = response.headers.get('x-total-count');
      return dispatch(setTotalCars(Number(total)));
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);

export type AnimationType = {
  idCar: number;
  animationNumber: number;
};

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setTotalCars: (state, { payload }: PayloadAction<number>) => {
      const stateVar = state;
      stateVar.totalCars = payload;
    },
    selectCar: (state, { payload }: PayloadAction<ICar>) => {
      const stateVar = state;
      stateVar.selectedCar = payload;
    },
    resetSelectedCar: (state) => {
      const stateVar = state;
      stateVar.selectedCar = null;
    },
    setAnimationCar: (state, { payload }: PayloadAction<AnimationType>) => {
      const stateVar = state;
      const { idCar, animationNumber } = payload;
      stateVar.animations[idCar] = animationNumber;
    },

    disableSelectRemoveBtns: (state) => {
      const stateVar = state;
      stateVar.isDisabledSelectRemoveBtns = true;
    },
    undisableSelectRemoveBtns: (state) => {
      const stateVar = state;
      stateVar.isDisabledSelectRemoveBtns = false;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchCars.pending, (state) => {
      const stateVar = state;
      stateVar.status = 'loading';
      stateVar.error = '';
    });
    builder.addCase(fetchCars.fulfilled, (state, { payload }: PayloadAction<ICar[]>) => {
      const stateVar = state;
      stateVar.status = 'resolved';
      stateVar.cars = payload;
    });
    builder.addCase(fetchCars.rejected, (state, { payload }: PayloadAction<unknown | string>) =>
      setError(state, payload)
    );
    builder.addCase(deleteCar.rejected, (state, { payload }: PayloadAction<unknown | string>) =>
      setError(state, payload)
    );
  }
});

export const {
  setTotalCars,
  selectCar,
  resetSelectedCar,
  setAnimationCar,
  disableSelectRemoveBtns,
  undisableSelectRemoveBtns
} = carSlice.actions;
export default carSlice.reducer;