import { Dispatch } from 'redux';
import { emit, FullState } from '../';
import { MENU_SELECT } from '../../../../constants';
import { MenuIndexType, MenuSelectAction } from '../../../../types';

/**
 * Dispatch to Redux store that user selected menu.
 */
export const menuSelect = (selectedMenuId: MenuIndexType) => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: typeof emit) => {
        const { planning } = getState();

        if (!planning.isActive) {
            const menuSelectAction: MenuSelectAction = {
                type: MENU_SELECT,
                payload: {
                    selectedMenuId
                }
            };

            dispatch(menuSelectAction);
        }
    };
};
