import habitsService from '../services/habit.service.js';

export async function addHabit(body) {
    const habit = await habitsService.add(body);
    console.log(`Adding Habit: ${habit.id}`);
}

export async function listHabits() {
    const habits = await habitsService.getAll();
    habitsService.showHabitTable(habits);
}

export async function getHabit(id) {
    const habits = await habitsService.get(id);
    console.log(habits);
}

export async function markDone(id) {
    const habit = await habitsService.markDone(id);
    console.log(`Mark Done: ${habit.id}`);
}

export async function updateHabit(id, body) {
    const habit = await habitsService.update(id, body);
    console.log(`Update habit: ${habit.id}`);
}

export async function showStats(period) {
    await habitsService.showStats(period);
}

export async function deleteHabit(id) {
    await habitsService.delete(id);
    console.log(`Deleted Habit: ${id}`);
}
