import * as repo from '../models/habit.model.js';
import {getCurrentDate} from '../utils/index.js';

class Habit {

     static getAll   = () => repo.getAll();

     static get     = (id) => repo.getById(id);

     static add     = (body) => repo.create({...body, doneChecks: [], });

     static update  = (id, body) => repo.update(id, body);

     static markDone  = async (id) =>  {
          const habit = await Habit.get(id);
          return repo.update(habit.id, { doneChecks: [...habit.doneChecks, getCurrentDate()] });
     };

     static delete  = (id) => repo.remove(id);

     static showStats  = async (range) => {
          const habits = await repo.getAll();

          const habitEfectivity = habits.map(habit => {
               const countDoneChecks = Habit.getCountDoneCheck(habit, range);
               return {
                    id: habit.id,
                    name: habit.name,
                    ['success rate']: `${((countDoneChecks / range) * 100).toFixed(2)}%`,
               };
          });
          console.table(habitEfectivity);
     };

     static getCountDoneCheck = (habit, period) => {
          const currDate = getCurrentDate().getTime();
          return habit.doneChecks.filter(date => (currDate - new Date(date).getTime()) < +period * 24 * 60 * 60 * 1000).length;
     };

     static showHabitTable =  (habits) =>  {
          const formattedData = habits.map(item => ({
               ...item,
               doneChecks: item.doneChecks.join(', ')
          }));
          console.table(formattedData);
     };

}
export default Habit;
