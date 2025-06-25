import {
    addHabit,
    deleteHabit,
    listHabits,
    markDone,
    showStats,
    updateHabit
} from '../controllers/habit.controller.js';


const habitRouter = {
    add: async (flags) => await addHabit(flags),
    list: async () => await listHabits(),
    markDone: async (flags) => await markDone(flags.id),
    delete: async (flags) => await deleteHabit(flags.id),
    update: async (flags) => await updateHabit(flags.id, flags),
    stats: async (flags) => await showStats(flags.period)

};


export default habitRouter;
