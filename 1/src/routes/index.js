import { handle as habitCtrl } from '../controllers/habit.controller.js';

export const routes = [
    {
        path: 'habit',
        controller: habitCtrl
    }
]